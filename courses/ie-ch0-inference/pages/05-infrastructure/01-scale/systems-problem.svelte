<script module>
  export const pageConfig = { title: 'A Systems Problem' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>A Systems Problem</h1>

<p>
  Runtime optimizations are not enough on their own. A single <Term id="replica">replica</Term> has a ceiling, however well it is
  tuned. Sooner or later it receives more traffic than it can handle.
</p>

<h2>Beyond the Single Instance</h2>

<p>
  This limit is not a CUDA problem or a PyTorch problem. No kernel or inference engine removes it. It is a systems
  problem, and the <Term id="infrastructure-layer">infrastructure layer</Term> solves it.
</p>

<p>
  The nature of infrastructure problems changes with each level of scale. The next three pages follow that progression.
</p>

<ol>
  <li>Autoscaling</li>
  <li>Capacity</li>
  <li>A unified pool of compute</li>
</ol>
