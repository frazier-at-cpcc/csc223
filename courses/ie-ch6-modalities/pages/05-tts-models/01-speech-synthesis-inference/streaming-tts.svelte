<script module>
  export const pageConfig = { title: 'Streaming Real-Time TTS' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Streaming Real-Time TTS</h1>

<p>
  Most TTS work is real-time speech synthesis. As with ASR, the runtime layer is already optimized with
  TensorRT-LLM, quantization, and a compiled SNAC decoder. Further gains come from infrastructure.
</p>

<h2>Stream over WebSockets</h2>

<p>
  Streaming over <Term id="websocket">WebSockets</Term> is the largest performance unlock. The client
  receives audio as it is generated, instead of sending text and waiting for each complete audio chunk.
</p>

<h2>Match batch size to stream count</h2>

<ol>
  <li>Test the inference engine to find how many concurrent real-time streams it sustains.</li>
  <li>Set the engine <Term id="batch-size">batch size</Term> to that number.</li>
  <li>Set the number of active WebSocket connections per replica to the same number.</li>
</ol>
<p>
  This configuration keeps GPU usage high and stable. A batch larger than the tested stream count slows
  every stream below the real-time threshold, and a smaller one leaves capacity idle.
</p>

<h2>Batch use cases and long inputs</h2>

<p>
  TTS rarely runs outside real-time applications. One batch example is converting a large corpus of
  documents to audio for accessibility. TTS models handle long inputs poorly, and speech starts to
  degrade after about 30 seconds of audio. Split long documents into shorter passages before synthesis.
</p>
