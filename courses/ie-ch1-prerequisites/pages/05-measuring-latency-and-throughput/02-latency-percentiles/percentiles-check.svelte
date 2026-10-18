<script module>
  export const pageConfig = { title: 'Knowledge Check: Latency Percentiles' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Latency Percentiles</h1>

<p>Answer these practice questions. They do not count toward your score.</p>

<MultipleChoice
  id="kc_pct_1"
  question="LLM response times form a right-skewed distribution. How does the mean response time compare with the median?"
  options={[
    'The mean is higher than the median',
    'The mean is lower than the median',
    'The mean is equal to the median',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Slow outliers in the long right tail pull the mean above the median.',
    'Not quite. A long tail of slow requests raises the mean. It does not lower it.',
    'Not quite. The mean equals the median only in a symmetric distribution.',
  ]}
/>

<MultipleChoice
  id="kc_pct_2"
  question="A service has a P99 latency of 4 seconds. Out of every 1,000 requests, how many take longer than 4 seconds?"
  options={['1', '10', '99']}
  correct={1}
  optionFeedback={[
    'Not quite. One in 1,000 would describe P99.9. P99 means one in every 100 requests is slower.',
    'Correct. One in every 100 requests is slower than P99, which is 10 in every 1,000.',
    'Not quite. The 99 in P99 means 99 percent of requests are at or below the value, so only 1 percent are slower.',
  ]}
/>
