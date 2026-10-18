<script module>
  export const pageConfig = { title: 'Testing the Scale Reason with Numbers' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import CostCrossover from '$shared/sims/CostCrossover.svelte';
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
    The simulator places the crossover near 4.1 million requests a month, so volume would need to roughly double before scale justifies a switch.
  </p>
</Signal>

<p>
  The full monthly cost of a dedicated deployment, including engineering time and idle capacity, is its <Term id="total-cost-of-ownership">total cost of ownership (TCO)</Term>.
  Chapter 7 returns to this comparison with production pricing.
</p>

<Signal kind="try" title="Find the crossover">
  <ol>
    <li>Select the Growing product preset. Record the monthly cost of each option and note which one is cheaper.</li>
    <li>Keep that preset and drag the requests slider down to about 300,000 requests. Record the dedicated cost, and explain why it no longer falls as volume falls.</li>
    <li>Select the Prototype preset. Record the crossover volume that the status line reports.</li>
  </ol>
</Signal>

<CostCrossover headingLevel={2} />

<h2>Practice with the simulator</h2>

<NumericQuestion
  id="cc_prototype_crossover"
  question="With the Prototype preset loaded, at about how many requests per month does the simulator place the crossover?"
  answer={3080000}
  tolerancePct={2}
  unit="requests per month"
  correctFeedback="Correct. Below about 3.08 million requests a month, the prototype is cheaper on the API."
  incorrectFeedback="Load the Prototype preset and read the status line under the controls. It reports a crossover of about 3,080,000 requests a month. The $2,000 of monthly engineering cost pushes the crossover far above the prototype's 20,000 requests."
/>

<NumericQuestion
  id="cc_floor_cost"
  question="With the Growing product preset loaded and the requests slider at about 300,000, what monthly cost does the simulator report for the dedicated deployment, in dollars?"
  answer={5110}
  tolerance={5}
  unit="dollars per month"
  correctFeedback="Correct. At this volume the always-on floor sets the bill, so dedicated cost stays at $5,110 however low traffic falls."
  incorrectFeedback="The status line reports $5,110. Two always-on replicas × 1 GPU × 730 hours = 1,460 GPU-hours, and 1,460 × $3.50 = $5,110. The traffic needs fewer GPU-hours than the floor, so the floor sets the bill."
/>

<h2>When to switch: a judgment</h2>

<p class="ie-obj">Objective 2: Evaluate whether a product should move to a dedicated deployment.</p>

<MultipleChoice
  id="cc_when_to_switch"
  question="A product spends $14,000 a month on a per-token API. With its own benchmark numbers, the simulator shows that a dedicated deployment would cost $9,500 a month, including $3,000 of engineering and operations work. The team's model choice is settled, its traffic is steady, and its customers need no latency target beyond what the API already delivers. What should the team conclude?"
  options={[
    'Stay on the API, because only a latency or uptime requirement justifies a dedicated deployment',
    'Stay on the API, because a dedicated deployment would add cold starts that the API avoids',
    'Switch to a dedicated deployment, because scale alone saves about $4,500 a month after engineering costs',
  ]}
  correct={2}
  optionFeedback={[
    'Not quite. Latency and uptime describe the specialization reason. Scale is a separate reason, and the numbers here satisfy it.',
    'Not quite. Cold starts matter when replicas are added, and a steady workload with always-on replicas rarely pays them. The $4,500 monthly saving outweighs that risk.',
    'Correct. The comparison already includes engineering work, the model is settled, and traffic is steady. Scale is a clear and immediate business need.',
  ]}
/>
