<script module>
  export const pageConfig = { title: 'Knowledge Check: Speech Synthesis' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Speech Synthesis</h1>

<p>
  This check is ungraded. All three items practice objective 7: evaluate a text-to-speech deployment
  against latency and real-time stream-capacity targets.
</p>

<MultipleChoice
  id="kc_tts_evaluate"
  question="A voice agent must start speaking quickly after the user stops talking. Configuration X measures 150 ms TTFB and 2.4 s time to first sentence. Configuration Y measures 300 ms TTFB and 0.9 s time to first sentence. Both keep every stream above the real-time threshold. Which configuration better serves the voice agent?"
  options={[
    'Configuration X, because TTFB is the metric closest to what the listener hears',
    'Configuration Y, because the listener hears a meaningful sentence sooner',
    'Either one, because both stay above the real-time threshold once audio starts',
  ]}
  correct={1}
  optionFeedback={[
    'TTFB marks the first byte of audio, which is too short to carry meaning. Time to first sentence tracks the experience more closely, and X makes the user wait 2.4 seconds for it.',
    'Correct. A listener cannot use the first byte of audio. Y delivers a meaningful sentence 1.5 seconds sooner, which matters more for a conversational agent than X\'s faster first byte.',
    'Staying above the threshold prevents gaps after speech starts. It does not make the two starts equal, and here the starts differ by 1.5 seconds.',
  ]}
/>

<NumericQuestion
  id="kc_tts_streams"
  question="A TTS model needs 80 audio tokens per second for real-time speech. At full batch, one GPU produces 3,700 audio tokens per second across all streams. How many real-time streams can the GPU sustain?"
  answer={46}
  unit="streams"
  correctFeedback="3,700 ÷ 80 = 46.25, which rounds down to 46 real-time streams."
  incorrectFeedback="Divide aggregate GPU throughput by the real-time threshold, then round down: 3,700 ÷ 80 = 46.25, so 46 streams."
/>

<MultipleChoice
  id="kc_tts_decoder"
  question="A TTS deployment uses Orpheus with TensorRT-LLM, but end-to-end latency spikes under load. Profiling shows the spike occurs after token generation, while audio tokens are converted into waveforms. Which component should the team tune?"
  options={[
    'The audio decoder, by compiling it and using dynamic batching',
    'The LLM backbone, by enabling in-flight batching for its decode loop',
    'The voice activity detection model, by shortening its speech segments',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The audio decoder converts tokens to waveforms. It should be compiled for the target GPU and use dynamic batching with a short timeout, such as 15 ms.',
    'The backbone already runs on TensorRT-LLM with in-flight batching, and the spike occurs after token generation, in the conversion step.',
    'VAD segments incoming audio for speech recognition. A TTS pipeline converts text to audio and does not run VAD in the conversion step.',
  ]}
/>
