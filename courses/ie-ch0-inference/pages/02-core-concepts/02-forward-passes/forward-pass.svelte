<script module>
  export const pageConfig = { title: 'The Forward Pass' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>The Forward Pass</h1>

<p>
  A <dfn><strong>forward pass</strong></dfn> is one run of input through every <Term id="layer">layer</Term> of a model to produce
  output. During a forward pass, the GPU reads the <Term id="weights">weights</Term> from memory and multiplies them against numbers
  that represent the input <Term id="token">tokens</Term>.
</p>

<h2>One Output Token per Pass</h2>

<p>
  An LLM writes its response one token at a time. Each new token depends on every token before it, so the model cannot
  compute the fifth output token until the fourth exists. This pattern is called
  <Term id="autoregressive-generation">autoregressive generation</Term>.
</p>

<p>
  Each forward pass therefore produces one output token. A 500-token response needs 500 forward passes, and they run one
  after another. No amount of hardware lets the model skip ahead to token 500.
</p>

<h2>What Each Pass Costs</h2>

<p>
  For a typical dense model, every forward pass reads every weight from GPU memory. A model with 16 GB of weights moves
  those 16 GB through the GPU for each output token. Generating 500 tokens moves the weights 500 times.
</p>

<p>
  This repeated read is the central cost of serving an LLM. Several techniques later in this chapter exist to share it
  across requests or to get more than one token from it. Chapter 2 traces the arithmetic inside a forward pass.
</p>
