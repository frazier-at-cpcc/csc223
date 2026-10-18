<script module>
  export const pageConfig = { title: 'Types of GPUs' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Types of GPUs</h1>

<p>Every GPU vendor sells into three market segments.</p>

<div class="ie-table-wrap" role="region" aria-label="GPU market segments, with NVIDIA examples as of October 2026" use:scrollable>
  <table class="ie-table">
    <caption>GPU market segments, with NVIDIA examples as of October 2026</caption>
    <thead>
      <tr><th scope="col">Segment</th><th scope="col">Description</th><th scope="col">NVIDIA example</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Datacenter GPUs</th><td>Racked servers with interconnected high-performance GPUs</td><td><Term id="b200">B200</Term></td></tr>
      <tr><th scope="row">Workstation GPUs</th><td>Individual desktop GPUs for professional workflows</td><td>RTX Pro 6000</td></tr>
      <tr><th scope="row">Personal computing GPUs</th><td>Individual desktop GPUs for everyday use</td><td>GeForce RTX 5090</td></tr>
    </tbody>
  </table>
</div>

<h2>Why inference at scale uses datacenter GPUs</h2>
<p>
  Inference at scale runs on datacenter GPUs mounted in racks. A <strong>rack</strong> is a refrigerator-sized
  chassis with standardized power, networking, and cooling.
</p>
<p>Datacenter GPUs win for four reasons:</p>
<ul>
  <li>They offer the highest individual performance of any segment.</li>
  <li>
    They include high-bandwidth GPU-to-GPU links such as <Term id="nvlink" />, which let one model span several
    GPUs. The Instances section covers these links.
  </li>
  <li>They ship in highly standardized configurations, so a deployment behaves the same across datacenters.</li>
  <li>Millions of them are available in datacenters worldwide.</li>
</ul>
<p>
  Raw speed matters less than the other three. The interconnects, the standard configurations, and the
  available supply are what make datacenter GPUs the default for production inference.
</p>
