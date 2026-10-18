<script module>
  export const pageConfig = { title: 'Scaling Signals' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Scaling Signals</h1>

<p>
  <strong>Autoscaling</strong> is the practice of dynamically adjusting the number of replicas allocated to a model
  within a cluster. An autoscaler needs a signal that tells it when to act. Two kinds of signal are available.
</p>
<div class="ie-table-wrap" role="region" aria-label="Scaling Signals table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Signal</th><th scope="col">What it measures</th><th scope="col">Timing</th></tr>
  </thead>
  <tbody>
    <tr><td>Utilization</td><td>GPU memory usage or compute usage</td><td>Lagging indicator</td></tr>
    <tr><td>Traffic</td><td>The number of requests in the system</td><td>Supports proactive decisions</td></tr>
  </tbody>
</table>
</div>

<h2>When Utilization and Traffic Disagree</h2>
<p>
  The two signals do not always agree. Chapter 2 showed that <Term id="prefill">prefill</Term> processes every input token in a
  compute-bound pass. A few requests that each carry hundreds of thousands of uncached input tokens can therefore
  drive utilization far higher than many small requests with high <Term id="prefix-caching">prefix cache</Term> hit
  rates. Request count alone would understate the load in the first case.
</p>
<p>
  Utilization rises only after the load has arrived, so it lags. Traffic counts let the system act as requests arrive.
  The chapter recommends combining both signals to keep resources matched with demand.
</p>
