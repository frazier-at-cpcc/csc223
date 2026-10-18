<script module>
  export const pageConfig = { title: 'Latency Versus Throughput' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Latency Versus Throughput</h1>

<p>Latency versus throughput is one of the primary tradeoffs in inference engineering.</p>

<ul>
  <li>Lower latency makes an application faster for each user.</li>
  <li>Higher throughput makes an application cheaper at scale, because fewer GPUs serve the same number of users.</li>
</ul>

<h2>Online inference</h2>

<p>
  <strong>Online inference</strong> is the real-time serving of requests, optimized for tight latency budgets.
  Code completion, chat, and voice agents are online applications.
  A user waits on the other end of every API call, so these applications are optimized for latency.
</p>

<h2>Offline inference</h2>

<p>
  <strong>Offline inference</strong> is the asynchronous batch processing of large jobs, optimized for throughput and cost over per-request latency.
  In a throughput-optimized deployment, each individual request may be too slow for a good interactive experience.
  The system as a whole, however, processes far more requests per hour, because it runs many requests in parallel.
</p>

<Callout type="tip">
  <p>To classify a workload, ask whether a person is waiting for each response. A waiting person makes the workload online. No waiting person makes it a candidate for offline processing.</p>
</Callout>
