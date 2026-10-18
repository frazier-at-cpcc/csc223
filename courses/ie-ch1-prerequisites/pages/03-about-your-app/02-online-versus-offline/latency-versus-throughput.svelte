<script module>
  export const pageConfig = { title: 'Latency Versus Throughput' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>Latency Versus Throughput</h1>

<p><Term id="latency">Latency</Term> versus <Term id="throughput">throughput</Term> is one of the primary tradeoffs in inference engineering.</p>

<ul>
  <li>Lower latency makes an application faster for each user.</li>
  <li>Higher throughput makes an application cheaper at scale, because fewer <Term id="gpu">GPUs</Term> serve the same number of users.</li>
</ul>

<p>
  <Term id="batching">Batching</Term> is the main lever between the two.
  A larger batch raises the total work each GPU completes, and each request in the batch moves a little more slowly.
</p>

<h2>Online inference</h2>

<p>
  <dfn><strong>Online inference</strong></dfn> is the real-time serving of requests, optimized for tight <Term id="latency-budget">latency budgets</Term>.
  Code completion, chat, and voice <Term id="agent">agents</Term> are online applications.
  A user waits on the other end of every API call, so these applications are optimized for latency.
</p>

<h2>Offline inference</h2>

<p>
  <dfn><strong>Offline inference</strong></dfn> is the asynchronous batch processing of large jobs, optimized for throughput and cost over per-request latency.
  In a throughput-optimized deployment, each individual request may be too slow for a good interactive experience.
  The system as a whole, however, processes far more requests per hour, because it runs many requests in parallel.
</p>

<Callout type="tip">
  <p>To classify a workload, ask whether a person is waiting for each response. A waiting person makes the workload online. No waiting person makes it a candidate for offline processing.</p>
</Callout>
