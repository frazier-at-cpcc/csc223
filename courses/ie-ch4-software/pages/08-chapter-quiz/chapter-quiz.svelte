<script module>
  export const pageConfig = {
    title: 'Chapter Quiz',
    quiz: { graded: true, maxAttempts: 3, feedbackMode: 'never' },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Chapter Quiz</h1>

<p>
  This graded quiz has 13 questions that cover every objective in the chapter.
  Each question describes a new situation, so apply what you learned rather than
  recalling a sentence. A score of 70 percent or higher passes. You have three
  attempts, and the best score counts. The quiz reports your score but does not
  mark individual answers, so review the knowledge checks between attempts.
</p>

<MultipleChoice
  id="q1_stack"
  question="An engineer exports a fine-tuned model from PyTorch to an ONNX file so that a partner company can run it in its own runtime. At which level of the software stack does this work happen?"
  options={['CUDA', 'Deep learning frameworks', 'Inference engines', 'NVIDIA Dynamo']}
  correct={1}
  optionFeedback={[
    'CUDA is the level for writing and selecting GPU kernels. Export works on Python model code above CUDA.',
    'Correct. Defining, training, compiling, and exporting models in Python is the work of deep learning frameworks such as PyTorch.',
    'Inference engines serve supported models through configuration. They do not export models to ONNX.',
    'Dynamo orchestrates inference engines across large deployments. It plays no part in export.',
  ]}
/>

<MultipleChoice
  id="q2_library"
  question="A kernel engineer must write a matrix multiplication for an unusual matrix shape on Blackwell GPUs. The general prebuilt GEMM kernel is slow for this shape. The engineer wants tested C++ templates to build from instead of raw CUDA. Which library should the engineer build on?"
  options={['cuBLAS', 'cuDNN', 'CUTLASS', 'FlashInfer']}
  correct={2}
  optionFeedback={[
    'cuBLAS supplies the prebuilt, general GEMM kernel that is already too slow for this shape.',
    'cuDNN supplies neural network primitives. It does not provide templates for writing custom GEMM kernels.',
    'Correct. CUTLASS is a C++ template library of building blocks for architecture-tuned GEMM kernels.',
    'FlashInfer supplies finished attention and sampling kernels, not templates for a custom GEMM.',
  ]}
/>

<MultipleChoice
  id="q3_kernel_arch"
  question="A team wrote a custom attention kernel for B200 GPUs that relies on features only Blackwell has. During a demand spike, the team rents extra H100 capacity for the same model. What does the H100 pool require?"
  options={[
    'Convert the model weights to ONNX so the kernel runs on any GPU',
    'Keep the Blackwell kernel, because older GPUs run newer kernels slowly',
    'Raise the batch size on the H100 pool to hide the kernel cost',
    'Use a general or Hopper-tuned kernel for the H100 pool',
  ]}
  correct={3}
  optionFeedback={[
    'The weight format does not change the hardware features a kernel depends on.',
    'A kernel built on Blackwell-only features may not run on Hopper at all. Older GPUs do not fall back gracefully.',
    'Batch size changes how much work each step carries. It cannot supply hardware features the H100 lacks.',
    'Correct. Moving to an older architecture can break a kernel outright, so the H100 pool needs a kernel that targets Hopper, such as a general library kernel or the engine default.',
  ]}
/>

<NumericQuestion
  id="q4_fusion_bytes"
  question="A prefill pass produces an activation tensor of 7,000,000 FP16 values. Four elementwise kernels run on it in sequence. How many megabytes of memory traffic does fusing the four kernels into one remove? Use 1 MB = 10^6 bytes."
  answer={84}
  tolerance={0.5}
  unit="MB"
  correctFeedback="S = 7,000,000 × 2 bytes = 14 MB. Unfused traffic is 2 × 4 × 14 = 112 MB, fused traffic is 28 MB, and fusion removes 84 MB."
  incorrectFeedback="S = 7,000,000 × 2 bytes = 14 MB. Unfused traffic is 2 × 4 × 14 MB = 112 MB. Fused traffic is 2 × 14 MB = 28 MB. Fusion removes 2 × (4 − 1) × 14 MB = 84 MB."
/>

<MultipleChoice
  id="q5_compile"
  question="A startup serves a speech model with a novel architecture that no inference engine supports. A profile shows that most GPU time goes to a long chain of small elementwise operations. The team wants a faster PyTorch service this week. Which step fits best?"
  options={[
    'Compile the model with torch.compile',
    'Export the weights to safetensors for an engine',
    'Replace the model code with transformers sample code',
    'Swap DeepGEMM plugin kernels into the elementwise chain',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. torch.compile helps most on architectures that engines do not support and on long chains of lightweight kernels, which it can fuse automatically.',
    'Safetensors is a storage format for an engine to load, and no engine supports this architecture.',
    'Reference sample code shows a model interface. It is not built for faster production serving.',
    'DeepGEMM supplies matrix multiplication kernels. It does nothing for a chain of elementwise operations.',
  ]}
/>

<MultipleChoice
  id="q6_format"
  question="A device maker must ship one model file that runs unchanged on NVIDIA and AMD GPUs in customer machines. The file must carry the computation itself, because the devices run no Python model code. Which choice meets both requirements?"
  options={[
    'A PyTorch bin checkpoint loaded in eager mode',
    'A safetensors file loaded by an inference engine',
    'A TensorRT engine file compiled on an NVIDIA GPU',
    'An ONNX file run by ONNX Runtime',
  ]}
  correct={3}
  optionFeedback={[
    'A bin checkpoint needs Python model code to run, and loading it can execute arbitrary code.',
    'Safetensors holds weights only. The engine must supply the model code.',
    'A TensorRT engine file runs only on the NVIDIA GPU type it was built for.',
    'Correct. ONNX stores the execution graph with the weights, and ONNX Runtime executes it on GPUs from several vendors.',
  ]}
/>

<MultipleChoice
  id="q7_engine_split"
  question="A trading firm serves one mature, well-supported model on H100 GPUs, where every millisecond of latency counts, and its engineers can tune a complex engine. A separate research group wants to try each new open model on its release day using a few spare GPUs. Which engine plan fits both workloads?"
  options={[
    'TensorRT-LLM for both workloads',
    'TensorRT-LLM for production, vLLM for research trials',
    'vLLM for both workloads',
    'vLLM for production, TensorRT-LLM for research trials',
  ]}
  correct={1}
  optionFeedback={[
    'TensorRT-LLM supports fewer architectures, so it often cannot run a model on its release day.',
    'Correct. Peak performance on a mature model with a capable team favors TensorRT-LLM. Day-zero support for new architectures favors vLLM.',
    'vLLM serves the research group well, but production needs peak performance that the team is ready to tune for.',
    'This plan reverses the strengths: it gives day-zero breadth to the mature model and the narrowest engine to brand-new models.',
  ]}
/>

<MultipleChoice
  id="q8_engine_stay"
  question="A three-person team serves a well-supported model with vLLM on H100 GPUs. A production-shaped benchmark at peak load shows P90 time to first token of 210 ms against a 400 ms target. A manager proposes migrating to TensorRT-LLM because it performs best. Which evaluation is sound?"
  options={[
    'Add NVIDIA Dynamo in front of vLLM before deciding',
    'Keep vLLM, because it already meets the goal with headroom',
    'Migrate to SGLang, because it is easier than TensorRT-LLM',
    'Migrate to TensorRT-LLM, because a faster engine lowers cost',
  ]}
  correct={1}
  optionFeedback={[
    'Dynamo adds orchestration for large deployments. It does not answer whether a migration is worth its cost here.',
    'Correct. The requirement is met with headroom, and a small team would spend scarce effort on the hardest engine for a gain the product does not need.',
    'Nothing in the scenario calls for a change of engine. Switching costs effort without solving a problem.',
    'TensorRT-LLM usually performs best, but its steeper learning curve is a real cost. Performance beyond the target does not justify it here.',
  ]}
/>

<MultipleChoice
  id="q9_dynamo"
  question="A company hosts 40 fine-tuned 8-billion-parameter models, each on its own GPU. Each model receives a few requests per minute. An engineer proposes adding NVIDIA Dynamo across the fleet. Which evaluation is sound?"
  options={[
    'Adopt Dynamo, since cache-aware routing helps any fleet of models',
    'Adopt Dynamo, since each model needs separate prefill and decode pools',
    'Decline Dynamo, since each model has too little load to benefit',
    'Decline Dynamo, since it requires several GPUs for each model',
  ]}
  correct={2}
  optionFeedback={[
    'Routing helps only when several workers serve the same model and share prefixes. Each model here has one worker.',
    'Disaggregation pays off only when traffic keeps separate prefill and decode pools busy. A few requests per minute cannot.',
    'Correct. Dynamo earns its complexity through disaggregation and cache-aware routing, and both need volume that these models do not have.',
    'Dynamo does not require several GPUs per model. The reason to decline is the light load, not the GPU count.',
  ]}
/>

<MultipleChoice
  id="q10_bench_dimension"
  question="An agent product sends requests of about 4,200 tokens, and every request begins with the same 4,000-token system prompt. The benchmark sends 4,200-token prompts built from separate documents, each with a different opening, at the production concurrency and temperature. Production throughput turns out far higher than the benchmark predicted. What should the engineer change in the benchmark?"
  options={[
    'Lengthen the prompts to match production',
    'Lower the temperature to the production value',
    'Raise the number of concurrent requests',
    'Rebuild the prompts around one common prefix',
  ]}
  correct={3}
  optionFeedback={[
    'The lengths already match at about 4,200 tokens. Sequence length is not the gap.',
    'The temperature already matches production. Input parameters are not the gap.',
    'The concurrency already matches production. Traffic volume is not the gap.',
    'Correct. The request contents differ. A shared prefix lets prefix caching skip most of the prefill, so a benchmark of prompts with different openings underestimates production throughput.',
  ]}
/>

<MultipleChoice
  id="q11_bench_variable"
  question="An engineer benchmarks speculative decoding alone at a concurrency of 4 and measures 40 percent higher throughput than the baseline. Production runs at a concurrency of 256. The engineer plans to ship the change. What should the engineer do first?"
  options={[
    'Benchmark speculation at a concurrency of 256',
    'Profile the draft model to find its slowest kernels',
    'Repeat the concurrency-4 run several times and average it',
    'Ship the change, since the gain came from a controlled test',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Speculative decoding can lose its benefit at large batch sizes, so the gain must be measured at the production concurrency against a baseline at that concurrency.',
    'Profiling explains a measured result. The missing evidence is a measurement at production load.',
    'Repetition makes the concurrency-4 result more reliable, but it still describes the wrong workload.',
    'The test controlled the optimization but not the traffic. Concurrency of 4 does not represent production.',
  ]}
/>

<MultipleChoice
  id="q12_tool_benchmark"
  question="Before a launch review, a team must report the P90 time to first token that clients will see across a realistic mix of prompt lengths. Which tool fits this task?"
  options={[
    'NVIDIA GenAI-Perf',
    'NVIDIA Nsight Compute',
    'NVIDIA Nsight Systems',
    'PyTorch Profiler',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The question asks how the service performs from the client side under varied traffic, which is a benchmarking question. GenAI-Perf measures latency and throughput on varied traffic.',
    'Nsight Compute analyzes one kernel in depth. It does not report client-side latency percentiles.',
    'Nsight Systems traces activity inside the system. It does not measure the latency that clients see.',
    'PyTorch Profiler attributes time to operations inside one program. It does not produce a client-side P90.',
  ]}
/>

<MultipleChoice
  id="q13_tool_profile"
  question="PyTorch Profiler shows that one custom fused kernel accounts for a third of decode time. The engineer must learn whether that kernel is limited by memory bandwidth or by arithmetic. Which tool fits this investigation?"
  options={[
    'Locust',
    'NVIDIA GenAI-Perf',
    'NVIDIA Nsight Compute',
    'NVIDIA Nsight Systems',
  ]}
  correct={2}
  optionFeedback={[
    'Locust generates load from outside the service. It cannot see inside a kernel.',
    'GenAI-Perf measures client-side latency and throughput. It is a benchmarking tool, not a kernel profiler.',
    'Correct. Nsight Compute analyzes the compute and memory use of a single kernel in depth.',
    'Nsight Systems traces the whole system across GPUs and the CPU. Nsight Compute goes deeper into one kernel.',
  ]}
/>
