<script module>
  export const pageConfig = { title: 'Compute, Memory Bandwidth, and Bottlenecks' };
</script>

<h1>Compute, Memory Bandwidth, and Bottlenecks</h1>

<p>In a perfectly optimized system, every resource is fully used at all times. A GPU has two main resources:</p>

<ul>
  <li><strong>Compute:</strong> the number of floating-point operations per second the GPU can achieve.</li>
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

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Default bottleneck for each inference workload</caption>
    <thead>
      <tr><th scope="col">Workload</th><th scope="col">Bottleneck</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">LLM prefill (KV cache construction)</th><td>Compute bound</td></tr>
      <tr><th scope="row">LLM decode (token generation)</th><td>Memory bound</td></tr>
      <tr><th scope="row">Image and video generation</th><td>Compute bound</td></tr>
    </tbody>
  </table>
</div>

<h2>Relieving a bottleneck</h2>

<p>
  Optimization aims to make the bottleneck less limiting to system-wide performance. Batching is an
  example. Processing a batch of requests together uses more compute for the same amount of memory
  traffic, which makes LLM decode less memory bound.
</p>
