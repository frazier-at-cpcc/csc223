<script module>
  export const pageConfig = { title: 'Tooling as the Third Layer' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Tooling as the Third Layer</h1>

<p>
  Runtime and infrastructure capabilities are only useful when engineers can reach them. Once those capabilities exist,
  the <Term id="tooling-layer">tooling layer</Term> presents them at the appropriate level of abstraction.
</p>

<h2>Who Builds the Tooling</h2>

<p>Two kinds of teams face this design problem.</p>

<ul>
  <li>Inference providers, such as Baseten, build tooling for their customers.</li>
  <li>Internal teams that build inference for their own company build tooling for their colleagues.</li>
</ul>

<p>
  Both must decide what tooling and <dfn><strong>developer experience</strong></dfn> to provide. Developer experience is
  how engineers interact with the platform to deploy, configure, observe, and operate models. It is the critical third
  layer of a complete inference platform.
</p>
