<script module>
  export const pageConfig = { title: 'Knowledge Check: Modalities and Archetypes' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Modalities and Archetypes</h1>

<p>This check is ungraded. Use it to confirm your understanding before you continue.</p>

<MultipleChoice
  id="kc_overview_1"
  question="A team adds a model that accepts a recorded voice clip and returns a written transcript. Which category and archetype describe this model?"
  options={[
    'Speech synthesis, built on autoregressive token generation',
    'Speech synthesis, built on iterative denoising',
    'Transcription, built on autoregressive token generation',
    'Transcription, built on iterative denoising',
  ]}
  correct={2}
  optionFeedback={[
    'Speech synthesis runs the other direction: it takes text in and produces audio out.',
    'Speech synthesis takes text in and produces audio, and modern TTS models are autoregressive, not denoisers.',
    'Correct. Audio in and text out is transcription, and ASR models such as Whisper use a transformer decoder that generates tokens autoregressively.',
    'The input and output match transcription, but ASR models generate text tokens autoregressively rather than by refining noise.',
  ]}
/>
