<script module>
  export const pageConfig = { title: 'Pipeline Components' };
</script>

<h1>Pipeline Components</h1>

<p>
  Image generation models take a text prompt and create an image from it. These models slightly predate
  the public rise of LLMs. Closed models from Midjourney and open Stable Diffusion models first appeared
  in the summer of 2022.
</p>

<h2>A pipeline, not a single model</h2>

<p>
  An LLM is one monolithic model. An image generation model is a pipeline of several models that work
  together. A foundation model for image generation has three essential components:
</p>

<ul>
  <li><strong>Text encoder:</strong> converts the text prompt into instructions the image model can use.</li>
  <li><strong>Denoising model:</strong> the heart of the pipeline. It refines random noise into an image, guided by the prompt.</li>
  <li><strong>Variational autoencoder (VAE):</strong> converts the denoising model's output from latent space to pixel space.</li>
</ul>

<h2>Extending the pipeline</h2>

<p>The pipeline approach extends across the image model ecosystem. Beyond the base model, image inference often includes:</p>

<ul>
  <li><strong>LoRAs:</strong> lightweight fine-tunes that change style or enhance quality.</li>
  <li><strong>ControlNets:</strong> outlines and edges that steer the output toward broad shapes and colors.</li>
</ul>

<p>
  The open-source ecosystem around image models is large. Tools such as ComfyUI let users assemble
  complex pipelines from foundation models and adaptations, and swap components to produce unique
  outputs. An inference engineer serving image models must therefore support a pipeline of components,
  not a single set of weights.
</p>
