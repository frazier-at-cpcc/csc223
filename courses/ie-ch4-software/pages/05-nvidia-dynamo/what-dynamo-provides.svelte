<script module>
  export const pageConfig = { title: 'What Dynamo Provides' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import DynamoArchitecture from '../../components/DynamoArchitecture.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>What Dynamo Provides</h1>

<p>
  <strong>NVIDIA Dynamo</strong> is an open-source distributed serving framework
  for <Term id="kv-cache">KV cache</Term> reuse, <Term id="disaggregation">disaggregation</Term>, and multi-GPU and
  multi-node orchestration. NVIDIA first announced it at its GTC conference in
  March 2025.
</p>

<h2>Dynamo orchestrates engines</h2>

<p>
  Dynamo does not replace an <Term id="inference-engine">inference engine</Term>. It uses vLLM, SGLang, or
  TensorRT-LLM as a backend. Dynamo adds an orchestration layer above those
  engines for large-scale deployments.
</p>

<DynamoArchitecture />

<h2>Techniques Dynamo supports</h2>

<div class="table-wrap" role="region" aria-label="Performance techniques in Dynamo" use:scrollable>
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
      <th scope="row">KV cache reuse with cache-aware routing</th>
      <td>Keeps KV cache data between requests and routes each request to a worker that already holds a matching prefix.</td>
    </tr>
    <tr>
      <th scope="row">Disaggregation</th>
      <td>Separates <Term id="prefill">prefill</Term> and <Term id="decode">decode</Term> onto individually optimized engines that scale independently.</td>
    </tr>
    <tr>
      <th scope="row">Multi-node parallelism</th>
      <td>Optionally uses two or more <Term id="node">nodes</Term> of GPUs for a single model <Term id="replica">replica</Term>, usually with expert parallelism.</td>
    </tr>
  </tbody>
</table>
</div>

<p>
  This course calls the routing technique <Term id="cache-aware-routing">cache-aware routing</Term>, the
  term Chapter 5 uses. Dynamo's documentation also calls it KV-aware routing.
  Chapter 5 explains each technique in detail.
</p>

<h2>Runtime adjustment</h2>

<p>
  Dynamo gathers performance information while it runs. It can adjust the
  deployment in real time as traffic changes. For example, its planner, which
  NVIDIA calls an SLA-based planner, can scale prefill workers and decode workers
  up and down to keep <Term id="time-to-first-token">time to first token</Term> (TTFT) and
  <Term id="tokens-per-second">tokens per second</Term> (TPS) within user-defined targets. These internal
  targets are <Term id="slo">service level objectives</Term> (SLOs).
</p>

<p>
  As with the inference engines, Dynamo needs careful configuration for each use
  case to reach its maximum performance.
</p>
