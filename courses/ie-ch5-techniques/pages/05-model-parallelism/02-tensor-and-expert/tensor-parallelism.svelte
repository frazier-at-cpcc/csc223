<script module>
  export const pageConfig = { title: 'Tensor Parallelism for Lower Latency' };
</script>

<script>
  import TensorParallel from '../../../components/TensorParallel.svelte';
</script>

<h1>Tensor Parallelism for Lower Latency</h1>

<p>
  <strong>Tensor Parallelism (TP)</strong> should be your default strategy for multi-GPU inference. It supports dense
  models such as Llama 405B and the MoE models that dominate the current open model landscape.
</p>

<h2>How TP works</h2>
<p>
  TP splits each layer of the model and distributes the fragments across the allocated GPUs. Pipeline Parallelism,
  by contrast, keeps each layer intact. Under TP, the GPUs share the cost of reading each layer's weights from memory
  and of executing its matrix multiplications.
</p>

<TensorParallel />

<p>
  For an MoE model, TP splits every expert across the GPUs. Each GPU holds a slice of every expert.
</p>

<TensorParallel moe />

<h2>The cost: all-reduce after every layer</h2>
<p>
  Each GPU produces a partial result for each layer. The GPUs must combine those results through an all-reduce
  before the next layer can start. High-bandwidth NVLink and NVSwitch inside a node keep this overhead small.
</p>
<p>
  Raising the degree of TP improves per-user tokens per second. The gain holds when the model is large enough and
  the sequences long enough that the faster forward pass outweighs the added communication. Most frontier models
  meet that condition.
</p>
