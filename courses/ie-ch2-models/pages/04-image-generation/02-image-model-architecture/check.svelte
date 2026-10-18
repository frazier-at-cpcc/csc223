<script module>
  export const pageConfig = { title: 'Knowledge Check: Image Generation Model Architecture' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Image Generation Model Architecture</h1>

<p>
  These questions are ungraded. The first sorts image denoisers by architecture, which prepares the selection decisions of objective 7. The
  second practices objective 7, selecting an image model under cost constraints. Retry them as often as you
  like.
</p>

<Sorting
  id="kc_imgarch_1"
  question="Sort each image model by the architecture of its denoiser."
  items={['FLUX.1', 'Qwen Image', 'SDXL', 'Stable Diffusion 1.5', 'Stable Diffusion 3']}
  targets={['Diffusion transformer', 'U-Net with attention layers']}
  correct={[0, 0, 1, 1, 0]}
  correctFeedback="The Stable Diffusion releases through SDXL used U-Net denoisers. Stable Diffusion 3, FLUX, and Qwen Image use diffusion transformers."
  incorrectFeedback="SDXL and the earlier Stable Diffusion 1.5 use U-Net denoisers. Stable Diffusion 3, FLUX.1, and Qwen Image split the latent into patch tokens and denoise them with a diffusion transformer."
/>

<MultipleChoice
  id="kc_imgarch_2"
  question="An LLM-style model generates an image as 4,096 image tokens. A diffusion model generates the same image in 30 guided steps over a latent of 4,096 patch tokens. Which statement compares their forward passes correctly?"
  options={[
    'The diffusion model runs 60 passes over all 4,096 patch tokens. The LLM-style model runs 4,096 passes over one new token each.',
    'The diffusion model runs 30 passes over one patch token each. The LLM-style model runs one pass over all 4,096 tokens.',
    'Both models run 4,096 passes, one for each token of the image.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Guidance doubles the 30 steps to 60 passes, and each pass processes the whole latent. The LLM-style model needs one decode pass per image token, so it runs many cheap passes instead of a few expensive ones.',
    'Incorrect. A diffusion step updates the entire latent at once, and guidance runs two passes per step. Autoregressive generation produces one token per pass, not all tokens in one pass.',
    'Incorrect. A diffusion model runs a pass per step, not per token. Only the LLM-style model runs one pass per image token.',
  ]}
/>
