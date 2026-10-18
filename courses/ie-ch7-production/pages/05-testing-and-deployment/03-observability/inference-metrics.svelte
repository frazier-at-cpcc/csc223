<script module>
  export const pageConfig = { title: 'Inference Metrics' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Inference Metrics</h1>

<p>
  Inference is mission-critical, so it needs the same monitoring as any other mission-critical component: alerting,
  logs, and observability at the right level of abstraction. The first question is what to measure.
</p>
<div class="ie-table-wrap" role="region" aria-label="Inference Metrics table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Metric</th><th scope="col">What it measures</th></tr>
  </thead>
  <tbody>
    <tr><td>Total volume</td><td>The number of requests that a model deployment receives</td></tr>
    <tr><td>Request and response sizes</td><td>The input and output sequence lengths of the requests being processed</td></tr>
    <tr><td>Response codes</td><td>The count of 2XX success, 4XX client error, and 5XX server error codes that the model server returns</td></tr>
    <tr><td>Latency</td><td><Term id="time-to-first-token">Time to first token</Term>, <Term id="tokens-per-second">tokens per second</Term>, and <Term id="end-to-end-latency">end-to-end latency</Term> at P50, P90, and P99</td></tr>
    <tr><td>Replica count</td><td>The number of <Term id="replica">replicas</Term> actively serving traffic and the number still starting up</td></tr>
    <tr><td>Utilization</td><td>Use of CPU, host memory, GPU, and GPU memory</td></tr>
    <tr><td>Queue depth</td><td>The number of requests waiting for a replica, for synchronous or asynchronous traffic</td></tr>
  </tbody>
</table>
</div>
<p>
  Chapter 1 introduced <Term id="latency-percentile">latency percentiles</Term>, which report latency at several points
  in the distribution. P50 is the median request. P99 is slower than 99 percent of requests, so it shows the tail of
  the distribution, the slow experiences that averages hide. The single slowest request, the maximum, sits beyond P99.
</p>

<h2>Metrics Read Together</h2>
<p>
  These metrics depend on one another. A latency spike might come from a rise in request volume. It might instead come
  from a rise in input sequence length at the same volume. Viewing the metrics side by side shows what is happening and
  also why.
</p>

<Signal kind="worked" title="A spike with flat traffic">
  <p>P99 latency doubles at 2 p.m. The engineer checks the other metrics in order.</p>
  <ol>
    <li>Total volume is flat, so more traffic is not the cause.</li>
    <li>Queue depth stays near zero and the replica count is unchanged, so requests are not waiting for capacity.</li>
    <li>Request size shows that average input length tripled at the same moment.</li>
  </ol>
  <p>
    The spike comes from longer prompts. Longer prompts lengthen <Term id="prefill">prefill</Term>, which Chapter 2 showed is
    compute-bound, so each request takes longer on the GPU.
  </p>
</Signal>
