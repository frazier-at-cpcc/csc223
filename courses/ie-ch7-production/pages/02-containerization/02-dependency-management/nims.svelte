<script module>
  export const pageConfig = { title: 'NVIDIA Inference Microservices' };
</script>
<script>
  import { scrollable } from '$shared/scrollable.js';
</script>

<h1>NVIDIA Inference Microservices</h1>

<p>
  A NIM is one choice of starting image. <strong>NVIDIA Inference Microservices (NIMs)</strong> are prebuilt Docker
  containers for popular open models. NVIDIA publishes them for common combinations of model, GPU architecture, GPU
  count, and configuration.
</p>

<h2>Two Types of NIM</h2>
<div class="ie-table-wrap" role="region" aria-label="Two Types of NIM table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Type</th><th scope="col">What it provides</th></tr>
  </thead>
  <tbody>
    <tr><td>Multi-LLM NIM</td><td>A flexible container that runs a family of models on a supported GPU architecture</td></tr>
    <tr><td>LLM-specific NIM</td><td>An engine optimized for one specific model on one specific GPU, configured for maximum performance</td></tr>
  </tbody>
</table>
</div>

<h2>Three Ways to Use a NIM</h2>
<p>A NIM behaves like any other container. Teams use one in three ways.</p>
<ul>
  <li>As a starting point that the team builds on.</li>
  <li>As a reference architecture to learn from.</li>
  <li>As a ready-to-run inference service.</li>
</ul>

<h2>Building Your Own Image Instead</h2>
<p>
  A NIM is a done-for-you configuration that fixes many choices in advance. A team that needs control over every
  engine flag and dependency is usually better served by building its own image from a less opinionated base image
  than by adapting a NIM. Whichever starting point the team picks, the pinning rules on the previous page still apply.
</p>
