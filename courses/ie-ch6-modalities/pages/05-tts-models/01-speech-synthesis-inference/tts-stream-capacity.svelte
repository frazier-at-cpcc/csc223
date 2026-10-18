<script module>
  export const pageConfig = { title: 'Real-Time Stream Capacity' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import StreamingMetrics from '$shared/sims/StreamingMetrics.svelte';
</script>

<h1>Real-Time Stream Capacity</h1>

<h2>Throughput through concurrency</h2>

<p>
  Once a stream decodes above the real-time threshold, extra speed brings its listener no benefit.
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

<p>Finish the next example. The division is done for you.</p>

<NumericQuestion
  id="faded_tts_streams"
  question="A TTS model needs 88 audio tokens per second for real-time speech. At full batch, one GPU produces 4,000 audio tokens per second across all streams. 4,000 ÷ 88 = 45.45. Complete the final step: how many real-time streams can the GPU sustain?"
  answer={45}
  unit="streams"
  correctFeedback="A stream needs the full 88 tokens per second, so round down: 45 real-time streams."
  incorrectFeedback="A partial stream cannot play in real time, so round 45.45 down to 45 streams."
/>

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
