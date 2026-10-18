<script module>
  export const pageConfig = { title: 'Knowledge Check: Whisper and Real-Time Transcription' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Whisper and Real-Time Transcription</h1>

<p>This check is ungraded. Use it to confirm your understanding before you continue.</p>

<MultipleChoice
  id="kc_asr_rt_1"
  question="A dictation app already runs Whisper on an optimized TensorRT-LLM engine. Users wait for each recording to finish before any text appears. Which change gives the largest improvement in their experience?"
  options={[
    'Quantize the Whisper decoder to a lower precision',
    'Stream audio and text over a WebSocket with VAD chunking',
    'Switch from Whisper 3 Large to a much smaller Whisper variant',
  ]}
  correct={1}
  optionFeedback={[
    'Runtime gains are small once TensorRT-LLM is in place, and quantization does not remove the wait for a finished recording.',
    'Correct. Streaming at the API server layer, with VAD segmenting the stream into chunks, transcribes speech while the user is still talking.',
    'A smaller model trims little time and costs quality. The wait comes from processing only finished recordings.',
  ]}
/>
