<script module>
  export const pageConfig = { title: 'Knowledge Check: The Software Stack' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: The Software Stack</h1>

<p>
  These questions are ungraded. Both practice objective 1: classify an inference
  engineering task by the level of the software stack where it happens.
</p>

<Sorting
  id="kc_stack_sort"
  question="Sort each task into the level of the software stack where it happens."
  items={[
    'Write a C++ function that doubles every value of an array on the GPU',
    'Swap in a DeepGEMM kernel for one FP8 matrix multiplication',
    'Define a network as a Python class with linear layers',
    'Call torch.compile on a custom research model',
    'Pass --tensor-parallel-size 8 to vllm serve',
    'Turn on EAGLE speculation flags for an SGLang server',
    'Set a planner target that scales decode workers when time to first token rises',
    'Route each request to the node that already caches its prefix',
  ]}
  targets={['CUDA', 'Deep learning frameworks', 'Inference engines', 'NVIDIA Dynamo']}
  correct={[0, 0, 1, 1, 2, 2, 3, 3]}
  correctFeedback="Kernel code and kernel choice sit at the CUDA level, Python model code at the framework level, launch flags at the engine level, and cluster-wide planning and routing at the Dynamo level."
  incorrectFeedback="Ask which artifact each task changes. Kernel code or kernel choice is CUDA. Python model code is the framework. Engine launch flags are the engine. Scaling and routing across many workers is Dynamo."
/>

<MultipleChoice
  id="kc_stack_fix"
  question="A team serves a model with vLLM on new GPUs. A profile shows that one attention kernel uses only a fraction of the new GPU's memory bandwidth, because the kernel was tuned for the previous generation. Where does the fix belong?"
  options={[
    'A change at the CUDA level',
    'A larger batch-size flag on vLLM',
    'An NVIDIA Dynamo routing policy',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The problem lives in the kernel, so the fix belongs at the CUDA level: select or port a kernel tuned for the new architecture.',
    'An engine flag changes how much work each step carries. It does not change how the kernel uses the new hardware.',
    'Routing decides which worker receives a request. Every worker would still run the same poorly matched kernel.',
  ]}
/>
