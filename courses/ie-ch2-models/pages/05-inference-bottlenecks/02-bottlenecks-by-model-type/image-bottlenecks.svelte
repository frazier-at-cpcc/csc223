<script module>
  export const pageConfig = { title: 'Image and Video Generation Bottlenecks' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Image and Video Generation Bottlenecks</h1>

<p>
  Image and video models are relatively small. They have about a tenth as many <Term id="parameter">parameters</Term> as frontier
  language models. Their attention mechanism, however, is as computationally demanding as that of a large LLM.
</p>

<p>
  Image and video models use iterative denoising, not <Term id="autoregressive-generation">autoregressive
  generation</Term>. Each denoising
  step considers the entire image or video at once, as represented in <Term id="latent-space">latent space</Term>. That workload
  resembles LLM prefill, which processes the entire input sequence at once.
</p>

<div class="ie-table-wrap" role="region" aria-label="Why image generation resembles prefill rather than decode" use:scrollable>
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
  Like LLM prefill, image and video generation are bottlenecked on compute. A 128 × 128 latent cut into 2 × 2
  patches gives 4,096 patch tokens per pass, so each denoising step resembles a 4,096-token prefill. Chapter 6
  covers optimization techniques for these modalities.
</p>
