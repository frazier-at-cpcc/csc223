<script module>
  export const pageConfig = { title: 'Knowledge Check: Latency Percentiles' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Latency Percentiles</h1>

<p>Answer these practice questions. They do not count toward your score. Each item names the objective it practices.</p>

<p class="ie-obj">Objective 9: Diagnose where to direct optimization work.</p>

<Matching
  id="kc_pct_1"
  question="Match each latency percentile to the share of requests that are slower than its value."
  pairs={[
    { left: 'P50', right: '1 request in every 2' },
    { left: 'P90', right: '1 request in every 10' },
    { left: 'P95', right: '1 request in every 20' },
    { left: 'P99', right: '1 request in every 100' },
  ]}
  correctFeedback="Correct. The number after the P is the percentage of requests at or below the value, so the rest are slower."
  incorrectFeedback="Not yet. Subtract the number after the P from 100 to get the percentage of slower requests. P95 leaves 5 percent, which is 1 in 20."
/>

<p class="ie-obj">Objective 9: Diagnose where to direct optimization work.</p>

<NumericQuestion
  id="kc_pct_2"
  question="A service handles 250,000 requests a day and reports a P99 TTFT of 3 seconds. About how many requests that day wait longer than 3 seconds for the first token?"
  answer={2500}
  tolerancePct={1}
  unit="requests"
  correctFeedback="Correct. One percent of 250,000 is 2,500 requests."
  incorrectFeedback="P99 leaves 1 percent of requests above the value: 250,000 × 0.01 = 2,500 requests. A tail that looks small as a percentage is still thousands of slow experiences."
/>

<p class="ie-obj">Objective 9: Diagnose where to direct optimization work.</p>

<MultipleChoice
  id="kc_pct_3"
  question="A team compares two engine settings for a reading app that needs 90 percent of streams to stay above 40 tokens per second. Setting A has a mean perceived TPS of 70, and 90 percent of its streams exceed 55. Setting B has a mean perceived TPS of 80, and 90 percent of its streams exceed 25. Which setting meets the need?"
  options={[
    'Setting A, because 90 percent of its streams exceed 40 tokens per second',
    'Setting B, because its mean perceived TPS is higher',
    'Both settings, because both means are far above 40 tokens per second',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. For TPS the slow tail sits at the low end. Setting A keeps 90 percent of streams above 55. The speed that 90 percent of Setting B\'s streams beat is only 25, below the 40 the app needs.',
    'Not quite. A higher mean can hide a slow low-end tail. The speed that 90 percent of Setting B\'s streams beat is only 25 tokens per second.',
    'Not quite. The need is stated for 90 percent of streams, not for the mean. Setting B misses it.',
  ]}
/>
