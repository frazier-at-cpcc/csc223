<script module>
  export const pageConfig = { title: 'How Image Generation Differs from LLMs' };
</script>

<script>
  import ModalityFlow from '../../../components/ModalityFlow.svelte';
</script>

<h1>How Image Generation Differs from LLMs</h1>

<ModalityFlow
  number="6.8"
  caption="Image generation models may accept both text and reference images to create new output images."
  alt="A text prompt and an optional reference image flow into an image generation model, which outputs a new image"
  description="Two inputs, a text prompt and an optional reference image, flow into a box labeled image generation model. The model outputs a new image."
  inputs={['Text prompt', 'Reference image|(optional)']}
  model="Image|generation model"
  output="New image"
/>

<p>Image and video generation models differ from LLMs on several axes.</p>

<div class="table-wrap">
  <table>
    <caption>Image generation compared with LLM inference</caption>
    <thead>
      <tr><th scope="col">Axis</th><th scope="col">LLM</th><th scope="col">Image generation</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Architecture</td>
        <td>Uniform autoregressive decoder</td>
        <td>Iterative denoiser; a pipeline of several small models working in latent space. A few recent models, such as HunyuanImage-3.0, resemble LLMs.</td>
      </tr>
      <tr>
        <td>Tooling</td>
        <td>Mature inference engines</td>
        <td>Mostly implemented lower in the stack with PyTorch or TensorRT. SGLang Diffusion and vLLM Omni were brand new at publication.</td>
      </tr>
      <tr>
        <td>Size and bottleneck</td>
        <td>Large; decode is bound by memory bandwidth</td>
        <td>Ten to twenty times smaller than frontier LLMs; bound by compute</td>
      </tr>
      <tr>
        <td>Quality-speed tradeoffs</td>
        <td>Indirect</td>
        <td>More direct, for example through the number of denoising steps</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Evaluating quality</h2>

<p>
  Image quality is hard to evaluate programmatically. Automatic pipelines that use VLMs as judges give a
  directional signal at best, and they can diverge from human preferences. Most image quality
  evaluations ask humans to choose among thousands of images and aggregate those preferences into
  benchmarks.
</p>
