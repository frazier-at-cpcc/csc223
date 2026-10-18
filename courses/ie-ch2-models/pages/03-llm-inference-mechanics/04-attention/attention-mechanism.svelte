<script module>
  export const pageConfig = { title: 'The Attention Mechanism' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import AttentionEquation from '../../../components/AttentionEquation.svelte';
</script>

<h1>The Attention Mechanism</h1>

<p>
  <strong>Attention</strong> is the mechanism transformers use to relate a token to the other tokens in
  its sequence. People interpret the relationships between words without effort. Attention gives LLMs
  the same capability.
</p>

<p>
  Consider the sentence "I decided to write a book because I thought it would be easy, but it was
  actually hard." Attention lets the model determine that "it" refers to writing a book.
</p>

<h2>Scaled dot-product attention</h2>

<p>The standard form of attention is scaled dot-product attention.</p>

<Figure
  number="2.8"
  caption="The attention equation, adapted from 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness' (Dao et al., 2022)."
  description="Attention of Q, K, and V equals softmax of Q multiplied by K transpose, divided by the square root of d sub k, and the result multiplied by V. Here d sub k is the dimension of the key vectors."
>
  <AttentionEquation />
</Figure>

<p>Attention takes three inputs:</p>

<ul>
  <li><strong>Q (queries):</strong> the embedded representation of the token being generated or updated.</li>
  <li><strong>K (keys):</strong> representations of all prior tokens.</li>
  <li><strong>V (values):</strong> the attention values computed for all prior tokens.</li>
</ul>

<p>
  Read the equation from the inside out. Multiplying Q by the transpose of K scores how strongly the
  current token relates to each prior token. Dividing by the square root of d<sub>k</sub> keeps those
  scores in a stable range. Softmax turns the scores into weights that sum to one. Multiplying by V
  blends the prior tokens' values according to those weights.
</p>

<h2>Multi-head attention</h2>

<p>
  Attention sublayers in models are <strong>multi-head</strong>. Each head is one attention operation,
  and the heads run in parallel on the same sublayer. Each head can specialize in a different kind of
  relationship between tokens, such as subject-verb agreement or co-reference resolution.
</p>
