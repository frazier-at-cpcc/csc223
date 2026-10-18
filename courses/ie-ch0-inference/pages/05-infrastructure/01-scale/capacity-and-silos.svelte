<script module>
  export const pageConfig = { title: 'Level 2: Capacity and Silos' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Level 2: Capacity and Silos</h1>

<p>
  Past a certain scale, capacity defines infrastructure problems. The book places that threshold at a few hundred
  <Term id="gpu">GPUs</Term>, a rule of thumb from its January 2026 cutoff. The question shifts from when to add
  <Term id="replica">replicas</Term> to where to find enough GPUs at all.
</p>

<h2>Spreading Across Regions and Clouds</h2>

<p>
  To get access to enough GPUs, inference engineers spread workloads across multiple regions and multiple cloud
  providers.
</p>

<h2>The Silo Problem</h2>

<p>
  Spreading out quickly leads to silos. A <dfn><strong>silo</strong></dfn> is a cluster whose capacity serves only its
  own workloads. Models in one cluster can starve for resources while another cluster sits on unused capacity.
</p>

<p>
  For example, a model in one region may queue requests at peak hours. At the same moment, GPUs in another cloud may sit
  idle. Neither cluster can lend capacity to the other.
</p>

<p>Chapter 7 covers how teams buy and manage capacity across providers.</p>
