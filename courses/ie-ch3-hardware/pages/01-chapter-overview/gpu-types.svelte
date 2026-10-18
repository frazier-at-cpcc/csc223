<script module>
  export const pageConfig = { title: 'Types of GPUs' };
</script>

<h1>Types of GPUs</h1>

<p>Every GPU vendor sells into three market segments.</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>GPU market segments</caption>
    <thead>
      <tr><th scope="col">Segment</th><th scope="col">Description</th><th scope="col">NVIDIA example</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Datacenter GPUs</th><td>Racked servers with interconnected high-performance GPUs</td><td>B200</td></tr>
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
  <li>They include high-bandwidth GPU-to-GPU interconnects, which let one model span several GPUs.</li>
  <li>They ship in highly standardized configurations, so a deployment behaves the same across datacenters.</li>
  <li>Millions of them are available in datacenters worldwide.</li>
</ul>
<p>
  Raw speed is the least important of the four. The interconnects, the standard configurations, and the
  available supply are what make datacenter GPUs the default for production inference.
</p>
