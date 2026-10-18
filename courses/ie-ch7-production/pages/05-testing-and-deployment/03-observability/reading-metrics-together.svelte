<script module>
  export const pageConfig = { title: 'Reading Metrics Together' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import { Matching } from 'tessera-learn';
</script>

<h1>Reading Metrics Together</h1>

<p>
  The table below shows the same dashboard during three incidents on one LLM deployment. Each column compares the
  incident with the hour before it. Read down each column before deciding on a cause.
</p>

<div class="ie-table-wrap" role="region" aria-label="Dashboard readings during three incidents, compared with the previous hour" use:scrollable>
  <table class="ie-table">
    <caption>Dashboard readings during three incidents, compared with the previous hour</caption>
    <thead>
      <tr><th scope="col">Metric</th><th scope="col">Incident A</th><th scope="col">Incident B</th><th scope="col">Incident C</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Total volume</th><td>Flat</td><td>Up 80 percent in five minutes</td><td>Flat</td></tr>
      <tr><th scope="row">Average input length</th><td>Up from 2,000 to 6,000 tokens</td><td>Flat</td><td>Flat</td></tr>
      <tr><th scope="row">P99 end-to-end latency</th><td>Doubled</td><td>Four times higher</td><td>Slightly lower</td></tr>
      <tr><th scope="row">Queue depth</th><td>Near zero</td><td>Rising, above 300 requests</td><td>Near zero</td></tr>
      <tr><th scope="row">Replica count</th><td>6 serving, 0 starting</td><td>6 serving, 4 starting</td><td>6 serving, 0 starting</td></tr>
      <tr><th scope="row">GPU utilization</th><td>Up from 60 to 90 percent</td><td>Above 95 percent</td><td>Down from 60 to 20 percent</td></tr>
      <tr><th scope="row">5XX responses</th><td>0.1 percent</td><td>0.2 percent</td><td>Up from 0.1 to 14 percent</td></tr>
    </tbody>
  </table>
</div>

<h2>How Each Pattern Reads</h2>
<ul>
  <li>Incident A matches the worked example on the previous page. Volume and capacity hold steady, while each request grows.</li>
  <li>In Incident B, demand outran the ready replicas. Four replicas are still in their <Term id="cold-start">cold start</Term>, and the queue holds the excess until they finish.</li>
  <li>In Incident C, latency did not rise at all. The GPUs went quiet while server errors climbed, so many requests fail fast instead of running. A recent change to the service is the first suspect, and the audit log on the next page shows who made it.</li>
</ul>

<p class="ie-objective">Practices objective 9: diagnose the source of a latency problem</p>
<Matching
  id="pr_incidents"
  question="Match each dashboard pattern to its most likely cause."
  pairs={[
    { left: 'Flat volume, longer inputs, near-zero queue, higher GPU utilization', right: 'Each request needs more prefill work' },
    { left: 'Rising volume, growing queue, replicas still starting', right: 'Capacity has not caught up with demand' },
    { left: 'Flat volume, falling GPU utilization, surging 5XX responses', right: 'A broken change makes requests fail' },
    { left: 'Flat server latency, high end-to-end latency for one distant region', right: 'Network distance between users and the cluster' },
  ]}
  correctFeedback="Correct. Each pattern isolates one source: request size, capacity, a faulty change, or the network outside the cluster."
  incorrectFeedback="Find the metric that moved first in each pattern. Longer inputs point to request size. A growing queue with starting replicas points to capacity. Surging server errors with idle GPUs point to a broken change. Healthy server metrics with slow users in one place point to the network."
/>
