<script module>
  export const pageConfig = { title: 'Common Number Formats' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Accordion, AccordionItem } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>Common Number Formats</h1>

<p>
  <Term id="quantization">Quantization</Term> brings its own vocabulary. The most important terms are the names
  of the number formats that later pages compare. Each name states the <Term id="precision">precision</Term>, in bits, and the
  type of number those bits encode.
</p>

<div class="ie-table-wrap" role="region" aria-label="Number formats used in inference" use:scrollable>
  <table class="ie-table">
    <caption>Number formats used in inference</caption>
    <thead>
      <tr><th scope="col">Name</th><th scope="col">Abbreviation</th><th scope="col">Bits</th></tr>
    </thead>
    <tbody>
      <tr><td>16-bit Floating Point</td><td>FP16</td><td>16</td></tr>
      <tr><td>Brain Floating Point 16</td><td>BF16</td><td>16</td></tr>
      <tr><td>8-bit Floating Point</td><td><Term id="fp8">FP8</Term></td><td>8</td></tr>
      <tr><td>Microscaling FP8</td><td>MXFP8</td><td>8</td></tr>
      <tr><td>8-bit Integer</td><td>INT8</td><td>8</td></tr>
      <tr><td>4-bit Floating Point</td><td>FP4</td><td>4</td></tr>
      <tr><td>Microscaling FP4</td><td>MXFP4</td><td>4</td></tr>
      <tr><td>NVIDIA FP4</td><td>NVFP4</td><td>4</td></tr>
      <tr><td>4-bit Integer</td><td>INT4</td><td>4</td></tr>
    </tbody>
  </table>
</div>

<p>
  The "MX" in MXFP8 and MXFP4 stands for Microscaling, a format family defined by the Open Compute Project (OCP).
  A later page explains what microscaling adds.
</p>

<h2>Formats that inference uses</h2>
<ul>
  <li>FP64, or double precision, serves high-precision scientific computing. AI training and inference do not use it.</li>
  <li>FP32 appears in some training but almost never in inference.</li>
  <li>FP6 exists on recent hardware but, as of October 2026, sees little use in inference.</li>
</ul>
<p>That leaves 16-bit, 8-bit, and 4-bit precisions as the primary formats for inference.</p>

<Accordion>
  <AccordionItem title="Reference: the first NVIDIA architecture to support each format">
    <p>
      Hardware support decides which formats a GPU can run at full <Term id="tensor-core">Tensor Core</Term> speed. Chapter 3 introduced these
      architecture generations. This table is reference material, not something to memorize.
    </p>
    <div class="ie-table-wrap" role="region" aria-label="First NVIDIA architecture with Tensor Core or native support" use:scrollable>
      <table class="ie-table">
        <caption>First NVIDIA architecture with Tensor Core or native support</caption>
        <thead>
          <tr><th scope="col">Format</th><th scope="col">First architecture</th></tr>
        </thead>
        <tbody>
          <tr><td>FP64</td><td>Fermi (2010)</td></tr>
          <tr><td>FP32</td><td>Kepler (2012)</td></tr>
          <tr><td>FP16</td><td>Pascal (2016)</td></tr>
          <tr><td>INT8</td><td>Pascal (2016)</td></tr>
          <tr><td>INT4</td><td>Turing (2018)</td></tr>
          <tr><td>BF16</td><td>Ampere (2020)</td></tr>
          <tr><td>FP8</td><td>Hopper (2022)</td></tr>
          <tr><td>MXFP8, FP6, FP4, MXFP4, and NVFP4</td><td>Blackwell (2024)</td></tr>
        </tbody>
      </table>
    </div>
  </AccordionItem>
</Accordion>
