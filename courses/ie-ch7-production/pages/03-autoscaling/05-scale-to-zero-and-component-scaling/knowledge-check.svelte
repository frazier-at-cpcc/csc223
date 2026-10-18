<script module>
  export const pageConfig = { title: 'Knowledge Check: Scale to Zero and Component Scaling' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Scale to Zero and Component Scaling</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_sz_1"
  question="Which workload is the best fit for scale to zero?"
  options={[
    'A customer support chatbot with light, unpredictable traffic around the clock',
    'A nightly job that summarizes the previous day of documents',
    'A real-time voice assistant that must answer within 300 milliseconds',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Light, unscheduled, latency-sensitive traffic means random users pay the cold start. The chapter suggests pay-per-token APIs for this case.',
    'Correct. Periodic batch work has no user waiting live, so cold starts on the first request are acceptable.',
    'Incorrect. A tight latency target cannot absorb a cold start on the first request.',
  ]}
/>

<MultipleChoice
  id="kc_sz_2"
  question="A 4-step pipeline has a 500-millisecond latency SLA. Messages take 10 milliseconds within a cluster and 50 milliseconds between clusters. What share of the SLA is lost if every step runs in a different cluster?"
  options={['8 percent', '32 percent', '40 percent']}
  correct={1}
  optionFeedback={[
    'Incorrect. This figure uses the 40-millisecond penalty for only one step. The penalty applies at each of the 4 steps.',
    'Correct. Each step adds 50 − 10 = 40 milliseconds. Four steps add 160 milliseconds, which is 32 percent of 500 milliseconds.',
    'Incorrect. This figure uses the full 50 milliseconds per step. Only the 40-millisecond difference is extra delay.',
  ]}
/>
