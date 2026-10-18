<script module>
  export const pageConfig = { title: 'Knowledge Check: Why Quantize' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Why Quantize</h1>
<p>These questions are ungraded. Both practice objective 3: evaluating a quantization plan for its expected speedup.</p>

<Sorting
  id="kc_why_1"
  question="Sort each quantization change by the phase of inference it speeds up most."
  items={[
    'FP8 weights halve the bytes read for every generated token',
    'FP8 activations and weights run matrix multiplications on FP8 Tensor Cores',
    'A smaller KV cache lets each decode step read fewer bytes per token',
    'Lower-precision math raises the FLOPS available to process a long prompt',
  ]}
  targets={['Mainly prefill', 'Mainly decode']}
  correct={[1, 0, 1, 0]}
  correctFeedback="Correct. Faster Tensor Core math helps compute-bound prefill. Fewer bytes per weight or per cache entry helps memory-bound decode."
  incorrectFeedback="Prefill is compute bound, so it gains when both operands move to faster low-precision Tensor Core math. Decode is memory bound, so it gains whenever fewer bytes must be read, whether those bytes are weights or KV cache entries."
/>

<MultipleChoice
  id="kc_why_2"
  question="A chatbot streams 40 tokens per second per user with BF16 weights. The team quantizes weights and activations to FP8 and changes nothing else. Which per-user speed should the team plan for?"
  options={['About 40 tokens per second', 'About 56 tokens per second', 'About 80 tokens per second', 'About 160 tokens per second']}
  correct={1}
  optionFeedback={[
    'Incorrect. Decode is memory bound, so reading half as many bytes per weight does raise its speed.',
    'Correct. One level of quantization yields roughly 30 to 50 percent more speed, so about 52 to 60 tokens per second.',
    'Incorrect. Doubling assumes quantization adds no overhead. Scale factors and conversions keep the gain below 100 percent.',
    'Incorrect. Halving the bits cannot more than double speed, and overhead keeps the gain lower still.',
  ]}
/>
