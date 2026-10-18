<script module>
  export const pageConfig = { title: 'Shortening Cold Starts' };
</script>

<h1>Shortening Cold Starts</h1>

<p>
  Loading an image and its model weights means writing gigabytes of data onto an instance, often hundreds of
  gigabytes. There are two ways to load faster: make the data smaller, or get more bandwidth.
</p>

<h2>Make the data smaller</h2>

<ul>
  <li>Include only necessary build steps and dependencies. A smaller image builds and loads faster.</li>
  <li>Quantize the model weights. Quantization has the added benefit of making weights faster to load during a cold start.</li>
</ul>

<h2>Load weights separately from the image</h2>

<p>
  For small models, teams once baked the weights into the image to simplify caching and loading. Most current models
  have dozens or hundreds of billions of parameters. Their weights dwarf the rest of the image, so they are better
  loaded separately.
</p>

<h2>Get more bandwidth</h2>

<p>The source of the weights has a large effect on bandwidth.</p>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Weight source</th><th scope="col">Limitation</th></tr>
  </thead>
  <tbody>
    <tr><td>Third-party hub such as Hugging Face</td><td>Limited by the provider's egress speed</td></tr>
    <tr><td>Object storage such as an S3 bucket</td><td>Adds network latency and data transfer costs</td></tr>
    <tr><td>Cache in the same datacenter, physically near the GPU instance</td><td>Delivers the gigabytes per second that multi-hundred-billion-parameter models need</td></tr>
  </tbody>
</table>

<h2>Cache built engines</h2>

<p>
  vLLM and SGLang start quickly. TensorRT-LLM and optimized PyTorch models include a compilation step that targets the
  specific hardware, and that step often takes several minutes. Caching the built engine cuts cold start time sharply.
  Both TensorRT-LLM and PyTorch provide caching mechanisms for this purpose.
</p>

<p>
  A cached engine runs correctly only on an instance that matches its build environment exactly. The GPU type, the
  CUDA version, and the software dependencies must all be identical.
</p>
