<script module>
  export const pageConfig = { title: 'Control Plane and Workload Planes' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import MultiCloudDiagram from '../../../components/MultiCloudDiagram.svelte';
</script>

<h1>Control Plane and Workload Planes</h1>

<p>
  Serving inference at scale requires unifying capacity across multiple cloud service providers. Two components make that
  possible.
</p>

<dl>
  <dt><dfn><strong>Workload plane</strong></dfn></dt>
  <dd>An individual cluster with compute resources that runs model replicas and processes requests.</dd>
  <dt><dfn><strong>Control plane</strong></dfn></dt>
  <dd>A global orchestrator that decides where models are deployed and allocates resources across every workload plane.</dd>
</dl>

<h2>One Control Plane, Many Clouds</h2>

<MultiCloudDiagram />

<p>
  Figure 0.3 shows three clouds with unequal capacity. Cloud A runs four workload planes, Cloud B runs one, and Cloud C
  runs three. A single global control plane connects to all eight.
</p>

<p>
  Each cloud on its own would form a silo. The control plane sees every workload plane at once. It places each model
  wherever capacity exists, so the eight clusters behave as one pool of compute. Select the outage button in the figure to
  see the control plane move models away from a failed cloud.
</p>

<Signal kind="mistake" title="The control plane does not serve requests">
  <p>
    The control plane decides where models run. It does not run them, and requests do not pass through it. Workload planes
    run the replicas and process every request, and routing directs each request to a workload plane.
  </p>
</Signal>
