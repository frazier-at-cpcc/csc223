// MemoryFit model: GPU memory sizing for one model deployment. Pure functions, no DOM.
// Units: GB means 10^9 bytes everywhere, so 1 billion parameters at 1 byte = 1 GB.

export const MODELS = {
  // Layers, KV heads, and head dimension from the published Llama 3.1 config.json files.
  // Parameter counts are the published totals, in billions.
  'llama-8b': { label: 'Llama 3.1 8B', params: 8.03, layers: 32, kvHeads: 8, headDim: 128 },
  'llama-70b': { label: 'Llama 3.1 70B', params: 70.6, layers: 80, kvHeads: 8, headDim: 128 },
  'llama-405b': { label: 'Llama 3.1 405B', params: 405.9, layers: 126, kvHeads: 8, headDim: 128 },
  custom: { label: 'Custom', params: 13, layers: 40, kvHeads: 40, headDim: 128 },
};

export const PRECISIONS = {
  fp16: { label: 'FP16 or BF16', bytes: 2 },
  fp8: { label: 'FP8', bytes: 1 },
  fp4: { label: 'FP4', bytes: 0.5 },
};

// Capacity per GPU in GB. B200 carries 192 GB of HBM3e, but NVIDIA lists 180 GB per GPU
// for HGX and DGX B200 systems (1,440 GB per eight-GPU node), and the course uses 180 GB.
export const GPUS = {
  a100: { label: 'A100 80 GB', vram: 80 },
  h100: { label: 'H100 80 GB', vram: 80 },
  h200: { label: 'H200 141 GB', vram: 141 },
  b200: { label: 'B200 180 GB', vram: 180 },
  l40s: { label: 'L40S 48 GB', vram: 48 },
};

// Planning rule: required VRAM >= planningFactor x weight memory. The extra (factor - 1) x weights is
// headroom for KV cache, activations, and runtime overhead. Chapter 3 teaches 1.5 as the minimum.
export const DEFAULT_FACTOR = 1.5;
export const MAX_GPUS = 16;

export const weightGB = (paramsB, bytes) => paramsB * bytes;

// Bytes of KV cache one token adds across the whole model: 2 (K and V) x layers x KV heads x head dim x bytes.
export const kvBytesPerToken = (m, kvBytes) => 2 * m.layers * m.kvHeads * m.headDim * kvBytes;

// Tensor parallelism splits KV heads across GPUs. When GPUs outnumber KV heads, engines replicate
// heads, so each GPU still holds at least one.
export const kvHeadsPerGpu = (kvHeads, n) => Math.ceil(kvHeads / n);

// A tensor-parallel size is valid when it divides the KV heads or the KV heads divide it.
export const validTP = (kvHeads, n) => kvHeads % n === 0 || n % kvHeads === 0;

export function evaluate({ model, weightBytes, kvBytes, context, sequences, vram, gpuCount, overheadPct, planningFactor = DEFAULT_FACTOR }) {
  const n = gpuCount;
  const weightsTotal = weightGB(model.params, weightBytes);
  const kvPerToken = kvBytesPerToken(model, kvBytes); // bytes, whole model
  const kvTotalUnsplit = (kvPerToken * context * sequences) / 1e9;

  // Per GPU
  const weights = weightsTotal / n;
  const kvPerTokenGpu = 2 * model.layers * kvHeadsPerGpu(model.kvHeads, n) * model.headDim * kvBytes;
  const kv = (kvPerTokenGpu * context * sequences) / 1e9;
  const overhead = (vram * overheadPct) / 100;
  const used = weights + kv + overhead;
  const free = vram - used;
  const ruleNeed = planningFactor * weights; // VRAM the rule asks for on each GPU
  const ruleLimit = vram / planningFactor; // largest weight share per GPU the rule allows
  const meetsRule = vram + 1e-9 >= ruleNeed;

  let verdict;
  if (used > vram + 1e-9) verdict = 'nofit';
  else if (!meetsRule) verdict = 'below';
  else verdict = 'fits';

  const kvRoom = vram - overhead - weights;
  const perSeqGpu = (kvPerTokenGpu * context) / 1e9;
  const maxSequences = kvRoom > 0 ? Math.floor(kvRoom / perSeqGpu + 1e-9) : 0;

  return {
    weightsTotal,
    kvPerToken,
    kvTotalUnsplit,
    kvTotal: kv * n,
    weights,
    kv,
    overhead,
    used,
    free,
    ruleNeed,
    ruleLimit,
    meetsRule,
    verdict,
    maxSequences,
    validTP: validTP(model.kvHeads, n),
    minGpus: minGpusForRule(weightsTotal, vram, model.kvHeads, planningFactor),
  };
}

// Smallest valid tensor-parallel GPU count (1 to 16) whose total VRAM covers planningFactor x weights.
export function minGpusForRule(weightsTotal, vram, kvHeads, planningFactor = DEFAULT_FACTOR) {
  for (let n = 1; n <= MAX_GPUS; n++) {
    if (validTP(kvHeads, n) && n * vram + 1e-9 >= planningFactor * weightsTotal) return n;
  }
  return null;
}
