<script module>
  export const pageConfig = { title: 'Quantizing Attention in Video Models' };
</script>

<h1>Quantizing Attention in Video Models</h1>

<p>
  After kernels and caching, quantization is the main tool for faster attention. Its purpose differs
  from LLM quantization.
</p>

<div class="table-wrap">
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

<p>
  <strong>Blockwise quantization with a microscaling format.</strong> Microscaling formats such as MXFP8
  scale small blocks of values separately. They preserve outlier values better, and outliers strongly
  affect attention accuracy. Both features are available on Hopper and Blackwell.
</p>

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
