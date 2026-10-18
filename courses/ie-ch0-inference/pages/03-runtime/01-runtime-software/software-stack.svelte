<script module>
  export const pageConfig = { title: 'The Runtime Software Stack' };
</script>

<h1>The Runtime Software Stack</h1>

<p>The runtime layer depends on a sophisticated software stack. Each level builds on the one below it.</p>

<ol>
  <li>
    <dfn><strong>CUDA</strong></dfn> is NVIDIA's programming model and platform for GPU kernels, graphs, memory, and
    execution. It sits at the bottom of the stack.
  </li>
  <li><strong>PyTorch</strong> is a deep learning framework for building and running models. It runs on CUDA.</li>
  <li>
    An <dfn><strong>inference engine</strong></dfn> is a high-performance runtime with support for optimization
    techniques like batching, caching, quantization, and speculation. vLLM, SGLang, and TensorRT-LLM are inference
    engines.
  </li>
</ol>

<h2>Kernels</h2>

<p>
  A <dfn><strong>kernel</strong></dfn> is a function that executes parallelized code on the GPU. Low-level optimization
  of kernels matters. <dfn><strong>FlashAttention</strong></dfn> is a series of optimized attention kernels that minimize
  memory traffic. Kernels like FlashAttention deliver significant performance gains without changing the model.
</p>
