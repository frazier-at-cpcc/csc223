<script module>
  export const pageConfig = { title: 'Prefill Versus Decode' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Prefill Versus Decode</h1>

<p><Term id="llm">LLM</Term> inference has two phases, and each phase sets one of the two main latency metrics.</p>

<div class="ie-table-wrap" role="region" aria-label="The two LLM phases and their bottlenecks" use:scrollable>
  <table class="ie-table">
    <caption>The two LLM phases and their bottlenecks</caption>
    <thead>
      <tr><th scope="col">Phase</th><th scope="col">Metric it determines</th><th scope="col">Bottleneck</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Prefill</th><td><Term id="time-to-first-token">Time to first token (TTFT)</Term></td><td><Term id="compute-bound">Compute bound</Term></td></tr>
      <tr><th scope="row">Decode</th><td><Term id="inter-token-latency">Inter-token latency</Term>, and so <Term id="token">tokens</Term> per second</td><td><Term id="memory-bound">Memory bound</Term></td></tr>
    </tbody>
  </table>
</div>

<p>
  To prove each bottleneck, compare the <Term id="arithmetic-intensity">arithmetic intensity</Term> of the
  phase's main operations with the <Term id="ops-byte-ratio">ops:byte</Term> ratio of the hardware. Two operations matter most. The linear layers
  hold most of the <Term id="weights">weights</Term>. <Term id="attention">Attention</Term> grows with the sequence length. The exact intensity depends on the model's
  dimensions, the sequence length, the <Term id="batching">batch</Term> size, and the attention implementation.
</p>

<h2>The essential difference</h2>

<p>Prefill processes the entire input sequence in parallel. Decode generates tokens one at a time.</p>

<ul>
  <li>
    <strong>Prefill:</strong> the weights load once for the whole prompt. Each weight matrix multiplies a matrix
    of thousands of prompt tokens, a matrix-matrix multiplication. Many calculations per byte read produce a high
    arithmetic intensity.
  </li>
  <li>
    <strong>Decode:</strong> the weights load again for every step, and each step processes one new token per
    request. Each weight matrix multiplies a single vector, a vector-matrix multiplication. Few operations
    relative to the bytes loaded produce a low arithmetic intensity.
  </li>
</ul>

<p>
  The next page calculates the intensity of a true decode step. The page after it calculates attention over a
  full prompt, the shape of prefill.
</p>
