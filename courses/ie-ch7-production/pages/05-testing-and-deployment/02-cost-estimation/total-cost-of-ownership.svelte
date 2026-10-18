<script module>
  export const pageConfig = { title: 'GPU-Hours and Total Cost of Ownership' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>GPU-Hours and Total Cost of Ownership</h1>

<h2>The Estimation Period</h2>
<p>
  Usage varies from hour to hour and day to day. Base cost estimates on a long time horizon, at least a week and
  ideally a month, to smooth out those variations. This chapter uses one month, which averages 8,760 hours ÷ 12 = 730
  hours.
</p>

<h2>Engineering Time</h2>
<p>
  Dedicated deployments carry a second cost beyond GPUs. Engineers spend time building and maintaining the inference
  system. Increased reliability, security, and control justify that investment, but it still belongs in the estimate.
  <strong>Total cost of ownership (TCO)</strong> for inference adds engineering cost to GPU cost. TCO gives the
  complete picture for comparing a dedicated deployment with a per-token API.
</p>

<h2>Deriving GPU-Hours</h2>
<p>A dedicated estimate turns token volume into GPU-hours in four steps.</p>
<ol>
  <li>Effective output tokens per replica-hour = replica <Term id="throughput">throughput</Term> in output tokens per second × 3,600 × target utilization.</li>
  <li>GPU-hours needed = monthly output tokens ÷ effective tokens per replica-hour × GPUs per replica.</li>
  <li>Always-on floor = min replicas × GPUs per replica × 730 hours.</li>
  <li>Billed GPU-hours = the larger of the needed hours and the floor.</li>
</ol>
<p>
  The estimate sizes GPU time by output tokens. That works because the throughput figure comes from a benchmark with
  realistic prompts, so the <Term id="prefill">prefill</Term> work for each request is already inside the measured rate. Utilization below 100
  percent accounts for capacity that sits idle between peaks.
</p>

<Signal kind="worked" title="The chapter's 1,600 GPU-hours, and the full comparison">
  <p>
    The workload from Figure 7.14 runs 1,000,000 requests per month with 500 output tokens each. One <Term id="replica">replica</Term> uses 1 GPU
    and produces 124 output tokens per second at the latency target. The team plans for 70 percent utilization, keeps 2
    replicas always on, pays $3.50 per GPU-hour, and spends $2,000 per month of engineering time.
  </p>
  <ol>
    <li>Monthly output tokens: 1,000,000 × 500 = 500,000,000.</li>
    <li>Effective tokens per replica-hour: 124 × 3,600 × 0.70 = 312,480.</li>
    <li>GPU-hours needed: 500,000,000 ÷ 312,480 × 1 GPU = 1,600 GPU-hours.</li>
    <li>Always-on floor: 2 × 1 × 730 = 1,460 GPU-hours. The needed hours are larger, so 1,600 GPU-hours are billed.</li>
    <li>GPU cost: 1,600 × $3.50 = $5,600.</li>
    <li>Dedicated TCO: $5,600 + $2,000 = $7,600 per month.</li>
    <li>Comparison: the API costs $6,250, so the API is cheaper by $7,600 − $6,250 = $1,350 per month.</li>
  </ol>
  <p>
    GPU spending alone made the dedicated deployment look $650 cheaper. Engineering time reverses the decision. As
    volume grows, the GPU savings grow with it, and the balance can shift toward dedicated inference.
  </p>
</Signal>

<p class="ie-objective">Practices objective 8: calculate monthly total cost of ownership</p>
<p>
  Complete the last step of this faded example. A deployment must produce 1,800 million output tokens per month. One
  replica uses 2 GPUs and produces 500 output tokens per second, utilization is planned at 80 percent, and min replicas
  is 1.
</p>
<ol>
  <li>Effective tokens per replica-hour: 500 × 3,600 × 0.80 = 1,440,000.</li>
  <li>GPU-hours needed: 1,800,000,000 ÷ 1,440,000 × 2 = 2,500.</li>
  <li>Always-on floor: 1 × 2 × 730 = 1,460, so 2,500 GPU-hours are billed.</li>
  <li>GPU price: $2.80 per GPU-hour. Engineering: $3,000 per month.</li>
</ol>
<NumericQuestion
  id="pr_tco_faded"
  question="What is the monthly dedicated TCO for this deployment, in dollars?"
  answer={10000}
  tolerance={1}
  unit="dollars"
  correctFeedback="Correct. GPU cost is 2,500 × $2.80 = $7,000, and adding $3,000 of engineering gives $10,000 per month."
  incorrectFeedback="Multiply billed GPU-hours by the price, then add engineering: 2,500 × $2.80 = $7,000, and $7,000 + $3,000 = $10,000. Leaving out engineering gives $7,000, which is GPU cost, not TCO."
/>

<Signal kind="mistake" title="Forgetting the always-on floor">
  <p>
    At low volume, the replicas that stay on regardless of traffic cost more than the work itself. Always compare the
    needed GPU-hours with the floor and bill the larger of the two.
  </p>
</Signal>
