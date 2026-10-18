<script module>
  export const pageConfig = { title: 'Streaming Multiprocessors and Cores' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Streaming Multiprocessors and Cores</h1>

<p>
  On a CPU, a core is a complete processor. A high-end gaming PC might have an 8-core Intel i9, for example.
  On a GPU, the word core means something smaller.
</p>
<p>
  A GPU is built from <strong>Streaming Multiprocessors (SMs)</strong>. An SM is a GPU compute unit that
  contains cores and cache. Each SM contains several kinds of cores, and each kind handles a different shape
  of math.
</p>

<h2>Three types of GPU compute</h2>
<dl>
  <dt><strong>CUDA Core</strong></dt>
  <dd>A general-purpose arithmetic unit that operates on individual numbers, called scalars.</dd>
  <dt><strong>Tensor Core</strong></dt>
  <dd>
    A specialized unit that operates on vectors and matrices. Tensor Cores execute matrix multiply and
    accumulate (MMA) instructions.
  </dd>
  <dt><strong>Special Function Unit (SFU)</strong></dt>
  <dd>A dedicated unit that accelerates mathematical functions such as sin, cos, and log.</dd>
</dl>

<h2>Which compute matters for inference</h2>
<p>
  Measure GPU compute for inference in terms of Tensor Core compute. SFUs are essential for operations such as
  softmax, but Tensor Cores run the MMA instructions that make up most of the work in a forward pass. Tensor
  Cores are the most important type of compute for inference.
</p>

<Callout type="tip">
  <p>
    When a spec sheet lists several compute figures, look for the Tensor Core number. That figure predicts
    inference throughput far better than a CUDA Core count does.
  </p>
</Callout>
