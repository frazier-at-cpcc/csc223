<script module>
  export const pageConfig = { title: 'Knowledge Check: Speech Synthesis' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Speech Synthesis</h1>

<p>This check is ungraded. Use it to confirm your understanding before you continue.</p>

<MultipleChoice
  id="kc_tts_1"
  question="A TTS deployment uses Orpheus with TensorRT-LLM, but end-to-end latency spikes under load. Profiling shows the spike occurs after token generation, while audio tokens are converted into waveforms. Which component should the team tune?"
  options={[
    'The audio decoder, with compilation and short-timeout dynamic batching',
    'The LLM backbone, with in-flight batching',
    'The voice activity detection model, with a shorter segment length',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The audio decoder converts tokens to waveforms. It should be compiled for the target GPU and use dynamic batching with a short timeout, such as 15 ms.',
    'The backbone already uses TensorRT-LLM and in-flight batching, and the spike occurs after token generation.',
    'VAD segments incoming audio for ASR. A TTS pipeline converts text to audio and does not depend on VAD for this step.',
  ]}
/>
