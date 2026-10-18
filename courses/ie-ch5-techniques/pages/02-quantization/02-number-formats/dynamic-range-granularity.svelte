<script module>
  export const pageConfig = { title: 'Granularity and Microscaling' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Granularity and Microscaling</h1>

<p>
  Several floating-point formats exist at each precision. <Term id="fp4" />, MXFP4, and <Term id="nvfp4" /> all use
  4 bits. They differ in granularity, which is the number of values quantized with one
  <Term id="scale-factor">scale factor</Term>.
</p>

<h2>Three levels of granularity</h2>
<p>
  A weight or activation <Term id="tensor">tensor</Term> is a grid of numbers. Each row of the grid is a <strong>feature
  vector</strong>, the values that describe one token or one output unit. A <strong>channel</strong> is one such
  vector treated as a unit for scaling. A scale factor can cover the whole tensor, one channel, or one block within
  a channel.
</p>
<table class="ie-table">
  <caption>Levels at which a scale factor can be computed</caption>
  <thead>
    <tr><th scope="col">Level</th><th scope="col">Scale factors computed</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Tensor</th><td>One scale factor for the entire weight or activation tensor</td></tr>
    <tr><th scope="row">Channel</th><td>One scale factor for each feature vector within the tensor</td></tr>
    <tr><th scope="row">Block</th><td>One scale factor for each block of N values within a feature vector</td></tr>
  </tbody>
</table>
<p>
  Finer granularity is less likely to smooth over outliers, so it preserves quality. Finer granularity also adds
  overhead, because the format must store and apply more scale factors.
</p>

<Signal kind="worked" title="One outlier under two granularities">
  <p>
    FP4 in the E2M1 layout represents only the magnitudes 0, 0.5, 1, 1.5, 2, 3, 4, and 6. A scale factor stretches
    that grid so the largest value in a group maps to 6.
  </p>
  <ol>
    <li>
      A tensor holds values between −1 and 1, plus one outlier of 60. With one scale for the whole tensor, the scale
      is 60 ÷ 6 = 10. A value of 0.3 becomes 0.3 ÷ 10 = 0.03, which rounds to 0. The value is lost.
    </li>
    <li>
      With blocks of 16 values, most blocks do not contain the outlier. In a block whose largest value is 1, the
      scale is 1 ÷ 6 ≈ 0.167. The value 0.3 becomes 0.3 ÷ 0.167 = 1.8, which rounds to 2, and 2 × 0.167 ≈ 0.33. The
      error is about 0.03.
    </li>
  </ol>
  <p>The outlier only coarsens the one block that holds it, so every other block keeps its small values.</p>
</Signal>

<h2>Microscaling formats</h2>
<p>
  <strong>Microscaling formats</strong> use block-level quantization with small blocks, each with its own scale
  factor. Blackwell GPUs introduced three of them.
</p>
<ul>
  <li>
    <Term id="mxfp8" /> and MXFP4 compute a power-of-two scale factor for every block of 32 values. The small
    blocks offset the lower dynamic range of these formats.
  </li>
  <li>
    NVFP4, an NVIDIA format, uses a block size of 16 with an FP8 scale factor for each block. It adds a 32-bit
    global scale factor for the whole tensor to further reduce the quality loss that 4-bit formats introduce.
  </li>
</ul>

<h2>The cost of microscaling</h2>
<p>
  Block scale factors occupy memory, which slightly reduces the performance gain from quantization. Inference must
  also apply both the tensor scale factor and the block scale factors, which adds compute. Blackwell GPUs offset
  this compute cost by applying scale factors inside the Tensor Cores. Hopper GPUs lack this hardware support, so
  they cannot run microscaling formats at full speed.
</p>
