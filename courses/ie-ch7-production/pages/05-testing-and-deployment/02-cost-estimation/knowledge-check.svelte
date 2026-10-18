<script module>
  export const pageConfig = { title: 'Knowledge Check: Cost Estimation' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Cost Estimation</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 8: calculate monthly total cost of ownership</p>
<NumericQuestion
  id="pr_tco_full"
  question="A deployment must produce 600 million output tokens per month. One replica uses 1 GPU and produces 250 output tokens per second at the latency target. Utilization is planned at 60 percent, min replicas is 1, GPUs cost $2.00 per GPU-hour, and engineering costs $1,500 per month. What is the monthly dedicated TCO, in dollars?"
  answer={3722.22}
  tolerancePct={1}
  unit="dollars"
  correctFeedback="Correct. Effective tokens per replica-hour are 250 × 3,600 × 0.60 = 540,000. GPU-hours needed are 600,000,000 ÷ 540,000 = 1,111.1, above the 730-hour floor. GPU cost is 1,111.1 × $2.00 = $2,222, and TCO is $2,222 + $1,500 = $3,722."
  incorrectFeedback="Work the four steps. Effective tokens per replica-hour: 250 × 3,600 × 0.60 = 540,000. GPU-hours needed: 600,000,000 ÷ 540,000 × 1 = 1,111.1. Floor: 1 × 1 × 730 = 730, so bill 1,111.1. GPU cost: 1,111.1 × $2.00 = $2,222.22. TCO: $2,222.22 + $1,500 = $3,722.22."
/>

<p class="ie-objective">Practices objective 8: calculate monthly total cost of ownership</p>
<NumericQuestion
  id="pr_tco_compare"
  question="A small product uses 400 million input and 200 million output tokens per month. An API charges $0.60 per million input tokens and $2.40 per million output tokens. A dedicated option would use replicas of 2 GPUs at 400 output tokens per second, planned at 70 percent utilization, with min replicas of 2, $3.00 per GPU-hour, and $1,000 per month of engineering. By how many dollars per month is the cheaper option cheaper?"
  answer={9040}
  tolerancePct={1}
  unit="dollars"
  correctFeedback="Correct. The API costs 400 × $0.60 + 200 × $2.40 = $720. The dedicated deployment needs only 397 GPU-hours, but its floor is 2 × 2 × 730 = 2,920 GPU-hours, so it bills 2,920 × $3.00 = $8,760, plus $1,000 of engineering, for $9,760. The API is cheaper by $9,040."
  incorrectFeedback="API: 400 × $0.60 + 200 × $2.40 = $240 + $480 = $720. Dedicated: effective tokens per replica-hour are 400 × 3,600 × 0.70 = 1,008,000, so needed GPU-hours are 200,000,000 ÷ 1,008,000 × 2 = 397. The floor is 2 × 2 × 730 = 2,920, which is larger, so the GPU cost is 2,920 × $3.00 = $8,760. TCO is $8,760 + $1,000 = $9,760. The difference is $9,760 − $720 = $9,040 in favor of the API."
/>

<p class="ie-objective">Practices objective 8: calculate monthly total cost of ownership</p>
<Sorting
  id="kc_ce_drivers"
  question="In this chapter's cost model, sort each input by the monthly cost it changes."
  items={[
    'Price per million output tokens',
    'GPU price per hour',
    'Minimum always-on replicas',
    'Average output tokens per request',
    'Monthly engineering cost',
    'Target utilization',
  ]}
  targets={['Per-token API cost only', 'Dedicated cost only', 'Both costs']}
  correct={[0, 1, 1, 2, 1, 1]}
  correctFeedback="Correct. Token prices touch only the API bill. GPU price, the floor, engineering, and utilization touch only the dedicated bill. Output length changes both, because the API charges per output token and the dedicated estimate sizes GPU time by output tokens."
  incorrectFeedback="Trace each input through the two formulas. The API bill multiplies token counts by token prices. The dedicated bill converts output tokens into GPU-hours using throughput and utilization, applies the floor, multiplies by the GPU price, and adds engineering. Only output tokens per request appear in both."
/>

<p class="ie-objective">Practices objective 8: calculate monthly total cost of ownership</p>
<MultipleChoice
  id="kc_ce_method"
  question="A team pays $9,000 per month for GPUs that served 3 billion tokens, and it wants to know whether a per-token API would be cheaper. Which comparison should it make?"
  options={[
    'Compare $9,000 plus engineering with the API bill for the month’s input and output.',
    'Compare $3.00 per million tokens, the GPU bill per token, with the API’s output price.',
    'Compare the GPU price per hour with the API’s price per million tokens for input.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Convert the API price into a monthly total for the same workload, with input and output priced separately, and compare it with the dedicated TCO for the same month.',
    'Incorrect. $9,000 ÷ 3,000 million tokens is a reverse-engineered per-token price. It mixes input and output tokens and changes with every shift in batch size and traffic.',
    'Incorrect. A price per GPU-hour and a price per million tokens measure different units, so they cannot be compared directly.',
  ]}
/>
