<script module>
  export const pageConfig = { title: 'Realistic Benchmarks' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Callout } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>Realistic Benchmarks</h1>

<p>
  A <strong>performance benchmark</strong> measures an inference service's
  <Term id="latency">latency</Term> and <Term id="throughput">throughput</Term> for a given model under a defined workload. Without
  precise, accurate benchmarks, an engineer cannot tell whether an optimization
  works.
</p>

<h2>Shadow traffic is the best benchmark</h2>

<p>
  A high-quality benchmark simulates real use as closely as possible. The best
  approach is <strong>shadow traffic</strong>: copying real production requests
  onto the system under test. The team can then measure the test system without
  affecting the original requests.
</p>

<h2>Simulating production traffic</h2>

<p>
  When shadowing is not possible, the engineer must simulate production traffic.
  The simulation must match the expected workload on four dimensions.
</p>

<div class="table-wrap" role="region" aria-label="Workload dimensions a simulated benchmark must match" use:scrollable>
<table class="data">
  <caption>Workload dimensions a simulated benchmark must match</caption>
  <thead>
    <tr>
      <th scope="col">Dimension</th>
      <th scope="col">Why it matters</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Sequence lengths</th>
      <td><Term id="time-to-first-token">Time to first token</Term> and memory use depend on the <Term id="input-sequence-length">input sequence length</Term> (ISL) and <Term id="output-sequence-length">output sequence length</Term> (OSL), the number of <Term id="token">tokens</Term> in the prompt and in the response.</td>
    </tr>
    <tr>
      <th scope="row">Volume and pattern of traffic</th>
      <td>Batching and server load depend on the number of <Term id="concurrency">concurrent requests</Term>. Add jitter, random variation in the timing between requests, to mimic the bursts of real use.</td>
    </tr>
    <tr>
      <th scope="row">Request contents</th>
      <td>The actual prompts affect performance factors such as the prefix cache hit rate and the acceptance rate of speculative drafts, both covered in Chapter 5. Prompts that share a long system prompt behave very differently from unrelated prompts.</td>
    </tr>
    <tr>
      <th scope="row">Input parameters</th>
      <td>Settings such as <Term id="temperature">temperature</Term> and reasoning effort, the setting that controls how many thinking tokens a <Term id="reasoning-model">reasoning model</Term> generates, change inference behavior. Set them to their expected production values.</td>
    </tr>
  </tbody>
</table>
</div>

<Callout type="important">
  <p>
    Optimization is about tradeoffs and constraints. A system tuned to win a
    benchmark built on unrealistic inputs will not meet expectations in
    production.
  </p>
</Callout>
