<script module>
  export const pageConfig = { title: 'Knowledge Check: Compute' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Compute</h1>
<p>These practice questions are ungraded. Each option explains why it is right or wrong.</p>

<MultipleChoice
  id="kc1"
  question="Which GPU compute unit executes the matrix multiply and accumulate (MMA) instructions that dominate inference?"
  options={['CUDA Core', 'Special Function Unit', 'Tensor Core']}
  correct={2}
  optionFeedback={[
    'Incorrect. CUDA Cores operate on individual scalar values. They do not execute matrix-level MMA instructions.',
    'Incorrect. Special Function Units accelerate functions such as sin, cos, and log, which softmax needs. They do not perform matrix multiplication.',
    'Correct. Tensor Cores operate on vectors and matrices and execute MMA instructions, so Tensor Core compute is the measure that matters for inference.',
  ]}
/>

<MultipleChoice
  id="kc2"
  question="A spec sheet lists 1,000 teraFLOPS at FP16 dense for a GPU. Following the general rule for precision scaling, what dense FP8 compute should you expect from the same GPU?"
  options={['500 teraFLOPS', '1,000 teraFLOPS', '2,000 teraFLOPS']}
  correct={2}
  optionFeedback={[
    'Incorrect. Lower precision increases FLOPS. Halving precision does not halve throughput.',
    'Incorrect. FLOPS change with precision. Moving from 16-bit to 8-bit numbers raises the rate.',
    'Correct. FLOPS generally double each time precision halves, so 1,000 teraFLOPS at FP16 becomes about 2,000 teraFLOPS at FP8.',
  ]}
/>

<MultipleChoice
  id="kc3"
  question="Your team runs a video generation model and must choose between two GPUs. Which specification should drive the decision?"
  options={['CPU core count of the host', 'Memory bandwidth', 'Tensor Core FLOPS']}
  correct={2}
  optionFeedback={[
    'Incorrect. Host CPU cores handle work outside the GPU. They do not set the speed of the video model itself.',
    'Incorrect. Memory bandwidth limits LLM decode at low to medium batch sizes. Video generation is compute-bound.',
    'Correct. Video generation is compute-bound, so the accelerator with more FLOPS at the same precision runs it faster.',
  ]}
/>
