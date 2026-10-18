<script module>
  export const pageConfig = { title: 'Logits and Token Sampling' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import LogitsDiagram from '../../../components/LogitsDiagram.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Logits and Token Sampling</h1>

<p>
  The prefill pass and every decode pass end the same way. Neural networks output vectors, not tokens, so a
  few extra steps turn the output into a token.
</p>

<h2>Logits</h2>

<p>
  The output layer of an LLM generates a vector of <strong>logits</strong>: non-normalized scores, one
  for each token in the model's vocabulary. The length of the logit vector therefore equals the
  vocabulary size. The <Term id="softmax">softmax</Term> function then turns the logits into probabilities
  that sum to one, the probability that each vocabulary token comes next.
</p>

<Figure
  number="2.6"
  caption="A forward pass generates a raw logit for each token in the model's vocabulary, and softmax converts the logits to probabilities."
  description="Three stages run from left to right. The first stage lists vocabulary tokens with their raw logits: A −1.5, Ab 0.4, Abr −2.1, Abs 9.2, Ace 2.6, Acr −0.8, Act 7.3, and so on through Zym −3.0 and ZZZ 1.1. The second stage applies softmax, which gives Abs 80 percent, Act 12 percent, and all other tokens the remaining 8 percent. The third stage shows the selected next token, Abs. The values are illustrative."
>
  <LogitsDiagram />
</Figure>

<h2>Sampling the next token</h2>

<p>
  The engine selects the output token with a weighted random draw over the probabilities. This step is
  called <Term id="sampling">sampling</Term>. Three inference arguments adjust the draw:
</p>

<ul>
  <li><strong>Temperature:</strong> divides the logits before softmax. Values below 1 sharpen the distribution toward the top token. Values above 1 flatten it and increase diversity.</li>
  <li><strong>Top-k:</strong> keeps only the k most likely tokens, then re-normalizes their probabilities to sum to one.</li>
  <li><strong>Top-p:</strong> keeps the smallest set of most likely tokens whose probabilities add up to p.</li>
</ul>

<p>
  Lower temperature, top-k, or top-p values make output more predictable, because the model can choose
  only from highly likely tokens. Dividing by a temperature of 0 is undefined, so engines treat temperature 0
  as greedy selection: the engine always picks the highest-probability token. Top-k = 1 has the same effect.
  <Term id="batching">Batched</Term> serving can still vary the output slightly from run to run, because floating-point arithmetic in
  different batch shapes rounds differently.
</p>

<Signal kind="worked" title="Applying top-k and top-p to Figure 2.6">
  <p>Use the probabilities from Figure 2.6, where Abs has 80 percent and Act has 12 percent.</p>
  <ul>
    <li>With top-k = 1, only Abs remains. The draw always returns Abs.</li>
    <li>With top-p = 0.9, Abs alone reaches only 0.80. Adding Act brings the total to 0.92, which reaches 0.9, so the candidates are Abs and Act.</li>
    <li>Re-normalizing those two gives Abs 0.80 / 0.92 ≈ 87 percent and Act 0.12 / 0.92 ≈ 13 percent.</li>
  </ul>
</Signal>

<h2>Structured output</h2>

<p>
  <strong>Structured output</strong> is output that conforms to a schema, such as JSON. Tools such as
  <strong>logit biasing</strong> constrain the token probabilities after each forward pass so that the
  output matches the schema. These tools support important abilities such as tool use. A correct
  implementation is essential for high-quality inference.
</p>

<h2>Stopping</h2>

<p>
  Logit generation and token selection repeat until the model generates the <strong>stop token</strong>,
  a special token that marks the end of the output sequence. Generation also ends earlier if the
  request reaches the context window or the <code>max_tokens</code> limit.
</p>
