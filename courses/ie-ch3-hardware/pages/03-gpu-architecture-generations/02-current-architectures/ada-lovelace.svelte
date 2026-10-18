<script module>
  export const pageConfig = { title: 'Ada Lovelace GPUs' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Ada Lovelace GPUs</h1>

<p>
  The <strong>Ada Lovelace</strong> architecture is named for the first computer programmer. NVIDIA released it
  six months after Hopper.
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Ada Lovelace GPU specifications</caption>
    <thead>
      <tr><th scope="col">GPU</th><th scope="col">FP8 compute (dense)</th><th scope="col">Memory</th><th scope="col">Bandwidth</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">L4</th><td>242 teraFLOPS</td><td>24 GB</td><td>300 GB/s</td></tr>
      <tr><th scope="row">L40</th><td>362 teraFLOPS</td><td>48 GB</td><td>864 GB/s</td></tr>
    </tbody>
  </table>
</div>

<h2>A counterpart to Hopper, not a successor</h2>
<p>
  Lovelace and Hopper are similar, and Lovelace also supports FP8 inference. Hopper focuses on AI applications.
  Lovelace GPUs lean toward graphics.
</p>

<h2>The missing NVLink</h2>
<p>
  Lovelace GPUs do not support the NVLink interconnect. This is a major limitation. Nodes of eight Hopper or
  Blackwell GPUs use NVLink for efficient parallelism across GPUs. Lovelace GPUs must run individually or through
  inefficient methods such as Pipeline Parallelism.
</p>

<h2>Where Lovelace fits</h2>
<ul>
  <li>The L4 is a cheap, convenient way to run small models, such as text embedding and computer vision models.</li>
  <li>
    The L40 is generally a poor choice for inference. For the same memory footprint, a multi-instance GPU slice
    of an H100 offers much higher compute and memory bandwidth.
  </li>
</ul>

<Callout type="info">
  <p>Section 3.3.2 of this chapter explains multi-instance GPUs, which split one large GPU into several smaller ones.</p>
</Callout>
