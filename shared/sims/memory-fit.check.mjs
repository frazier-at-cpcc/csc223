// node shared/sims/memory-fit.check.mjs  -> prints ok
import assert from 'node:assert/strict';
import { MODELS, GPUS, evaluate, kvBytesPerToken, minGpusForRule, validTP } from './memory-fit.js';

const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);
const run = (o) =>
  evaluate({ kvBytes: 2, weightBytes: 2, context: 8192, sequences: 1, gpuCount: 1, overheadPct: 10, planningFactor: 1.5, ...o });

// KV bytes per token at FP16: 2 x layers x 8 x 128 x 2
assert.equal(kvBytesPerToken(MODELS['llama-8b'], 2), 131072); // 128 KiB
assert.equal(kvBytesPerToken(MODELS['llama-70b'], 2), 327680); // 320 KiB
assert.equal(kvBytesPerToken(MODELS['llama-405b'], 2), 516096); // 504 KiB
assert.equal(kvBytesPerToken(MODELS['llama-70b'], 1), 163840); // FP8 halves it

// Chapter 3 worked example: 50 GB of weights x 1.5 = 75 GB. One H100 (80 GB) meets it; one L40S (48 GB) does not.
assert.equal(minGpusForRule(50, 80, 40, 1.5), 1);
assert.equal(minGpusForRule(50, 48, 40, 1.5), 2); // 2 x 48 = 96 >= 75
assert.equal(minGpusForRule(50, 80, 40, 1.8), 2); // 50 x 1.8 = 90 > 80

// Llama 8B, FP16, one L40S, 8,192 tokens x 8 sequences, 10 percent reserve, factor 1.5
let r = run({ model: MODELS['llama-8b'], vram: GPUS.l40s.vram, sequences: 8 });
near(r.weights, 16.06);
near(r.ruleNeed, 24.09); // 16.06 x 1.5 <= 48
near(r.kv, (131072 * 8192 * 8) / 1e9); // 8.589934592 GB
near(r.overhead, 4.8);
near(r.used, 16.06 + 8.589934592 + 4.8);
assert.equal(r.verdict, 'fits');
assert.equal(r.maxSequences, 25); // floor((48 - 4.8 - 16.06) / 1.073741824) = floor(25.28)
assert.equal(r.minGpus, 1);

// Llama 70B, FP16, one H100: 141.2 GB of weights cannot load
r = run({ model: MODELS['llama-70b'], vram: 80 });
near(r.weightsTotal, 141.2);
assert.equal(r.verdict, 'nofit');
assert.equal(r.maxSequences, 0);
// 141.2 x 1.5 = 211.8 GB needs three H100s (240 GB), but 3 cannot split 8 KV heads, so 4
assert.equal(r.minGpus, 4);

// Two H100s: 70.6 GB per GPU loads, but 70.6 x 1.5 = 105.9 > 80, so it is below the planning factor
r = run({ model: MODELS['llama-70b'], vram: 80, gpuCount: 2 });
near(r.weights, 70.6);
near(r.kv, (2 * 80 * 4 * 128 * 2 * 8192) / 1e9); // 4 of 8 KV heads per GPU, 1.342 GB
assert.equal(r.verdict, 'below');

// Four H100s: 35.3 x 1.5 = 52.95 <= 80
r = run({ model: MODELS['llama-70b'], vram: 80, gpuCount: 4, sequences: 16 });
near(r.weights, 35.3);
assert.equal(r.verdict, 'fits');
near(r.kvTotal, r.kvTotalUnsplit); // heads split evenly, nothing replicated

// Llama 70B in FP8 (70.6 GB): 1.5 -> 105.9 GB, 1.8 -> 127.08 GB. Both need two H100s.
assert.equal(minGpusForRule(70.6, 80, 8, 1.5), 2);
assert.equal(minGpusForRule(70.6, 80, 8, 1.8), 2);

// Llama 405B in FP8 (405.9 GB) on B200 (180 GB)
// 1.5 -> 608.85 GB: four B200s (720 GB) suffice
assert.equal(minGpusForRule(405.9, 180, 8, 1.5), 4);
// 1.8 -> 730.62 GB: exceeds 720 GB, needs 5, rounds to the valid tensor-parallel size 8 (1,440 GB)
assert.equal(minGpusForRule(405.9, 180, 8, 1.8), 8);
// Chapter 5 quiz: 405 x 1.8 = 729 GB also rounds up to eight B200s
assert.equal(minGpusForRule(405, 180, 8, 1.8), 8);

// Four B200s at factor 1.8: 101.475 GB per GPU x 1.8 = 182.655 > 180, so below the factor
r = run({ model: MODELS['llama-405b'], vram: 180, weightBytes: 1, kvBytes: 1, gpuCount: 4, planningFactor: 1.8 });
near(r.weights, 101.475);
near(r.ruleNeed, 182.655);
assert.equal(r.verdict, 'below');
// Same deployment at factor 1.5: 152.2125 <= 180
r = run({ model: MODELS['llama-405b'], vram: 180, weightBytes: 1, kvBytes: 1, gpuCount: 4, planningFactor: 1.5 });
assert.equal(r.verdict, 'fits');

// Long-context preset: 8 B200s, 131,072 tokens x 16 sequences, FP8 KV, factor 1.8
r = run({ model: MODELS['llama-405b'], vram: 180, weightBytes: 1, kvBytes: 1, gpuCount: 8, context: 131072, sequences: 16, planningFactor: 1.8 });
near(r.weights, 50.7375);
near(r.kv, (2 * 126 * 1 * 128 * 1 * 131072 * 16) / 1e9); // 67.645734912 GB
near(r.used, 50.7375 + 67.645734912 + 18);
assert.equal(r.verdict, 'fits');
assert.equal(r.maxSequences, 26); // floor((180 - 18 - 50.7375) / 4.227858432) = floor(26.32)

// Sixteen GPUs and eight KV heads: each GPU still stores one head, so the KV cache doubles in aggregate
r = run({ model: MODELS['llama-70b'], vram: 80, gpuCount: 16 });
near(r.kvTotal, 2 * r.kvTotalUnsplit);

// Tensor-parallel sizes for eight KV heads
assert.deepEqual([1, 2, 3, 4, 5, 6, 8, 16].map((n) => validTP(8, n)), [true, true, false, true, false, false, true, true]);

// Workload that overflows memory even though weights meet the factor
r = run({ model: MODELS['llama-8b'], vram: 48, context: 131072, sequences: 4 });
assert.equal(r.meetsRule, true);
assert.equal(r.verdict, 'nofit'); // 4 x 17.18 GB of KV
assert.equal(r.maxSequences, 1);

console.log('ok');
