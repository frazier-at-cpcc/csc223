<script module>
  export const pageConfig = { title: 'Level 2: Capacity and Silos' };
</script>

<h1>Level 2: Capacity and Silos</h1>

<p>
  Past a certain scale, generally a few hundred GPUs, capacity defines infrastructure problems. The question shifts from
  when to add replicas to where to find enough GPUs at all.
</p>

<h2>Spreading out</h2>

<p>
  To get access to enough GPUs, inference engineers spread workloads across multiple regions and multiple cloud
  providers.
</p>

<h2>The silo problem</h2>

<p>
  Spreading out quickly leads to silos. A <dfn><strong>silo</strong></dfn> is a cluster whose capacity serves only its
  own workloads. Models in one cluster can starve for resources while another cluster sits on unused capacity.
</p>

<p>
  For example, a model in one region may queue requests at peak hours. At the same moment, GPUs in another cloud may sit
  idle. Neither cluster can lend capacity to the other.
</p>
