<script module>
  export const pageConfig = { title: 'Streaming Metrics Simulator' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import StreamingMetrics from '$shared/sims/StreamingMetrics.svelte';
</script>

<h1>Streaming Metrics Simulator</h1>

<p>
  The simulator streams one reply and reports every metric from this lesson at once.
  It also compares perceived TPS with a typical human reading pace, which shows when a faster stream stops making a difference to a reader.
  The simulator labels total response time as <Term id="end-to-end-latency">end-to-end latency</Term>, because its TTFT is the full wait that the user sees.
</p>

<Signal kind="try" title="Connect the four metrics">
  <ol>
    <li>Select the Chat assistant preset. Record the inter-token latency, the total TPS, and the end-to-end latency, and check each one with the formulas from the last three pages.</li>
    <li>Set the per-stream decode speed to 20 tokens per second. Record the multiple of reading pace.</li>
    <li>Lower the decode speed one step at a time. Find the lowest speed at which the multiple of reading pace is still 1.0 or more.</li>
  </ol>
</Signal>

<StreamingMetrics mode="text" headingLevel={2} />

<p>
  The simulator holds each stream's speed constant as you add streams.
  On a real GPU, adding streams to a batch lowers each stream's speed, so total TPS grows more slowly than the simulator shows.
</p>

<h2>Practice with the simulator</h2>

<NumericQuestion
  id="sim_read_multiple"
  question="With the per-stream decode speed set to 20 tokens per second, what multiple of reading pace does the simulator report?"
  answer={3.6}
  tolerance={0.05}
  unit="times reading pace"
  correctFeedback="Correct. At 20 tokens per second the stream runs about 3.6 times faster than a person reads."
  incorrectFeedback="The simulator reports 3.6. Its reading reference is 250 words per minute at about 0.75 words per token, or about 5.6 tokens per second, and 20 ÷ 5.56 ≈ 3.6."
/>

<NumericQuestion
  id="sim_min_speed"
  question="What is the lowest whole-number decode speed, in tokens per second, at which the simulator still reports a multiple of reading pace of 1.0 or more?"
  answer={6}
  unit="tokens per second"
  correctFeedback="Correct. At 6 tokens per second the stream stays slightly ahead of a reader. At 5 the reader waits for each new token."
  incorrectFeedback="The answer is 6. A reader consumes about 5.6 tokens per second, so 6 tokens per second stays ahead and 5 tokens per second falls behind. Perceived TPS far above reading pace still matters for agents and for readers who skim."
/>
