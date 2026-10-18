<script module>
  export const pageConfig = { title: 'Knowledge Check: Few-Step and Video Generation' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Few-Step and Video Generation</h1>

<p>
  These questions are ungraded and practice objective 7, selecting an image or video generation model for a
  workload. Retry them as often as you like.
</p>

<Sorting
  id="kc_video_1"
  question="Sort each workload into the model type that fits it best."
  items={[
    'Book cover art with a legible title, due next week',
    'A style filter applied to each frame of a live video call',
    'A five-second product clip with consistent camera motion',
    'Thumbnail previews that update while a user types a prompt',
    'A print advertisement where fine detail matters more than speed',
  ]}
  targets={['Standard image model', 'Few-step image model', 'Video generation model']}
  correct={[0, 1, 2, 1, 0]}
  correctFeedback="Quality-first images use the full step count. Interactive and real-time work uses a few-step model. Coherent motion across frames needs a video model that denoises the whole clip."
  incorrectFeedback="Ask which constraint dominates. A loose deadline and a quality bar point to a standard model. A tight latency budget points to a few-step model. A clip with consistent motion needs a video model, because framewise image generation accumulates errors."
/>

<NumericQuestion
  id="kc_video_2"
  question="A standard model runs 40 steps with guidance. A guidance-distilled few-step model runs 4 steps with guidance disabled. How many times as many denoiser forward passes does the standard model run?"
  answer={20}
  unit="times"
  correctFeedback="Standard: 40 × 2 = 80 passes. Few-step: 4 × 1 = 4 passes. 80 / 4 = 20 times as many."
  incorrectFeedback="Count passes before comparing. The standard model runs 40 × 2 = 80 passes. The guidance-distilled model runs 4 × 1 = 4 passes. The ratio is 80 / 4 = 20. Comparing steps alone gives 10, which misses the guidance passes."
/>

<MultipleChoice
  id="kc_video_3"
  question="A product team must produce a high-quality marketing image and can wait up to a minute for the result. Which model type fits this request?"
  options={['A latent consistency model', 'A standard diffusion model with 30 to 50 steps', 'A step-distilled model with 4 steps']}
  correct={1}
  optionFeedback={[
    'Incorrect. Latent consistency is a few-step method, so it gives up quality for speed that this request does not need.',
    'Correct. When quality matters more than latency, the full step count of a standard model is the better choice.',
    'Incorrect. A step-distilled model trades noticeable quality for speed. This request values quality and tolerates latency.',
  ]}
/>
