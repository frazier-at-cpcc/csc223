<script module>
  export const pageConfig = { title: 'Why Disaggregate' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Why Disaggregate</h1>

<p><Term id="disaggregation">Disaggregation</Term> combines three ideas from earlier chapters.</p>
<ol>
  <li>
    Chapter 2: <Term id="prefill" /> is <Term id="compute-bound">compute bound</Term> and determines <Term id="time-to-first-token">time to first token</Term> (TTFT).
    <Term id="decode">Decode</Term> is <Term id="memory-bound">memory bound</Term> and determines <Term id="tokens-per-second">tokens per second</Term> (TPS).
  </li>
  <li>
    Chapter 4: specialization improves performance, from <Term id="kernel">kernel</Term> selection to
    <Term id="inference-engine">inference engine</Term> parameter tuning.
  </li>
  <li>
    This chapter: model serving can be parallelized across multiple GPUs, or even multiple <Term id="node">nodes</Term>, when it avoids
    bottlenecks on lower-bandwidth interconnects.
  </li>
</ol>

<h2>Interference between prefill and decode</h2>
<p>
  In principle, prefill uses mostly compute and decode uses mostly memory, so the two phases can share a node
  efficiently. Under heavy traffic, that balance breaks down. Larger batches and compute-intensive optimizations
  push prefill and decode to compete for the same resources, and each phase slows the other. A long prefill that
  enters the batch delays the next decode step for every user on the engine.
</p>
