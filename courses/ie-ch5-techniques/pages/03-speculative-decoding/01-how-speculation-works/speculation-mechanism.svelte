<script module>
  export const pageConfig = { title: 'The Speculation Mechanism' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>The Speculation Mechanism</h1>

<p>
  Decode is autoregressive: it generates tokens one at a time. Its bottleneck is memory bandwidth. At low to
  moderate batch sizes, compute sits idle while the engine reads weights from memory.
</p>
<p>
  <strong>Speculative decoding</strong> is a family of strategies that use this spare compute to generate and
  validate draft tokens, producing multiple tokens per forward pass during decode. An engine that produces two,
  three, or more tokens for each round trip of the weights through memory generates far more tokens per second.
</p>

<h2>Three shared steps</h2>
<p>Every speculative decoding algorithm follows the same mechanism.</p>
<ol>
  <li>A speculator generates one or more <strong>draft tokens</strong>.</li>
  <li>
    The <strong>target model</strong>, which is the model you are accelerating, validates the draft tokens. It
    checks whether each one matches what it would have generated.
  </li>
  <li>The target model accepts the valid draft tokens and generates one more token itself, completing the forward pass.</li>
</ol>
<p>
  One forward pass therefore produces N + 1 tokens, where N is the number of accepted draft tokens. When the target
  model rejects every draft, the pass still produces the one token that ordinary decode would have produced.
</p>

<h2>Why validation is cheap</h2>
<p>
  Drafting tokens costs compute and memory. Validating a draft token is still much faster for the target model
  than generating a token from scratch. A sudoku puzzle offers a useful comparison: solving the puzzle is hard,
  while checking a finished solution is easy. Generating a token resembles solving the puzzle. Validating a draft
  token resembles checking the solution.
</p>

<Callout type="important">
  <p>
    Speculative decoding improves tokens per second (TPS) and inter-token latency (ITL). It does not improve time to
    first token (TTFT), because the first token comes from prefill.
  </p>
</Callout>
