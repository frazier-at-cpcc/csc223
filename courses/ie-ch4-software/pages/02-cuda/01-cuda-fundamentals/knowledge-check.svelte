<script module>
  export const pageConfig = { title: 'Knowledge Check: CUDA Fundamentals' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: CUDA Fundamentals</h1>

<p>
  These questions are ungraded. All three practice objective 2: distinguish the
  CUDA components and kernel libraries by the role each one plays in inference.
</p>

<Matching
  id="kc_cuda_match"
  question="Match each CUDA component to the job it does."
  pairs={[
    { left: 'CUDA kernel', right: 'Runs one parallel function across many GPU threads' },
    { left: 'CUDA graph', right: 'Replays a recorded sequence of GPU operations with one launch' },
    { left: 'CUDA driver', right: 'Connects applications to the GPU hardware from the host machine' },
    { left: 'CUDA runtime', right: 'Gives developers an API to launch kernels and manage memory' },
  ]}
  correctFeedback="The kernel does the work, the graph replays work, the runtime is the developer-facing API, and the driver is the low-level link to the hardware."
  incorrectFeedback="Separate the levels. The kernel is the function itself. The graph records a sequence of operations. The runtime is the API developers call. The driver sits below the runtime, on the host, and talks to the hardware."
/>

<MultipleChoice
  id="kc_cuda_graph"
  question="A service runs the same sequence of kernel launches on every decode step. Which CUDA component captures that sequence so the GPU can replay it efficiently?"
  options={['CUDA driver', 'CUDA graph', 'CUDA kernel', 'CUDA runtime']}
  correct={1}
  optionFeedback={[
    'The driver is the low-level interface to the hardware. It does not record a reusable sequence of operations.',
    'Correct. A CUDA graph is a directed acyclic graph of kernels and other GPU operations that the GPU replays with one launch.',
    'A kernel is one parallel function. The question asks for the structure that holds a sequence of kernels.',
    'The runtime is the API used to launch kernels and manage memory. It does not itself capture a repeated workflow.',
  ]}
/>

<MultipleChoice
  id="kc_cuda_nvcc"
  question="A developer writes a CUDA program in C++. What does the nvcc compiler produce from that program?"
  options={[
    'A binary that runs entirely on the CPU',
    'A Python package that wraps the GPU code',
    'Separate code for the CPU and for the GPU',
  ]}
  correct={2}
  optionFeedback={[
    'The purpose of CUDA is to run code on the GPU. A CPU-only binary would discard the kernel.',
    'Python wrappers come from frameworks such as PyTorch, not from nvcc.',
    'Correct. CUDA is a platform, not a language. A compiler such as nvcc splits the C++ program into CPU code and GPU code.',
  ]}
/>
