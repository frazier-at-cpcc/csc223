<script module>
  export const pageConfig = { title: 'Capstone Step 7: Cost and Launch Plan' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import CostCrossover from '$shared/sims/CostCrossover.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Capstone Step 7: Cost and Launch Plan</h1>

<Signal kind="recall" chapter={7}>
  <p>
    Compare a per-token API and a <Term id="dedicated-deployment">dedicated deployment</Term> as monthly totals for the same workload. The dedicated
    <Term id="total-cost-of-ownership">total cost of ownership</Term> is the billed GPU-hours, the larger of the needed
    hours and the always-on floor, times the GPU price, plus engineering cost.
  </p>
</Signal>

<p>The last decision is when Beacon should move to its own GPUs. The team has these figures.</p>
<ul>
  <li>An inference provider serves Beacon's fine-tuned model per token at $0.90 per million input tokens and $3.60 per million output tokens.</li>
  <li>Requests average 1,500 input and 300 output tokens.</li>
  <li>A dedicated replica uses 2 H100s at $3.00 per GPU-hour and produces about 800 output tokens per second. The team plans for 60 percent utilization, keeps 2 replicas always on for redundancy, and budgets $6,000 per month of engineering.</li>
</ul>

<Signal kind="try" title="Find Beacon's crossover">
  <p>The simulator loads Beacon's figures at the launch volume of 3 million requests per month.</p>
  <ol>
    <li>Record the monthly cost of each option at 3 million requests, and the line that sets the dedicated GPU-hours.</li>
    <li>Move the requests slider to 20,000,000, the projected volume. Record both monthly costs.</li>
    <li>Record the crossover volume from the status line.</li>
  </ol>
</Signal>

<CostCrossover priceIn={0.9} priceOut={3.6} inTokens={1500} outTokens={300} requests={3000000} gpuPrice={3} gpusPerReplica={2} throughput={800} utilization={60} minReplicas={2} engCost={6000} headingLevel={2} />

<p>
  At launch the API costs $7,290 per month, while the dedicated deployment costs $14,760, almost all of it the
  always-on floor and engineering. At 20 million requests the API would cost $48,600, against $26,833 for the
  dedicated deployment.
</p>

<p class="ie-objective">Decision 7a, drawing on Chapter 7</p>
<NumericQuestion
  id="cap_cross"
  question="According to the simulator, at about how many million requests per month does Beacon's dedicated deployment become cheaper than the API?"
  answer={6.07}
  tolerance={0.05}
  unit="million requests"
  correctFeedback="Correct. The crossover sits near 6.07 million requests. Below it, the fixed floor and engineering cost outweigh the GPU savings. Above it, every extra request costs less on dedicated GPUs."
  incorrectFeedback="Read the status line under the sliders with Beacon's figures loaded: the costs cross at about 6,070,000 requests per month. Enter 6.07."
/>

<p class="ie-objective">Decision 7b, drawing on Chapter 7</p>
<MultipleChoice
  id="cap_launch"
  question="Beacon launches at 3 million requests per month and expects 20 million within a year. Which launch plan does the cost analysis support?"
  options={[
    'Launch on the per-token API, and move to dedicated GPUs as volume nears 6 million',
    'Launch on dedicated GPUs now, because they cost less at the projected 20 million',
    'Stay on the per-token API indefinitely, because its cost grows only linearly',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. At launch the API costs about half as much as the dedicated floor. The work in steps 2 through 6 is ready when volume passes the crossover, and the team switches then.',
    'Incorrect. Dedicated GPUs win at 20 million, but at 3 million they cost about twice the API. Switching early pays for idle capacity for months.',
    'Incorrect. Linear growth is the problem at scale. At 20 million requests the API costs about $21,800 per month more than the dedicated deployment.',
  ]}
/>

<details class="ie-decision">
  <summary>Decision carried forward</summary>
  <p>
    Beacon launches on the per-token API with the requirements from step 1 as its SLO. The team prepares the dedicated
    deployment from steps 2 through 6, validates it with <Term id="shadow-traffic">shadow traffic</Term>, and moves traffic to it with a <Term id="canary-deployment">canary rollout</Term>
    once monthly volume approaches 6 million requests.
  </p>
</details>
