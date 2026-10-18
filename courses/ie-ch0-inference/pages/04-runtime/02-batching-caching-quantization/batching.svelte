<script module>
  export const pageConfig = { title: 'Batching' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Batching</h1>

<p>
  The runtime layer relies on six model performance techniques. Each one applies recent research to a specific challenge
  of generative AI inference. This lesson covers the first three: batching, caching, and quantization. The next lesson
  covers speculation, parallelism, and disaggregation.
</p>

<p>
  <dfn><strong>Batching</strong></dfn> runs incoming requests in parallel. The runtime weaves the requests together on a
  token-by-token basis to increase <Term id="throughput">throughput</Term>.
</p>

<h2>Why Batching Raises Throughput</h2>

<p>
  Each <Term id="forward-pass">forward pass</Term> reads the <Term id="weights">weights</Term> from GPU memory. When one request runs alone, the GPU
  reads every weight to produce one token for one user, and most of its arithmetic capacity sits idle. When 32 requests
  share the pass, the same read of the weights produces one token for each of 32 users.
</p>

<p>
  The bottleneck that batching targets is an underused GPU: low utilization and total tokens per second below demand.
  Batching raises the total. It does not make any single user's stream faster.
</p>

<h2>Token-Level Batching</h2>

<p>
  Requests arrive at different times and finish at different lengths. Token-level interleaving lets a new request join the
  batch as soon as a slot opens, and a finished request leaves without waiting for the others. The GPU stays busy, and no
  user waits for an entire batch to finish. Inference engines call this form
  <Term id="continuous-batching">continuous batching</Term>, also known as in-flight batching.
</p>

<p>Chapter 2 explains why batching works, and Chapter 7 compares batching strategies in production.</p>
