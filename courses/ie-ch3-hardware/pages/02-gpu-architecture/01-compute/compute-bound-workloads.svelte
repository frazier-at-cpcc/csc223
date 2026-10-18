<script module>
  export const pageConfig = { title: 'Compute Bottlenecks on a Spec Sheet' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Compute Bottlenecks on a Spec Sheet</h1>

<Signal kind="recall" chapter={2} title="Compute-bound and memory-bound work">
  <p>
    Before you read on, state the rule from Chapter 2 in your own words: what decides whether a workload is
    compute-bound or memory-bound?
  </p>
  <p>
    The rule compares two numbers. A workload's <Term id="arithmetic-intensity">arithmetic intensity</Term> is the operations it performs
    per byte it moves. A GPU's <Term id="ops-byte-ratio">ops:byte ratio</Term> is the operations it can perform per byte it can
    move. When the intensity exceeds the ratio, the workload is <Term id="compute-bound">compute-bound</Term>. When it falls below
    the ratio, the workload is <Term id="memory-bound">memory-bound</Term>. On a <Term id="roofline-model">roofline model</Term>, the ratio sits at the
    ridge point where the two ceilings meet.
  </p>
</Signal>

<h2>Where each ceiling appears on a spec sheet</h2>
<p>
  Chapter 2 drew the roofline for one GPU. A spec sheet gives you the two numbers that draw it for any GPU.
</p>
<div class="ie-table-wrap" role="region" aria-label="Roofline quantities and the spec-sheet lines that supply them" use:scrollable>
  <table class="ie-table">
    <caption>Roofline quantities and the spec-sheet lines that supply them</caption>
    <thead>
      <tr><th scope="col">Roofline quantity</th><th scope="col">Spec-sheet line</th><th scope="col">Read it as</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Compute ceiling</th><td>Tensor Core FLOPS</td><td>Dense, at the precision you will serve</td></tr>
      <tr><th scope="row">Bandwidth ceiling</th><td>Memory bandwidth</td><td><Term id="vram">VRAM</Term> bandwidth in TB/s</td></tr>
      <tr><th scope="row">Ridge point</th><td>Not listed</td><td>Divide the first line by the second</td></tr>
    </tbody>
  </table>
</div>
<p>
  The ridge point is not printed on any spec sheet. You calculate it, and the Memory and Caches lesson shows
  how. This page covers the compute ceiling.
</p>

<h2>Which inference workloads are compute-bound</h2>
<ul>
  <li>LLM <Term id="prefill">prefill</Term>, which processes every input token at once and so reuses each weight many times.</li>
  <li>Image generation, whose denoising steps operate on many latent values at once.</li>
  <li>Video generation, which multiplies the image workload across frames.</li>
</ul>

<h2>Selecting hardware for compute-bound work</h2>
<p>
  When prefill or image or video generation dominates your workload, choose the accelerator with more dense
  Tensor Core FLOPS at the precision you will serve. Normalize both spec sheets first, as the previous page
  described. More <Term id="memory-bandwidth">memory bandwidth</Term> does little for a compute-bound workload, because the Tensor Cores are
  already the busiest part of the chip.
</p>
<p>
  LLM <Term id="decode">decode</Term> at low to medium <Term id="batch-size">batch sizes</Term> is the opposite case. It is limited by memory
  bandwidth, and the Memory and Caches lesson shows which specification it calls for.
</p>
