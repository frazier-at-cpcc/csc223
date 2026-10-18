<script module>
  export const pageConfig = { title: 'Total TPS' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Total TPS</h1>

<p>
  <dfn><strong>Total TPS</strong></dfn> is the number of tokens that the entire inference service generates each second, across all users.
  It is a <Term id="throughput">throughput</Term> metric.
  When every stream runs at the same speed, total TPS equals the number of concurrent streams times the perceived TPS of each stream.
  The number of streams that the service serves at the same moment is its <Term id="concurrency">concurrency</Term>.
</p>

<pre class="ie-steps"><code>Total TPS = concurrent streams × perceived TPS per stream</code></pre>

<Signal kind="worked" title="From one user to the whole service">
  <p>A service streams to 50 concurrent users, and each user sees 40 tokens per second.</p>
  <pre class="ie-steps"><code>Perceived TPS = 40 tokens per second for each user
Total TPS     = 50 users × 40 tokens per second = 2,000 tokens per second</code></pre>
  <p>The two numbers describe the same service. One is a latency metric for each user, and the other is a throughput metric for the system.</p>
</Signal>

<Signal kind="mistake" title="Assuming more users cost each user nothing">
  <p>
    The formula holds per-user speed fixed, and real servers do not.
    A GPU serves concurrent users by <Term id="batching">batching</Term> their requests together.
    A larger batch raises total TPS, and it usually lowers each user's perceived TPS.
    That drop is the latency-versus-throughput tradeoff from the About Your App section.
    Measure perceived TPS at the concurrency you plan to run, not at a single user.
  </p>
</Signal>

<h2>Faded example: total TPS from streams</h2>

<p>A service streams to 24 concurrent users, and a load test at that concurrency shows each user receiving 45 tokens per second.</p>

<pre class="ie-steps"><code>Total TPS = concurrent streams × perceived TPS
          = 24 × 45
          = ?</code></pre>

<NumericQuestion
  id="total_faded"
  question="Finish the calculation. What is the total TPS of the service?"
  answer={1080}
  tolerance={0.5}
  unit="tokens per second"
  correctFeedback="Correct. 24 × 45 = 1,080 tokens per second."
  incorrectFeedback="Multiply the stream count by the per-stream rate: 24 × 45 = 1,080 tokens per second."
/>

<h2>Practice: total TPS and perceived TPS</h2>

<NumericQuestion
  id="total_practice_1"
  question="During a peak hour, 120 users stream replies at the same time, and each sees 35 tokens per second. What is the total TPS of the service?"
  answer={4200}
  tolerance={0.5}
  unit="tokens per second"
  correctFeedback="Correct. 120 × 35 = 4,200 tokens per second."
  incorrectFeedback="Total TPS = 120 streams × 35 tokens per second = 4,200 tokens per second. Adding the two numbers or reporting 35 confuses the per-user rate with the service rate."
/>

<NumericQuestion
  id="total_practice_2"
  question="A dashboard reports a total TPS of 6,300 tokens per second across 90 concurrent streams that run at the same speed. What perceived TPS does each user see?"
  answer={70}
  tolerance={0.5}
  unit="tokens per second"
  correctFeedback="Correct. 6,300 ÷ 90 = 70 tokens per second for each user."
  incorrectFeedback="Reverse the formula: perceived TPS = total TPS ÷ streams = 6,300 ÷ 90 = 70 tokens per second."
/>

<Callout type="tip">
  <p>When someone reports a TPS number, confirm whether it describes one user or the whole service. The two numbers can differ by orders of magnitude.</p>
</Callout>
