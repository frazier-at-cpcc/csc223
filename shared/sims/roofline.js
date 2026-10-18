// Pure roofline model for RooflineExplorer. No DOM, no Svelte.
// Units: compute in TFLOPS (10^12 FLOP/s), bandwidth in TB/s (10^12 B/s),
// so peak / bandwidth is FLOPs per byte and bandwidth x intensity is TFLOPS.

export const GPUS = {
  a100: { id: 'a100', name: 'A100 80GB SXM', fp16: 312, bw: 2.039, fp8: false,
    source: 'NVIDIA A100 datasheet: 312 TFLOPS dense FP16 Tensor Core (624 with sparsity), 2,039 GB/s HBM2e.' },
  h100: { id: 'h100', name: 'H100 SXM', fp16: 989, bw: 3.35, fp8: true,
    source: 'Chapter 2 and Chapter 3 figures, which match the NVIDIA H100 datasheet: 989 TFLOPS dense FP16 (1,979 dense FP8), 3.35 TB/s HBM3.' },
  h200: { id: 'h200', name: 'H200 SXM', fp16: 989, bw: 4.8, fp8: true,
    source: 'Chapter 3 figures, which match the NVIDIA H200 datasheet: 1,979 TFLOPS dense FP8, so 989 dense FP16, and 4.8 TB/s HBM3e.' },
  b200: { id: 'b200', name: 'B200', fp16: 2250, bw: 8, fp8: true,
    source: 'NVIDIA HGX B200 datasheet: 36 PFLOPS FP16 with sparsity across 8 GPUs, so 2,250 TFLOPS dense FP16 per GPU (4,500 dense FP8). Bandwidth of 8 TB/s follows Chapter 3.' },
};

export const WORKLOADS = {
  decode: { id: 'decode', name: 'Decode (linear layers)', max: 1024, unit: 'batch size' },
  prefill: { id: 'prefill', name: 'Prefill (linear layers)', max: 16384, unit: 'tokens processed together' },
  attention: { id: 'attention', name: 'Decode attention', max: 1024, unit: 'batch size' },
};

// n is the batch size (decode) or the number of tokens processed together (prefill).
export function roofline(gpuId, workloadId, n, fp8 = false) {
  const gpu = GPUS[gpuId] ?? GPUS.h100;
  const wl = WORKLOADS[workloadId] ?? WORKLOADS.decode;
  const useFp8 = fp8 && gpu.fp8;
  const bytesPerValue = useFp8 ? 1 : 2;
  const peak = gpu.fp16 * (useFp8 ? 2 : 1);
  const ridge = peak / gpu.bw;
  // Linear layer: 2*n*d^2 FLOPs over about bytesPerValue*d^2 bytes of weights.
  // Decode attention: 4*L*d FLOPs per sequence over 2*L*d*bytesPerValue bytes of K and V.
  const intensity = wl.id === 'attention' ? 2 / bytesPerValue : (2 * n) / bytesPerValue;
  const attainable = Math.min(peak, gpu.bw * intensity);
  // Smallest n whose intensity reaches the ridge; attention never gets there by batching.
  const crossover = wl.id === 'attention' ? null : Math.ceil((ridge * bytesPerValue) / 2);
  return {
    gpu, workload: wl, n, fp8: useFp8, bytesPerValue, peak, bw: gpu.bw, ridge, intensity, attainable,
    utilization: attainable / peak,
    bound: intensity >= ridge ? 'compute' : 'memory',
    crossover,
  };
}
