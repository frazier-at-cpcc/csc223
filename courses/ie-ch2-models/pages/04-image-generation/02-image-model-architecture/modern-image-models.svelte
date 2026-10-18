<script module>
  export const pageConfig = { title: 'Modern Image Models' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Modern Image Models</h1>

<p>
  Modern models substantially outperform SDXL. They offer better prompt adherence, accurate faces and hands,
  legible text rendering, and support for image-to-image inference. Models such as the Qwen Image family keep a
  pipeline similar to SDXL, but every component is larger and more capable.
</p>

<div class="ie-table-wrap" role="region" aria-label="SDXL compared with Qwen Image" use:scrollable>
  <table class="ie-table">
    <caption>SDXL compared with Qwen Image</caption>
    <thead>
      <tr><th scope="col">Component</th><th scope="col">SDXL (2023)</th><th scope="col">Qwen Image (2025)</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Text encoder</th><td>Two CLIP text encoders, small models trained to match images with captions</td><td>Qwen 2.5 VL, a 7-billion-<Term id="parameter">parameter</Term> <Term id="vlm">vision language model</Term></td></tr>
      <tr><th scope="row">Denoiser</th><td>U-Net, under 4 billion parameters</td><td>Diffusion transformer, 20 billion parameters</td></tr>
      <tr><th scope="row">VAE</th><td>Single encoding</td><td>Dual encoding</td></tr>
    </tbody>
  </table>
</div>

<h2>Where the new capability comes from</h2>

<ul>
  <li>Legible text and photorealistic faces come from replacing small text encoders with full <Term id="llm">LLMs</Term>.</li>
  <li>Denoisers grew about fivefold in parameter count and moved from U-Nets to diffusion transformers.</li>
  <li>Pipelines became more complex.</li>
</ul>

<p>
  Larger models take more resources to run. <Term id="gpu">GPUs</Term> have grown more powerful alongside the models, but inference
  engineers cannot rely on hardware gains alone to run these models efficiently.
</p>

<h2>LLM-style image generation</h2>

<p>
  Recent research blends diffusion transformer architecture with LLM architecture. Anything that can be
  tokenized can be modeled as an LLM, so an image can be generated as a sequence of image tokens. As of early
  2026, models such as HunyuanImage-3.0 use this LLM-style architecture.
</p>

<div class="ie-table-wrap" role="region" aria-label="Per-image work for a diffusion model and an LLM-style image model" use:scrollable>
  <table class="ie-table">
    <caption>Per-image work for a diffusion model and an LLM-style image model</caption>
    <thead>
      <tr><th scope="col">Property</th><th scope="col">Diffusion model</th><th scope="col">LLM-style model</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row"><Term id="forward-pass">Forward passes</Term> per image</th><td>2 × steps with guidance, often 60 to 100</td><td>One per image token, often several thousand</td></tr>
      <tr><th scope="row">Work in each pass</th><td>The whole latent, thousands of patch tokens at once</td><td>One new image token, like LLM <Term id="decode">decode</Term></td></tr>
      <tr><th scope="row">Output size</th><td>Fixed by the requested resolution</td><td>Variable, because generation is autoregressive</td></tr>
      <tr><th scope="row">Serving stack</th><td>A separate image pipeline</td><td>Reuses LLM inference engines and their optimizations</td></tr>
    </tbody>
  </table>
</div>

<p>
  Neither design is cheaper by default. The diffusion model runs few passes that are each expensive. The
  LLM-style model runs many passes that are each cheap. The real advantages of the LLM-style design are variable
  output size and reuse of mature LLM serving infrastructure. Other architectures accelerate image creation or
  extend image models to video, as the next lesson describes.
</p>
