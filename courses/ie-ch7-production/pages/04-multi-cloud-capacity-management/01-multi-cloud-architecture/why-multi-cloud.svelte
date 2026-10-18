<script module>
  export const pageConfig = { title: 'Why Multi-Cloud' };
</script>

<h1>Why Multi-Cloud</h1>

<p>
  Autoscaling within one cluster works up to a point. High-volume deployments that serve a global user base need
  thousands of GPUs distributed around the world. No single cluster provides that.
</p>

<h2>Siloed compute versus true multi-cloud</h2>

<p>
  Building multi-cloud inference as a set of separate silos across providers is straightforward. Each silo runs on its
  own, though. Compute cannot flow between clouds, and moving a workload from one cloud to another is a tedious,
  error-prone process.
</p>

<p>
  <strong>Multi-cloud capacity management</strong> is a global scheduler that places workloads across providers and
  regions. True multi-cloud inference requires a multi-region, multi-provider bin packing tool that treats distinct
  pools of compute as interchangeable. Like Kubernetes inside one cluster, this layer takes a global view and enables
  self-healing and global scheduling.
</p>

<h2>Four benefits</h2>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Benefit</th><th scope="col">How multi-cloud delivers it</th></tr>
  </thead>
  <tbody>
    <tr><td>Capacity</td><td>Pools GPUs from several providers for greater and more flexible access</td></tr>
    <tr><td>Redundancy</td><td>Splits inference across providers so that one provider outage does not stop service</td></tr>
    <tr><td>Latency</td><td>Runs inference close to end users to reduce network latency</td></tr>
    <tr><td>Compliance</td><td>Runs inference where data sovereignty and other regulations require</td></tr>
  </tbody>
</table>
