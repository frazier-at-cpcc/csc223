<script module>
  export const pageConfig = { title: 'Knowledge Check: The Image Generation Pipeline' };
</script>

<script>
  import { Matching } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: The Image Generation Pipeline</h1>

<p>
  These questions are ungraded and practice objective 6, calculating the denoiser forward passes of an image
  generation request. Retry them as often as you like.
</p>

<Matching
  id="kc_pipeline_1"
  question="Match each pipeline component to its job."
  pairs={[
    { left: 'Text encoder', right: 'Turns the prompt into conditioning for the denoiser' },
    { left: 'Denoising model', right: 'Refines a noisy latent toward an image, one step at a time' },
    { left: 'VAE decoder', right: 'Converts the finished latent into pixels' },
    { left: 'ControlNet', right: 'Conditions generation on a control image such as an edge map' },
  ]}
  correctFeedback="Only the denoising model runs once or twice per step. The text encoder runs once per request, and the VAE decoder runs once at the end."
  incorrectFeedback="The text encoder prepares the prompt, the denoising model does the step-by-step work in latent space, the VAE decoder produces pixels at the end, and a ControlNet adds conditioning from a control image."
/>

<NumericQuestion
  id="kc_pipeline_2"
  question="A pipeline runs 25 base-model steps and then 10 refiner steps. Guidance is enabled in both stages. How many denoiser forward passes does one image require?"
  answer={70}
  unit="passes"
  correctFeedback="Base: 25 × 2 = 50. Refiner: 10 × 2 = 20. Total: 70 forward passes."
  incorrectFeedback="Count each denoiser separately and double each guided stage. Base: 25 × 2 = 50. Refiner: 10 × 2 = 20. Total: 50 + 20 = 70."
/>

<NumericQuestion
  id="kc_pipeline_3"
  question="One request asks a guidance-distilled model for 3 images at 16 steps each. Guidance is disabled. How many denoiser forward passes does the request require in total?"
  answer={48}
  unit="passes"
  correctFeedback="Without guidance each step runs one pass: 16 × 1 = 16 per image, and 3 images need 48."
  incorrectFeedback="A guidance-distilled model runs one pass per step, so each image needs 16 passes. Three images need 3 × 16 = 48. Doubling would apply only with guidance enabled."
/>
