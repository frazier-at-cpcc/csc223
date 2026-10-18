<script module>
  export const pageConfig = { title: 'Streaming Multiprocessors and Cores' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Streaming Multiprocessors and Cores</h1>

<p>
  On a CPU, a core is a complete processor. A desktop CPU typically has 8 to 24 cores. On a GPU, the word core
  means something smaller.
</p>
<p>
  A GPU is built from <strong>Streaming Multiprocessors (SMs)</strong>. An SM is a GPU compute unit that
  contains cores and cache. An NVIDIA <Term id="h100">H100</Term> in the <Term id="sxm">SXM</Term> form factor has 132 SMs. Each SM contains several kinds of cores, and each kind
  handles a different shape of math.
</p>

<h2>Three types of GPU compute</h2>
<dl>
  <dt><strong>CUDA Core</strong></dt>
  <dd>
    A general-purpose arithmetic unit that operates on individual numbers, called scalars. The name comes from
    <Term id="cuda" />, NVIDIA's platform for programming GPUs, which Chapter 4 covers.
  </dd>
  <dt><strong>Tensor Core</strong></dt>
  <dd>
    A specialized unit that operates on vectors and matrices. Tensor Cores execute matrix multiply and
    accumulate (MMA) instructions.
  </dd>
  <dt><strong>Special Function Unit (SFU)</strong></dt>
  <dd>A dedicated unit that accelerates mathematical functions such as exponentials, sin, cos, and log.</dd>
</dl>

<h2>Which compute matters for inference</h2>
<p>
  Measure GPU compute for inference in terms of Tensor Core compute. SFUs are essential for operations such as
  <Term id="softmax">softmax</Term>, which relies on the exponential function. Tensor Cores run the MMA instructions that
  make up most of the work in a <Term id="forward-pass">forward pass</Term>. Tensor Cores are therefore the most important type
  of compute for inference.
</p>

<Signal kind="mistake" title="Counting CUDA Cores">
  <p>
    A larger CUDA Core count does not mean faster inference. CUDA Cores handle scalar work such as indexing and
    elementwise operations. The matrix multiplications that dominate a forward pass run on Tensor Cores, so a
    GPU with more CUDA Cores but the same Tensor Core <Term id="throughput">throughput</Term> serves a model at about the same speed.
  </p>
</Signal>

<Callout type="tip">
  <p>
    When a spec sheet lists several compute figures, look for the Tensor Core number. That figure predicts
    inference throughput far better than a CUDA Core count does.
  </p>
</Callout>
