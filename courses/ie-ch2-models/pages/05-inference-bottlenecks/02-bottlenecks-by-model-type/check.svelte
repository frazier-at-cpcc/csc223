<script module>
  export const pageConfig = { title: 'Knowledge Check: Bottlenecks by Model Type' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Bottlenecks by Model Type</h1>

<p>
  These questions are ungraded and practice objective 8, classifying an operation by calculating its arithmetic
  intensity. Retry them as often as you like.
</p>

<NumericQuestion
  id="kc_bottle_1"
  question="A decode step runs a batch of 8 requests through a 5,120 × 5,120 weight matrix stored in FP16. Ignoring the activation bytes, what is the arithmetic intensity of this linear layer, in operations per byte?"
  answer={8}
  unit="operations per byte"
  correctFeedback="Operations = 2 × 8 × 5,120² and bytes = 2 × 5,120², so the intensity is 8. On an H100, with a ridge near 295, this layer is memory bound."
  incorrectFeedback="Each of the 8 requests uses every weight once, as one multiply and one add: 2 × 8 × 5,120² operations. The FP16 weights take 2 × 5,120² bytes. The ratio is 8 operations per byte."
/>

<NumericQuestion
  id="kc_bottle_2"
  question="The same kind of layer stores its weights in FP8, at 1 byte per weight, and runs a decode batch of 32 requests. Ignoring the activation bytes, what is its arithmetic intensity, in operations per byte?"
  answer={64}
  unit="operations per byte"
  correctFeedback="Operations = 2 × 32 × d², and the FP8 weights take only d² bytes, so the intensity is 64. Halving the bytes per weight doubles the intensity."
  incorrectFeedback="Operations are still 2 × batch × d² = 64 × d². The FP8 weights take 1 × d² bytes, not 2 × d², so the intensity is 64 × d² / d² = 64."
/>

<MultipleChoice
  id="kc_bottle_3"
  question="Users report that an LLM endpoint streams tokens slowly after the first token appears. Which phase limits this metric, and what is that phase's usual bottleneck?"
  options={['Decode, which is usually memory bound', 'Prefill, which is usually compute bound', 'Prefill, which is usually memory bound']}
  correct={0}
  optionFeedback={[
    'Correct. Every token after the first comes from a decode step, and decode is usually memory bound.',
    'Incorrect. Prefill produces the first token and sets time to first token. The slowness here occurs after the first token appears.',
    'Incorrect. Prefill sets time to first token, and it is usually compute bound, not memory bound.',
  ]}
/>
