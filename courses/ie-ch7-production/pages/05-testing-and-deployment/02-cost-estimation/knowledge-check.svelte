<script module>
  export const pageConfig = { title: 'Knowledge Check: Cost Estimation' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Cost Estimation</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

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
