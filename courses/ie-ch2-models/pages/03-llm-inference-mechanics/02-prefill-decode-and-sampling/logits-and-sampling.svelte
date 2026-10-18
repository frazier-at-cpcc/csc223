<script module>
  export const pageConfig = { title: 'Logits and Token Sampling' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import LogitsDiagram from '../../../components/LogitsDiagram.svelte';
</script>

<h1>Logits and Token Sampling</h1>

<p>
  Each forward pass in the decode phase must produce a token. Neural networks output vectors, not
  tokens, so a few extra steps turn the output into a token.
</p>

<h2>Logits</h2>

<p>
  The output layer of an LLM generates a vector of <strong>logits</strong>: non-normalized scores, one
  for each token in the model's vocabulary. The length of the logit vector therefore equals the
  vocabulary size. After normalization, the logits become probabilities that each vocabulary token is
  the correct next token.
</p>

<Figure
  number="2.6"
  caption="A decode pass generates a logit for each token in the model's vocabulary, then normalizes the logits to percentages."
  description="Three stages run from left to right. The first stage lists vocabulary tokens with their logits: A .0001, Ab .0004, Abr .0001, Abs .6987, Ace .0020, Acr .0001, Act .0983, and so on through Zym .0001 and ZZZ .0007. The second stage shows the normalized predictions, with Abs at 80 percent and Act at 12 percent. The third stage shows the selected next token, Abs. The values are illustrative."
>
  <LogitsDiagram />
</Figure>

<h2>Sampling the next token</h2>

<p>
  The engine selects the output token with a weighted random draw over the normalized probabilities.
  Three inference arguments adjust that draw:
</p>

<ul>
  <li><strong>Temperature:</strong> scales the logits before normalization. Lower values make output more deterministic. Higher values increase diversity.</li>
  <li><strong>Top-k:</strong> keeps only the k most likely tokens after normalization, then re-normalizes among them.</li>
  <li><strong>Top-p:</strong> keeps the smallest set of most likely tokens whose probabilities add up to p.</li>
</ul>

<p>
  Lower temperature, top-k, or top-p values make output more predictable, because the model can choose
  only from highly likely tokens. Setting temperature to 0 or top-k to 1 makes selection deterministic.
  The model then always selects the highest-probability token.
</p>

<h3>Applying top-k and top-p to the figure</h3>

<p>Use the predictions from Figure 2.6, where Abs has 80 percent and Act has 12 percent.</p>

<ul>
  <li>With top-k = 1, only Abs remains. The draw always returns Abs.</li>
  <li>With top-p = 0.9, Abs alone reaches only 0.80. Adding Act brings the total to 0.92, so both remain and are re-normalized.</li>
</ul>

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
