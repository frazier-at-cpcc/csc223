<script module>
  export const pageConfig = { title: 'Total Response Time' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Total Response Time</h1>

<h2>When TTFT and TPS do not apply</h2>

<p>
  TTFT and TPS suit user-facing systems, such as chatbots, that stream output to a person.
  Some requests produce output that is useless until it is complete.
  A tool call made by an <Term id="agent">agent</Term> is one example: the agent cannot act on half of a JSON object.
  For those requests, measure latency as <dfn><strong>total response time</strong></dfn>, the time from request to complete response.
</p>

<h2>Connecting TTFT, ITL, and total response time</h2>

<p>
  The first token arrives at the TTFT.
  Each of the remaining tokens arrives one inter-token latency after the token before it.
  A reply of N tokens therefore has N − 1 gaps after the first token.
</p>

<pre class="ie-steps"><code>Total response time = TTFT + (N − 1) × ITL
TTFT                = total response time − (N − 1) × ITL</code></pre>

<Signal kind="worked" title="A 300-token reply">
  <p>A reply has 300 output tokens, a TTFT of 400 milliseconds, and an ITL of 25 milliseconds.</p>
  <pre class="ie-steps"><code>Gaps after the first token = 300 − 1 = 299
Streaming time             = 299 × 25 ms = 7,475 ms
Total response time        = 400 ms + 7,475 ms = 7,875 ms, about 7.9 seconds</code></pre>
  <p>
    A chat user sees the first words after 0.4 seconds and reads while the rest arrives.
    An agent that needs the whole reply waits the full 7.9 seconds, so for the agent the ITL matters far more than the TTFT.
  </p>
</Signal>

<h2>Complete the last step</h2>

<p>A tool call returns 120 tokens. Its TTFT is 250 milliseconds, and the stream runs at a perceived TPS of 50. The first steps are done for you.</p>

<pre class="ie-steps"><code>ITL                 = 1,000 ÷ 50 = 20 ms
Gaps                = 120 − 1 = 119
Streaming time      = 119 × 20 ms = 2,380 ms
Total response time = 250 ms + 2,380 ms = ?</code></pre>

<NumericQuestion
  id="resp_faded"
  question="Finish the calculation. What is the total response time in milliseconds?"
  answer={2630}
  tolerance={0.5}
  unit="milliseconds"
  correctFeedback="Correct. 250 + 2,380 = 2,630 milliseconds."
  incorrectFeedback="Add the TTFT to the streaming time: 250 ms + 2,380 ms = 2,630 ms."
/>

<h2>Practice</h2>

<NumericQuestion
  id="resp_practice_1"
  question="A reply has 201 output tokens, a TTFT of 600 milliseconds, and an ITL of 15 milliseconds. What is its total response time in milliseconds?"
  answer={3600}
  tolerance={0.5}
  unit="milliseconds"
  correctFeedback="Correct. 600 + 200 × 15 = 3,600 milliseconds."
  incorrectFeedback="Total response time = TTFT + (N − 1) × ITL = 600 + 200 × 15 = 600 + 3,000 = 3,600 ms. Using 201 gaps instead of 200 gives 3,615 ms."
/>

<NumericQuestion
  id="resp_practice_2"
  question="A load test records a total response time of 5,000 milliseconds for a 401-token reply with an ITL of 10 milliseconds. What was the TTFT in milliseconds?"
  answer={1000}
  tolerance={0.5}
  unit="milliseconds"
  correctFeedback="Correct. 5,000 − 400 × 10 = 1,000 milliseconds."
  incorrectFeedback="TTFT = total response time − (N − 1) × ITL = 5,000 − 400 × 10 = 5,000 − 4,000 = 1,000 ms."
/>
