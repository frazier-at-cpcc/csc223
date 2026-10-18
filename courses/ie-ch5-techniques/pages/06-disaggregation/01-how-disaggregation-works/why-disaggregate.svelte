<script module>
  export const pageConfig = { title: 'Why Disaggregate' };
</script>

<h1>Why Disaggregate</h1>

<p>Disaggregation combines three ideas from earlier in the book.</p>
<ol>
  <li>
    Prefill is compute bound and determines time to first token (TTFT). Decode is memory bound and determines tokens
    per second (TPS).
  </li>
  <li>Specialization improves performance, from kernel selection to inference engine parameter tuning.</li>
  <li>
    Model serving can be parallelized across multiple GPUs, or even multiple nodes, when it avoids bottlenecks on
    lower-bandwidth interconnects.
  </li>
</ol>

<h2>Prefill and decode interfere</h2>
<p>
  In principle, prefill uses mostly compute and decode uses mostly memory, so the two phases can share a node
  efficiently. Under heavy traffic, that balance breaks down. Larger batches and compute-intensive optimizations
  push prefill and decode to compete for the same resources, and each phase slows the other.
</p>
