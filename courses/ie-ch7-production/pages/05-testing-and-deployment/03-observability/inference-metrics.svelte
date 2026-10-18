<script module>
  export const pageConfig = { title: 'Inference Metrics' };
</script>

<h1>Inference Metrics</h1>

<p>
  Inference is mission-critical, so it needs the same monitoring as any other mission-critical component: alerting,
  logs, and observability at the right level of abstraction. The first question is what to measure.
</p>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Metric</th><th scope="col">What it measures</th></tr>
  </thead>
  <tbody>
    <tr><td>Total volume</td><td>The number of requests that a model deployment receives</td></tr>
    <tr><td>Request and response sizes</td><td>The input and output sequence lengths of the requests being processed</td></tr>
    <tr><td>Response codes</td><td>The count of 2XX, 4XX, and 5XX response codes that the model server returns</td></tr>
    <tr><td>Latency</td><td>Time to first token, tokens per second, and end-to-end latency at P50, P90, and P99</td></tr>
    <tr><td>Replica count</td><td>The number of instances actively serving traffic and the number still starting up</td></tr>
    <tr><td>Utilization</td><td>Use of CPU, host memory, GPU, and GPU memory</td></tr>
    <tr><td>Queue depth</td><td>For asynchronous traffic, the number of requests waiting to be processed</td></tr>
  </tbody>
</table>

<p>
  <strong>Latency percentiles</strong> report latency at several points in the distribution. P50 is the median request.
  P99 is slower than 99 percent of requests, so it shows the worst-case experience that averages hide.
</p>

<h2>Read metrics together</h2>

<p>
  These metrics depend on one another. A latency spike might come from a rise in request volume. It might instead come
  from a rise in input sequence length at the same volume. Viewing the metrics side by side shows what is happening and
  also why.
</p>

<div class="ie-worked">
  <h2>Worked example</h2>
  <p>
    P99 latency doubles at 2 p.m. Total volume is flat. Request size shows that average input length tripled at the same
    moment, and queue depth stays near zero. The spike comes from longer prompts, not from more traffic or a capacity
    shortage.
  </p>
</div>
