<script module>
  export const pageConfig = { title: 'TTS Performance Metrics' };
</script>

<h1>TTS Performance Metrics</h1>

<p>TTS performance uses metrics that differ from LLM metrics.</p>

<div class="table-wrap">
  <table>
    <caption>Key TTS metrics</caption>
    <thead>
      <tr><th scope="col">Metric</th><th scope="col">Definition</th><th scope="col">Goal</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Time to first byte (TTFB)</td>
        <td>Time until the first byte of audio returns; the speech equivalent of TTFT</td>
        <td>Minimize. Orpheus reaches about 150 ms on one H100.</td>
      </tr>
      <tr>
        <td>Time to first sentence</td>
        <td>Time to generate the first meaningful phrase or sentence</td>
        <td>Minimize. This metric tracks what the listener experiences more closely than TTFB.</td>
      </tr>
      <tr>
        <td>Tokens per second (TPS)</td>
        <td>Decode speed of the audio tokens</td>
        <td>Reach the real-time rate. Speed beyond that rate brings no benefit to one listener.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>The TPS ceiling</h2>

<p>
  The generated tokens become audio, and audio plays at a fixed speed. Depending on the model, about 80
  to 100 tokens per second produce audio in real time. Generating faster than playback does not help a
  listener, who still hears the speech at normal speed.
</p>

<h2>Throughput through concurrency</h2>

<p>
  Performance work on TTS therefore targets concurrency. The question becomes how many real-time
  streams one GPU can produce at once. When a single GPU supports many concurrent users, the per-user
  cost of speech synthesis drops sharply.
</p>

<div class="worked">
  <p>
    <strong>Worked example.</strong> A model needs 90 tokens per second for real-time speech. An
    optimization raises single-stream speed from 100 to 300 tokens per second. The single listener hears
    no difference. The value of the optimization lies in the extra headroom, which lets the GPU serve
    more real-time streams at the same time.
  </p>
</div>
