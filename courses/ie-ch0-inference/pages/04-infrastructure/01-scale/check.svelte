<script module>
  export const pageConfig = { title: 'Knowledge Check: Levels of Scale' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Levels of Scale</h1>

<p>This check is ungraded. Choose an answer to see feedback.</p>

<MultipleChoice
  id="kc_scale_1"
  question="A startup serves one model on a dozen GPUs in a single region. Traffic triples every afternoon and drops overnight. Which infrastructure problem defines this stage?"
  options={['Autoscaling', 'Capacity', 'Silos']}
  correct={0}
  optionFeedback={[
    'Correct. At this scale the problem is knowing when to add and remove replicas and doing so quickly.',
    'Incorrect. Capacity defines the problem past a few hundred GPUs, when finding enough GPUs becomes the limit.',
    'Incorrect. Silos appear after workloads spread across several regions and clouds. This startup runs in one region.',
  ]}
/>

<MultipleChoice
  id="kc_scale_2"
  question="Why do inference engineers spread workloads across multiple regions and cloud providers once they pass a few hundred GPUs?"
  options={[
    'To get access to enough GPUs',
    'To lower the precision of the model',
    'To run prefill and decode separately',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Past a few hundred GPUs, capacity defines the problem, and no single region or cloud supplies enough.',
    'Incorrect. Lowering precision is quantization, a runtime technique. It does not depend on regions or clouds.',
    'Incorrect. Separating prefill and decode is disaggregation, a runtime technique.',
  ]}
/>
