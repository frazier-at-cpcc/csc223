<script module>
  export const pageConfig = { title: 'Knowledge Check: Kernels for Inference' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Kernels for Inference</h1>

<p>These questions are ungraded. Use the feedback to confirm your understanding.</p>

<MultipleChoice
  id="kc_kernels_1"
  question="An inference engine needs ready-made, optimized attention kernels and fused sampling functions for an LLM. Which library supplies these directly?"
  options={['cuBLAS', 'cuDNN', 'CuTe', 'FlashInfer']}
  correct={3}
  optionFeedback={[
    'cuBLAS supplies linear algebra kernels such as GEMM, not LLM-specific attention and sampling kernels.',
    'cuDNN supplies general neural network primitives, not LLM-specific attention and sampling kernels.',
    'CuTe is a template library for writing tiled tensor kernels. It provides building blocks, not finished attention kernels.',
    'Correct. FlashInfer provides high-performance kernels for LLM inference, including attention kernels and fused sampling functions.',
  ]}
/>

<MultipleChoice
  id="kc_kernels_2"
  question="A handwritten kernel runs well on an H100. Why might it perform poorly after the team moves to a B200?"
  options={[
    'The B200 cannot execute code compiled from C++.',
    'The kernel encodes hardware details specific to the H100.',
    'The kernel stores model weights in an incompatible format.',
    'The B200 uses a different CUDA programming language.',
  ]}
  correct={1}
  optionFeedback={[
    'Every NVIDIA GPU runs compiled CUDA C++. The problem is the hard-coded assumptions inside the kernel.',
    'Correct. Kernels often hard-code values based on memory bandwidth or Tensor Core layout, so they fail to use a newer architecture fully.',
    'Kernels compute on data. Weight file formats are a separate concern.',
    'CUDA is not a language. Kernels for every NVIDIA GPU are written in a language such as C++.',
  ]}
/>
