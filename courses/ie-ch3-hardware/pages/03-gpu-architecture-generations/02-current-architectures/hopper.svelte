<script module>
  export const pageConfig = { title: 'Hopper GPUs' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Hopper GPUs</h1>

<p>
  The <strong>Hopper</strong> architecture is named for Rear Admiral Grace Hopper. NVIDIA announced Hopper in
  March 2022, and the first <Term id="h100">H100</Term> <Term id="gpu">GPUs</Term> shipped later that year.
</p>

<div class="ie-table-wrap" role="region" aria-label="Hopper GPU specifications, SXM form factor, from NVIDIA datasheets" use:scrollable>
  <table class="ie-table">
    <caption>Hopper GPU specifications, SXM form factor, from NVIDIA datasheets</caption>
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
  Hopper introduced <Term id="tensor-core">Tensor Core</Term> support for <strong>FP8</strong>, a floating-point number format with 8 bits of
  <Term id="precision">precision</Term>. FP8 Tensor Cores run twice as fast as FP16 Tensor Cores. Moving FP8 values also takes half the
  <Term id="memory-bandwidth">memory bandwidth</Term>. The overall speedup is less than double, as Chapter 5's Why Quantize lesson explains, but
  workloads that can run in FP8 gain significantly.
</p>

<h2>Tools for kernel engineers</h2>
<p>
  Hopper adds fourth-generation Tensor Cores inside more, and faster, <Term id="streaming-multiprocessor">Streaming Multiprocessors</Term>. It also adds
  <Term id="thread-block">thread block</Term> clusters, distributed shared memory, and asynchronous data transfer and execution. These features
  give <Term id="cuda" /> engineers more tools for writing high-performance
  <Term id="kernel">kernels</Term>, the functions that run on the GPU. Chapter 4 covers kernels in depth.
</p>
<p>
  <strong>FlashAttention 3</strong> is one such kernel. It improves attention performance and memory efficiency
  on Hopper by using the new asynchronous features.
</p>

<h2>Why Hopper remains widely used</h2>
<p>The H100 and H200 are among the most widely used inference accelerators as of October 2026, for three reasons:</p>
<ul>
  <li>The architecture is new enough to perform well.</li>
  <li>It is established enough to have industry-wide software support and highly optimized kernels.</li>
  <li>
    The H100 and H200 are right-sized for common workloads across every <Term id="modality">modality</Term>, such
    as text, images, speech, and video.
  </li>
</ul>
