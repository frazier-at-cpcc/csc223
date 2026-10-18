<script module>
  export const pageConfig = { title: 'Comparing Decode Across GPUs' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import RooflineExplorer from '$shared/sims/RooflineExplorer.svelte';
</script>

<h1>Comparing Decode Across GPUs</h1>

<Signal kind="worked" title="A ceiling on decode steps per second">
  <p>
    Two spec-sheet numbers set a quick ceiling on decode speed. At a batch of 1, every step reads all the
    weights once, so the step rate cannot exceed bandwidth divided by weight memory. A 70 GB FP8 model on an
    H200 runs at most 4,800 GB/s ÷ 70 GB ≈ 69 decode steps per second.
  </p>
</Signal>

<h2>Faded example: a decode ceiling on the H100</h2>
<p>
  A 40 GB model runs on an H100 at a batch of 1. Step 1 is done: each decode step reads all 40 GB of weights,
  and the H100 moves 3,350 GB/s.
</p>
<NumericQuestion
  id="ceiling_faded"
  question="Step 2: divide bandwidth by weight memory. What is the most decode steps per second the H100 can sustain?"
  answer={83.75}
  tolerance={1}
  unit="steps per second"
  correctFeedback="Correct. 3,350 GB/s ÷ 40 GB ≈ 84 decode steps per second. Real decode runs below this ceiling, because each step also reads the KV cache."
  incorrectFeedback="At a batch of 1, decode is memory-bound, so the ceiling is bandwidth ÷ weight memory: 3,350 GB/s ÷ 40 GB ≈ 83.75 steps per second."
/>

<h2>Exploring the roofline across GPUs</h2>

<Signal kind="try" title="Compare decode on the H100 and the H200">
  <ol class="ie-steps">
    <li>Load the scenario "Single-user decode on H100." Record the attainable TFLOPS and the percent of peak.</li>
    <li>Change the GPU to the H200 at the same batch size of 1. Record the attainable TFLOPS and compare the ratio with the bandwidth ratio of 1.43.</li>
    <li>
      Return to the H100 and raise the batch size until the verdict reads "compute bound." Record the crossover
      batch size that the status line reports, then repeat on the H200 and explain why its crossover is smaller.
    </li>
  </ol>
</Signal>

<RooflineExplorer gpu="h100" workload="decode" batch={1} headingLevel={2} />

<p class="ie-obj">Objective 5: Select the specification that relieves a bottleneck (explorer task)</p>
<NumericQuestion
  id="roofline_sim"
  question="In the explorer, choose the H200, the decode (linear layers) workload, a batch size of 64, and FP8 precision. What percent of peak compute does the explorer report?"
  answer={31}
  tolerance={1}
  unit="percent"
  correctFeedback="Correct. The H200 attains about 614 TFLOPS out of its FP8 peak of about 1,980 TFLOPS, or about 31 percent. Even a batch of 64 leaves decode memory-bound, so bandwidth still sets the speed."
  incorrectFeedback="Set all four controls: H200, decode (linear layers), batch 64, and the FP8 checkbox. The status reports about 614 attainable TFLOPS, which is about 31 percent of the peak of about 1,980 TFLOPS."
/>

<h2>Matching the bottleneck to the specification</h2>
<div class="ie-table-wrap" role="region" aria-label="Workload bottlenecks and the specification that relieves them" use:scrollable>
  <table class="ie-table">
    <caption>Workload bottlenecks and the specification that relieves them</caption>
    <thead>
      <tr><th scope="col">Workload</th><th scope="col">Bottleneck</th><th scope="col">Choose the GPU with more</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">LLM prefill</th><td>Compute</td><td>Dense FLOPS at the serving precision</td></tr>
      <tr><th scope="row">Image and video generation</th><td>Compute</td><td>Dense FLOPS at the serving precision</td></tr>
      <tr><th scope="row">LLM decode, low to medium batch</th><td>Memory bandwidth</td><td>Memory bandwidth</td></tr>
      <tr><th scope="row">LLM decode, batch above the ridge</th><td>Compute</td><td>Dense FLOPS at the serving precision</td></tr>
      <tr><th scope="row">Large model or long context</th><td>Memory capacity</td><td>VRAM</td></tr>
    </tbody>
  </table>
</div>

<Signal kind="mistake" title="Choosing a decode GPU by FLOPS">
  <p>
    A higher FLOPS figure does not speed up decode at small batch sizes. Below the ridge point, the Tensor Cores
    wait on memory, so a GPU with more FLOPS and the same bandwidth decodes at the same speed. Compare memory
    bandwidth first, and compare FLOPS only when the batch is large enough to cross the ridge.
  </p>
</Signal>
