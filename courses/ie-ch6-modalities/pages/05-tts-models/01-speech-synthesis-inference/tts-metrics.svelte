<script module>
  export const pageConfig = { title: 'TTS Performance Metrics' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import StreamingMetrics from '$shared/sims/StreamingMetrics.svelte';
</script>

<h1>TTS Performance Metrics</h1>

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

<h2>Throughput through concurrency</h2>

<p>
  Performance work on TTS therefore targets concurrency. The question becomes how many real-time
  streams one GPU can produce at once. The GPU's aggregate throughput, the audio tokens per second it
  produces across all streams at full batch, sets that number.
</p>
<pre><code>real-time streams per GPU = floor(aggregate GPU throughput ÷ real-time threshold)</code></pre>
<p>When a single GPU supports many concurrent users, the per-user cost of speech synthesis drops sharply.</p>

<Signal kind="worked" title="Streams per GPU before and after an optimization">
  <p>
    A voice product's model needs 90 audio tokens per second for real-time speech. At full batch, one GPU
    produces 3,000 audio tokens per second across all streams.
  </p>
  <ol>
    <li>Streams before: 3,000 ÷ 90 = 33.3, so the GPU sustains 33 real-time streams.</li>
    <li>An optimization, such as FP8 weights and KV cache, raises aggregate throughput to 4,500 tokens per second.</li>
    <li>Streams after: 4,500 ÷ 90 = 50 real-time streams.</li>
    <li>Cost per stream: the same GPU now serves 50 listeners instead of 33, so each stream costs about one third less.</li>
  </ol>
</Signal>

<Signal kind="mistake" title="Counting single-stream speed as capacity">
  <p>
    Raising one stream's decode speed from 100 to 300 tokens per second does not by itself add streams.
    That stream still plays at 90 tokens per second. Aggregate GPU throughput sets the stream count,
    and single-stream speed only has to stay at or above the threshold at full batch.
  </p>
</Signal>

<Signal kind="try" title="Explore speech streaming and GPU capacity">
  <ol>
    <li>Load the Voice agent preset. Record the time to first sentence and the real-time streams per GPU.</li>
    <li>
      Raise the single-stream decode speed from 100 to 300 tokens per second. Record which readouts
      change and which do not.
    </li>
    <li>
      Return the decode speed to 100 and set the GPU aggregate throughput to 6,300 tokens per second.
      Record the streams per GPU, then load the Overloaded stream preset and note why the stream count
      falls to zero.
    </li>
  </ol>
</Signal>

<StreamingMetrics mode="speech" headingLevel={2} />

<p>
  Use the simulator to answer the next item. The preset values appear only in the simulator.
</p>

<NumericQuestion
  id="sim_tts_audiobook"
  question="Load the Audiobook preset in the simulator. What time to first sentence, in seconds, does it report?"
  answer={2.1}
  tolerance={0.05}
  unit="seconds"
  correctFeedback="The preset's first sentence is 6 seconds of audio at 85 tokens per second, or 510 tokens. At 300 tokens per second they take 1.7 seconds, and 0.4 seconds of TTFB brings the total to 2.1 seconds."
  incorrectFeedback="Load the Audiobook preset and read the Time to first sentence readout. It is 0.4 s TTFB + (6 s × 85 tokens per second) ÷ 300 tokens per second = 0.4 + 1.7 = 2.1 seconds."
/>
