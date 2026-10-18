<script module>
  export const pageConfig = { title: 'Decoding GPU Names' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>Decoding GPU Names</h1>

<p>An NVIDIA datacenter GPU name, such as <Term id="b200">B200</Term>, has two parts.</p>
<dl>
  <dt><strong>Letter</strong></dt>
  <dd>The architecture generation used in the chip. B stands for <Term id="blackwell" />.</dd>
  <dt><strong>Number</strong></dt>
  <dd>The individual model within that generation.</dd>
</dl>

<h2>Reading a family of names</h2>
<ul>
  <li>
    The <Term id="h100">H100</Term> directly replaces the A100. A stands for Ampere and H stands for Hopper, so the letter change marks a
    new architecture.
  </li>
  <li>
    The H200 uses the same <Term id="hopper" /> chip as the H100, paired with more and faster HBM3e memory. The
    letter stayed the same, so the architecture features stayed the same.
  </li>
  <li>The B200 from the Blackwell generation in turn supplants the H200.</li>
</ul>

<h2>Letters and Numbers in GPU Names</h2>
<p>
  The numbering looks somewhat arbitrary, and different generations use different sets of numbers. The general
  rule is that a bigger number means a larger, more powerful, or more expensive GPU within its generation. The
  letter carries the important information, because it tells you which architecture features the GPU supports.
</p>

<Callout type="tip">
  <p>
    Read the letter first. It tells you which number formats and programming features are available, such as
    <Term id="fp8">FP8</Term> on Hopper or <Term id="fp4">FP4</Term> on Blackwell.
  </p>
</Callout>
