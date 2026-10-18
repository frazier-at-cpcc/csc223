<script module>
  export const pageConfig = { title: 'Memory Bottlenecks on a Spec Sheet' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import RooflineExplorer from '$shared/sims/RooflineExplorer.svelte';
</script>

<h1>Memory Bottlenecks on a Spec Sheet</h1>

<Signal kind="recall" chapter={2} title="Why decode is memory-bound">
  <p>
    Recall what one <Term id="decode">decode</Term> step reads and what it computes. Each step reads every
    weight from VRAM to produce one token for each sequence in the batch. At small <Term id="batch-size">batch sizes</Term> that is a large
    number of bytes for a small amount of arithmetic, so the <Term id="arithmetic-intensity">arithmetic intensity</Term> is low and <Term id="memory-bandwidth">memory bandwidth</Term>
    sets the pace.
  </p>
</Signal>

<h2>Calculating the ops:byte ratio from a spec sheet</h2>
<p>
  The <Term id="ops-byte-ratio">ops:byte ratio</Term> is the dense Tensor Core <Term id="flops">FLOPS</Term> divided by the memory
  bandwidth, at the same precision. Both numbers are on the spec sheet.
</p>
<div class="ie-table-wrap" role="region" aria-label="Hopper spec sheets, dense Tensor Core figures, as of October 2026" use:scrollable>
  <table class="ie-table">
    <caption>Hopper spec sheets, dense Tensor Core figures, as of October 2026</caption>
    <thead>
      <tr>
        <th scope="col">GPU</th>
        <th scope="col">FP8 compute (dense)</th>
        <th scope="col">Memory</th>
        <th scope="col">Bandwidth</th>
      </tr>
    </thead>
    <tbody>
      <tr><th scope="row">H100</th><td>1,979 teraFLOPS</td><td>80 GB</td><td>3.35 TB/s</td></tr>
      <tr><th scope="row">H200</th><td>1,979 teraFLOPS</td><td>141 GB</td><td>4.8 TB/s</td></tr>
    </tbody>
  </table>
</div>

<Signal kind="worked" title="Why the H200 decodes faster than the H100">
  <ol class="ie-steps">
    <li>H100 ops:byte at FP8: 1,979 × 10<sup>12</sup> FLOPS ÷ 3.35 × 10<sup>12</sup> bytes per second ≈ 591 FLOPs per byte.</li>
    <li>H200 ops:byte at FP8: 1,979 ÷ 4.8 ≈ 412 FLOPs per byte.</li>
    <li>
      Estimate the decode intensity. For the linear layers, which hold most of the weights, decode performs about
      2 FLOPs per weight for each sequence in the batch. The intensity is therefore about equal to the batch size
      in FP16 and about twice the batch size in FP8.
    </li>
    <li>
      Decode at a batch of 8 in FP8 has an arithmetic intensity of about 16 FLOPs per byte, far below both
      ratios. Both GPUs are <Term id="memory-bound">memory-bound</Term>, so attainable <Term id="throughput">throughput</Term> equals bandwidth times intensity. The H200
      moves 4.8 ÷ 3.35 ≈ 1.43 times as many bytes per second, so it decodes about 43 percent faster.
    </li>
    <li>
      The lower ratio of the H200 also means a workload reaches its compute ceiling at a lower intensity. Larger
      batches raise decode intensity, so the H200 stops being memory-bound at a smaller batch than the H100.
    </li>
  </ol>
  <p>
    A quick ceiling follows from the same numbers. At a batch of 1, every step reads all the weights once, so
    the step rate cannot exceed bandwidth divided by weight memory. A 70 GB FP8 model on an H200 runs at most
    4,800 GB/s ÷ 70 GB ≈ 69 decode steps per second.
  </p>
</Signal>

<p>
  Other generations follow the same arithmetic. The A100, from the Ampere generation, lists 312 teraFLOPS of
  dense FP16 compute and 2.039 TB/s of bandwidth, and it has no FP8 Tensor Cores. The <Term id="b200">B200</Term> lists about 4,500
  teraFLOPS of dense FP8 compute in NVIDIA's HGX B200 system and up to 8 TB/s of bandwidth.
</p>

<h2>Practice: ops:byte ratios</h2>
<p class="ie-obj">Objective 5: Select the specification that relieves a bottleneck</p>
<NumericQuestion
  id="opsbyte_a100"
  question="Calculate the dense FP16 ops:byte ratio of the A100 from its spec sheet: 312 teraFLOPS and 2.039 TB/s."
  answer={153}
  tolerance={2}
  unit="FLOPs per byte"
  correctFeedback="Correct. 312 ÷ 2.039 ≈ 153 FLOPs per byte. Decode at small batches still falls far below it."
  incorrectFeedback="Divide compute by bandwidth with matching prefixes: 312 × 10^12 ÷ 2.039 × 10^12 ≈ 153 FLOPs per byte."
/>

<p class="ie-obj">Objective 5: Select the specification that relieves a bottleneck</p>
<NumericQuestion
  id="opsbyte_b200"
  question="Calculate the dense FP8 ops:byte ratio of the B200 from 4,500 teraFLOPS and 8 TB/s."
  answer={562.5}
  tolerance={3}
  unit="FLOPs per byte"
  correctFeedback="Correct. 4,500 ÷ 8 ≈ 563 FLOPs per byte. The B200 adds compute and bandwidth in nearly the same proportion as the H100, so its ratio is similar."
  incorrectFeedback="Divide dense FP8 compute by bandwidth: 4,500 ÷ 8 = 562.5 FLOPs per byte."
/>

<h2>Exploring the roofline across GPUs</h2>

<Signal kind="try" title="Compare decode on the H100 and the H200">
  <ol class="ie-steps">
    <li>Load the scenario "Single-user decode on H100." Record the attainable TFLOPS and the percent of peak.</li>
    <li>Change the GPU to the H200 at the same batch size of 1. Record the attainable TFLOPS and compare the ratio with the bandwidth ratio of 1.43.</li>
    <li>
      Return to the H100 and raise the batch size until the verdict reads "compute bound." Record that batch
      size, then repeat on the H200.
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
