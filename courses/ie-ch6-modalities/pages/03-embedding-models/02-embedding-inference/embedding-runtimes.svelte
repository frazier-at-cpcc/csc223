<script module>
  export const pageConfig = { title: 'Embedding Runtimes and Pipeline' };
</script>

<script>
  import EmbeddingPipeline from '../../../components/EmbeddingPipeline.svelte';
</script>

<h1>Embedding Runtimes and Pipeline</h1>

<p>
  Embedding models with LLM backbones, such as Qwen 3 Embed 8B, share tools and techniques with other
  high-volume, low-latency deployments of small LLMs.
</p>

<p>
  Several runtimes serve text embedding models: vLLM, SGLang, Infinity, and Text Embedding Inference
  (TEI) from Hugging Face. The best performance comes from adapting TensorRT-LLM to run these models.
  For supported models, TensorRT-LLM is the most performant engine for both latency and throughput.
  It provides an optimized XQA kernel for fast attention and kernel fusion to reduce memory access
  overhead.
</p>

<EmbeddingPipeline />

<h2>Reading the pipeline</h2>

<ol>
  <li>The model server receives requests over HTTP and handles input and output.</li>
  <li>A multi-worker tokenizer tokenizes many inputs in parallel, so tokenization does not starve the GPU.</li>
  <li>A batch manager queues tokens and forms batches.</li>
  <li>TensorRT-LLM runs inference on each batch.</li>
  <li>The vector outputs return through the batch manager to the model server and then to the client.</li>
</ol>

<p>
  The optimized engine sits at the end of the pipeline. The components in front of it keep the engine
  supplied with full batches.
</p>
