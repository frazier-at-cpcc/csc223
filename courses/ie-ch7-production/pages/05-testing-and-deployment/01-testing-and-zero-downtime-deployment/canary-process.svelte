<script module>
  export const pageConfig = { title: 'The Canary Process' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>The Canary Process</h1>

<p>A canary deployment follows four steps.</p>

<ol>
  <li>Build a new deployment of the inference service and prepare it to handle incoming requests.</li>
  <li>Direct a small percentage of live traffic to the new deployment.</li>
  <li>Monitor the new deployment and confirm that it handles traffic correctly. Revert if any issue appears.</li>
  <li>Increase the traffic share gradually, monitoring at each stage, until the new deployment handles 100 percent of traffic.</li>
</ol>

<h2>Ramp speed</h2>

<p>
  A canary rollout can ramp traffic in a few minutes. It can also ramp slowly to confirm stability at each stage.
</p>

<h2>Cost with autoscaling</h2>

<p>
  Autoscaling keeps canary deployments inexpensive at scale. As traffic shifts away from the old deployment, that
  deployment scales down some of its replicas. Total GPU use stays close to what the traffic requires.
</p>

<Callout type="warning">
  <p>
    With no traffic, an autoscaled deployment sits at its minimum replica count. Before shifting traffic, confirm that
    the new deployment has enough active replicas. Otherwise, requests queue while autoscaling catches up, and users see
    a latency spike.
  </p>
</Callout>
