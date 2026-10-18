<script module>
  export const pageConfig = { title: 'Control Plane and Workload Planes' };
</script>

<script>
  import MultiCloudDiagram from '../../../components/MultiCloudDiagram.svelte';
</script>

<h1>Control Plane and Workload Planes</h1>

<p>Serving inference at scale requires unifying capacity across multiple cloud service providers. Two components make that possible.</p>

<dl>
  <dt><dfn><strong>Workload plane</strong></dfn></dt>
  <dd>An individual cluster with compute resources that runs inference and processes requests.</dd>
  <dt><dfn><strong>Control plane</strong></dfn></dt>
  <dd>A global orchestrator that deploys models and allocates resources across every workload plane.</dd>
</dl>

<h2>One control plane, many clouds</h2>

<MultiCloudDiagram />

<p>
  Figure 0.3 shows three clouds with unequal capacity. Cloud A runs four workload planes, Cloud B runs one, and Cloud C
  runs three. A single global control plane connects to all eight.
</p>

<p>
  Each cloud on its own would form a silo. The control plane sees every workload plane at once. It places each model
  wherever capacity exists, so the eight clusters behave as one pool of compute.
</p>
