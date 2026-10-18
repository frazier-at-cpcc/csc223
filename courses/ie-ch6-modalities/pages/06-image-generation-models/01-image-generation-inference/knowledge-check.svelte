<script module>
  export const pageConfig = { title: 'Knowledge Check: Image Generation' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Image Generation</h1>

<p>This check is ungraded. Use it to confirm your understanding before you continue.</p>

<MultipleChoice
  id="kc_image_1"
  question="An engineer compiles an image generation model with Torch compilation on an H100 node and caches the compiled engine. The team then deploys the cached engine to a new B200 cluster. What should the engineer do?"
  options={[
    'Recompile the model on a B200, because compilation targets the GPU that performs it',
    'Reuse the cached engine, because Torch compilation output is portable across GPUs',
    'Skip compilation on B200, because Blackwell GPUs fuse kernels in hardware',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Torch compilation targets the specific GPU model and architecture that performs it. Compile on a B200 to run on a B200.',
    'Compiled engines are specific to the GPU model and architecture used during compilation.',
    'Kernel fusion comes from compilation software, not from the GPU hardware.',
  ]}
/>
