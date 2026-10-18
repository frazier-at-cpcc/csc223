<script module>
  export const pageConfig = { title: 'Reading FLOPS on a Spec Sheet' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Reading FLOPS on a Spec Sheet</h1>

<p>
  <strong>FLOPS</strong> (floating-point operations per second) measures compute, typically on Tensor Cores.
  Datacenter GPUs deliver trillions or quadrillions of FLOPS, written as teraFLOPS and petaFLOPS.
</p>

<h2>Dense versus sparse FLOPS</h2>
<p>A GPU spec sheet usually lists two Tensor Core figures.</p>
<dl>
  <dt><strong>Dense</strong></dt>
  <dd>The raw floating-point operations per second when every element of the tensor is used.</dd>
  <dt><strong>Sparse</strong></dt>
  <dd>
    The rate for tensors with 2:4 structured sparsity. In this pattern, two of every four values are zero, so
    50 percent of the values are 0. Tensor Cores skip the multiplications by zero.
  </dd>
</dl>
<p>
  The sparse figure is often, but not always, double the dense figure at the same precision. Inference is
  dense by default. Read the FLOPS figure without sparsity.
</p>

<h2>Precision changes the number</h2>
<p>
  FLOPS generally double each time precision halves. A GPU that delivers 1 petaFLOPS on 16-bit numbers
  delivers about 2 petaFLOPS on 8-bit numbers.
</p>

<h3>Worked example</h3>
<p>Two spec sheets list the following figures:</p>
<ul>
  <li>GPU X: 2,000 teraFLOPS at FP8, dense.</li>
  <li>GPU Y: 2,000 teraFLOPS at FP8, sparse.</li>
</ul>
<p>
  The two numbers look equal, but they measure different things. GPU Y's dense FP8 rate is likely near
  1,000 teraFLOPS, so GPU X offers roughly twice the dense compute.
</p>

<Callout type="warning">
  <p>
    Compare FLOPS only at identical precision and identical sparsity. An FP8 figure beside an FP16 figure, or
    a sparse figure beside a dense one, overstates the difference between two GPUs by about a factor of two.
  </p>
</Callout>
