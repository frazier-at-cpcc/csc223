<script module>
  export const pageConfig = { title: 'Knowledge Check: How Speculation Works' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: How Speculation Works</h1>
<p>These questions are ungraded. All three practice objective 4: calculating and reasoning about the tokens one target pass produces.</p>

<NumericQuestion
  id="kc_spec_1"
  question="A speculator proposes six draft tokens. The target model accepts the first four and rejects the fifth. How many tokens does this target pass produce?"
  answer={5}
  unit="tokens"
  correctFeedback="Correct. Four accepted drafts plus the target model's own token at the rejected position give 4 + 1 = 5 tokens."
  incorrectFeedback="Count the accepted drafts, N = 4, and add the one token the target model supplies at the rejected position: N + 1 = 5. The sixth draft is discarded because it follows the rejected fifth draft."
/>

<MultipleChoice
  id="kc_spec_2"
  question="Traffic grows and the inference engine runs at very large batch sizes. Why should the engine disable speculative decoding?"
  options={[
    'Large batches lower the acceptance rate of every draft',
    'Large batches make every draft sequence longer than planned',
    'Large batches raise the time to first token for all users',
    'Large batches use the spare compute that verification needs',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Acceptance depends on factors such as temperature and subject matter, not on batch size.',
    'Incorrect. Batch size does not change draft sequence length, which the operator configures.',
    'Incorrect. Speculation never affects time to first token, which prefill determines.',
    'Correct. Speculation relies on idle compute during memory-bound decode. Large batches saturate that compute, so each extra position costs a full step.',
  ]}
/>

<MultipleChoice
  id="kc_spec_3"
  question="Which latency metric does speculative decoding leave unchanged?"
  options={['End-to-end latency', 'Inter-token latency', 'Time to first token']}
  correct={2}
  optionFeedback={[
    'Incorrect. Faster decode shortens the time to finish the whole output.',
    'Incorrect. More tokens per forward pass shortens the average time between tokens.',
    'Correct. The first token comes from prefill, and speculation acts only during decode.',
  ]}
/>
