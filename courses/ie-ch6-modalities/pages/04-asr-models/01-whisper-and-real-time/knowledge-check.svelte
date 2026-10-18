<script module>
  export const pageConfig = { title: 'Knowledge Check: Whisper and Real-Time Transcription' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Whisper and Real-Time Transcription</h1>

<p>
  This check is ungraded. Both items practice objective 6 from the real-time side: compare real-time
  and long-file speech recognition pipelines. The next lesson adds the long-file side.
</p>

<MultipleChoice
  id="kc_asr_rt_stream"
  question="A dictation app already runs Whisper on an optimized TensorRT-LLM engine. Users wait for each recording to finish before any text appears. Which change gives the largest improvement in their experience?"
  options={[
    'Quantize the Whisper decoder to a lower precision',
    'Stream audio and text over a WebSocket with VAD chunking',
    'Switch from Whisper large-v3 to a much smaller Whisper variant',
  ]}
  correct={1}
  optionFeedback={[
    'Runtime gains are small once TensorRT-LLM is in place, and quantization does not remove the wait for a finished recording.',
    'Correct. Streaming at the API server layer, with VAD segmenting the stream into chunks, transcribes speech while the user is still talking.',
    'A smaller model trims little time and costs quality. The wait comes from processing only finished recordings.',
  ]}
/>

<MultipleChoice
  id="kc_asr_rt_prefix"
  question="A voice agent's streaming ASR sends each chunk of a conversation to whichever GPU is free. Transcripts now contain more errors at chunk boundaries than before. Which change restores quality?"
  options={[
    'Lengthen each VAD chunk to 60 seconds so fewer boundaries occur',
    'Raise the decoding temperature for every chunk in the stream',
    "Route each stream's chunks to one GPU and reuse the previous transcript",
  ]}
  correct={2}
  optionFeedback={[
    'Whisper accepts at most 30 seconds per chunk, and longer chunks would also delay the live transcript.',
    'A higher temperature adds randomness to every chunk. It does not give the model the words that came before the boundary, which is the context the errors point to.',
    'Correct. Real-time transcription is sequential, so the previous chunk is finished before the next begins. Keeping a stream on one GPU lets its transcript serve as the prefix for the next chunk.',
  ]}
/>
