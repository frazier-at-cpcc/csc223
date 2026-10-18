<script module>
  export const pageConfig = { title: 'Knowledge Check: CUDA Fundamentals' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: CUDA Fundamentals</h1>

<p>These questions are ungraded. Use the feedback to confirm your understanding.</p>

<MultipleChoice
  id="kc_cuda_1"
  question="A service runs the same sequence of kernel launches on every decode step. Which CUDA component captures that sequence so the GPU can replay it efficiently?"
  options={['CUDA driver', 'CUDA graph', 'CUDA kernel', 'CUDA runtime']}
  correct={1}
  optionFeedback={[
    'The driver is the low-level interface to the hardware. It does not record a reusable sequence of operations.',
    'Correct. A CUDA graph is a directed acyclic graph of kernels and other GPU operations for optimizing repeated workflows.',
    'A kernel is one parallel function. The question asks for the structure that holds a sequence of kernels.',
    'The runtime is the API used to launch kernels and manage memory. It does not itself capture a repeated workflow.',
  ]}
/>

<MultipleChoice
  id="kc_cuda_2"
  question="A developer writes a CUDA program in C++. What does the nvcc compiler produce from that program?"
  options={[
    'A Python package that wraps the GPU code',
    'Separate code for the CPU and for the GPU',
    'A binary that runs entirely on the CPU',
    'Model weights in the safetensors format',
  ]}
  correct={1}
  optionFeedback={[
    'Python wrappers come from frameworks such as PyTorch, not from nvcc.',
    'Correct. CUDA is not a language. A compiler such as nvcc splits the C++ program into CPU code and GPU code.',
    'The purpose of CUDA is to run code on the GPU. A CPU-only binary would discard the kernel.',
    'Safetensors is a format for model weights. A compiler produces executable code.',
  ]}
/>
