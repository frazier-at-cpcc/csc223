<script module>
  export const pageConfig = { title: 'The Scope of the Runtime Layer' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>The Scope of the Runtime Layer</h1>

<p>
  The <Term id="runtime-layer">runtime layer</Term> makes an individual model run as fast and as efficiently as possible on its hardware.
  That hardware is one GPU or several GPUs inside a single <Term id="instance">instance</Term>.
</p>

<h2>The Runtime Boundary</h2>

<p>
  The boundary of the runtime layer is the instance. Work that improves how a <Term id="replica">replica</Term> uses the GPUs in front
  of it belongs here. Work that spreads traffic across many replicas belongs to the infrastructure layer.
</p>

<h2>Runtime Goals</h2>

<p>Typical runtime goals include the following:</p>

<ul>
  <li>Lower the <Term id="time-to-first-token">time to first token (TTFT)</Term>, so the first token reaches the user sooner.</li>
  <li>Raise the <Term id="tokens-per-second">tokens per second</Term> that each user sees during decode.</li>
  <li>Raise <Term id="throughput">throughput</Term>, so the same GPUs serve more requests.</li>
  <li>Fit the model, and its KV cache, into less <Term id="vram">VRAM</Term>.</li>
</ul>

<p>These four goals reappear as the targets of the six techniques in the next two lessons.</p>
