<script module>
  export const pageConfig = { title: 'Batching' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Batching</h1>

<p>
  The runtime layer relies on six model performance techniques. Each one applies recent research to a specific challenge
  of generative AI inference. The first is batching.
</p>

<p>
  <dfn><strong>Batching</strong></dfn> runs incoming requests in parallel. The runtime weaves the requests together on a
  token-by-token basis to increase throughput.
</p>

<h2>Why batching raises throughput</h2>

<p>
  <dfn><strong>Throughput</strong></dfn> is total work per unit of time, such as total tokens per second across all users.
  A GPU that serves one request at a time leaves most of its capacity idle. Batching fills that idle capacity with other
  requests.
</p>

<p>
  Token-level interleaving lets a new request join the batch as soon as a slot opens. The GPU stays busy, and no user
  waits for an entire batch to finish.
</p>

<Callout type="info">
  <p>The glossary calls this token-level form <strong>continuous batching</strong>, also known as in-flight batching.</p>
</Callout>
