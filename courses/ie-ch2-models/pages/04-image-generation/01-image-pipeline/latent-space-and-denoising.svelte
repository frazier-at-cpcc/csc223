<script module>
  export const pageConfig = { title: 'Latent Space and Denoising' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Figure from '../../../components/Figure.svelte';
  import DenoisingSteps from '../../../components/DenoisingSteps.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Latent Space and Denoising</h1>

<h2>Why the pipeline works in latent space</h2>

<p>
  An ordinary HD image of 1024 × 1024 pixels contains more than a million pixels. The denoising model
  calculates <Term id="attention">attention</Term> over the entire image in parallel. Doing that in pixel space would be infeasible.
</p>

<p>
  The pipeline therefore operates in <strong>latent space</strong>, a low-dimensional representation of
  an image. The <Term id="sdxl">SDXL</Term> latent for a 1024 × 1024 image is 128 × 128 positions with 4 channels each. Each pixel
  has 3 color channels, so the comparison counts channels on both sides.
</p>

<pre><code>Pixel space:  1024 × 1024 × 3 channels = 3,145,728 values
Latent space:  128 ×  128 × 4 channels =    65,536 values  (about 2 percent)</code></pre>

<h2>Iterative denoising</h2>

<p>
  Generation starts by filling the latent with random values, called noise. The denoising model then
  refines the noise toward an image over a series of steps, guided by the text prompt. This process is
  called <strong>iterative denoising</strong>, or <Term id="diffusion">diffusion</Term>.
</p>

<Figure
  number="2.10"
  caption="Diffusion-based models iteratively generate an image from noise, generally over 30 to 50 steps."
  description="Four panels progress from left to right. The first panel is pure random noise. In the second panel the faint outline of a computer monitor appears. In the third panel the monitor is clearer and the noise is fainter. The fourth panel shows a clean image of the monitor with no noise."
>
  <DenoisingSteps />
</Figure>

<h2>How denoising differs from LLM decode</h2>

<div class="ie-table-wrap" role="region" aria-label="LLM decode compared with image denoising" use:scrollable>
  <table class="ie-table">
    <caption>LLM decode compared with image denoising</caption>
    <thead>
      <tr><th scope="col">Property</th><th scope="col">LLM <Term id="decode">decode</Term></th><th scope="col">Image denoising</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Unit of work per step</th><td>One new <Term id="token">token</Term></td><td>The entire latent</td></tr>
      <tr><th scope="row">Number of steps</th><td>One per output token</td><td>Usually 30 to 50 for a high-quality image</td></tr>
      <tr><th scope="row">Output size</th><td>Variable length</td><td>Fixed size</td></tr>
    </tbody>
  </table>
</div>
