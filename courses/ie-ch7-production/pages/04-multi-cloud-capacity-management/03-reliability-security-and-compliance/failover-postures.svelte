<script module>
  export const pageConfig = { title: 'Failover Postures' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Failover Postures</h1>

<h2>Node Health</h2>
<p>
  GPU health is a node-level concern. When one GPU fails, other GPUs on the same <Term id="node">node</Term> often fail next or
  must go offline for maintenance. Teams keep clusters healthy with three habits.
</p>
<ul>
  <li>They note failures early, from GPU health checks and error logs.</li>
  <li>They cordon affected nodes. To <strong>cordon</strong> a node is to mark it unschedulable, so <Term id="kubernetes" /> places no new pods on it.</li>
  <li>They cycle the pods that ran on those nodes, which means stopping each pod and letting Kubernetes reschedule it onto a healthy node.</li>
</ul>
<p>
  GPU failures are not the only threat. Cloud providers run scheduled maintenance and suffer their own unscheduled
  downtime. Every layer of the infrastructure needs reinforcement to deliver high reliability.
</p>

<h2>Two Multi-Cloud Postures</h2>
<div class="ie-table-wrap" role="region" aria-label="Two Multi-Cloud Postures table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Posture</th><th scope="col">How it works</th><th scope="col">When a plane fails</th><th scope="col">Cost</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Active-active</td>
      <td>Several regions or clusters serve live traffic at the same time.</td>
      <td>Traffic continues on the remaining planes without interruption.</td>
      <td>Every plane must hold enough spare capacity to absorb a failed plane's traffic.</td>
    </tr>
    <tr>
      <td>Active-passive</td>
      <td>A hot standby cluster or region stays ready but idle.</td>
      <td>Traffic is cut over from the failed active plane to the passive plane.</td>
      <td>The standby costs money while it serves nothing, and the cutover takes time.</td>
    </tr>
  </tbody>
</table>
</div>
<p>
  <strong>Active-active</strong> is a high-availability posture, and <strong>active-passive</strong> is a failover
  posture. In both, failing over to another <Term id="workload-plane">workload plane</Term> keeps reliability high and latency low when a cluster, a
  region, or an entire cloud provider goes down.
</p>
