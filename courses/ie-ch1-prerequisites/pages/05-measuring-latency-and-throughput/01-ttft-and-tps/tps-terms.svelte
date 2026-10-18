<script module>
  export const pageConfig = { title: 'Precise TPS Terms' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Precise TPS Terms</h1>

<p>
  TTFT has one clear meaning.
  TPS does not, because it can describe either a single user's experience or the whole service.
  Most people use TPS to mean the per-user latency metric.
  When precision matters, use one of these three terms.
</p>

<ul>
  <li>
    <strong>Perceived TPS</strong> is the number of tokens per second that one user observes after the first token.
    It is a latency metric.
  </li>
  <li>
    <strong>Total TPS</strong> is the number of tokens the entire inference service generates each second, across all users.
    It is a throughput metric.
  </li>
  <li>
    <strong>Inter-token latency (ITL)</strong> is the time between consecutive generated tokens.
    It is the inverse of perceived TPS.
  </li>
</ul>

<h2>Worked example: converting ITL to TPS</h2>

<p>Perceived TPS equals 1,000 divided by the ITL in milliseconds.</p>

<pre><code>ITL = 10 ms
Perceived TPS = 1000 ms / 10 ms = 100 tokens per second per user</code></pre>

<h2>Worked example: perceived TPS and total TPS</h2>

<p>A service streams to 50 concurrent users, and each user sees 40 tokens per second.</p>

<pre><code>Perceived TPS = 40 tokens per second (per user)
Total TPS     = 50 users x 40 tokens per second = 2,000 tokens per second</code></pre>

<Callout type="tip">
  <p>When someone reports a TPS number, confirm whether it describes one user or the whole service. The two numbers can differ by orders of magnitude.</p>
</Callout>
