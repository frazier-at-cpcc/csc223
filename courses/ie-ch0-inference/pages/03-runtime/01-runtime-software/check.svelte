<script module>
  export const pageConfig = { title: 'Knowledge Check: Runtime Scope and Software' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Runtime Scope and Software</h1>

<p>This check is ungraded. Choose an answer to see feedback.</p>

<MultipleChoice
  id="kc_runtime_1"
  question="Which of these tasks belongs to the infrastructure layer instead of the runtime layer?"
  options={[
    'Adding replicas in a second region when traffic grows',
    'Choosing an inference engine for a model',
    'Replacing an attention kernel with FlashAttention',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Adding replicas across regions is an infrastructure problem. The runtime layer stops at the boundary of a single instance.',
    'Incorrect. The inference engine is part of the runtime software stack.',
    'Incorrect. Kernel optimization is low-level runtime work on a single instance.',
  ]}
/>

<MultipleChoice
  id="kc_runtime_2"
  question="In the runtime software stack, which component do vLLM, SGLang, and TensorRT-LLM represent?"
  options={['GPU programming platforms', 'Inference engines', 'Model training frameworks']}
  correct={1}
  optionFeedback={[
    'Incorrect. CUDA is the GPU programming platform at the bottom of the stack.',
    'Correct. vLLM, SGLang, and TensorRT-LLM are inference engines that build on PyTorch and CUDA.',
    'Incorrect. These tools serve models in production. They are not used to learn model weights.',
  ]}
/>
