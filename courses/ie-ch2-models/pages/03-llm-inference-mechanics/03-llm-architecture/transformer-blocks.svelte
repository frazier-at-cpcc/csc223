<script module>
  export const pageConfig = { title: 'Transformer Blocks' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import TransformerBlockDiagram from '../../../components/TransformerBlockDiagram.svelte';
</script>

<h1>Transformer Blocks</h1>

<p>The main body of an LLM is a neural network with three kinds of layers:</p>

<ul>
  <li><strong>Embedding layer:</strong> the input layer, which takes tokens and returns embeddings.</li>
  <li><strong>Transformer blocks:</strong> the hidden layers, a series of dozens to hundreds of blocks that generate the prediction.</li>
  <li><strong>Output layer:</strong> also called the language modeling head or <strong>LMHead</strong>. It converts the hidden states from the transformer blocks into a vector of logits, one per vocabulary token.</li>
</ul>

<h2>Inside a transformer block</h2>

<p>Each transformer block contains three kinds of sublayers:</p>

<ul>
  <li>Attention</li>
  <li>A feed-forward neural network</li>
  <li>Normalization</li>
</ul>

<Figure
  number="2.7"
  caption="Transformer block diagram, adapted from 'Attention Is All You Need' (Vaswani et al., 2017)."
  description="The original transformer has two stacks, each repeated N times. The encoder stack on the left takes input embeddings plus positional encoding. Each encoder block applies multi-head attention, then add and norm, then a feed-forward network, then add and norm. The decoder stack on the right takes output embeddings, shifted right, plus positional encoding. Each decoder block applies masked multi-head attention, add and norm, multi-head attention that also receives the encoder output, add and norm, a feed-forward network, and add and norm. The decoder output passes through a linear layer and a softmax to produce output probabilities."
>
  <TransformerBlockDiagram />
</Figure>

<p>
  The figure shows the original encoder-decoder transformer. Modern LLMs are decoder-only. They keep
  the right-hand stack, with masked attention, a feed-forward network, and normalization, and they omit
  the encoder and the sublayer that attends to the encoder's output. The linear layer and softmax at the
  top correspond to the LMHead and the normalization of logits.
</p>

<h2>Where the weights live</h2>

<ul>
  <li>The feed-forward network is a multi-layer perceptron built from linear sublayers. These sublayers hold the majority of an LLM's trainable weights.</li>
  <li>The attention sublayers are the second-largest component.</li>
  <li>Normalization and activation functions are a rounding error in the model's size.</li>
</ul>

<p>
  Linear sublayers hold the most weights, but attention is the more complex operation during inference.
  The next lesson examines attention in detail.
</p>
