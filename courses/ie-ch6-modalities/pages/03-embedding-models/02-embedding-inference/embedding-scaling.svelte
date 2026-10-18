<script module>
  export const pageConfig = { title: 'Scaling, Batching, and Queueing' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Scaling, Batching, and Queueing</h1>

<h2>Techniques that do not apply</h2>

<p>Some Chapter 5 techniques do not help embedding models.</p>
<ul>
  <li>
    Embedding models process all tokens in parallel and generate no output tokens.
    <Term id="prefix-caching">Prefix caching</Term> and <Term id="disaggregation">disaggregation</Term>
    are therefore not relevant.
  </li>
  <li>
    Embedding models are small. Parallelism across multiple GPUs, such as
    <Term id="tensor-parallelism">Tensor Parallelism</Term>, is not effective.
  </li>
</ul>

<h2>Horizontal scaling</h2>

<p>
  High-traffic deployments scale horizontally. Each GPU runs as its own independent
  <Term id="replica">replica</Term>, and more replicas absorb more traffic.
</p>

<h2>Batching</h2>

<p>
  Embedding models support much larger batch sizes than other models. A single request may carry
  dozens or hundreds of text inputs in a list. Many requests can also run in parallel on one GPU,
  because even demanding embedding models are relatively small and fast.
</p>

<h2>Queueing</h2>

<p>
  A large backfill or a sudden surge in usage can exceed even these large batch sizes. A robust
  <Term id="queue">queueing system</Term> holds the excess work until capacity frees up. For embedding
  inference, the queue is essential infrastructure. Chapter 7 covers queues and batching strategies in
  production.
</p>

<Signal kind="worked" title="Designing for two traffic profiles">
  <p>
    A company embeds 2 million new documents each night and also serves a search box that must return
    results in well under a second. Both workloads carry heavy traffic.
  </p>
  <ol>
    <li>Identify the profiles: the nightly job is a high-throughput backfill, and the search box is a low-latency lookup.</li>
    <li>Separate the systems: traffic justifies the cost, so the backfill never fills the batches that a search query waits behind.</li>
    <li>Choose the runtime: benchmark an optimized engine such as TensorRT-LLM against vLLM or TEI on this model, with a multi-worker tokenizer in front.</li>
    <li>Quantize: test FP8 weights and accept them only if cosine similarity to the original stays at or above 99 percent.</li>
    <li>Scale the lookup system with independent single-GPU replicas sized for peak search traffic.</li>
    <li>Feed the backfill system from a queue with large batches, so it runs at full throughput without a deadline per document.</li>
  </ol>
</Signal>
