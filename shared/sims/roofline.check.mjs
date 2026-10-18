import assert from 'node:assert/strict';
import { roofline } from './roofline.js';

const near = (a, b, tol = 0.01) => assert.ok(Math.abs(a - b) <= tol, `${a} != ${b}`);

// Chapter 2 worked example: H100 FP16 ops:byte = 989 / 3.35 = 295.2.
let r = roofline('h100', 'decode', 1);
near(r.ridge, 295.22);
assert.equal(r.intensity, 1);              // 2*1*d^2 / 2*d^2
near(r.attainable, 3.35);                  // 3.35 TB/s x 1 FLOP/B
assert.equal(r.bound, 'memory');
assert.equal(r.crossover, 296);

// Large batch on H100 passes the ridge and hits the 989 TFLOPS ceiling.
r = roofline('h100', 'decode', 512);
assert.equal(r.intensity, 512);
assert.equal(r.attainable, 989);
assert.equal(r.bound, 'compute');

// Chapter 2 quiz item: intensity 410 on H100 is compute bound.
assert.equal(roofline('h100', 'prefill', 410).bound, 'compute');

// Prefill of 4,096 tokens: intensity about 4,096, compute bound.
r = roofline('h100', 'prefill', 4096);
assert.equal(r.intensity, 4096);
assert.equal(r.bound, 'compute');

// Other GPUs: ridges 312/2.039 = 153.0, 989/4.8 = 206.0, 2250/8 = 281.25.
near(roofline('a100', 'decode', 1).ridge, 153.02);
assert.equal(roofline('a100', 'decode', 1).crossover, 154);
near(roofline('h200', 'decode', 1).ridge, 206.04);
r = roofline('b200', 'decode', 1);
near(r.ridge, 281.25);
assert.equal(r.attainable, 8);
assert.equal(r.crossover, 282);

// FP8 doubles peak and intensity, so the ridge doubles and the crossover batch is unchanged.
r = roofline('h100', 'decode', 100, true);
assert.equal(r.peak, 1978);
near(r.ridge, 590.45);
assert.equal(r.intensity, 200);
near(r.attainable, 670);
assert.equal(r.crossover, 296);
// Chapter 3: H100 dense FP8 ops:byte about 591, H200 about 412.
near(roofline('h200', 'decode', 1, true).ridge, 412.08);
// A100 has no FP8 Tensor Cores, so the toggle has no effect.
assert.equal(roofline('a100', 'decode', 1, true).fp8, false);

// Decode attention stays near 1 FLOP/byte at any batch.
assert.equal(roofline('h100', 'attention', 1).intensity, 1);
assert.equal(roofline('h100', 'attention', 1024).intensity, 1);
assert.equal(roofline('h100', 'attention', 1024).bound, 'memory');
assert.equal(roofline('h100', 'attention', 64).crossover, null);
assert.equal(roofline('h100', 'attention', 64, true).intensity, 2);

console.log('ok');
