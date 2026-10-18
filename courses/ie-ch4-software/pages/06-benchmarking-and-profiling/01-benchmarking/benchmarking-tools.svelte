<script module>
  export const pageConfig = { title: 'Benchmarking Tools' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Benchmarking Tools</h1>

<p>
  A benchmark should closely reflect its own production traffic, so every team's
  setup looks somewhat different. A few tools appear in most setups.
</p>

<h2>Load generators and measurement tools</h2>

<div class="table-wrap" role="region" aria-label="Common performance benchmarking tools" use:scrollable>
<table class="data">
  <caption>Common performance benchmarking tools</caption>
  <thead>
    <tr>
      <th scope="col">Tool</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">SGLang Genai-bench</th>
      <td>A command-line tool and dashboard from the SGLang team for benchmarking models deployed with any inference engine.</td>
    </tr>
    <tr>
      <th scope="row">NVIDIA GenAI-Perf</th>
      <td>A client-side tool from NVIDIA that measures latency and throughput on varied traffic.</td>
    </tr>
    <tr>
      <th scope="row">Locust</th>
      <td>An open-source load-testing tool, not specific to generative AI, that can simulate millions of simultaneous users.</td>
    </tr>
  </tbody>
</table>
</div>

<p>
  <strong>Load testing</strong> sends sustained high traffic to a service to
  probe its throughput limits, how requests wait in its <Term id="queue">queue</Term>, and how
  its <Term id="autoscaling">autoscaling</Term> responds. Chapter 7 covers queues and autoscaling.
  Locust is built for this purpose.
</p>

<h2>Evaluation datasets as benchmark inputs</h2>

<p>
  Open-source evaluation datasets are another valuable benchmarking tool. Each
  one is a <Term id="benchmark-suite">benchmark suite</Term> of fixed questions or tasks. They range from
  general evaluations such as MMLU, which tests broad knowledge, and GSM8K, which
  tests grade-school math word problems, to domain-specific ones such as
  SWE-bench, which tests software engineering on real code repositories.
</p>

<p>
  Benchmarking measures performance, not output quality. Evaluation datasets
  still serve two purposes in benchmarking:
</p>

<ul>
  <li>They supply a varied and realistic set of inputs.</li>
  <li>They spot-check that performance optimizations have not degraded model output quality.</li>
</ul>

<p>
  Choose a dataset that matches the production use case. For example, use
  HumanEval, a set of Python programming problems, when reducing latency for a
  code completion system.
</p>
