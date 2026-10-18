<script module>
  export const pageConfig = { title: 'Knowledge Check: The Image Generation Pipeline' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: The Image Generation Pipeline</h1>

<p>These questions are ungraded. Retry them as often as you like.</p>

<MultipleChoice
  id="kc_pipeline_1"
  question="Which component of an image generation pipeline converts the final latent into pixels?"
  options={['The denoising model', 'The text encoder', 'The variational autoencoder (VAE)']}
  correct={2}
  optionFeedback={[
    'Incorrect. The denoising model refines noise into a finished latent, but its output stays in latent space.',
    'Incorrect. The text encoder converts the prompt into conditioning for the denoiser. It does not produce pixels.',
    'Correct. The VAE decodes from latent space to pixel space at the end of the pipeline.',
  ]}
/>

<MultipleChoice
  id="kc_pipeline_2"
  question="A request asks an image model for 30 denoising steps with classifier-free guidance. How many forward passes through the denoising model does the request require?"
  options={['15', '30', '60']}
  correct={2}
  optionFeedback={[
    'Incorrect. Guidance doubles the work per step. It does not halve it.',
    'Incorrect. Each step runs two forward passes, one with the prompt and one without.',
    'Correct. 30 steps × 2 forward passes per step = 60 forward passes.',
  ]}
/>
