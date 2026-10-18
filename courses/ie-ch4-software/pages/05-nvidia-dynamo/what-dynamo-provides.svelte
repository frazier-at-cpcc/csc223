<script module>
  export const pageConfig = { title: 'What Dynamo Provides' };
</script>

<h1>What Dynamo Provides</h1>

<p>
  <strong>NVIDIA Dynamo</strong> is an open-source distributed serving platform
  for KV cache reuse, disaggregation, and multi-GPU and multi-node orchestration.
  NVIDIA first announced it at its GTC conference in March 2025.
</p>

<h2>Dynamo orchestrates engines</h2>

<p>
  Dynamo does not replace an inference engine. It uses vLLM, SGLang, or
  TensorRT-LLM as a backend. Dynamo adds an orchestration layer above those
  engines for large-scale deployments.
</p>

<h2>Techniques Dynamo supports</h2>

<table class="data">
  <caption>Performance techniques in Dynamo</caption>
  <thead>
    <tr>
      <th scope="col">Technique</th>
      <th scope="col">What it does</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">KV cache reuse</th>
      <td>Keeps KV cache data between requests and routes each request to a worker that already holds a matching prefix.</td>
    </tr>
    <tr>
      <th scope="row">Disaggregation</th>
      <td>Separates prefill and decode onto individually optimized engines that scale independently.</td>
    </tr>
    <tr>
      <th scope="row">Multi-node parallelism</th>
      <td>Optionally uses two or more nodes of GPUs for a single model replica, usually with expert parallelism.</td>
    </tr>
  </tbody>
</table>

<p>Chapter 5 explains each of these techniques in detail.</p>

<h2>Runtime adjustment</h2>

<p>
  Dynamo gathers performance information while it runs. It can adjust the
  deployment in real time as traffic changes. For example, an SLA-based planner
  can scale prefill workers and decode workers up and down to meet user-defined
  limits on time to first token (TTFT) and tokens per second (TPS).
</p>

<p>
  As with the inference engines, Dynamo needs careful configuration for each use
  case to reach its maximum performance.
</p>
