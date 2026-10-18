<script module>
  export const pageConfig = { title: 'Latency and Throughput' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Latency and Throughput</h1>

<dl>
  <dt><dfn><strong>Latency</strong></dfn></dt>
  <dd>The time a user waits for a response.</dd>
  <dt><dfn><strong>Throughput</strong></dfn></dt>
  <dd>The total work a system completes per unit of time, such as total tokens per second across all users.</dd>
</dl>

<p>Latency describes one user's experience. Throughput describes the whole system.</p>

<h2>Measuring LLM Latency</h2>

<p>A streamed response has two latency measures, one for each phase of the request.</p>

<ul>
  <li>
    <Term id="time-to-first-token">Time to first token (TTFT)</Term> is the wait from sending a request until the first output token arrives. The prefill
    pass sets it.
  </li>
  <li>
    <Term id="inter-token-latency">Inter-token latency (ITL)</Term> is the gap between consecutive output tokens. Each decode pass sets it.
  </li>
</ul>

<p>
  <Term id="end-to-end-latency">End-to-end latency</Term> adds everything else the user waits for, such as network travel and time spent in a
  queue. Chapter 1 defines these metrics precisely and sets targets for them.
</p>

<h2>The Tension Between Latency and Throughput</h2>

<p>
  A GPU that serves one request at a time gives that user the lowest latency. It also leaves most of the GPU idle, so
  throughput is low. Serving many requests together raises throughput, but each forward pass does more work, so each user's
  tokens arrive somewhat more slowly.
</p>

<table>
  <caption>Illustrative numbers for one GPU serving 1 request and 32 requests at a time</caption>
  <thead>
    <tr>
      <th scope="col">Requests served together</th>
      <th scope="col">Tokens per second for each user</th>
      <th scope="col">Total tokens per second</th>
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row">1</th><td>100</td><td>100</td></tr>
    <tr><th scope="row">32</th><td>60</td><td>1,920</td></tr>
  </tbody>
</table>

<p>
  Much of inference engineering is the work of raising throughput while holding latency inside a target. Throughput sets
  cost, because more tokens per GPU-hour means fewer GPUs. Latency sets whether users stay.
</p>
