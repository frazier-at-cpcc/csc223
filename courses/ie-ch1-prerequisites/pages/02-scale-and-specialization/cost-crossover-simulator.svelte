<script module>
  export const pageConfig = { title: 'Cost Crossover Simulator' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import CostCrossover from '$shared/sims/CostCrossover.svelte';
</script>

<h1>Cost Crossover Simulator</h1>

<p>
  The simulator applies the two cost models from the previous page across a range of monthly volumes.
  It sizes GPU time by output tokens alone and bills a month as 730 hours.
  The crossover is the volume at which the two monthly costs are equal.
</p>

<Signal kind="try" title="Find the crossover">
  <ol>
    <li>Select the Growing product preset. Record the monthly cost of each option and note which one is cheaper.</li>
    <li>Keep that preset and drag the requests slider down to about 300,000 requests. Record the dedicated cost, and explain why it no longer falls as volume falls.</li>
    <li>Select the Prototype preset. Record the crossover volume that the status line reports.</li>
  </ol>
</Signal>

<CostCrossover headingLevel={2} />

<h2>Practice: reading the cost crossover</h2>

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
