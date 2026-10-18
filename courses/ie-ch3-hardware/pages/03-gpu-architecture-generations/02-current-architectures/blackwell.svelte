<script module>
  export const pageConfig = { title: 'Blackwell GPUs' };
</script>

<h1>Blackwell GPUs</h1>

<p>
  The <strong>Blackwell</strong> architecture is named for mathematician David Blackwell. NVIDIA first released it
  in November 2024 with the B200, followed by the B300. A B100 exists but is uncommon for inference.
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Blackwell GPU specifications</caption>
    <thead>
      <tr><th scope="col">GPU</th><th scope="col">FP8 compute (dense)</th><th scope="col">Memory</th><th scope="col">Bandwidth</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">B200</th><td>About 5 petaFLOPS</td><td>192 GB</td><td>Up to 8 TB/s</td></tr>
      <tr><th scope="row">B300</th><td>About 5 petaFLOPS</td><td>288 GB</td><td>Up to 8 TB/s</td></tr>
    </tbody>
  </table>
</div>

<h2>Lower precision: FP4 and microscaling</h2>
<p>
  Hopper introduced FP8. Blackwell goes further with <strong>FP4</strong>, a 4-bit floating-point format. It also
  adds a set of microscaling formats, MXFP8, MXFP4, and NVFP4, which retain more model quality at low precision.
  Section 5.1 explains these formats in detail.
</p>

<h2>Asynchronous programming, extended</h2>
<p>
  Blackwell builds on Hopper's asynchronous programming model with more features for loading and storing data
  between tensor memory and global memory. The <strong>FlashAttention 4</strong> kernel relies on these features.
  It tiles loads, computations, and writes into asynchronous pipelines.
</p>

<h2>The new standard</h2>
<p>
  The B200 and B300 are the new gold standard for inference. They deliver the highest performance for large
  language models and for demanding workloads such as video generation. Software support, optimized kernels,
  and general availability for Blackwell have all arrived recently, which marks an important transition in the
  inference industry.
</p>
