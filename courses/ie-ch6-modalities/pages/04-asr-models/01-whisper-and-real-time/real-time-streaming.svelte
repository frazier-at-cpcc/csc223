<script module>
  export const pageConfig = { title: 'Real-Time Transcription' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Real-Time Transcription</h1>

<p>
  Dictation apps and voice agents need real-time transcription. For live Whisper, measure the
  round-trip time for transcribing a single chunk of audio. A strong target is 200 milliseconds, which
  is about the average human reaction time.
</p>
<p>
  With Whisper on an optimized TensorRT-LLM engine, little runtime work remains. Most real-time gains
  come from orchestration and infrastructure instead.
</p>

<h2>Streaming</h2>

<p>
  Streaming is the largest product upgrade for ASR. Streaming lives in the API server layer, not the
  model runtime. The client opens a <Term id="websocket">WebSocket</Term> connection, sends audio
  continuously, and receives text continuously. The product transcribes speech as it happens instead of
  waiting for a finished recording. Chapter 7 covers WebSockets in detail.
</p>

<h2>Voice activity detection</h2>

<p>
  The ASR runtime itself does not change for streaming. Instead, a <strong>voice activity detection
  (VAD)</strong> model monitors the incoming stream and segments it into discrete chunks of speech.
</p>
<ol>
  <li>Audio streams in over the WebSocket.</li>
  <li>The VAD model cuts the stream into speech-containing chunks.</li>
  <li>Whisper transcribes each chunk with normal inference.</li>
  <li>The text streams back to the client over the same WebSocket.</li>
</ol>

<h2>Keeping each stream on one GPU</h2>

<p>
  One setup handles several concurrent streams and keeps each transcription sequential. When the same
  GPU processes every chunk of a stream, the transcript of the previous chunk serves as the prefix for
  the next chunk. That prefix improves transcription quality, because the model sees the words that led
  up to the new chunk.
</p>
