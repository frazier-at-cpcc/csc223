<script module>
  export const pageConfig = { title: 'Knowledge Check: How Speculation Works' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: How Speculation Works</h1>
<p>These questions are ungraded.</p>

<MultipleChoice
  id="kc_spec_1"
  question="Traffic grows and the inference engine runs at very large batch sizes. Why should the engine disable speculative decoding?"
  options={[
    'Draft tokens become longer at large batch sizes',
    'Large batches leave no spare compute for verification',
    'Large batches lower the acceptance rate of every draft',
    'Large batches raise the time to first token',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Batch size does not change draft sequence length, which the operator configures.',
    'Correct. Speculation relies on idle compute during memory-bound decode, and large batches saturate that compute.',
    'Incorrect. Acceptance depends on factors such as temperature and subject matter, not on batch size.',
    'Incorrect. Speculation never affects time to first token, which prefill determines.',
  ]}
/>

<MultipleChoice
  id="kc_spec_2"
  question="Which latency metric does speculative decoding leave unchanged?"
  options={['Inter-token latency', 'Time to first token', 'Tokens per second', 'Total generation time']}
  correct={1}
  optionFeedback={[
    'Incorrect. More tokens per forward pass shortens the time between tokens.',
    'Correct. The first token comes from prefill, and speculation acts only during decode.',
    'Incorrect. Raising tokens per second is the purpose of speculative decoding.',
    'Incorrect. Faster decode shortens the time to finish the whole output.',
  ]}
/>
