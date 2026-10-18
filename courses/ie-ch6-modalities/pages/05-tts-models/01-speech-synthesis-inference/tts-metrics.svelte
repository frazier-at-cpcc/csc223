<script module>
  export const pageConfig = { title: 'TTS Latency Metrics' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>TTS Latency Metrics</h1>

<p>
  TTS performance uses metrics that differ from LLM metrics. <Term id="time-to-first-byte">Time to first
  byte (TTFB)</Term> plays the role that <Term id="time-to-first-token">TTFT</Term> plays for a chat LLM.
</p>

<div class="table-wrap" role="region" aria-label="Key TTS metrics" use:scrollable>
  <table>
    <caption>Key TTS metrics</caption>
    <thead>
      <tr><th scope="col">Metric</th><th scope="col">Definition</th><th scope="col">Goal</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Time to first byte (TTFB)</td>
        <td>Time until the first byte of audio returns</td>
        <td>Minimize. The book reports that Orpheus reaches about 150 ms on one H100.</td>
      </tr>
      <tr>
        <td>Time to first sentence</td>
        <td>Time to generate the first meaningful phrase or sentence</td>
        <td>Minimize. This metric tracks what the listener experiences more closely than TTFB.</td>
      </tr>
      <tr>
        <td>Tokens per second (TPS)</td>
        <td>Decode speed of the audio tokens for one stream</td>
        <td>Reach the real-time rate. Once audio is playing, speed beyond that rate brings one listener no further benefit.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>The real-time threshold</h2>

<p>
  The generated tokens become audio, and audio plays at a fixed speed. Depending on the model, about 80
  to 100 audio tokens per second produce one second of audio each second. This rate is the
  <strong>real-time threshold</strong>. A stream that decodes below it runs out of audio, and the
  listener hears gaps. A stream that decodes above it stays ahead of playback, but the listener still
  hears the speech at normal speed.
</p>
<p>
  The first sentence needs a fixed number of audio tokens: its length in seconds times the threshold. A
  useful estimate is time to first sentence ≈ TTFB + (sentence seconds × threshold) ÷ decode speed.
</p>
