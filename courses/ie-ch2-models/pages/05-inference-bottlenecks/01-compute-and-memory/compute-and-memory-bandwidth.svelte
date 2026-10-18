<script module>
  export const pageConfig = { title: 'Compute, Memory Bandwidth, and Bottlenecks' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Compute, Memory Bandwidth, and Bottlenecks</h1>

<p>
  In a perfectly optimized system, every resource is fully used at all times. A <Term id="gpu">GPU</Term> has two
  main resources:
</p>

<ul>
  <li><strong>Compute:</strong> the number of floating-point operations per second the GPU can achieve, measured in <Term id="flops">FLOPS</Term>.</li>
  <li><strong>Memory bandwidth:</strong> the number of bytes the GPU can move per second.</li>
</ul>

<p>
  Ideally, compute never sits idle waiting for data from memory, and memory bandwidth never goes unused
  while compute finishes.
</p>

<h2>Bottlenecks</h2>

<p>
  Real systems have <strong>bottlenecks</strong>: imbalances in which one resource sits idle while
  another is saturated. Finding the bottleneck is the first step to improving performance. If an
  operation is bottlenecked on memory bandwidth, no amount of compute optimization makes it faster. The
  reverse is also true.
</p>

<p>Most inference systems have these bottlenecks:</p>

<div class="ie-table-wrap" role="region" aria-label="Default bottleneck for each inference workload" use:scrollable>
  <table class="ie-table">
    <caption>Default bottleneck for each inference workload</caption>
    <thead>
      <tr><th scope="col">Workload</th><th scope="col">Bottleneck</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row"><Term id="llm">LLM</Term> <Term id="prefill">prefill</Term> (<Term id="kv-cache">KV cache</Term> construction)</th><td><Term id="compute-bound">Compute bound</Term></td></tr>
      <tr><th scope="row">LLM <Term id="decode">decode</Term> (<Term id="token">token</Term> generation)</th><td><Term id="memory-bound">Memory bound</Term></td></tr>
      <tr><th scope="row">Image and video generation</th><td>Compute bound</td></tr>
    </tbody>
  </table>
</div>

<h2>Relieving a bottleneck</h2>

<p>
  Optimization aims to make the bottleneck less limiting to system-wide performance.
  <Term id="batching">Batching</Term> is an example. Processing a batch of requests together uses more compute
  for the same amount of memory traffic, which makes LLM decode less memory bound. Lesson 2 proves this claim
  with a calculation.
</p>
