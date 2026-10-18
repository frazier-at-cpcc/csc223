<script module>
  export const pageConfig = { title: 'Batching Strategies' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import BatchingTimeline from '../../../components/BatchingTimeline.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Batching Strategies</h1>

<p>
  A traffic-based autoscaler needs to know how much concurrent traffic each <Term id="replica">replica</Term> can handle. Most inference services
  handle more than one request at a time through <Term id="batching">batching</Term>. Chapter 0 introduced continuous batching, and Chapter 6 used
  dynamic batching for embedding and audio decoding. This page sets both beside static batching. The three differ in
  when a batch starts.
</p>

<h2>Static Batching</h2>
<p>
  In <strong>static batching</strong>, the server waits until the batch is full before it starts inference. Early
  arrivals pay for the wait. In Figure 7.6, the first request sits in the queue for about 240 milliseconds until the
  fourth request fills the batch.
</p>
<Figure
  number="7.6"
  caption="Static batching sets a fixed batch size and waits for the batch to fill before beginning inference, leading to long wait times for early requests."
  description="Four requests arrive at 0, 40, 90, and 230 milliseconds. Each waits in the queue until the batch fills at about 240 milliseconds. Inference then runs for all four together. The first request waits about 240 milliseconds before any work begins on it."
>
  <BatchingTimeline mode="static" />
</Figure>

<h2>Dynamic Batching</h2>
<p>
  In <strong>dynamic batching</strong>, the server starts a batch when it is full or when a configured amount of time
  has passed, whichever comes first. The cutoff caps queue time. A request that arrives after the cutoff joins a
  separate batch. Dynamic batching suits fixed-size work, such as requests to an <Term id="embedding-model">embedding model</Term>, where every request in a batch
  finishes at about the same time.
</p>
<Figure
  number="7.7"
  caption="Dynamic batching adds a cutoff time after which a batch is run whether or not it is full."
  description="Three requests arrive at 0, 40, and 90 milliseconds. A cutoff at 150 milliseconds starts inference on the partial batch of three. A fourth request arrives at 230 milliseconds, after the cutoff, and is batched separately."
>
  <BatchingTimeline mode="dynamic" />
</Figure>

<h2>Continuous Batching</h2>
<p>
  In <strong>continuous batching</strong>, the server runs inference without pause and swaps requests into the batch as
  slots become available. Requests are batched at the token level, at every <Term id="decode">decode</Term> step. <Term id="vllm" />, <Term id="sglang" />, and
  <Term id="tensorrt-llm" /> implement robust continuous batching, which TensorRT-LLM calls in-flight batching. Continuous batching
  minimizes latency compared with static batching, and it is the standard approach for LLMs, whose requests finish at
  very different times.
</p>
<Figure
  number="7.8"
  caption="Continuous batching operates at the token level, switching in new requests as old requests finish."
  description="Four requests arrive at 0, 40, 90, and 230 milliseconds. Each one starts inference immediately on arrival, because a slot is free. When a request finishes, its slot frees up and a new request can take its place. When every slot is full, a new request waits in a queue until a slot frees."
>
  <BatchingTimeline mode="continuous" />
</Figure>
<p>
  Continuous batching removes waiting for a batch to form, but it does not remove waiting altogether. The number of
  slots is the replica's batch size. When every slot is full, the next request waits in a queue until a slot frees.
  That limit is the reason the autoscaler must know the batch size, which the next page covers.
</p>
