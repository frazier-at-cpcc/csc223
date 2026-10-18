<script module>
  export const pageConfig = { title: 'The Runtime Software Stack' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>The Runtime Software Stack</h1>

<p>The runtime layer depends on a sophisticated software stack. Each level builds on the one below it.</p>

<ol>
  <li>
    <dfn><strong>CUDA</strong></dfn> is NVIDIA's programming model and platform for running code on GPUs. It manages GPU
    kernels, memory, and execution, and it sits at the bottom of the stack.
  </li>
  <li><dfn><strong>PyTorch</strong></dfn> is a deep learning framework for building and running models. It runs on CUDA.</li>
  <li>
    An <dfn><strong>inference engine</strong></dfn> is a high-performance runtime that serves models with optimization
    techniques such as batching, caching, quantization, and speculation built in. vLLM, SGLang, and TensorRT-LLM are
    inference engines.
  </li>
</ol>

<h2>Kernels</h2>

<p>
  A <dfn><strong>kernel</strong></dfn> is a function that runs in parallel across many threads on the GPU. Each step of a
  <Term id="forward-pass">forward pass</Term>, such as a <Term id="matmul">matrix multiplication</Term> or
  <Term id="attention">attention</Term>, runs as one or more kernels.
</p>

<p>
  Low-level optimization of kernels matters. <dfn><strong>FlashAttention</strong></dfn> is a family of attention kernels
  that minimize traffic to GPU memory. Kernels like FlashAttention deliver significant performance gains without changing
  the model. Chapter 4 covers the software stack in depth.
</p>
