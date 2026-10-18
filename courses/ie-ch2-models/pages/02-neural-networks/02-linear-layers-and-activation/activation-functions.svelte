<script module>
  export const pageConfig = { title: 'Activation Functions' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import ReluChart from '../../../components/ReluChart.svelte';
</script>

<h1>Activation Functions</h1>

<h2>Why stacked linear layers collapse</h2>

<p>
  Matrix multiplication is composable. Multiplying a vector by two matrices in turn gives the same
  result as multiplying the vector by the product of those two matrices.
</p>

<Figure
  number="2.3"
  caption="Two matmul equations representing separate layers collapse due to the composition of linearity."
  description="The listing defines two linear layers, y equals x W1 plus b1 and z equals y W2 plus b2. It multiplies the weights matrices together to form W3 equals W1 times W2. It then expresses both layers as one operation, z equals x W3 plus b3."
>
  <pre><code># Given the equation for two linear layers
y = xW1 + b1
z = yW2 + b2

# Multiply the weights matrices together
W3 = W1*W2

# And collapse the layers into a single operation
z = xW3 + b3</code></pre>
</Figure>

<p>
  This property is a problem for deep networks. A series of linear layers collapses into a single
  layer, no matter how many layers the series contains. Deep networks are useful because additional
  layers use more parameters effectively and encode more meaning in hidden states. A collapsed stack
  loses that benefit.
</p>

<h2>Breaking linearity</h2>

<p>
  Neural networks keep layers separate by placing an <strong>activation function</strong> between them.
  An activation function has two required properties:
</p>

<ul>
  <li>It is non-linear, which prevents composable matmuls from collapsing the layers.</li>
  <li>It is differentiable or mostly differentiable, which supports back-propagation during training.</li>
</ul>

<p>
  One of the most basic activation functions in inference is <strong>ReLU</strong>, the Rectified Linear
  Unit. ReLU returns x when x is greater than zero and returns zero otherwise.
</p>

<Figure
  number="2.4"
  caption="Activation functions like ReLU break linearity in multi-layer neural networks."
  description="A line chart plots the input x from negative 10 to 10 on the horizontal axis and the output ReLU of x from 0 to 10 on the vertical axis. The line is flat at zero for every negative input. At zero it bends and rises at a 45-degree angle, so the output equals the input for every positive value. The chart is labeled ReLU of x equals max of 0 and x."
>
  <ReluChart />
</Figure>

<h2>Other activation functions</h2>

<p>
  Dozens of activation functions exist, including SiLU, Swish, and SwiGLU. Swish takes its name from
  its resemblance to the Nike logo. Most follow the same general pattern as ReLU. They map negative
  values to zero or near zero and keep positive values unchanged.
</p>

<p>These functions share three practical qualities:</p>

<ul>
  <li>They are fast to run.</li>
  <li>They are easy to train on, because they have a gradient for most input values.</li>
  <li>They break linearity, which makes multi-layer networks possible.</li>
</ul>
