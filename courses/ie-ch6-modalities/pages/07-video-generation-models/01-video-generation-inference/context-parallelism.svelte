<script module>
  export const pageConfig = { title: 'Context Parallelism' };
</script>

<script>
  import ContextParallelism from '../../../components/ContextParallelism.svelte';
</script>

<h1>Context Parallelism</h1>

<p>
  Video generation models usually run on a full node of eight GPUs. They use Context Parallelism rather
  than Tensor Parallelism.
</p>

<p>
  <strong>Context Parallelism (CP)</strong> replicates the model weights on every GPU and partitions
  the attention context across the GPUs. Video models are small enough that eight copies of the weights
  take meaningful memory but still fit on B200 GPUs.
</p>

<ContextParallelism />

<h2>How the attention work is split</h2>

<p>
  Context Parallelism splits the attention calculation, not the model. A mechanism such as
  <strong>ring attention</strong> coordinates the work. Each GPU holds one piece of the context and
  passes intermediate results to the next GPU in a ring.
</p>

<p>
  Multi-head attention offers a second split. Transformer attention usually has eight or more heads.
  The heads are independent, so they can run separately and combine their results afterward.
</p>

<h2>Beyond attention</h2>

<p>
  Other steps parallelize too. The latent decoding step, which uses a variational autoencoder, takes 3 to
  5 percent of total inference time and can also run across GPUs.
</p>

<p>
  These parallelism techniques make AI video feasible. As video sequences grow longer and models grow
  larger, parallelism will remain the most critical technique for video generation inference.
</p>
