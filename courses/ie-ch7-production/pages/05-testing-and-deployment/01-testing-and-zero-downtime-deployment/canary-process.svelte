<script module>
  export const pageConfig = { title: 'The Canary Process' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>The Canary Process</h1>

<p>A canary deployment follows four steps.</p>
<ol>
  <li>Build a new deployment of the inference service and prepare it to handle incoming requests.</li>
  <li>Direct a small percentage of live traffic to the new deployment.</li>
  <li>Monitor the new deployment and confirm that it handles traffic correctly. Revert if any issue appears.</li>
  <li>Increase the traffic share gradually, monitoring at each stage, until the new deployment handles 100 percent of traffic.</li>
</ol>

<h2>Ramp Speed</h2>
<p>A canary rollout can ramp traffic in a few minutes. It can also ramp slowly to confirm stability at each stage.</p>

<h2>Cost with Autoscaling</h2>
<p>
  <Term id="autoscaling">Autoscaling</Term> keeps canary deployments inexpensive at scale. As traffic shifts away from the old deployment, that
  deployment scales down some of its <Term id="replica">replicas</Term>. Total GPU use stays close to what the traffic requires.
</p>

<Signal kind="mistake" title="Shifting traffic onto a cold deployment">
  <p>
    With no traffic, an autoscaled deployment sits at its minimum replica count. If the next canary stage sends it
    more traffic than those replicas hold, requests queue while autoscaling catches up, and users see a latency spike
    even though the new code works. Before each traffic shift, confirm that the new deployment has enough active
    replicas, for example by raising its min replicas for the duration of the rollout.
  </p>
</Signal>
