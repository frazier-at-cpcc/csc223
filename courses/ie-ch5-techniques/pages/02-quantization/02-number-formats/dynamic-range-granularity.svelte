<script module>
  export const pageConfig = { title: 'Granularity and Microscaling' };
</script>

<h1>Granularity and Microscaling</h1>

<p>
  Several floating-point formats exist at each precision. FP4, MXFP4, and NVFP4 all use 4 bits. They differ in
  granularity, which is the number of values quantized with one scale factor.
</p>

<h2>Three levels of granularity</h2>
<table class="ie-table">
  <caption>Levels at which a scale factor can be computed</caption>
  <thead>
    <tr><th scope="col">Level</th><th scope="col">Scale factors computed</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Tensor</th><td>One scale factor for the entire QKV tensor</td></tr>
    <tr><th scope="row">Channel</th><td>One scale factor for each feature vector within the tensor</td></tr>
    <tr><th scope="row">Block</th><td>One scale factor for each block of N values within a feature vector</td></tr>
  </tbody>
</table>
<p>
  Finer granularity is less likely to smooth over outliers, so it preserves quality. Finer granularity also adds
  overhead, because the format must store and apply more scale factors.
</p>

<h2>Microscaling formats</h2>
<p>
  <strong>Microscaling formats</strong> use block-level quantization with small blocks. Blackwell GPUs introduced
  two of them.
</p>
<ul>
  <li>MXFP8 and MXFP4 compute a scale factor for every block of 32 values. The small blocks offset the lower dynamic range of these formats.</li>
  <li>
    NVFP4, an NVIDIA format, uses a block size of 16. It adds a secondary 32-bit global scale factor to further
    reduce the quality loss that 4-bit formats introduce.
  </li>
</ul>

<h2>The cost of microscaling</h2>
<p>
  Block scale factors occupy memory, which slightly reduces the performance gain from quantization. Inference must
  also apply both the tensor scale factor and the block scale factors, which adds compute. Blackwell GPUs offset
  this compute cost by applying scale factors inside the Tensor Cores.
</p>
