<script module>
  export const pageConfig = { title: 'Practice: GPU Count and the Calculator' };
</script>

<script>
  import MemoryFit from '$shared/sims/MemoryFit.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Practice: GPU Count and the Calculator</h1>

<p>
  These items apply the sizing rule from the previous page. Multiply the bytes per parameter by the parameter count
  and the planning factor of 1.8, then round up to the next instance size.
</p>

<h2>Practice: minimum GPU count</h2>
<NumericQuestion
  id="size_practice_1"
  question="A 90-billion-parameter model is served in FP8 on H100 GPUs at a planning factor of 1.8. Instances offer 80, 160, 320, or 640 GB with 1, 2, 4, or 8 GPUs. What is the minimum number of GPUs?"
  answer={4}
  unit="GPUs"
  correctFeedback="Correct. 1 × 90 × 1.8 = 162 GB, which is slightly above 160 GB, so the deployment needs the 320 GB instance with four GPUs."
  incorrectFeedback="Required VRAM is 1 byte × 90 × 1.8 = 162 GB. The 160 GB instance falls 2 GB short, so round up to 320 GB, which is four H100 GPUs."
/>

<NumericQuestion
  id="size_practice_2"
  question="A 300-billion-parameter model is served in FP4 on B200 GPUs at a planning factor of 1.8. Instances offer 180, 360, 720, or 1,440 GB with 1, 2, 4, or 8 GPUs. What is the minimum number of GPUs?"
  answer={2}
  unit="GPUs"
  correctFeedback="Correct. FP4 uses half a byte per parameter, so 0.5 × 300 × 1.8 = 270 GB, which rounds up to the 360 GB instance with two GPUs."
  incorrectFeedback="FP4 stores each parameter in half a byte. Required VRAM is 0.5 × 300 × 1.8 = 270 GB. That exceeds 180 GB, so round up to 360 GB, which is two B200 GPUs."
/>

<Signal kind="try" title="Size a deployment in the calculator">
  <ol>
    <li>Select the "405B in FP8 on B200s, long context" scenario. Record the minimum GPU count that the summary reports at a planning factor of 1.8.</li>
    <li>Lower the planning factor to 1.5 and record the new minimum GPU count. Explain why Chapter 3's floor is too low for this long-context workload.</li>
    <li>Return the factor to 1.8. Raise the concurrent sequences until the verdict changes from "Fits with headroom", and record that sequence count.</li>
  </ol>
</Signal>

<MemoryFit
  headingLevel={2}
  title="GPU memory calculator"
  model="llama-70b"
  weightPrecision="fp8"
  kvPrecision="fp8"
  context={8192}
  sequences={16}
  gpu="h100"
  gpuCount={2}
  planningFactor={1.8}
/>

<h2>Calculator practice: concurrent sequences</h2>
<NumericQuestion
  id="size_sim_1"
  question="Select the 405B in FP8 on B200s, long context scenario, then set the context length to 32,768 tokens. What maximum number of concurrent sequences does the summary report?"
  answer={105}
  unit="sequences"
  correctFeedback="Correct. Eight B200s each keep about 111 GB for the KV cache after weights and overhead, and one 32,768-token sequence takes about 1.06 GB per GPU, so 105 sequences fit."
  incorrectFeedback="Load the scenario, then move the context length slider to 32,768 tokens. The summary reports 105 concurrent sequences: about 111 GB of KV room per GPU divided by about 1.06 GB per sequence."
/>
