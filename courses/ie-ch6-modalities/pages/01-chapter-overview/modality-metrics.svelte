<script module>
  export const pageConfig = { title: 'Rethinking Metrics for Each Modality' };
</script>

<h1>Rethinking Metrics for Each Modality</h1>

<p>
  Latency, throughput, and quality keep their meaning across modalities, but the way you measure
  them changes. A metric is useful only when it tracks what the user experiences.
</p>

<p>
  Time to first token (TTFT) works for a chat LLM because one text token is visible and readable. A
  single token of audio from a TTS model is not useful to a listener. For speech output, measure the
  time to first word or the time to first sentence instead.
</p>

<div class="table-wrap">
  <table>
    <caption>Examples of metrics that fit each output</caption>
    <thead>
      <tr><th scope="col">Modality</th><th scope="col">Metric introduced in this chapter</th><th scope="col">What it captures</th></tr>
    </thead>
    <tbody>
      <tr><td>Speech synthesis (TTS)</td><td>Time to first byte, time to first sentence</td><td>When the listener first hears meaningful speech</td></tr>
      <tr><td>Real-time transcription (ASR)</td><td>Round-trip time per audio chunk</td><td>How far the transcript lags behind the speaker</td></tr>
      <tr><td>Long-file transcription (ASR)</td><td>Real-time factor</td><td>How many times faster than playback the file is transcribed</td></tr>
      <tr><td>Embedding quantization</td><td>Cosine similarity to the original model's vectors</td><td>How much a quantized model changed its output</td></tr>
    </tbody>
  </table>
</div>

<p>Each modality lesson defines its metrics in detail.</p>
