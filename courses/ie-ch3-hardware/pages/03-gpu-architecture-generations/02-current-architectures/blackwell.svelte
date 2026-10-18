<script module>
  export const pageConfig = { title: 'Blackwell GPUs' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Blackwell GPUs</h1>

<p>
  The <strong>Blackwell</strong> architecture is named for mathematician David Blackwell. NVIDIA first released it
  in November 2024 with the <Term id="b200">B200</Term>, followed by the B300. A B100 exists but is uncommon for inference.
</p>

<div class="ie-table-wrap" role="region" aria-label="Blackwell GPU specifications per GPU in NVIDIA HGX systems, from NVIDIA datasheets as of October 2026" use:scrollable>
  <table class="ie-table">
    <caption>Blackwell GPU specifications per GPU in NVIDIA HGX systems, from NVIDIA datasheets as of October 2026</caption>
    <thead>
      <tr><th scope="col">GPU</th><th scope="col">FP8 compute (dense)</th><th scope="col">Memory</th><th scope="col">Bandwidth</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">B200</th><td>About 4.5 petaFLOPS</td><td>180 GB</td><td>Up to 8 TB/s</td></tr>
      <tr><th scope="row">B300</th><td>About 4.5 petaFLOPS</td><td>288 GB</td><td>Up to 8 TB/s</td></tr>
    </tbody>
  </table>
</div>
<p>
  Blackwell figures depend on the system. The B200 package carries 192 GB of HBM3e, and NVIDIA lists 180 GB per
  GPU in its HGX B200 servers. The figure of about 5 petaFLOPS of dense FP8 that often circulates describes the
  GB200, which pairs Blackwell GPUs with a Grace <Term id="cpu">CPU</Term> and runs them at a higher power limit. Compare GPUs within
  the same system type.
</p>

<h2>Lower precision: FP4 and microscaling</h2>
<p>
  Hopper introduced FP8. Blackwell goes further with <strong>FP4</strong>, a 4-bit floating-point format. It also
  adds hardware support for a set of <Term id="microscaling-format">microscaling formats</Term>, MXFP8, MXFP4,
  and NVFP4, which retain more model quality at low precision. Chapter 5's Number Formats lesson explains these
  formats in detail.
</p>

<h2>Asynchronous programming, extended</h2>
<p>
  Blackwell builds on Hopper's asynchronous programming model. It adds features for moving data between tensor
  memory, a new on-chip memory that feeds the Tensor Cores, and global memory, which is <Term id="vram">VRAM</Term> as a
  <Term id="kernel">kernel</Term> addresses it. The <Term id="flashattention">FlashAttention</Term> 4 kernel
  relies on these features. It tiles loads, computations, and writes into asynchronous pipelines.
</p>

<h2>Blackwell's place in production inference</h2>
<p>
  As of October 2026, the B200 and B300 are the highest-performance NVIDIA GPUs in wide deployment for inference.
  They lead for large language models and for demanding workloads such as video generation. Software support,
  optimized kernels, and general availability for Blackwell matured through 2025, which marked an important
  transition in the inference industry.
</p>
