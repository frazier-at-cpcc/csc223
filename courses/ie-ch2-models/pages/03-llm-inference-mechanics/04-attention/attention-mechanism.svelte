<script module>
  export const pageConfig = { title: 'The Attention Mechanism' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import AttentionEquation from '../../../components/AttentionEquation.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>The Attention Mechanism</h1>

<p>
  <strong>Attention</strong> is the mechanism a <Term id="transformer">transformer</Term> uses to relate a <Term id="token">token</Term> to the other tokens in
  its sequence. People interpret the relationships between words without effort. Attention gives <Term id="llm">LLMs</Term>
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

<p>
  Attention takes three inputs. Each one is a learned linear projection of a token's
  <Term id="hidden-state">hidden state</Term>, computed at every layer.
</p>

<ul>
  <li><strong>Q (query):</strong> the projection of the token being processed. It encodes what that token looks for in other tokens.</li>
  <li><strong>K (keys):</strong> one projection per token in the context. Each key encodes what its token offers to a matching query. In self-attention the keys include the current token.</li>
  <li><strong>V (values):</strong> a second projection per token in the context. Each value carries the content that its token contributes once attention selects it.</li>
</ul>

<p>
  Read the equation from the inside out. Multiplying Q by the transpose of K scores how strongly the current
  token relates to each token in the context. Dividing by the square root of d<sub>k</sub> keeps those scores
  in a stable range. <Term id="softmax">Softmax</Term> turns the scores into <Term id="weights">weights</Term> that sum to one.
  Multiplying by V blends the values according to those weights. The result is the attention output for the
  current token.
</p>

<Signal kind="mistake" title="Values are inputs, not results">
  <p>
    Values are not attention results. A value is a projection of a token's hidden state, computed before any
    scores exist. The attention output is the weighted blend of values that the equation produces. The <Term id="kv-cache">KV cache</Term>
    stores keys and values, never attention outputs.
  </p>
</Signal>

<h2>Multi-head attention</h2>

<p>
  Attention sublayers in models are <strong>multi-head</strong>. Each head is one attention operation,
  and the heads run in parallel on the same sublayer. Each head can specialize in a different kind of
  relationship between tokens, such as subject-verb agreement or co-reference resolution.
</p>
