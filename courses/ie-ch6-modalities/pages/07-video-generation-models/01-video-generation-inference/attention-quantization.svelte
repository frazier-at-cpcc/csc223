<script module>
  export const pageConfig = { title: 'Quantizing Attention in Video Models' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Quantizing Attention in Video Models</h1>

<p>
  After kernels and caching, <Term id="quantization">quantization</Term> is the main tool for faster
  attention. Its purpose differs from LLM quantization.
</p>

<div class="table-wrap" role="region" aria-label="Quantization goals for language models and video models" use:scrollable>
  <table>
    <caption>Quantization goals for language models and video models</caption>
    <thead>
      <tr><th scope="col">Aspect</th><th scope="col">Language model</th><th scope="col">Video model</th></tr>
    </thead>
    <tbody>
      <tr><td>Bottleneck</td><td>Memory bandwidth</td><td>Compute</td></tr>
      <tr><td>Benefit of quantization</td><td>Less data to load through memory</td><td>Twice the FLOPS from lower-precision Tensor Cores</td></tr>
      <tr><td>Main target</td><td>Weights in large linear layers</td><td>Attention</td></tr>
    </tbody>
  </table>
</div>

<p>
  Quantizing weights still helps video models. The linear layers consume most of the memory bandwidth,
  but they account for only a small fraction of compute time in a video model. Attention is where the
  compute goes.
</p>

<h2>The risk of quantizing attention</h2>

<p>
  Attention is the riskiest part of any model to quantize, because errors accumulate over the course of
  inference. A video model runs about 50 steps rather than the thousands of autoregressive iterations in
  token generation. The risk is somewhat lower as a result, but it still matters.
</p>

<h2>Reducing quality loss</h2>

<Signal kind="recall" chapter={5} title="Granularity and microscaling">
  <p>
    Chapter 5 showed that finer-grained scale factors protect <Term id="outlier">outlier</Term> values,
    and that block-level formats compute one scale factor for each small block of values. Recall which
    GPU generation first supported the microscaling formats in hardware.
  </p>
</Signal>

<p>
  <strong>Blockwise quantization.</strong> Scaling small blocks of values separately preserves outlier
  values better than one scale for a whole tensor, and outliers strongly affect attention accuracy.
  Blockwise FP8 quantization with scale factors managed in software runs on Hopper. The
  <Term id="mxfp8">MXFP8</Term> microscaling format, which scales blocks of 32 values in hardware,
  requires Blackwell.
</p>

<Signal kind="mistake" title="MXFP8 on Hopper">
  <p>
    The book states that both blockwise quantization and MXFP8 are available on Hopper and Blackwell.
    Only the first half holds. Hopper Tensor Cores have no native MX block-scaled formats, which
    Blackwell introduced. On Hopper, use blockwise FP8 with software scale factors instead.
  </p>
</Signal>

<p>
  <strong>Selective quantization.</strong> The most sophisticated approach quantizes only the less
  sensitive parts of the model.
</p>
<ul>
  <li>
    <strong>By step:</strong> keep the early steps in FP16 and quantize the later steps. Early steps set
    the outline of the video and drive prompt adherence, the same insight behind guidance truncation in
    image generation.
  </li>
  <li>
    <strong>By layer:</strong> keep the first and last layers at full precision and quantize the hidden
    layers. The first and last layers take the input and produce the output. Hidden layers perform
    intermediate calculations that tolerate approximation better.
  </li>
</ul>
<p>
  Kernels such as SageAttention package these tactics. SageAttention is an 8-bit attention kernel for
  quality low-precision attention in video generation models.
</p>
