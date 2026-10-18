<script module>
  export const pageConfig = { title: 'KV Cache Offloading Tiers' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>KV Cache Offloading Tiers</h1>

<p>
  <strong>KV cache offloading</strong> moves cache blocks from VRAM to nearby storage to make room for more cache.
  A block that is offloaded can be read back later instead of recomputed in <Term id="prefill">prefill</Term>. Four storage levels exist,
  listed here in descending order of bandwidth to the GPU.
</p>

<div class="ie-table-wrap" role="region" aria-label="KV cache storage levels" use:scrollable>
  <table class="ie-table">
    <caption>KV cache storage levels</caption>
    <thead>
      <tr>
        <th scope="col">Level</th>
        <th scope="col">Memory type</th>
        <th scope="col">Approximate speed</th>
        <th scope="col">Approximate size</th>
      </tr>
    </thead>
    <tbody>
      <tr><th scope="row">G1</th><td>Device memory (GPU VRAM)</td><td>Terabytes per second</td><td>Tens to hundreds of gigabytes</td></tr>
      <tr><th scope="row">G2</th><td>Host memory (CPU RAM)</td><td>Tens to hundreds of GB per second</td><td>Hundreds of gigabytes to terabytes</td></tr>
      <tr><th scope="row">G3</th><td>Local SSD</td><td>5 to 10 GB per second</td><td>Terabytes</td></tr>
      <tr><th scope="row">G4</th><td>Networked SSD</td><td>Gigabytes per second</td><td>Tens of terabytes</td></tr>
    </tbody>
  </table>
</div>
<p>Each step down the hierarchy trades bandwidth for capacity.</p>

<h2>Hardware and tooling</h2>
<p>
  Some systems, such as the GB200, pair GPUs with a <Term id="grace-cpu">Grace CPU</Term> over a fast chip-to-chip
  link, which makes G2 storage much faster. That makes them strong choices for KV cache offloading.
</p>
<p>
  <Term id="nvidia-dynamo" /> supports offloading through the KV Block Manager (KVBM). KVBM provides APIs that move
  KV cache blocks between memory levels. Keep the most frequently used blocks in higher-bandwidth memory, and move
  less-used blocks to slower storage until they are needed.
</p>
