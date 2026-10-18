<script module>
  export const pageConfig = { title: 'How Image Generation Differs from LLMs' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>How Image Generation Differs from LLMs</h1>

<p>
  An image generation model takes a text prompt, and sometimes a reference image, and creates a new
  image. Image and video generation models differ from LLMs on several axes.
</p>

<div class="table-wrap" role="region" aria-label="Image generation compared with LLM inference" use:scrollable>
  <table>
    <caption>Image generation compared with LLM inference</caption>
    <thead>
      <tr><th scope="col">Axis</th><th scope="col">LLM</th><th scope="col">Image generation</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Architecture</td>
        <td>Uniform autoregressive decoder</td>
        <td>
          Iterative denoiser; a pipeline of several small models working in
          <Term id="latent-space">latent space</Term>. A few recent models, such as HunyuanImage-3.0,
          resemble LLMs.
        </td>
      </tr>
      <tr>
        <td>Tooling</td>
        <td>Mature inference engines</td>
        <td>
          Mostly implemented lower in the stack with <Term id="pytorch">PyTorch</Term> or
          <Term id="tensorrt">TensorRT</Term>. SGLang Diffusion and vLLM Omni were brand new at the book's
          publication in 2025.
        </td>
      </tr>
      <tr>
        <td>Size and bottleneck</td>
        <td>Large; decode is <Term id="memory-bound">memory-bound</Term></td>
        <td>Ten to twenty times smaller than frontier LLMs; <Term id="compute-bound">compute-bound</Term></td>
      </tr>
      <tr>
        <td>Quality-speed tradeoffs</td>
        <td>Indirect</td>
        <td>More direct, for example through the number of denoising steps</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  The bottleneck row drives the rest of this section. A compute-bound workload speeds up when it does
  less arithmetic or does its arithmetic faster. Kernel choice, lower-precision Tensor Core math, and
  fewer forward passes all serve that goal.
</p>

<h2>Evaluating quality</h2>

<p>
  Image quality is hard to evaluate programmatically. Automatic pipelines that use VLMs as judges give a
  directional signal at best, and they can diverge from human preferences. Most image quality
  evaluations ask humans to choose among thousands of images and aggregate those preferences into
  benchmarks. Any optimization that trades quality for speed therefore needs a human review before
  release.
</p>
