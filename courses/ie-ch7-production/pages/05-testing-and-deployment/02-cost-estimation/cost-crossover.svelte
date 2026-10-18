<script module>
  export const pageConfig = { title: 'The Cost Crossover' };
</script>

<script>
  import CostCrossover from '$shared/sims/CostCrossover.svelte';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>The Cost Crossover</h1>

<p>
  API cost rises in proportion to volume. Dedicated cost starts at a fixed floor, the always-on replicas plus
  engineering, and rises more slowly once traffic outgrows the floor. Somewhere the two lines cross. Below that volume
  the API is cheaper. Above it, the dedicated deployment is cheaper. The simulator below draws both lines and shows the
  GPU-hours derivation from the previous page for every setting.
</p>

<Signal kind="try" title="Find what moves the crossover">
  <p>The simulator loads the Growing product preset, which rebuilds the chapter's example with no engineering cost.</p>
  <ol>
    <li>Read the four derivation lines under the dedicated deployment. Confirm the 1,600 GPU-hours, the 1,460-hour floor, and the $5,600 monthly cost, and record the crossover volume in the status line.</li>
    <li>Set the monthly engineering cost to $2,000. Record which option is now cheaper and the new crossover volume.</li>
    <li>Set the engineering cost back to $0 and the minimum always-on replicas to 4. Record the billed GPU-hours and the line that sets them.</li>
  </ol>
</Signal>

<CostCrossover headingLevel={2} />

<p>
  In step 1 the crossover sits near 818,000 requests per month. Adding $2,000 of engineering in step 2 makes the API
  cheaper by $1,350 and pushes the crossover to about 3.08 million requests. In step 3 the floor of 4 × 730 = 2,920
  GPU-hours exceeds the 1,600 hours the work needs, so the floor sets the bill. Fixed costs move the crossover far more
  than small changes in GPU price.
</p>

<p class="ie-objective">Practices objective 8: calculate monthly total cost of ownership</p>
<NumericQuestion
  id="pr_cc_util"
  question="In the simulator, select the Growing product preset, then set target utilization to 60 percent. What is the dedicated deployment's monthly cost, in dollars?"
  answer={6533.75}
  tolerance={2}
  unit="dollars"
  correctFeedback="Correct. At 60 percent utilization each replica-hour yields 124 × 3,600 × 0.60 = 267,840 useful tokens, so the work needs 1,867 GPU-hours, or $6,534. The API at $6,250 is now cheaper, and the status line reports that the lines never cross."
  incorrectFeedback="Load Growing product and change only the utilization to 60 percent. The dedicated card shows $6,534: 500,000,000 ÷ (124 × 3,600 × 0.60) = 1,866.8 GPU-hours, and 1,866.8 × $3.50 = $6,533.75. Lower utilization means each paid GPU-hour does less work, so dedicated cost rises."
/>
