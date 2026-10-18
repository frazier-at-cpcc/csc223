<script module>
  export const pageConfig = { title: 'Knowledge Check: Online Versus Offline' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Online Versus Offline</h1>

<p>Answer these practice questions. They do not count toward your score.</p>

<MultipleChoice
  id="kc_online_1"
  question="Why does higher throughput lower inference cost at scale?"
  options={[
    'Each request finishes faster for its user',
    'Fewer GPUs can serve the same number of users',
    'The team can replace the model with a smaller one',
  ]}
  correct={1}
  optionFeedback={[
    'Not quite. Faster individual requests describe lower latency. A throughput-optimized system may make each request slower.',
    'Correct. Throughput is total work per unit time, so more throughput per GPU means fewer GPUs for the same load.',
    'Not quite. Changing the model is a model selection decision, not a property of throughput.',
  ]}
/>

<MultipleChoice
  id="kc_online_2"
  question="A company uses Whisper for live dictation and for nightly transcription of its podcast archive. Both workloads have high volume. Which setup is most cost-effective?"
  options={[
    'One deployment optimized for latency that serves both workloads',
    'One deployment optimized for throughput that serves both workloads',
    'Two deployments of the same model, one tuned for latency and one for throughput',
  ]}
  correct={2}
  optionFeedback={[
    'Not quite. A latency-optimized deployment wastes GPU capacity on the archive job, which does not need fast individual responses.',
    'Not quite. A throughput-optimized deployment makes each dictation request too slow for a live user.',
    'Correct. With enough volume on each side, separate deployments let each workload get the optimization it needs.',
  ]}
/>
