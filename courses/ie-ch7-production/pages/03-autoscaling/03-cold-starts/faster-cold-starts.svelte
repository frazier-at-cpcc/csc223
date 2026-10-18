<script module>
  export const pageConfig = { title: 'Shortening Cold Starts' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Shortening Cold Starts</h1>

<p>
  Loading a <Term id="container-image">container image</Term> and its model weights means writing gigabytes of data onto an instance, often hundreds of
  gigabytes. There are two ways to load faster: make the data smaller, or get more bandwidth.
</p>

<h2>Smaller Images and Weights</h2>
<ul>
  <li>Include only necessary build steps and dependencies. A smaller image builds and loads faster.</li>
  <li><Term id="quantization">Quantize</Term> the model weights. Chapter 5 covered quantization for speed and memory. It has the added benefit of making weights faster to load during a cold start, because FP8 weights are half the size of FP16 weights.</li>
</ul>

<h2>Weights Loaded Separately from the Image</h2>
<p>
  For small models, teams once baked the weights into the image to simplify caching and loading. Models with tens or
  hundreds of billions of parameters have weights that dwarf the rest of the image, so they are better loaded
  separately.
</p>

<h2>Weight Source Bandwidth</h2>
<p>The source of the weights has a large effect on bandwidth.</p>
<div class="ie-table-wrap" role="region" aria-label="Weight Source Bandwidth table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Weight source</th><th scope="col">Limitation</th></tr>
  </thead>
  <tbody>
    <tr><td>Third-party hub such as <Term id="hugging-face" /></td><td>Limited by the provider's egress speed, the rate at which it sends data out of its network</td></tr>
    <tr><td><Term id="object-storage">Object storage</Term> such as an S3 bucket</td><td>Adds network latency and data transfer costs</td></tr>
    <tr><td>Cache in the same datacenter, physically near the GPU instance</td><td>Delivers the gigabytes per second that multi-hundred-billion-parameter models need</td></tr>
  </tbody>
</table>
</div>

<h2>Engine Startup and Cached Engines</h2>
<p>
  <Term id="tensorrt-llm" /> and optimized <Term id="pytorch" /> models include a compilation step that targets the specific
  hardware, and that step often takes several minutes. General engines also do work at startup. As of October 2026,
  <Term id="vllm" /> compiles the model with <Term id="torch-compile" /> and captures <Term id="cuda-graph">CUDA graphs</Term> by
  default when it starts. vLLM keeps a compile cache so that later starts skip most of that work.
</p>
<p>
  Caching the compiled result cuts cold start time sharply. TensorRT-LLM, PyTorch, and vLLM all provide caching
  mechanisms for this purpose. A cached engine runs correctly only on an instance that matches its build environment
  exactly. The GPU type, the CUDA version, and the software dependencies must all be identical.
</p>
