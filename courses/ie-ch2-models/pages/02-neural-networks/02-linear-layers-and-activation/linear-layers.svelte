<script module>
  export const pageConfig = { title: 'Linear Layers and Matmul' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
</script>

<h1>Linear Layers and Matmul</h1>

<p>
  The most essential operation in a neural network is matrix multiplication, called
  <strong>matmul</strong>. A matmul takes an input vector, which is a list of numbers, and a matrix,
  which is a grid of numbers. It multiplies the vector through the matrix to produce an output vector.
</p>

<p>
  A <strong>linear layer</strong> is the simplest form of matmul in a neural network. Given an input
  vector, the linear layer applies a weights matrix and adds a bias vector.
</p>

<Figure
  number="2.2"
  caption="In a matmul, the output vector y is the product of an input vector x and a weights matrix W, plus a bias vector b."
>
  <pre><code>y = xW + b</code></pre>
</Figure>

<h2>Worked example</h2>

<p>Take an input vector with two values and a layer that produces two outputs.</p>

<pre><code>x = [2, 1]

W = [[1, 3],
     [0, 2]]

b = [1, -4]

xW     = [2*1 + 1*0,  2*3 + 1*2] = [2, 8]
y      = xW + b                  = [3, 4]</code></pre>

<p>
  Each output value is a weighted sum of every input value plus a bias. A real LLM layer performs the
  same arithmetic with vectors of thousands of values.
</p>

<h2>Where the weights come from</h2>

<p>
  The weights of one linear layer are a small part of a generative AI model's total weights. Training
  sets every individual value in each weights matrix. Inference uses those values unchanged.
</p>
