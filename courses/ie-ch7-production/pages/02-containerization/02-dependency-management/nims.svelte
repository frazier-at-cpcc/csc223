<script module>
  export const pageConfig = { title: 'NVIDIA Inference Microservices' };
</script>

<h1>NVIDIA Inference Microservices</h1>

<p>
  <strong>NVIDIA Inference Microservices (NIMs)</strong> are pre-built Docker containers for popular open models.
  NVIDIA publishes them for common combinations of model, GPU architecture, GPU count, and configuration.
</p>

<h2>Two types of NIM</h2>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Type</th><th scope="col">What it provides</th></tr>
  </thead>
  <tbody>
    <tr><td>Multi-LLM NIM</td><td>A flexible container that runs a family of models on a supported GPU architecture</td></tr>
    <tr><td>LLM-specific NIM</td><td>An engine optimized for one specific model on one specific GPU, configured for maximum performance</td></tr>
  </tbody>
</table>

<h2>Three ways to use a NIM</h2>

<p>A NIM behaves like any other container. Teams use one in three ways.</p>

<ul>
  <li>As a starting point that the team builds on.</li>
  <li>As a reference architecture to learn from.</li>
  <li>As a ready-to-run inference service.</li>
</ul>

<h2>When to build your own image</h2>

<p>
  A NIM is a done-for-you configuration. A team that needs maximum control is usually better served by building its own
  container from a less opinionated base image than by adapting a NIM.
</p>
