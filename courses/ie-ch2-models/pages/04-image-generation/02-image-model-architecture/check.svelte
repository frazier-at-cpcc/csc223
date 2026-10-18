<script module>
  export const pageConfig = { title: 'Knowledge Check: Image Generation Model Architecture' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Image Generation Model Architecture</h1>

<p>These questions are ungraded. Retry them as often as you like.</p>

<MultipleChoice
  id="kc_imgarch_1"
  question="In the SDXL pipeline, which model takes pure noise and produces a coherent image latent?"
  options={['The base model', 'The refiner model', 'The VAE decoder']}
  correct={0}
  optionFeedback={[
    'Correct. The base model is trained to go from pure noise to a coherent image.',
    'Incorrect. The refiner starts from the base model output and adds detail and prompt adherence.',
    'Incorrect. The VAE decoder converts a finished latent into pixels. It does not denoise.',
  ]}
/>

<MultipleChoice
  id="kc_imgarch_2"
  question="Compared with SDXL, which change gives Qwen Image its ability to render legible text?"
  options={['A dual-encoding VAE', 'A full LLM as the text encoder', 'More denoising steps per image']}
  correct={1}
  optionFeedback={[
    'Incorrect. The dual-encoding VAE is a real change, but the chapter credits text rendering to the text encoder.',
    'Correct. Switching from a small CLIP-based encoder to a full LLM, Qwen 2.5 VL, brings legible text and realistic faces.',
    'Incorrect. Modern models use a similar number of steps. The capability comes from larger component models.',
  ]}
/>
