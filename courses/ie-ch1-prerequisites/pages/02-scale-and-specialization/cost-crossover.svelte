<script module>
  export const pageConfig = { title: 'Testing the Scale Reason with Numbers' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Testing the Scale Reason with Numbers</h1>

<p>
  Scale is the one reason to switch that a team can test with arithmetic.
  The test compares one month of per-token billing with one month of dedicated GPU time for the same traffic.
</p>

<h2>Two cost models</h2>

<ul>
  <li>
    <strong>Per-token API cost</strong> grows in a straight line with volume.
    Monthly cost = requests × (input tokens × input price + output tokens × output price) ÷ 1,000,000, because prices are quoted per million tokens.
  </li>
  <li>
    <strong>Dedicated cost</strong> has a floor.
    The team pays for every GPU-hour that its always-on replicas run, even at zero traffic.
    Above that floor, cost grows with the GPU-hours that the traffic needs.
    The team also pays for the engineering and operations work that a dedicated deployment adds.
  </li>
</ul>

<p>
  A GPU-hour is one GPU running for one hour, and a month has 730 hours.
  Replica <Term id="throughput">throughput</Term> is the number of output tokens per second that one replica produces across all of its concurrent requests while it still meets the latency target.
  Utilization is the share of that throughput that real traffic uses on average, because a deployment keeps headroom for peaks.
  This model sizes GPU time by output tokens alone, and a benchmark at the product's real input lengths supplies the throughput figure.
</p>

<Signal kind="worked" title="An internal knowledge-base assistant">
  <p>
    The assistant handles 2,000,000 requests a month.
    Each request averages 800 input tokens and 300 output tokens.
    The API charges $0.60 per million input tokens and $2.50 per million output tokens.
  </p>
  <pre class="ie-steps"><code>API cost per request = (800 × $0.60 + 300 × $2.50) ÷ 1,000,000
                     = $1,230 ÷ 1,000,000 = $0.00123
API cost per month   = 2,000,000 × $0.00123 = $2,460</code></pre>
  <p>
    A load test shows that one GPU at $2.50 per hour produces 400 output tokens per second at the latency target.
    The team plans for 60 percent utilization, one always-on replica, and $1,500 a month of engineering and operations work.
  </p>
  <pre class="ie-steps"><code>Output tokens per month   = 2,000,000 × 300 = 600,000,000
Useful tokens per GPU-hour = 400 × 3,600 × 0.60 = 864,000
GPU-hours needed          = 600,000,000 ÷ 864,000 = 694 GPU-hours
Always-on floor           = 1 replica × 1 GPU × 730 hours = 730 GPU-hours
Billed GPU-hours          = the larger value = 730 GPU-hours
Dedicated cost per month  = 730 × $2.50 + $1,500 = $1,825 + $1,500 = $3,325</code></pre>
  <p>
    The GPU time alone, $1,825, is cheaper than the API bill.
    The full cost, $3,325, is not.
    The assistant stays on shared inference.
    The simulator on the next page places the crossover near 4.1 million requests a month, so volume would need to roughly double before scale justifies a switch.
  </p>
</Signal>

<p>
  The full monthly cost of a dedicated deployment, including engineering time and idle capacity, is its <Term id="total-cost-of-ownership">total cost of ownership (TCO)</Term>.
  Chapter 7 returns to this comparison with production pricing.
</p>

<h2>Practice: monthly API cost</h2>

<NumericQuestion
  id="cc_api_by_hand"
  question="A product sends 5,000,000 requests a month. Each request averages 1,200 input tokens at $0.30 per million and 200 output tokens at $1.20 per million. What is the monthly API cost, in dollars?"
  answer={3000}
  tolerance={1}
  unit="dollars per month"
  correctFeedback="Correct. Each request costs (1,200 × $0.30 + 200 × $1.20) ÷ 1,000,000 = $0.0006, and 5,000,000 × $0.0006 = $3,000."
  incorrectFeedback="Cost per request = (1,200 × $0.30 + 200 × $1.20) ÷ 1,000,000 = ($360 + $240) ÷ 1,000,000 = $0.0006. Monthly cost = 5,000,000 × $0.0006 = $3,000."
/>
