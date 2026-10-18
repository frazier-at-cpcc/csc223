<script module>
  export const pageConfig = { title: 'Realistic Benchmarks' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Realistic Benchmarks</h1>

<p>
  A <strong>performance benchmark</strong> measures an inference service's
  latency and throughput for a given model under a defined workload. Without
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
      <td>Time to first token and memory use depend on the input sequence length (ISL) and output sequence length (OSL), the number of tokens in the prompt and in the response.</td>
    </tr>
    <tr>
      <th scope="row">Volume and pattern of traffic</th>
      <td>Batching and server load depend on the number of concurrent requests. Add jitter to the traffic to mimic real use.</td>
    </tr>
    <tr>
      <th scope="row">Request contents</th>
      <td>The actual prompts affect performance factors such as cache hit rate and draft token acceptance.</td>
    </tr>
    <tr>
      <th scope="row">Input parameters</th>
      <td>Settings such as temperature and reasoning effort change inference behavior. Set them to their expected production values.</td>
    </tr>
  </tbody>
</table>

<Callout type="important">
  <p>
    Optimization is about tradeoffs and constraints. A system tuned to win a
    benchmark built on unrealistic inputs will not meet expectations in
    production.
  </p>
</Callout>
