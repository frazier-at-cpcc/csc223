<script module>
  export const pageConfig = { title: 'Knowledge Check: GPU Memory, Latency, and Throughput' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: GPU Memory, Latency, and Throughput</h1>

<p>This check is ungraded. Each item gives feedback when you answer it.</p>

<h2>Memory and Speed Vocabulary</h2>
<p>Supports Objective 1: TTFT and inter-token latency are what a user sees of the prefill and decode passes.</p>

<Matching
  id="kc_cc_vocab"
  question="Match each term to its definition."
  pairs={[
    { left: 'VRAM', right: 'Memory on the GPU that holds the weights and the KV cache' },
    { left: 'Time to first token', right: 'The wait until the prefill pass delivers the first output token' },
    { left: 'Inter-token latency', right: 'The gap between consecutive tokens produced by decode passes' },
    { left: 'Throughput', right: 'Total tokens per second across every user of the system' },
  ]}
  correctFeedback="Correct. TTFT and inter-token latency measure one user's wait, and throughput measures the whole system."
  incorrectFeedback="VRAM is GPU memory. Prefill sets time to first token, decode sets inter-token latency, and throughput totals the work across all users."
/>

<h2>Checking Whether Weights Fit</h2>
<p>Objective 2: calculate the weight memory of a model.</p>

<MultipleChoice
  id="kc_cc_fit"
  question="A team wants to serve a 30-billion-parameter model in FP16 on one GPU with 48 GB of VRAM. Which assessment is correct?"
  options={[
    'It does not fit, because the weights alone need 60 GB',
    'It fits, because the weights need 30 GB and leave 18 GB free',
    'It fits, because the weights need 15 GB and leave 33 GB free',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. 30 × 10^9 parameters × 2 bytes = 60 GB, which exceeds 48 GB before the KV cache is counted.',
    'Incorrect. This answer treats each parameter as 1 byte. FP16 uses 2 bytes, so the weights need 60 GB.',
    'Incorrect. This answer divides by 2 instead of multiplying. FP16 uses 2 bytes per parameter, so the weights need 60 GB.',
  ]}
/>
