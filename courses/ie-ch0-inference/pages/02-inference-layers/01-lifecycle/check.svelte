<script module>
  export const pageConfig = { title: 'Knowledge Check: The Model Lifecycle' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: The Model Lifecycle</h1>

<p>This check is ungraded. Choose an answer to see feedback.</p>

<MultipleChoice
  id="kc_lifecycle_1"
  question="A research lab runs an optimization process over a large text corpus for six weeks and produces a new set of model weights. Which lifecycle phase is this?"
  options={['Inference', 'Serving', 'Training']}
  correct={2}
  optionFeedback={[
    'Incorrect. Inference uses weights that already exist to answer requests. This lab is producing the weights.',
    'Incorrect. Serving is another name for inference. It happens after the weights exist.',
    'Correct. Training is the process of learning model weights from data.',
  ]}
/>

<MultipleChoice
  id="kc_lifecycle_2"
  question="A team copies the weights of a generative AI model onto rented GPUs and expects fast, reliable production service. According to the chapter, what does this plan lack?"
  options={[
    'A CPU fleet that runs beside the GPUs',
    'A retraining step on production data',
    'Runtime, infrastructure, and tooling layers',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Classic ML models ran on lightweight CPUs. Adding CPUs does not make generative AI inference fast or reliable.',
    'Incorrect. Retraining changes the weights. The problem the chapter describes is serving the weights well.',
    'Correct. Weights plus GPUs are not enough. Production inference needs all three layers working together.',
  ]}
/>
