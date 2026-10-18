<script module>
  export const pageConfig = { title: 'Transformer Blocks' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import TransformerBlockDiagram from '../../../components/TransformerBlockDiagram.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Transformer Blocks</h1>

<p>The main body of a decoder-only LLM is a neural network with three kinds of layers:</p>

<ul>
  <li><strong>Embedding layer:</strong> the input layer. It looks up one vector for each token ID, called the token's embedding.</li>
  <li><strong>Transformer blocks:</strong> the hidden layers. Dozens to more than a hundred identical blocks run in sequence and refine each token's <Term id="hidden-state">hidden state</Term>.</li>
  <li><strong>Output layer:</strong> also called the language modeling head or <strong>LMHead</strong>. It is a linear layer that converts the final hidden state into a vector of <Term id="logits">logits</Term>, one per vocabulary token.</li>
</ul>

<h2>Inside a transformer block</h2>

<p>Each <Term id="transformer-block">transformer block</Term> contains three kinds of sublayers:</p>

<ul>
  <li><strong>Attention:</strong> relates each token to the tokens before it. The next lesson covers it.</li>
  <li><strong>Feed-forward network:</strong> two or three linear layers with an <Term id="activation-function">activation function</Term> between them, applied to each token on its own.</li>
  <li><strong>Normalization:</strong> rescales each hidden state to a stable range so that values neither explode nor vanish across many blocks. Current LLMs use a <Term id="normalization-layer">normalization layer</Term> variant called RMSNorm.</li>
</ul>

<Figure
  number="2.7"
  caption="A decoder-only transformer with pre-normalization, the layout of current LLMs such as Llama and Qwen. Weight shares are for a dense Llama-style model."
  description="The diagram reads from bottom to top. Token IDs enter the embedding layer. A transformer block, outlined and repeated N times, follows. Inside the block, the hidden state first passes through a normalization sublayer (RMSNorm) and then masked self-attention, which holds about 20 percent of the block's weights. A residual connection carries the block's input around these two sublayers to an add node. The sum passes through a second normalization sublayer and then the feed-forward network, which applies a linear layer, a SiLU activation, and a second linear layer and holds about 80 percent of the block's weights. A second residual connection adds the input of this half to its output. After the last block, a final normalization and the LMHead, a linear layer, produce one logit per vocabulary token."
>
  <TransformerBlockDiagram />
</Figure>

<p>
  Two details distinguish this layout from the original 2017 transformer, which paired an encoder stack with a
  decoder stack. Current LLMs keep only the decoder, and they drop its sublayer that attended to an encoder.
  They also normalize the input of each sublayer, which is called pre-normalization. A residual connection
  then adds the sublayer's output back to its input, which keeps deep stacks stable during training.
</p>

<h2>Where the weights live</h2>

<ul>
  <li>The feed-forward networks hold the majority of an LLM's trainable <Term id="weights">weights</Term>, about 80 percent of each block in a dense Llama-style model.</li>
  <li>The attention sublayers hold most of the rest, about 20 percent of each block.</li>
  <li>The embedding layer and the LMHead add one large matrix each. Normalization adds a negligible number of weights.</li>
</ul>

<Signal kind="mistake" title="Two meanings of normalization">
  <p>
    The normalization sublayer rescales hidden states inside every block. It is a different operation from
    <Term id="softmax">softmax</Term>, which turns the final logits into probabilities. This course calls the logit step softmax and
    reserves normalization for the sublayer.
  </p>
</Signal>

<p>
  Linear sublayers hold the most weights, but attention is the more complex operation during inference. The
  next lesson examines attention in detail.
</p>
