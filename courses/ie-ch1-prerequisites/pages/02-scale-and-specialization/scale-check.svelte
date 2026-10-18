<script module>
  export const pageConfig = { title: 'Knowledge Check: Scale and Specialization' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Scale and Specialization</h1>

<p>Answer these practice questions. They do not count toward your score.</p>

<MultipleChoice
  id="kc_scale_1"
  question="How does a provider charge for shared inference?"
  options={[
    'A fixed monthly fee for reserved GPU nodes',
    'A rate per hour of rented GPU time',
    'A rate per million tokens or another consumption metric',
  ]}
  correct={2}
  optionFeedback={[
    'Not quite. Reserved GPU capacity is a dedicated arrangement. Shared inference has no fixed fee.',
    'Not quite. Paying per GPU hour describes a dedicated deployment.',
    'Correct. Shared inference bills by consumption, most often per million tokens.',
  ]}
/>

<MultipleChoice
  id="kc_scale_2"
  question="A product runs a speech model, an LLM, and a voice model for every user turn. Network hops between three providers add delay to each turn. Which reason for a dedicated deployment does this situation match?"
  options={['Orchestration', 'Scale', 'Specialization']}
  correct={0}
  optionFeedback={[
    'Correct. Multi-model pipelines benefit from dedicated deployments that cut network latency and deployment complexity.',
    'Not quite. Scale concerns traffic volume and per-token cost. The problem here is the delay between models.',
    'Not quite. Specialization concerns custom models or strict latency and uptime targets. The problem here is coordinating several models.',
  ]}
/>
