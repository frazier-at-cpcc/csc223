<script module>
  export const pageConfig = { title: 'Control and Workload Planes' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import MultiCloudPlanes from '../../../components/MultiCloudPlanes.svelte';
</script>

<h1>Control and Workload Planes</h1>

<p>
  Moving from one cluster in one cloud to many clusters in many clouds requires a new coordination layer. A multi-cloud
  architecture extends the Kubernetes split between control and workers to a global scale.
</p>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Plane</th><th scope="col">Responsibilities</th></tr>
  </thead>
  <tbody>
    <tr><td>Control plane</td><td>Handles model deployment and global scaling decisions. Receives real-time event streams.</td></tr>
    <tr><td>Workload plane</td><td>An individual cluster that handles inference traffic and in-cluster scaling decisions. Reports utilization and demand.</td></tr>
  </tbody>
</table>

<Figure
  number="7.11"
  caption="A multi-cloud approach extends the idea of control and workload planes to a multi-cluster, multi-region system."
  description="Three cloud providers, labeled Cloud A, Cloud B, and Cloud C, each contain several workload planes. Cloud A and Cloud C hold three workload planes each, and Cloud B holds two. Every workload plane connects to a single global control plane in the center."
>
  <MultiCloudPlanes />
</Figure>

<h2>Failure isolation</h2>

<p>
  This separation of responsibilities lets each workload plane serve traffic on its own. If the control plane fails,
  or if any one workload plane fails, the other workloads continue unaffected.
</p>
