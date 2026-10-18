<script module>
  export const pageConfig = { title: 'Nodes and Layers' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import NeuralNetworkDiagram from '../../../components/NeuralNetworkDiagram.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Nodes and Layers</h1>

<p>
  A productive inference engineer needs a basic intuition for neural networks. This lesson gives a
  high-level introduction. Appendix B of the book lists further reading.
</p>

<h2>The node</h2>

<p>
  The fundamental unit of a neural network is a <strong>node</strong>, also called a neuron. A node is
  a short program. It takes an input, multiplies it by <Term id="weights">weights</Term>, adds a bias, and
  returns the result. The weights and biases are the model's <Term id="parameter">parameters</Term>, the
  numbers that Chapter 0 counted when it sized weight memory.
</p>

<h2>The layer</h2>

<p>
  A group of nodes forms a <strong>layer</strong>. Nodes within a layer are independent of each other.
  Each one performs its own calculation. The connections, which are the "network" in a neural network,
  run between layers. The nodes in one layer receive the output of the previous layer.
</p>

<p>The neural networks behind <Term id="llm">LLMs</Term> contain dozens to hundreds of layers. Every layer is one of three types:</p>

<ul>
  <li><strong>Input layer:</strong> the first layer, which accepts and processes the input to the network.</li>
  <li><strong>Hidden layers:</strong> every layer between the first and the last. Hidden layers transform the input step by step toward an output.</li>
  <li><strong>Output layer:</strong> the final layer, which returns the network's prediction.</li>
</ul>

<Figure
  number="2.1"
  caption="Multi-layer neural networks have one input layer, many hidden layers, and one output layer."
  description="The diagram shows five columns of circles. The left column is the input layer with three nodes. The middle three columns are hidden layers with four nodes each. The right column is the output layer with three nodes. Lines connect every node in one column to every node in the next column, which shows that each layer reads the full output of the previous layer."
>
  <NeuralNetworkDiagram />
</Figure>

<h2>Hidden states</h2>

<p>
  Each layer produces an output that the next layer reads as input. The outputs of hidden layers are
  called <strong>hidden states</strong>.
</p>
