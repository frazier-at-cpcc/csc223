<script module>
  export const pageConfig = { title: 'Why Multi-Cloud' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Why Multi-Cloud</h1>

<Signal kind="recall" chapter={0}>
  <p>
    Chapter 0 described three levels of infrastructure scale. <Term id="autoscaling">Autoscaling</Term> inside one cluster comes first. Past a few
    hundred GPUs, capacity becomes the problem, and spreading across regions and clouds creates silos that cannot lend
    each other GPUs. The last level treats every cluster as one unified pool of compute.
  </p>
</Signal>

<p>
  This lesson extends that picture with the mechanism behind the unified pool and the benefits it delivers.
  High-volume deployments that serve a global user base need thousands of GPUs distributed around the world, and no
  single cluster provides that.
</p>

<h2>Global Scheduling Across Silos</h2>
<p>
  <strong>Multi-cloud capacity management</strong> is a global scheduler that places workloads across providers and
  regions. True multi-cloud inference requires a multi-region, multi-provider <Term id="bin-packing">bin packing</Term> tool, which
  places workloads so that as little capacity as possible sits unused and treats distinct pools of compute as
  interchangeable. Like <Term id="kubernetes" /> inside one cluster, this layer takes a global view. It enables global scheduling and
  self-healing, which means replacing failed capacity automatically without an engineer moving workloads by hand.
</p>

<h2>Benefits of Multi-Cloud</h2>
<div class="ie-table-wrap" role="region" aria-label="Benefits of Multi-Cloud table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Benefit</th><th scope="col">How multi-cloud delivers it</th></tr>
  </thead>
  <tbody>
    <tr><td>Capacity</td><td>Pools GPUs from several providers for greater and more flexible access</td></tr>
    <tr><td>Redundancy</td><td>Splits inference across providers so that one provider outage does not stop service</td></tr>
    <tr><td>Latency</td><td>Runs inference close to end users to reduce network latency</td></tr>
    <tr><td>Compliance</td><td>Runs inference where legal requirements on data location allow</td></tr>
  </tbody>
</table>
</div>
<p>
  Chapter 1 defined <Term id="data-sovereignty">data sovereignty</Term> as the legal requirements that control where
  model inputs and outputs may be processed and stored. A <strong>data residency</strong> rule is one such requirement,
  stated for a named country or region, such as a rule that patient data stays inside Canada. The Reliability,
  Security, and Compliance lesson applies residency rules to cluster placement.
</p>
