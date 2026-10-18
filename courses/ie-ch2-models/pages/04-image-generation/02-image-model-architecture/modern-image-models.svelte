<script module>
  export const pageConfig = { title: 'Modern Image Models' };
</script>

<h1>Modern Image Models</h1>

<p>
  Modern models substantially outperform SDXL. They offer better prompt adherence, accurate faces and
  hands, legible text rendering, and support for image-to-image inference. Models such as the Qwen Image
  family keep a pipeline similar to SDXL, but every component is larger and more capable.
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>SDXL compared with Qwen Image</caption>
    <thead>
      <tr><th scope="col">Component</th><th scope="col">SDXL (2023)</th><th scope="col">Qwen Image (2025)</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Text encoder</th><td>CLIP-based model</td><td>Qwen 2.5 VL (7B)</td></tr>
      <tr><th scope="row">Denoiser</th><td>Fewer than 4B parameters</td><td>20B parameters</td></tr>
      <tr><th scope="row">VAE</th><td>Single encoding</td><td>Dual encoding</td></tr>
    </tbody>
  </table>
</div>

<h2>Where the new capability comes from</h2>

<ul>
  <li>Legible text and photorealistic faces come from replacing small text encoders with full LLMs.</li>
  <li>Denoisers grew by a factor of five in parameter count.</li>
  <li>Pipelines became more complex.</li>
</ul>

<p>
  Larger models take more resources to run. GPUs have grown more powerful alongside the models, but
  inference engineers cannot rely on hardware gains alone to run these models efficiently.
</p>

<h2>LLM-style image generation</h2>

<p>
  The latest research blends diffusion transformer architecture with LLM architecture. Anything that can
  be tokenized can be modeled as an LLM. LLMs already understand text, and they are already a component
  of image pipelines as text encoders.
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Limits of diffusion models that an LLM-style design addresses</caption>
    <thead>
      <tr><th scope="col">Property</th><th scope="col">Diffusion model</th><th scope="col">LLM-style model</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Output size</th><td>Fixed</td><td>Variable, because generation is autoregressive</td></tr>
      <tr><th scope="row">Work per output unit</th><td>Up to 100 forward passes per image</td><td>One forward pass per token</td></tr>
    </tbody>
  </table>
</div>

<p>Models such as HunyuanImage-3.0 use this LLM-style architecture. Other existing architectures accelerate image creation or extend image models to video, as the next lesson describes.</p>
