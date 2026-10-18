<script module>
  export const pageConfig = { title: 'Sparsity and Experts' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Sparsity and Experts</h1>

<h2>Dense and sparse networks</h2>

<p>
  A dense network uses every weight for every <Term id="token">token</Term>. A sparse network uses only part of its <Term id="weights">weights</Term> for each
  token. <Term id="sparsity">Sparsity</Term> cuts the compute per token, but the unused weights still exist and
  still occupy memory.
</p>

<h2>Mixture of Experts</h2>

<p>
  <strong>Mixture of Experts (MoE)</strong> is an architecture that adds sparsity to the feed-forward
  sublayers. An MoE model replaces a single giant feed-forward network with many smaller networks called
  <strong>experts</strong>. A small network inside each MoE layer, called the <strong>router</strong>, sends
  each token to a few of those experts. Selecting experts for a token is called activating them.
</p>

<h2>Total and active parameters</h2>

<p>
  An MoE model has two <Term id="parameter">parameter</Term> counts. Total parameters include every expert. <Term
    id="active-parameters">Active parameters</Term> include only the experts the router selects for one token,
  plus the shared components such as <Term id="attention">attention</Term>.
</p>

<p>
  The name Qwen3-235B-A22B states both counts. The model has 235 billion total parameters and activates 22
  billion of them, about 9 percent, for each token.
</p>

<ul>
  <li>Compute per token follows the active count. Each token needs only a fraction of the arithmetic that a dense model of the same total size would need.</li>
  <li>Memory follows the total count. The router can choose any expert for the next token, so all 235 billion parameters must sit in <Term id="gpu">GPU</Term> memory, even for a single request on a local machine.</li>
</ul>
