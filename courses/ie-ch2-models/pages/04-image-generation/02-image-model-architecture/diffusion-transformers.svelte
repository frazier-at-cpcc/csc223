<script module>
  export const pageConfig = { title: 'Diffusion Transformers and SDXL' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import SdxlPipeline from '../../../components/SdxlPipeline.svelte';
</script>

<h1>Diffusion Transformers and SDXL</h1>

<h2>Diffusion transformers</h2>

<p>
  Image generation models are built on <strong>diffusion transformers</strong>. A diffusion transformer
  is very similar to the transformer an LLM uses. The difference is its input. An LLM transformer
  processes embeddings of discrete tokens. A diffusion transformer processes image data.
</p>

<p>
  Diffusion transformers look at images in patches. During training of a text-to-image model, training
  images enter the model as overlapping patches of 2 × 2 or 4 × 4 pixels, which are embedded into latent
  space. Inference runs in the opposite direction. The finished latent is transformed back into pixels.
</p>

<h2>The SDXL pipeline</h2>

<p>
  Stable Diffusion XL (SDXL) is a clean example of an image pipeline with a text encoder, denoising
  models, and a VAE. SDXL is an older model, but its architecture remains relevant.
</p>

<Figure
  number="2.11"
  caption="SDXL architecture pipeline, adapted from 'SDXL: Improving Latent Diffusion Models for High-Resolution Image Synthesis' (Podell et al., 2023)."
  description="The pipeline runs in seven stages. A 128 by 128 noise latent and the encoded prompt enter the base model. The base model produces an unrefined 128 by 128 latent. The refiner model, also conditioned on the prompt, produces a refined 128 by 128 latent. The VAE decoder converts the refined latent into a final image of 1024 by 1024 pixels."
>
  <SdxlPipeline />
</Figure>

<p>SDXL contains two diffusion models for denoising, each trained for a separate task:</p>

<ul>
  <li><strong>Base model:</strong> goes from pure noise to a coherent image.</li>
  <li><strong>Refiner model:</strong> adds detail and improves prompt adherence.</li>
</ul>
