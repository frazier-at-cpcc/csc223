<script module>
  export const pageConfig = { title: 'Knowledge Check: Few-Step and Video Generation' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Few-Step and Video Generation</h1>

<p>These questions are ungraded. Retry them as often as you like.</p>

<MultipleChoice
  id="kc_video_1"
  question="Early video models generated each frame from the previous frame. What problem caused these videos to degrade quickly?"
  options={['Error accumulation across frames', 'Fixed aspect ratios', 'Too few denoising steps per frame']}
  correct={0}
  optionFeedback={[
    'Correct. Small issues in early frames compounded in every later frame.',
    'Incorrect. Fixed sizes limit video length and shape, but they do not make quality degrade over time.',
    'Incorrect. Step count affects per-image quality. The framewise failure came from errors carried from frame to frame.',
  ]}
/>

<MultipleChoice
  id="kc_video_2"
  question="A product team must produce a high-quality marketing image and can wait up to a minute for the result. Which model type fits this request?"
  options={['A few-step distilled model', 'A latent consistency model', 'A standard diffusion model with 30 to 50 steps']}
  correct={2}
  optionFeedback={[
    'Incorrect. Few-step models trade noticeable quality for speed. This request values quality and tolerates latency.',
    'Incorrect. Latent consistency is a few-step method, so it gives up quality for speed.',
    'Correct. When quality matters more than latency, the full step count of a standard model is the better choice.',
  ]}
/>
