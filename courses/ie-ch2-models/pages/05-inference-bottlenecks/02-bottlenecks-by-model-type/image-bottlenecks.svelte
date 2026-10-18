<script module>
  export const pageConfig = { title: 'Image and Video Generation Bottlenecks' };
</script>

<h1>Image and Video Generation Bottlenecks</h1>

<p>
  Image and video models are relatively small. They have about a tenth as many parameters as frontier
  language models. Their attention mechanism, however, is as computationally demanding as that of a large LLM.
</p>

<p>
  Image and video models use iterative denoising, not autoregressive token generation. Each denoising
  step considers the entire image or video at once, as represented in latent space. That workload
  resembles LLM prefill, which processes the entire input sequence at once.
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Why image generation resembles prefill rather than decode</caption>
    <thead>
      <tr><th scope="col">Property</th><th scope="col">LLM prefill</th><th scope="col">Image or video denoising step</th><th scope="col">LLM decode</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Data processed at once</th><td>The whole input sequence</td><td>The whole latent</td><td>One new token</td></tr>
      <tr><th scope="row">Arithmetic intensity</th><td>High</td><td>High</td><td>Low</td></tr>
      <tr><th scope="row">Bottleneck</th><td>Compute bound</td><td>Compute bound</td><td>Memory bound</td></tr>
    </tbody>
  </table>
</div>

<p>
  Like LLM prefill, image and video generation are bottlenecked on compute. Sections 6.5 and 6.6 of the
  book cover optimization techniques for these modalities.
</p>
