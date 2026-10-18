<script module>
  export const pageConfig = { title: 'What an Inference Image Contains' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>What an Inference Image Contains</h1>

<p>
  Dependency chains for inference are long and fragile. Reaching a working build takes real effort, and breaking
  changes are common across the ecosystem. Containerization preserves a known good build once you have one.
</p>
<p>
  Each image targets a specific GPU architecture and model. A typical inference image includes four groups of runtime
  components.
</p>
<div class="ie-table-wrap" role="region" aria-label="What an Inference Image Contains table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Component</th><th scope="col">Examples</th></tr>
  </thead>
  <tbody>
    <tr><td>CUDA toolkit and libraries</td><td>The <Term id="cuda" /> runtime and cuDNN, at versions compatible with the rest of the stack</td></tr>
    <tr><td>Python packages</td><td><code>torch</code>, <code>transformers</code>, <code>diffusers</code></td></tr>
    <tr><td>Inference engine</td><td>A specific version of <Term id="vllm" />, <Term id="sglang" />, <Term id="tensorrt-llm" />, or another engine</td></tr>
    <tr><td>System packages</td><td>Linux packages such as <code>ffmpeg</code>, a media-processing tool that audio, image, and video models often need</td></tr>
  </tbody>
</table>
</div>

<Signal kind="mistake" title="Putting the GPU driver in the image">
  <p>
    The <Term id="cuda-driver">GPU driver</Term> is not part of the image. It is installed on the host machine, and
    every <Term id="container">container</Term> on that host shares it. The image carries the CUDA user-space libraries, and the host driver must
    be new enough to support the CUDA version inside the image. An image with every package pinned still fails on a
    host whose driver is too old.
  </p>
</Signal>

<h2>Image Size</h2>
<p>
  Inference images often reach many gigabytes. A larger image takes longer to build, push, and load onto a new
  machine. Include only the dependencies the service strictly needs. A smaller image deploys faster, and the Cold
  Starts lesson in the Autoscaling section shows that it also shortens the time to bring a new <Term id="replica">replica</Term> online.
</p>
