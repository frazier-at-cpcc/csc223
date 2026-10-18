<script module>
  export const pageConfig = { title: 'Scaling, Batching, and Queueing' };
</script>

<h1>Scaling, Batching, and Queueing</h1>

<h2>Techniques that do not apply</h2>

<p>Some Chapter 5 techniques do not help embedding models.</p>

<ul>
  <li>Embedding models process all tokens in parallel and generate no output tokens. Prefix caching and disaggregation are therefore not relevant.</li>
  <li>Embedding models are small. Parallelism across multiple GPUs is not effective.</li>
</ul>

<h2>Scale horizontally</h2>

<p>
  High-traffic deployments scale horizontally. Each GPU runs as its own independent replica, and more
  replicas absorb more traffic.
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
  queueing system holds the excess work until capacity frees up. For embedding inference, the queue
  is essential infrastructure.
</p>
