<script module>
  export const pageConfig = { title: 'Pipeline Components' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Pipeline Components</h1>

<p>
  Image generation models take a text prompt and create an image from it. These models slightly predate
  the public rise of <Term id="llm">LLMs</Term>. Closed models from Midjourney and open Stable <Term id="diffusion">Diffusion</Term> models first appeared
  in the summer of 2022.
</p>

<h2>A pipeline, not a single model</h2>

<p>
  An LLM is one monolithic model. An image generation model is a pipeline of several models that work
  together. A <Term id="foundation-model">foundation model</Term> for image generation has three essential
  components:
</p>

<ul>
  <li><strong>Text encoder:</strong> converts the text prompt into instructions the image model can use.</li>
  <li><strong>Denoising model:</strong> the heart of the pipeline. It refines random noise into an image, guided by the prompt.</li>
  <li><strong>Variational autoencoder (VAE):</strong> converts the denoising model's output from <Term id="latent-space">latent space</Term> to pixel space.</li>
</ul>

<h2>Extending the pipeline</h2>

<p>The pipeline approach extends across the image model ecosystem. Beyond the base model, image inference often includes:</p>

<ul>
  <li><strong>LoRAs:</strong> lightweight <Term id="lora">low-rank adaptation</Term> fine-tunes that change style or enhance quality.</li>
  <li><strong>ControlNets:</strong> auxiliary networks that condition generation on a control image, such as an edge map, a depth map, or a body pose. The control image is the input, and the ControlNet steers the output to match its broad shapes.</li>
</ul>

<p>
  The open-source ecosystem around image models is large. Tools such as ComfyUI let users assemble
  complex pipelines from foundation models and adaptations, and swap components to produce unique
  outputs. An inference engineer serving image models must therefore support a pipeline of components,
  not a single set of <Term id="weights">weights</Term>.
</p>
