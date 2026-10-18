<script module>
  export const pageConfig = { title: 'Scale to Zero' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Scale to Zero</h1>

<p>
  <strong>Scale to zero</strong> is an advanced autoscaling mechanism. The system scales down to zero active replicas
  when there is no traffic, then scales up automatically when traffic arrives.
</p>

<h2>Two prerequisites</h2>

<ul>
  <li><strong>Fast cold starts:</strong> the first user may be waiting live, so the first replica must start as quickly as possible.</li>
  <li><strong>Robust queueing:</strong> the system must hold incoming requests until a replica is live.</li>
</ul>

<h2>Workloads that fit</h2>

<p>Even with both prerequisites in place, scale to zero does not fit every workload.</p>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Workload</th><th scope="col">Fit</th><th scope="col">Reason</th></tr>
  </thead>
  <tbody>
    <tr><td>Development and testing</td><td>Good fit</td><td>Testing is bursty, and latency on the first request does not matter.</td></tr>
    <tr><td>An agent used only during business hours in one country</td><td>Good fit</td><td>Traffic arrives on a predictable schedule.</td></tr>
    <tr><td>An offline system that runs daily batch jobs</td><td>Good fit</td><td>Traffic arrives periodically, and no user waits live.</td></tr>
    <tr><td>A latency-sensitive application with light, unscheduled traffic</td><td>Poor fit</td><td>Random first requests pay the full cold start while a user waits.</td></tr>
  </tbody>
</table>

<Callout type="tip">
  <p>
    A latency-sensitive application that depends on scale to zero to keep costs low is probably not ready for
    dedicated infrastructure. It should use pay-per-token APIs until it reaches greater scale.
  </p>
</Callout>
