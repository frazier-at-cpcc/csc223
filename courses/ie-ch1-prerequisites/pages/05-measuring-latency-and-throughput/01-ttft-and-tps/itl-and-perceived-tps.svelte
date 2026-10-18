<script module>
  export const pageConfig = { title: 'Inter-Token Latency and Perceived TPS' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Inter-Token Latency and Perceived TPS</h1>

<p>
  TTFT has one clear meaning.
  TPS does not, because it can describe either a single user's experience or the whole service.
  Most people use TPS to mean the per-user latency metric.
  When precision matters, use one of three terms: perceived TPS and inter-token latency on this page, and total TPS on the next.
</p>

<ul>
  <li>
    <dfn><strong>Perceived TPS</strong></dfn> is the number of tokens per second that one user observes after the first token.
    It is a latency metric.
  </li>
  <li>
    <dfn><strong>Inter-token latency (ITL)</strong></dfn> is the time between consecutive generated tokens in one stream.
    It is the inverse of perceived TPS.
  </li>
</ul>

<p>A second has 1,000 milliseconds, so the conversion in each direction divides 1,000 by the known value.</p>

<pre class="ie-steps"><code>Perceived TPS (tokens per second) = 1,000 ÷ ITL (milliseconds)
ITL (milliseconds)                = 1,000 ÷ perceived TPS (tokens per second)</code></pre>

<Signal kind="worked" title="Converting in both directions">
  <p>A stream delivers one token every 10 milliseconds.</p>
  <pre class="ie-steps"><code>Perceived TPS = 1,000 ÷ 10 = 100 tokens per second</code></pre>
  <p>A second stream runs at 40 tokens per second.</p>
  <pre class="ie-steps"><code>ITL = 1,000 ÷ 40 = 25 milliseconds</code></pre>
  <p>A shorter gap between tokens means a higher perceived TPS.</p>
</Signal>

<h2>Complete the last step</h2>

<p>A stream delivers one token every 8 milliseconds. The setup is done for you.</p>

<pre class="ie-steps"><code>Perceived TPS = 1,000 ÷ ITL
              = 1,000 ÷ 8
              = ?</code></pre>

<NumericQuestion
  id="itl_faded"
  question="Finish the calculation. What is the perceived TPS?"
  answer={125}
  tolerance={0.5}
  unit="tokens per second"
  correctFeedback="Correct. 1,000 ÷ 8 = 125 tokens per second."
  incorrectFeedback="Divide 1,000 milliseconds by 8 milliseconds per token: 1,000 ÷ 8 = 125 tokens per second."
/>

<h2>Practice</h2>

<NumericQuestion
  id="itl_practice_1"
  question="A code-completion stream shows an inter-token latency of 4 milliseconds. What perceived TPS does the user observe?"
  answer={250}
  tolerance={0.5}
  unit="tokens per second"
  correctFeedback="Correct. 1,000 ÷ 4 = 250 tokens per second."
  incorrectFeedback="Perceived TPS = 1,000 ÷ ITL = 1,000 ÷ 4 = 250 tokens per second. If you got 0.25, you divided 1 by 4 without converting seconds to milliseconds."
/>

<NumericQuestion
  id="itl_practice_2"
  question="A team's target is a perceived TPS of 160 tokens per second. What inter-token latency, in milliseconds, meets that target exactly?"
  answer={6.25}
  tolerance={0.01}
  unit="milliseconds"
  correctFeedback="Correct. 1,000 ÷ 160 = 6.25 milliseconds."
  incorrectFeedback="ITL = 1,000 ÷ perceived TPS = 1,000 ÷ 160 = 6.25 milliseconds. Any ITL at or below 6.25 milliseconds meets the target."
/>
