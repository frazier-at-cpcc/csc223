<script module>
  export const pageConfig = { title: 'Ada Lovelace GPUs' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Ada Lovelace GPUs</h1>

<p>
  The <strong>Ada Lovelace</strong> architecture is named for the first computer programmer. NVIDIA released it
  six months after Hopper.
</p>

<div class="ie-table-wrap" role="region" aria-label="Ada Lovelace GPU specifications, from NVIDIA datasheets" use:scrollable>
  <table class="ie-table">
    <caption>Ada Lovelace GPU specifications, from NVIDIA datasheets</caption>
    <thead>
      <tr><th scope="col">GPU</th><th scope="col">FP8 compute (dense)</th><th scope="col">Memory</th><th scope="col">Bandwidth</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">L4</th><td>242 teraFLOPS</td><td>24 GB</td><td>300 GB/s</td></tr>
      <tr><th scope="row">L40</th><td>362 teraFLOPS</td><td>48 GB</td><td>864 GB/s</td></tr>
      <tr><th scope="row">L40S</th><td>733 teraFLOPS</td><td>48 GB</td><td>864 GB/s</td></tr>
    </tbody>
  </table>
</div>
<p>The L40S is a higher-throughput version of the L40 with the same memory, and many clouds offer it.</p>

<h2>A counterpart to Hopper, not a successor</h2>
<p>
  Lovelace and Hopper are similar, and Lovelace also supports FP8 inference. Hopper focuses on AI applications.
  Lovelace GPUs lean toward graphics.
</p>

<h2>The missing NVLink</h2>
<p>
  Lovelace GPUs do not support <Term id="nvlink" />, NVIDIA's high-bandwidth GPU-to-GPU link, which the
  Instances section covers. This is a major limitation. A <Term id="node">node</Term>, the standard server of
  eight datacenter GPUs, uses NVLink to connect its Hopper or <Term id="blackwell">Blackwell</Term> GPUs for efficient parallelism.
</p>
<p>
  Without NVLink, Lovelace GPUs communicate over <Term id="pcie">PCIe</Term>, the standard expansion bus that
  connects a card to its host computer. Bandwidth-hungry methods such as
  <Term id="tensor-parallelism">tensor parallelism</Term> run poorly over PCIe. Multi-GPU Lovelace deployments
  therefore fall back on <Term id="pipeline-parallelism">pipeline parallelism</Term>, which needs far less
  communication but adds <Term id="latency">latency</Term> to each request. Chapter 5's Model Parallelism section compares the two
  methods.
</p>

<Signal kind="mistake" title="Treating pipeline parallelism as a defect">
  <p>
    Pipeline parallelism is not inefficient in general. It is the method that tolerates slow links, which is why
    Chapter 5 recommends it between nodes. On Lovelace GPUs it is a fallback because PCIe rules out the faster
    alternative inside one server.
  </p>
</Signal>

<h2>Where Lovelace fits</h2>
<ul>
  <li>
    The L4 is a cheap, convenient way to run small models, such as text
    <Term id="embedding-model">embedding models</Term> and computer vision models that classify or detect objects
    in images.
  </li>
  <li>
    The L40 is generally a poor choice for inference. For the same memory footprint, a
    <Term id="mig">Multi-Instance GPU</Term> slice of an H100 offers much higher compute and memory bandwidth. The
    Multi-Instance GPUs lesson in this chapter explains how one large GPU splits into several smaller ones.
  </li>
</ul>
