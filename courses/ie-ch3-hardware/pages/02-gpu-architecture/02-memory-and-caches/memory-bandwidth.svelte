<script module>
  export const pageConfig = { title: 'Memory Bottlenecks on a Spec Sheet' };
</script>

<script>
  import { Video } from 'tessera-learn';
  import memoryBoundDecodeTranscript from '$assets/videos/memory-bound-decode.txt?raw';
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
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

<h2>Video: Why Decode Is Memory-Bandwidth Bound</h2>
<Video src="$assets/videos/memory-bound-decode.mp4" title="Why Decode Is Memory-Bandwidth Bound, explainer video" transcript={memoryBoundDecodeTranscript} />
<details class="video-answer">
  <summary>Check your answer to the question at the end of the video</summary>
  <p>GPU B generates more tokens per second. Decode at small batch sizes is memory-bound, so bandwidth sets its speed, and extra compute sits idle.</p>
</details>

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
</Signal>

<p>
  Other generations follow the same arithmetic. The A100, from the Ampere generation, lists 312 teraFLOPS of
  dense FP16 compute and 2.039 TB/s of bandwidth, and it has no FP8 Tensor Cores. The <Term id="b200">B200</Term> lists about 4,500
  teraFLOPS of dense FP8 compute in NVIDIA's HGX B200 system and up to 8 TB/s of bandwidth.
</p>

<h2>Practice: ops:byte ratios</h2>
<p class="ie-obj">Objective 5: Select the specification that relieves a bottleneck</p>
<NumericQuestion
  id="opsbyte_l40s"
  question="Calculate the dense FP8 ops:byte ratio of the L40S from its spec sheet: 733 teraFLOPS and 864 GB/s."
  answer={848}
  tolerance={3}
  unit="FLOPs per byte"
  correctFeedback="Correct. 733 × 10^12 ÷ 0.864 × 10^12 ≈ 848 FLOPs per byte. The L40S has far more compute per byte of bandwidth than the H100, so decode at small batches leaves even more of its FLOPS idle."
  incorrectFeedback="Convert both values to the same prefix first: 864 GB/s is 0.864 TB/s. Then 733 ÷ 0.864 ≈ 848 FLOPs per byte."
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
