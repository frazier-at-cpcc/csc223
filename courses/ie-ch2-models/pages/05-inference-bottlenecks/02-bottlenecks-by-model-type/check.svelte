<script module>
  export const pageConfig = { title: 'Knowledge Check: Bottlenecks by Model Type' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Bottlenecks by Model Type</h1>

<p>These questions are ungraded. Retry them as often as you like.</p>

<MultipleChoice
  id="kc_bottle_1"
  question="Users report that an LLM endpoint streams tokens slowly after the first token appears. Which phase limits this metric, and what is that phase's usual bottleneck?"
  options={['Decode, which is usually memory bound', 'Prefill, which is usually compute bound', 'Prefill, which is usually memory bound']}
  correct={0}
  optionFeedback={[
    'Correct. Tokens per second after the first token is set by decode, and decode is usually memory bound.',
    'Incorrect. Prefill sets time to first token. The slowness here occurs after the first token appears.',
    'Incorrect. Prefill sets time to first token, and it is usually compute bound, not memory bound.',
  ]}
/>

<MultipleChoice
  id="kc_bottle_2"
  question="Why is LLM decode usually memory bound?"
  options={[
    'Each token loads the model weights for a small vector-matrix multiplication.',
    'Each token runs a large matrix-matrix multiplication over the whole input.',
    'Each token writes the full model weights back to memory after the forward pass.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Loading the weights for every token moves many bytes, while the vector-matrix work performs few operations, so arithmetic intensity is low.',
    'Incorrect. Large matrix-matrix multiplication over the whole input describes prefill, which has high arithmetic intensity.',
    'Incorrect. Inference reads the weights but does not write them back. The low intensity comes from reading weights for little work.',
  ]}
/>
