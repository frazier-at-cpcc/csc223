<script module>
  export const pageConfig = { title: 'Embedding Runtimes and Pipeline' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import EmbeddingPipeline from '../../../components/EmbeddingPipeline.svelte';
</script>

<h1>Embedding Runtimes and Pipeline</h1>

<p>
  Embedding models with LLM backbones, such as Qwen 3 Embed 8B, share tools and techniques with other
  high-volume, low-latency deployments of small LLMs.
</p>
<p>
  Several runtimes serve text embedding models: <Term id="vllm">vLLM</Term>,
  <Term id="sglang">SGLang</Term>, Infinity, and Text Embedding Inference (TEI) from Hugging Face. At the
  book's publication in 2025, the best performance came from adapting
  <Term id="tensorrt-llm">TensorRT-LLM</Term> to run these models. For the models it supported,
  TensorRT-LLM was the most performant engine for both latency and throughput. It provides optimized
  attention kernels and <Term id="kernel-fusion">kernel fusion</Term> to reduce memory access overhead.
  Engine rankings change with each release, so benchmark the current versions on your own model before
  you choose.
</p>

<EmbeddingPipeline />

<h2>Reading the pipeline</h2>

<ol>
  <li>The model server receives requests over HTTP and handles input and output.</li>
  <li>
    A multi-worker <Term id="tokenizer">tokenizer</Term> tokenizes many inputs in parallel, so
    tokenization does not starve the GPU.
  </li>
  <li>A batch manager queues tokens and forms batches.</li>
  <li>TensorRT-LLM runs inference on each batch.</li>
  <li>The vector outputs return through the batch manager to the model server and then to the client.</li>
</ol>
<p>
  The optimized engine sits at the end of the pipeline. The components in front of it keep the engine
  supplied with full batches. A fast engine behind a single-threaded tokenizer sits idle, so the
  runtime decision covers the whole pipeline, not only the engine.
</p>
