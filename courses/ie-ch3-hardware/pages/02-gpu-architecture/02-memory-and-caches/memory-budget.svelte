<script module>
  export const pageConfig = { title: 'The Full Memory Budget' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import MemoryFit from '$shared/sims/MemoryFit.svelte';
</script>

<h1>The Full Memory Budget</h1>
<p>
  The planning factor is a first check. The calculator below also adds up the KV cache, which grows with
  context length and with the number of concurrent sequences, so you can see where the headroom goes.
</p>

<Signal kind="try" title="Size a 70-billion-parameter model">
  <ol class="ie-steps">
    <li>
      Load the scenario "70B in FP16 on H100s." Record how many H100s the planning factor requires. Notice that
      the capacity arithmetic alone suggests three, but the calculator reports four, because <Term id="tensor-parallelism">tensor parallelism</Term>
      needs a GPU count that divides the model's KV heads evenly.
    </li>
    <li>Load the scenario "70B in FP8 on H100s." Record the new minimum GPU count and explain the change.</li>
    <li>
      In the FP8 scenario, raise the context length to 32,768 tokens. Record the verdict and the largest number
      of concurrent sequences the two GPUs can hold.
    </li>
  </ol>
</Signal>

<MemoryFit model="llama-70b" weightPrecision="fp16" kvPrecision="fp16" context={8192} sequences={16} gpu="h100" gpuCount={4} headingLevel={2} />

<p class="ie-obj">Objective 4: Calculate the minimum VRAM for a model (calculator task)</p>
<NumericQuestion
  id="vram_sim"
  question='In the calculator, load the scenario "70B in FP8 on H100s." Change the GPU to the H200 and the GPU count to 1, and keep a context length of 8,192 tokens. What is the largest number of concurrent sequences the calculator reports?'
  answer={41}
  unit="sequences"
  correctFeedback="Correct. One H200 holds the 70.6 GB of FP8 weights with room for 41 sequences of 8,192 tokens after the 10 percent overhead reserve. The extra VRAM of the H200 buys concurrency."
  incorrectFeedback="Load the FP8 scenario first so that both the weights and the KV cache use FP8. Then set the GPU to H200 and the count to 1. The status line reports the maximum: 41 concurrent sequences at 8,192 tokens."
/>
