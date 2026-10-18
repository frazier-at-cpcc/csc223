<script module>
  export const pageConfig = { title: 'What an Inference Image Contains' };
</script>

<h1>What an Inference Image Contains</h1>

<p>
  Dependency chains for inference are long and fragile. Reaching a working build takes real effort, and breaking
  changes are common across the ecosystem. Containerization preserves a known good build once you have one.
</p>

<p>Each image targets a specific GPU architecture and model. A typical inference container includes four groups of runtime components.</p>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Component</th><th scope="col">Examples</th></tr>
  </thead>
  <tbody>
    <tr><td>CUDA toolkit version</td><td>Specific versions of CUDA, cuDNN, and drivers that are compatible with the rest of the stack</td></tr>
    <tr><td>Python packages</td><td><code>torch</code>, <code>transformers</code>, <code>diffusers</code></td></tr>
    <tr><td>Inference engine</td><td>A specific version of vLLM, SGLang, TensorRT-LLM, or another engine</td></tr>
    <tr><td>System packages</td><td>Linux packages such as <code>ffmpeg</code>, which audio, image, and video models often need</td></tr>
  </tbody>
</table>

<h2>Pack light</h2>

<p>
  Inference images often reach many gigabytes. A larger image takes longer to build, push, and load onto a new
  machine. Include only the dependencies the service strictly needs. A smaller image deploys faster and operates more
  efficiently, and the Autoscaling section shows that it also shortens cold starts.
</p>
