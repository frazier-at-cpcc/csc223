<script module>
  export const pageConfig = { title: 'Sparsity and Experts' };
</script>

<h1>Sparsity and Experts</h1>

<h2>Dense and sparse networks</h2>

<p>
  The <strong>density</strong> of a neural network is set by the number of connections between its
  layers. Denser networks retain more information. Sparser networks need less compute and memory to run.
</p>

<h2>Mixture of Experts</h2>

<p>
  <strong>Mixture of Experts (MoE)</strong> is an architecture optimization that adds sparsity to linear
  layers. An MoE model replaces a single giant weights matrix with hundreds of smaller matrices called
  <strong>experts</strong>. A small model inside the LLM, called the <strong>router</strong>, sends each
  input to a few of those experts. Selecting experts for an input is called activating them.
</p>

<h2>Total and active parameters</h2>

<p>
  An MoE model has two parameter counts. Total parameters include every expert. Active parameters
  include only the experts the router selects, plus the shared components such as attention.
</p>

<p>
  The name Qwen3-235B-A22B states both counts. The model has 235 billion total parameters and activates
  22 billion of them, about 9 percent, for each token.
</p>

<p>
  Because so few parameters are active, MoE models are highly efficient for single-request local
  inference. Each token needs only a fraction of the compute that a dense model of the same total size
  would need.
</p>
