<script module>
  export const pageConfig = {
    title: 'Chapter Quiz',
    quiz: { graded: true, maxAttempts: 3 },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Chapter Quiz</h1>

<p>
  This graded quiz has 12 questions that cover every objective in the chapter.
  A score of 70 percent or higher passes. You have three attempts, and the best
  score counts. Feedback for every option appears in the review after you submit.
</p>

<MultipleChoice
  id="q1_stack"
  question="A researcher defines a model in Python with linear layers, trains it with automatic gradients, and exports it to ONNX. At which level of the software stack does this work happen?"
  options={['CUDA', 'Deep learning frameworks', 'Inference engines', 'NVIDIA Dynamo']}
  correct={1}
  optionFeedback={[
    'CUDA is the level for writing GPU kernels directly. The researcher works in Python abstractions above CUDA.',
    'Correct. Defining, training, and exporting networks in Python is the role of deep learning frameworks such as PyTorch.',
    'Inference engines serve existing models through configuration. They do not train or export models.',
    'Dynamo orchestrates inference engines across large deployments. It plays no part in training or export.',
  ]}
/>

<MultipleChoice
  id="q2_cutlass"
  question="An engineer needs GEMM kernels tuned for unusual matrix shapes on a recent GPU. The engineer wants to write them at a higher level of abstraction than raw CUDA without losing performance. Which library fits this need?"
  options={['cuBLAS', 'cuDNN', 'CUTLASS', 'FlashInfer']}
  correct={2}
  optionFeedback={[
    'cuBLAS supplies pre-built, general GEMM kernels. It is the starting point the engineer wants to move beyond.',
    'cuDNN supplies primitives for neural networks. It does not provide building blocks for custom GEMM kernels.',
    'Correct. CUTLASS is a template library of building blocks for high-performance, architecture-tuned GEMM and related kernels.',
    'FlashInfer supplies finished attention and sampling kernels for LLM inference, not building blocks for custom GEMM.',
  ]}
/>

<MultipleChoice
  id="q3_kernel_port"
  question="A team runs DeepGEMM FP8 kernels as a plugin on Hopper H100 GPUs. The team plans to move the deployment to Blackwell B200 GPUs. What must the team do about the plugin kernel?"
  options={[
    'Confirm the kernel supports the new architecture, or replace or port it',
    'Convert the model weights to ONNX so the kernel becomes portable',
    'Keep the kernel unchanged, since newer GPUs run older kernels optimally',
    'Raise the batch size so the kernel fills the larger B200 memory',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. A manually selected kernel creates a compatibility obligation: confirm that the library supports Blackwell, swap back to a general kernel such as cuBLAS, or port the kernel.',
    'The weight format does not change the hardware assumptions coded into a kernel.',
    'Kernels hard-code hardware details. An H100 kernel will likely fail to use a B200 fully, and some kernels do not run across generations at all.',
    'Batch size does not fix a kernel written for another architecture.',
  ]}
/>

<MultipleChoice
  id="q4_fusion"
  question="Three elementwise kernels run back-to-back on one vector. Each kernel reads its input from memory and writes its output to memory, for three reads and three writes in total. An engineer fuses the three into a single kernel. What memory traffic does the fused kernel perform?"
  options={[
    'One read and one write',
    'Two reads and two writes',
    'Three reads and three writes',
    'Six reads and six writes',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The fused kernel reads the input once and writes the final result once. All intermediate writes and reads disappear.',
    'Two reads and two writes would result from fusing only two of the three kernels.',
    'Three reads and three writes is the unfused count. Fusion removes the intermediate round trips.',
    'Fusion reduces memory traffic. It never increases the number of accesses.',
  ]}
/>

<MultipleChoice
  id="q5_compile"
  question="A team is deciding where torch.compile will deliver the largest benefit. For which workload is torch.compile most useful?"
  options={[
    'A custom research architecture that no inference engine supports',
    'A model whose GEMM operations run in DeepGEMM plugin kernels',
    'A popular LLM whose attention runs in FlashAttention plugin kernels',
    'A transformers sample script used to check a model\'s outputs',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. torch.compile is most useful for less common architectures and long sequences of lightweight kernels.',
    'torch.compile cannot fuse plugin kernels such as DeepGEMM, which limits its benefit here.',
    'torch.compile cannot fuse plugin kernels such as FlashAttention, and most LLM kernels are custom plugins.',
    'Sample scripts serve to check input and output specifications. Their speed does not matter.',
  ]}
/>

<MultipleChoice
  id="q6_format"
  question="A team must ship a model file that holds both the weights and the execution graph. The file must run on GPUs from more than one vendor. Which format meets both requirements?"
  options={['bin', 'ONNX', 'safetensors', 'TensorRT engine']}
  correct={1}
  optionFeedback={[
    'A generic bin file holds weights and can execute arbitrary code on load. It is not a portable graph format.',
    'Correct. ONNX bundles weights with an execution graph and supports multiple hardware options.',
    'Safetensors holds weights only. It separates the weights from the architecture.',
    'A TensorRT engine runs on NVIDIA GPUs only.',
  ]}
/>

<MultipleChoice
  id="q7_vllm"
  question="A startup must serve a newly released open LLM on its release day. Its fleet mixes AMD GPUs and Google TPUs. The team wants solid performance with minimal setup. Which option fits?"
  options={['SGLang', 'TensorRT-LLM', 'transformers library', 'vLLM']}
  correct={3}
  optionFeedback={[
    'SGLang runs on NVIDIA and AMD GPUs but not on Google TPUs.',
    'TensorRT-LLM runs on NVIDIA GPUs only and has the steepest learning curve.',
    'The transformers library offers reference implementations, not a production serving engine.',
    'Correct. vLLM supports the widest range of hardware, including AMD GPUs and Google TPUs, and nearly every open LLM on release day.',
  ]}
/>

<MultipleChoice
  id="q8_trtllm"
  question="A team serves a well-supported model architecture on H100 GPUs. It will invest extra engineering effort to reach the best possible performance, and it plans to adopt NVIDIA Dynamo. Which option fits?"
  options={['SGLang', 'TensorRT-LLM', 'transformers library', 'vLLM']}
  correct={1}
  optionFeedback={[
    'SGLang performs well, but the book rates TensorRT-LLM best for peak performance on Hopper and later GPUs.',
    'Correct. TensorRT-LLM delivers the best performance on Hopper and later GPUs for well-supported models and integrates most deeply with Dynamo.',
    'The transformers library offers reference implementations, not a production serving engine.',
    'vLLM trades peak performance for breadth. The scenario prioritizes maximum performance on NVIDIA hardware.',
  ]}
/>

<MultipleChoice
  id="q9_dynamo"
  question="A company serves a 7-billion-parameter model to an internal tool with low, steady traffic. An engineer proposes adding NVIDIA Dynamo. Which evaluation of the proposal is sound?"
  options={[
    'Adopt Dynamo, because it is required for any multi-GPU model',
    'Adopt Dynamo, because it replaces the engine with faster kernels',
    'Decline Dynamo, because it requires TensorRT-LLM as its backend',
    'Decline Dynamo, because volume is too low for its techniques to pay off',
  ]}
  correct={3}
  optionFeedback={[
    'Inference engines run models across multiple GPUs on their own. Dynamo is optional.',
    'Dynamo orchestrates engines as backends. It does not replace them.',
    'Dynamo works with vLLM, SGLang, and TensorRT-LLM. This reason is false.',
    'Correct. Without enough volume for disaggregation and KV-aware routing to matter, Dynamo adds work and overhead without benefit.',
  ]}
/>

<MultipleChoice
  id="q10_realism"
  question="An engineer benchmarks a code completion service with short, generic chat prompts at temperature 1.0. Production requests carry long code files at temperature 0.2. What should the engineer change first?"
  options={[
    'Add GPUs to match the size of the production cluster',
    'Profile each kernel before running any benchmark',
    'Rebuild the benchmark to match production inputs and parameters',
    'Run the same benchmark more times and average the results',
  ]}
  correct={2}
  optionFeedback={[
    'Matching cluster size does not make unrealistic inputs realistic.',
    'Profiling explains why a system performs as it does. It cannot fix a benchmark that measures the wrong workload.',
    'Correct. The benchmark mismatches sequence lengths, request contents, and input parameters, so its results will not predict production.',
    'Repetition improves consistency, but averaging unrealistic runs still yields an unrealistic result.',
  ]}
/>

<MultipleChoice
  id="q11_method"
  question="An engineer enables speculative decoding and a larger maximum batch size in the same change. Throughput barely moves compared with the baseline. What is the best next step?"
  options={[
    'Abandon both optimizations, because together they showed no gain',
    'Benchmark each optimization alone against the baseline, then together',
    'Keep both optimizations, because the baseline is likely unreliable',
    'Profile the service with Nsight Systems before any further benchmarks',
  ]}
  correct={1}
  optionFeedback={[
    'The two optimizations may work against each other. Each could still help on its own.',
    'Correct. Testing each change individually and then together shows what drives the result. Speculative decoding can lose its benefit at large batch sizes.',
    'Nothing suggests the baseline is faulty. Keeping changes without evidence defeats the purpose of benchmarking.',
    'Profiling can help later, but the first step is a controlled benchmark that changes one variable at a time.',
  ]}
/>

<MultipleChoice
  id="q12_profiler"
  question="A custom PyTorch inference service misses its latency target. The engineer suspects one attention kernel and needs a detailed analysis of the arithmetic and memory behavior of that single kernel. Which tool fits?"
  options={[
    'Locust',
    'NVIDIA GenAI-Perf',
    'NVIDIA Nsight Compute',
    'NVIDIA Nsight Systems',
  ]}
  correct={2}
  optionFeedback={[
    'Locust is a load-testing tool. It generates traffic but does not look inside kernels.',
    'GenAI-Perf measures client-side latency and throughput. It is a benchmarking tool, not a kernel profiler.',
    'Correct. Nsight Compute provides in-depth analysis of the compute and memory use of individual CUDA kernels.',
    'Nsight Systems traces whole systems across GPUs and interconnects. Nsight Compute targets a single kernel in depth.',
  ]}
/>
