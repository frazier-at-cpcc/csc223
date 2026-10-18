<script module>
  export const pageConfig = { title: 'Batching Strategies' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import BatchingTimeline from '../../../components/BatchingTimeline.svelte';
</script>

<h1>Batching Strategies</h1>

<p>
  A traffic-based autoscaler needs to know how much concurrent traffic each replica can handle. Most inference services
  handle more than one request at a time through batching. Three approaches to batching differ in when a batch starts.
</p>

<h2>Static batching</h2>

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

<h2>Dynamic batching</h2>

<p>
  In <strong>dynamic batching</strong>, the server starts a batch when it is full or when a configured amount of time
  has passed, whichever comes first. The cutoff caps queue time. A request that arrives after the cutoff joins a
  separate batch.
</p>

<Figure
  number="7.7"
  caption="Dynamic batching adds a cutoff time after which a batch is run whether or not it is full."
  description="Three requests arrive at 0, 40, and 90 milliseconds. A cutoff at 150 milliseconds starts inference on the partial batch of three. A fourth request arrives at 230 milliseconds, after the cutoff, and is batched separately."
>
  <BatchingTimeline mode="dynamic" />
</Figure>

<h2>Continuous batching</h2>

<p>
  In <strong>continuous batching</strong>, the server runs inference without pause and swaps requests into the batch as
  slots become available. Requests are batched at the token level. vLLM, SGLang, and TensorRT-LLM implement robust
  continuous batching. TensorRT-LLM calls it in-flight batching. Continuous batching minimizes latency compared with
  static batching.
</p>

<Figure
  number="7.8"
  caption="Continuous batching operates at the token level, switching in new requests as old requests finish."
  description="Four requests arrive at 0, 40, 90, and 230 milliseconds. Each one starts inference immediately on arrival, with no queue time. When a request finishes, its slot frees up and a new request can take its place."
>
  <BatchingTimeline mode="continuous" />
</Figure>
