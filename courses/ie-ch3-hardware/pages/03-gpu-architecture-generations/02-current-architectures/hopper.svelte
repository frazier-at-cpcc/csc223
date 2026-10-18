<script module>
  export const pageConfig = { title: 'Hopper GPUs' };
</script>

<h1>Hopper GPUs</h1>

<p>
  The <strong>Hopper</strong> architecture is named for Rear Admiral Grace Hopper. NVIDIA first released it in
  March 2022 with the H100 GPU.
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Hopper GPU specifications</caption>
    <thead>
      <tr><th scope="col">GPU</th><th scope="col">FP8 compute (dense)</th><th scope="col">Memory</th><th scope="col">Bandwidth</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">H100</th><td>1,979 teraFLOPS</td><td>80 GB</td><td>3.35 TB/s</td></tr>
      <tr><th scope="row">H200</th><td>1,979 teraFLOPS</td><td>141 GB</td><td>4.8 TB/s</td></tr>
    </tbody>
  </table>
</div>

<h2>FP8 support</h2>
<p>
  Hopper introduced support for <strong>FP8</strong>, a floating-point number format with 8 bits of precision.
  FP8 Tensor Cores run twice as fast as FP16 Tensor Cores. Moving FP8 values also takes half the memory
  bandwidth. The overall speedup is less than double, as section 5.1 explains, but workloads that can run in
  FP8 gain significantly.
</p>

<h2>Tools for kernel engineers</h2>
<p>
  Hopper adds fourth-generation Tensor Cores inside more, and faster, Streaming Multiprocessors. It also adds
  thread block clusters, distributed shared memory, and asynchronous data transfer and execution. These features
  give CUDA engineers more tools for writing high-performance kernels.
</p>
<p>
  <strong>FlashAttention 3</strong> is one such kernel. It improves attention performance and memory efficiency
  on Hopper by using the new asynchronous features.
</p>

<h2>Why Hopper remains widely used</h2>
<p>The H100 and H200 are among the most widely used inference accelerators, for three reasons:</p>
<ul>
  <li>The architecture is new enough to perform well.</li>
  <li>It is established enough to have industry-wide software support and highly optimized kernels.</li>
  <li>The H100 and H200 are right-sized for common workloads across all modalities.</li>
</ul>
