<script module>
  export const pageConfig = { title: 'Decoding GPU Names' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Decoding GPU Names</h1>

<p>An NVIDIA datacenter GPU name, such as B200, has two parts.</p>
<dl>
  <dt><strong>Letter</strong></dt>
  <dd>The architecture generation used in the chip. B stands for Blackwell.</dd>
  <dt><strong>Number</strong></dt>
  <dd>The individual model within that generation.</dd>
</dl>

<h2>Reading a family of names</h2>
<ul>
  <li>The H100 directly replaces the A100 from the previous generation. The letter changed, so the architecture changed.</li>
  <li>The H200 is a larger GPU within the same Hopper generation as the H100. The letter stayed the same.</li>
  <li>The B200 from the Blackwell generation in turn supplants the H200.</li>
</ul>

<h2>Letters are meaningful, numbers are approximate</h2>
<p>
  The numbering looks somewhat arbitrary, and different generations use different sets of numbers. The general
  rule is that a bigger number means a larger, more powerful, and more expensive GPU within its generation. The
  letter carries the important information, because it tells you which architecture features the GPU supports.
</p>

<Callout type="tip">
  <p>
    Read the letter first. It tells you which number formats and programming features are available, such as
    FP8 on Hopper or FP4 on Blackwell.
  </p>
</Callout>
