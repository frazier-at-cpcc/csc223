<script module>
  export const pageConfig = { title: 'Knowledge Check: Fine-Tuning and Distillation' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Fine-Tuning and Distillation</h1>

<p>Answer these practice questions. They do not count toward your score.</p>

<MultipleChoice
  id="kc_adapt_1"
  question="What does fine-tuning change in a pre-trained model?"
  options={[
    'The number of layers in the architecture',
    'The tokenizer vocabulary',
    'The values of the weights',
  ]}
  correct={2}
  optionFeedback={[
    'Not quite. Fine-tuning keeps the same overall architecture, including the layer count.',
    'Not quite. Fine-tuning trains on new data with the existing tokenizer.',
    'Correct. Fine-tuning adjusts weight values while the architecture stays the same.',
  ]}
/>

<MultipleChoice
  id="kc_adapt_2"
  question="DeepSeek released distilled versions of its 671-billion-parameter R1 model built on Llama 3 and Qwen 2.5. Which inference advantage did building on those architectures give the distills?"
  options={[
    'Existing performance tooling built for Llama and Qwen',
    'Higher intelligence benchmark scores than the full R1 model',
    'Training that was independent of the R1 teacher model',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Popular architectures already had extensive performance work, which the small distills could use.',
    'Not quite. The distills scored lower on intelligence benchmarks than the full model.',
    'Not quite. A distill learns from its teacher by definition. Independent training describes how labs build model families.',
  ]}
/>
