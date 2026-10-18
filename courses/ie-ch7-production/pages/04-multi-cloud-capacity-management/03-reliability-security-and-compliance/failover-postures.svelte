<script module>
  export const pageConfig = { title: 'Failover Postures' };
</script>

<h1>Failover Postures</h1>

<h2>Keep nodes healthy</h2>

<p>
  GPU health is a node-level concern. When one GPU fails, other GPUs on the same node often fail next or must go offline
  for maintenance. Teams keep clusters healthy by noting failures early, cordoning off affected nodes, and cycling the
  pods that ran on them.
</p>

<p>
  GPU failures are not the only threat. Cloud providers run scheduled maintenance and suffer their own unscheduled
  downtime. Every layer of the infrastructure needs reinforcement to deliver high reliability.
</p>

<h2>Two multi-cloud postures</h2>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Posture</th><th scope="col">How it works</th><th scope="col">When a plane fails</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Active-active</td>
      <td>Several regions or clusters serve live traffic at the same time.</td>
      <td>Traffic continues on the remaining planes without interruption.</td>
    </tr>
    <tr>
      <td>Active-passive</td>
      <td>A hot standby cluster or region stays ready but idle.</td>
      <td>Traffic is cut over from the failed active plane to the passive plane.</td>
    </tr>
  </tbody>
</table>

<p>
  <strong>Active-active</strong> is a high-availability posture, and <strong>active-passive</strong> is a failover
  posture. In both, failing over to another workload plane keeps reliability high and latency low when a cluster, a
  region, or an entire cloud provider goes down.
</p>
