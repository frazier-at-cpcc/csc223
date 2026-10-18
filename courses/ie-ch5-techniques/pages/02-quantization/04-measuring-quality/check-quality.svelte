<script module>
  export const pageConfig = { title: 'Knowledge Check: Measuring Quality' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Measuring Quality</h1>
<p>These questions are ungraded. Both practice objective 3: evaluating a quantization plan for its quality risk.</p>

<Matching
  id="kc_quality_1"
  question="Match each quality check to what it measures."
  pairs={[
    { left: 'Perplexity', right: 'How likely the model finds a reference text, without generating any output' },
    { left: 'Intelligence benchmark', right: 'Scores on a fixed public test of broad knowledge or skill' },
    { left: 'Custom eval', right: 'Scores on tasks built from the product’s own real usage' },
  ]}
  correctFeedback="Correct. The three checks run from simplest and most general to most representative of real users."
  incorrectFeedback="Perplexity scores prediction of a reference text with no generation. A benchmark such as MMLU tests broad ability. A custom eval tests the tasks your users actually send."
/>

<MultipleChoice
  id="kc_quality_2"
  question="After an FP4 quantization, a model's perplexity rises well beyond its run-to-run variation. What should the team do next?"
  options={[
    'Deploy the model, because perplexity does not measure generated output',
    'Raise the sampling temperature to offset the higher perplexity',
    'Repeat the quantization with FP8 or with fewer quantized components',
    'Skip the remaining checks, because perplexity already proved a loss',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. A perplexity increase beyond noise shows the model is more surprised by expected sequences, which signals quality loss.',
    'Incorrect. Temperature changes sampling. It does not repair precision errors in the weights.',
    'Correct. Quantization is a scale. A higher precision or weights-only quantization lowers the risk of quality loss.',
    'Incorrect. The loss is already clear, so the next step is a less aggressive quantization, which then needs all three checks.',
  ]}
/>
