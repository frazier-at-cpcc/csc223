<script module>
  export const pageConfig = { title: 'Context Parallelism' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import ContextParallelism from '../../../components/ContextParallelism.svelte';
</script>

<h1>Context Parallelism</h1>

<p>
  Video generation models usually run on a full node of eight GPUs. They use Context Parallelism rather
  than <Term id="tensor-parallelism">Tensor Parallelism</Term>.
</p>
<p>
  <strong>Context Parallelism (CP)</strong> replicates the model weights on every GPU and partitions
  the attention context across the GPUs. Video models are small enough that eight copies of the weights
  take meaningful memory but still fit on <Term id="b200">B200</Term> GPUs.
</p>

<ContextParallelism />

<h2>How the attention work is split</h2>

<p>
  Context Parallelism splits the attention calculation, not the model. A mechanism such as
  <strong>ring attention</strong> coordinates the work. Each GPU keeps the queries for its own slice of the
  context. The key and value blocks travel from GPU to GPU around a ring, so every slice attends to the
  whole sequence.
</p>
<p>
  <Term id="multi-head-attention">Multi-head attention</Term> offers a second split. Transformer
  attention usually has eight or more heads. The heads are independent, so they can run separately and
  combine their results afterward.
</p>

<h2>Why not Tensor Parallelism</h2>

<p>
  Tensor Parallelism splits each layer's weights across GPUs. Chapter 5 showed that it gives the lowest
  latency within a node for LLMs, and that its cost is communication: at every layer, the GPUs exchange
  activations for the whole sequence and wait for that exchange before the next layer begins. A video latent
  holds tens of thousands of positions, so that traffic is very large. Sharding also gains nothing, because
  the weights already fit on each GPU. Context Parallelism keeps the full weights on every GPU and splits the
  sequence instead. The GPUs pass key and value blocks around the ring while they compute attention, and the
  attention work on a long sequence is large enough to hide that transfer.
</p>

<h2>Parallel VAE decoding</h2>

<p>
  Other steps parallelize too. The latent decoding step, which uses a
  <Term id="vae">variational autoencoder</Term>, takes 3 to 5 percent of total inference time and can
  also run across GPUs.
</p>
<p>
  These parallelism techniques make AI video feasible. As video sequences grow longer and models grow
  larger, parallelism will remain the most critical technique for video generation inference.
</p>
