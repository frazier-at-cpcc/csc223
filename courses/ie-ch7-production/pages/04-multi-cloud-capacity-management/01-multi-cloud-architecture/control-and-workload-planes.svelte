<script module>
  export const pageConfig = { title: 'Control and Workload Planes' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Figure from '../../../components/Figure.svelte';
  import MultiCloudPlanes from '../../../components/MultiCloudPlanes.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Control and Workload Planes</h1>

<Signal kind="recall" chapter={0}>
  <p>
    A <Term id="control-plane">control plane</Term> is the global orchestrator that deploys models and allocates resources. Each
    <Term id="workload-plane">workload plane</Term> is an individual cluster that runs inference and serves requests. One control plane
    connects to workload planes in every cloud, so the clusters behave as one pool.
  </p>
</Signal>

<p>
  Chapter 0 introduced the two planes. This page extends the idea in two directions: how the work divides between the
  planes, and what each plane does when something fails. The split mirrors the Kubernetes split between a control
  plane and worker nodes, one level higher.
</p>
<div class="ie-table-wrap" role="region" aria-label="Control and Workload Planes table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Plane</th><th scope="col">Responsibilities</th><th scope="col">Information flow</th></tr>
  </thead>
  <tbody>
    <tr><td>Control plane</td><td>Model deployment and global scaling decisions</td><td>Receives real-time event streams from every workload plane</td></tr>
    <tr><td>Workload plane</td><td>Inference traffic and in-cluster scaling decisions</td><td>Reports utilization and demand to the control plane</td></tr>
  </tbody>
</table>
</div>
<Figure
  number="7.11"
  caption="A multi-cloud approach extends the idea of control and workload planes to a multi-cluster, multi-region system."
  description="Three cloud providers, labeled Cloud A, Cloud B, and Cloud C, each contain several workload planes. Cloud A and Cloud C hold three workload planes each, and Cloud B holds two. Every workload plane connects to a single global control plane in the center. The figure restates Chapter 0, Figure 0.3."
>
  <MultiCloudPlanes />
</Figure>

<h2>Failure Isolation</h2>
<p>
  The separation of responsibilities lets each workload plane serve traffic on its own. Each workload plane keeps
  autoscaling within its own cluster without asking the control plane. If the control plane fails, every workload
  plane keeps serving, and only new deployments and global rebalancing pause. If one workload plane fails, the other
  workload planes continue unaffected.
</p>
