<script module>
  export const pageConfig = { title: 'Knowledge Check: End-to-End Metrics' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: End-to-End Metrics</h1>

<p>Answer these practice questions. They do not count toward your score.</p>

<MultipleChoice
  id="kc_e2e_1"
  question="Which measurement reflects how fast users perceive an application to be?"
  options={['End-to-end latency', 'Inference time', 'Total TPS']}
  correct={0}
  optionFeedback={[
    'Correct. End-to-end latency includes network and queue time, which users experience along with inference.',
    'Not quite. Inference time covers only on-GPU work and leaves out network and queue delays.',
    'Not quite. Total TPS is a throughput metric for the whole service, not a measure of one user\'s wait.',
  ]}
/>

<MultipleChoice
  id="kc_e2e_2"
  question="Inference time is 1,100 milliseconds, and end-to-end latency is 1,200 milliseconds. Where should the team focus its work?"
  options={[
    'Model performance optimization',
    'Network routing between regions',
    'Request queue capacity',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Inference accounts for over 90 percent of the wait, so faster inference gives the largest gain.',
    'Not quite. Network and queue delays together add only 100 milliseconds here.',
    'Not quite. Queue time is part of the 100 milliseconds outside the GPU, which is a small share of the wait.',
  ]}
/>
