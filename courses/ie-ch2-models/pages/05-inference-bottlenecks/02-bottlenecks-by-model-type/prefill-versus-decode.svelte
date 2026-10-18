<script module>
  export const pageConfig = { title: 'Prefill Versus Decode' };
</script>

<h1>Prefill Versus Decode</h1>

<p>LLM inference has two phases, and each phase sets one of the two main latency metrics.</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>The two LLM phases and their bottlenecks</caption>
    <thead>
      <tr><th scope="col">Phase</th><th scope="col">Metric it determines</th><th scope="col">Bottleneck</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Prefill</th><td>Time to first token (TTFT)</td><td>Compute bound</td></tr>
      <tr><th scope="row">Decode</th><td>Tokens per second (TPS)</td><td>Memory bound</td></tr>
    </tbody>
  </table>
</div>

<p>
  To prove each bottleneck, compare the arithmetic intensity of the phase's most important operation with
  the ops:byte ratio of the hardware. In both phases, the most expensive operation is attention. Its exact
  arithmetic intensity depends on the model architecture, such as dimensions and head counts, on the
  input sequence length, and on the attention implementation.
</p>

<h2>The essential difference</h2>

<p>Prefill processes the entire input sequence in parallel. Decode generates tokens one at a time.</p>

<ul>
  <li>
    <strong>Prefill:</strong> the model weights load once. A series of large matrix-matrix multiplications
    then runs between the matrix of inputs and the attention matrices. Many calculations per read from
    memory produce a high arithmetic intensity.
  </li>
  <li>
    <strong>Decode:</strong> the model weights load again for every token. Each token needs only a much
    cheaper vector-matrix multiplication. Few operations relative to the bytes loaded produce a low
    arithmetic intensity.
  </li>
</ul>

<p>The next page calculates the arithmetic intensity of attention during one decode step.</p>
