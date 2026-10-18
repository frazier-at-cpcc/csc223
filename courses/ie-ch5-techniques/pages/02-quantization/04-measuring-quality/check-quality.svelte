<script module>
  export const pageConfig = { title: 'Knowledge Check: Measuring Quality' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Measuring Quality</h1>
<p>This question is ungraded.</p>

<MultipleChoice
  id="kc_quality_1"
  question="After an FP4 quantization, a model's perplexity rises well beyond its run-to-run variation. What should the team do next?"
  options={[
    'Deploy the model, because perplexity does not measure generated output',
    'Increase the sampling temperature to offset the higher perplexity',
    'Repeat the quantization with FP8 or with fewer quantized components',
    'Switch the deployment to speculative decoding instead of measuring quality',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. A perplexity increase beyond noise shows the model is more surprised by expected sequences, which signals quality loss.',
    'Incorrect. Temperature changes sampling. It does not repair precision errors in the weights.',
    'Correct. Quantization is a scale. A higher precision or weights-only quantization lowers the risk of quality loss.',
    'Incorrect. Speculative decoding is lossless, but it does not address the quality loss this quantization introduced.',
  ]}
/>
