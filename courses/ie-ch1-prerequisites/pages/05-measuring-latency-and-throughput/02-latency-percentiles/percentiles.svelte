<script module>
  export const pageConfig = { title: 'Latency Percentiles' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Latency Percentiles</h1>

<p>
  Inference engineers measure latency in percentiles.
  A <dfn><strong>latency percentile</strong></dfn> is the latency below which a given share of requests fall.
  P90 TTFT, for example, is the TTFT that 90 percent of requests meet or beat.
  Reported together, P50, P90, P95, and P99 show both the typical experience and the worst-case experience.
</p>

<div class="ie-table-wrap" role="region" aria-label="Common latency percentiles" use:scrollable>
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

<Signal kind="worked" title="Reading one day of TTFT percentiles">
  <p>A chat service handles 100,000 requests in one day and reports these TTFT values.</p>
  <pre class="ie-steps"><code>P50 TTFT = 300 ms
P90 TTFT = 700 ms
P99 TTFT = 2,400 ms</code></pre>
  <ul>
    <li>Half of all requests show the first token within 300 milliseconds.</li>
    <li>One request in ten waits longer than 700 milliseconds, which is about 10,000 requests that day.</li>
    <li>One request in a hundred waits longer than 2.4 seconds. At 100,000 requests per day, that is about 1,000 requests slower than 2.4 seconds.</li>
  </ul>
  <p>If the product's <Term id="latency-budget">latency budget</Term> allows 1 second to the first token, the median and P90 meet it and the P99 does not. The work belongs in the tail.</p>
</Signal>

<Signal kind="mistake" title="Reversing a percentile">
  <p>
    P90 does not mean that 90 percent of requests are slower than the value.
    It means that 90 percent are at or below the value, so 10 percent are slower.
    The number after the P counts the requests that meet the value, not the requests that miss it.
  </p>
</Signal>

<p>
  Lowering average latency matters.
  Good performance work also targets P90 and P99 latency, because the tail determines whether the product feels reliable.
  Chapter 7 uses the same percentiles to set production targets.
</p>
