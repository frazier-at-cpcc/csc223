<script module>
  export const pageConfig = { title: 'Knowledge Check: Profiling' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Profiling</h1>

<p>These questions are ungraded. Use the feedback to confirm your understanding.</p>

<MultipleChoice
  id="kc_profile_1"
  question="A benchmark reports that P90 time to first token is 350 milliseconds. What does a profiler add to that result?"
  options={[
    'A breakdown of where that time was spent',
    'A larger sample of requests for the same figure',
    'A comparison against production traffic',
    'A measure of model output quality',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Benchmarking shows how the system performs. Profiling shows why, by attributing time to each operation.',
    'More requests make a benchmark more reliable, but the result is still a single figure.',
    'Matching production traffic is a property of a good benchmark, not of a profiler.',
    'Evaluation datasets spot-check output quality. Profilers measure compute and memory use.',
  ]}
/>

<MultipleChoice
  id="kc_profile_2"
  question="A team needs to study how traffic moves across eight GPUs and their interconnects during inference. Which tool fits that system-wide investigation?"
  options={[
    'NVIDIA Nsight Compute',
    'NVIDIA Nsight Systems',
    'PyTorch Profiler',
  ]}
  correct={1}
  optionFeedback={[
    'Nsight Compute analyzes individual CUDA kernels in depth. It does not trace a whole multi-GPU system.',
    'Correct. Nsight Systems samples and traces GPUs and CPUs across the system, including multiple GPUs and their interconnects.',
    'PyTorch Profiler records per-operation time and memory in a PyTorch program. It is not built for interconnect-level analysis.',
  ]}
/>
