<script module>
  export const pageConfig = { title: 'Latency Percentiles' };
</script>

<h1>Latency Percentiles</h1>

<p>
  Inference engineers measure latency in percentiles.
  <strong>Latency percentiles</strong> report latency at points such as P50, P90, P95, and P99.
  Together they show both the typical experience and the worst-case experience.
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Common latency percentiles</caption>
    <thead>
      <tr>
        <th scope="col">Percentile</th>
        <th scope="col">Name</th>
        <th scope="col">Requests slower than this value</th>
      </tr>
    </thead>
    <tbody>
      <tr><th scope="row">P50</th><td>Median latency</td><td>1 in every 2</td></tr>
      <tr><th scope="row">P90</th><td>90th percentile latency</td><td>1 in every 10</td></tr>
      <tr><th scope="row">P95</th><td>95th percentile latency</td><td>1 in every 20</td></tr>
      <tr><th scope="row">P99</th><td>99th percentile latency</td><td>1 in every 100</td></tr>
    </tbody>
  </table>
</div>

<h2>Worked example</h2>

<p>A chat service reports the following TTFT values for one day of traffic.</p>

<pre><code>P50 TTFT = 300 ms
P90 TTFT = 700 ms
P99 TTFT = 2,400 ms</code></pre>

<ul>
  <li>Half of all requests show the first token within 300 milliseconds.</li>
  <li>One request in ten waits longer than 700 milliseconds.</li>
  <li>One request in a hundred waits longer than 2.4 seconds. At 100,000 requests per day, that is more than 1,000 slow experiences.</li>
</ul>

<p>
  Lowering average latency matters.
  Good performance work also targets P90 and P99 latency, because the tail determines whether the product feels reliable.
</p>
