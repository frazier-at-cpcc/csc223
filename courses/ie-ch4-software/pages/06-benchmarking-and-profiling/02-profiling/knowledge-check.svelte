<script module>
  export const pageConfig = { title: 'Knowledge Check: Profiling' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Profiling</h1>

<p>
  These questions are ungraded. All three practice objective 9: choose the
  benchmarking or profiling tool that answers a stated performance question.
</p>

<Matching
  id="kc_profile_match"
  question="Match each performance question to the tool built to answer it."
  pairs={[
    { left: 'Which PyTorch operations take the most GPU time in one forward pass?', right: 'PyTorch Profiler' },
    { left: 'Where do the CPU and the GPUs sit idle waiting on each other across a whole server?', right: 'NVIDIA Nsight Systems' },
    { left: 'Why does one attention kernel read more memory than expected?', right: 'NVIDIA Nsight Compute' },
    { left: 'How does the service hold up when thousands of simulated users arrive at once?', right: 'Locust' },
  ]}
  correctFeedback="Scope decides the tool: PyTorch operations, the whole system, one kernel, or the service seen from outside under load."
  incorrectFeedback="Match the scope of the question. PyTorch Profiler sees operations in a PyTorch program, Nsight Systems sees the whole system, Nsight Compute sees one kernel in depth, and Locust generates load from outside."
/>

<MultipleChoice
  id="kc_profile_adds"
  question="A benchmark reports that P90 time to first token is 350 milliseconds. What does a profiler add to that result?"
  options={[
    'A breakdown of where that time was spent',
    'A comparison against production traffic',
    'A larger sample of requests for the same figure',
    'A measure of model output quality',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Benchmarking shows how the system performs. Profiling shows why, by attributing time to each operation.',
    'Matching production traffic is a property of a good benchmark, not of a profiler.',
    'More requests make a benchmark more reliable, but the result is still a single figure.',
    'Evaluation datasets spot-check output quality. Profilers measure compute and memory use.',
  ]}
/>

<MultipleChoice
  id="kc_profile_system"
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
