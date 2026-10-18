<script module>
  export const pageConfig = { title: 'Diffusion Transformers and SDXL' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import SdxlPipeline from '../../../components/SdxlPipeline.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Diffusion Transformers and SDXL</h1>

<h2>Diffusion transformers</h2>

<p>
  Modern image models such as FLUX and Qwen Image build their <Term id="denoising-model">denoising model</Term>
  from a <strong>diffusion transformer</strong>, abbreviated DiT. A diffusion transformer is very similar to the
  <Term id="transformer">transformer</Term> an <Term id="llm">LLM</Term> uses. The difference is its input. An LLM transformer
  processes embeddings of discrete <Term id="token">tokens</Term>. A diffusion transformer processes patches of an image latent.
</p>

<h2>Patches</h2>

<p>
  The <Term id="vae">VAE</Term> encodes an image into a latent. The diffusion transformer splits that latent into
  small, non-overlapping patches, commonly 2 × 2 latent positions each, and treats every patch as one token.
  Patching works the same way in training and in inference. After the final denoising step, the VAE decoder
  converts the finished latent back into pixels.
</p>

<pre><code>Latent:        128 × 128 positions
Patch size:      2 ×   2 positions
Patch tokens:   64 ×  64 = 4,096 tokens per denoising pass</code></pre>

<h2>The SDXL pipeline</h2>

<p>
  <Term id="sdxl">Stable Diffusion XL (SDXL)</Term>, released in 2023, is a clean example of an image pipeline
  with a <Term id="text-encoder">text encoder</Term>, denoising models, and a VAE. SDXL is older than the
  diffusion transformer generation, but its pipeline structure remains relevant.
</p>

<Signal kind="mistake" title="SDXL is not a diffusion transformer">
  <p>
    The SDXL denoiser is a U-Net, a convolutional network with <Term id="attention">attention</Term> layers. FLUX, Qwen Image, and Stable
    Diffusion 3 replaced the U-Net with a diffusion transformer. SDXL appears here for its pipeline, not its
    denoiser architecture.
  </p>
</Signal>

<Figure
  number="2.11"
  caption="SDXL architecture pipeline, adapted from 'SDXL: Improving Latent Diffusion Models for High-Resolution Image Synthesis' (Podell et al., 2023)."
  description="The pipeline runs in seven stages. A 128 by 128 noise latent and the encoded prompt enter the base model. The base model produces an unrefined 128 by 128 latent. The refiner model, also conditioned on the prompt, produces a refined 128 by 128 latent. The VAE decoder converts the refined latent into a final image of 1024 by 1024 pixels."
>
  <SdxlPipeline />
</Figure>

<p>SDXL contains two U-Net denoisers, each trained for a separate task:</p>

<ul>
  <li><strong>Base model:</strong> goes from pure noise to a coherent image.</li>
  <li><strong>Refiner model:</strong> adds detail and improves prompt adherence.</li>
</ul>
