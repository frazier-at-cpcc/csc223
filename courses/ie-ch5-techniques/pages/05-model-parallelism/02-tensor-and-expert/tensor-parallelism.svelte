<script module>
  export const pageConfig = { title: 'Tensor Parallelism for Lower Latency' };
</script>

<script>
  import TensorParallel from '../../../components/TensorParallel.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Tensor Parallelism for Lower Latency</h1>

<p>
  <strong>Tensor Parallelism (TP)</strong> should be your default strategy for multi-GPU inference within a <Term id="node">node</Term>. It
  supports dense models such as Llama 405B and <Term id="mixture-of-experts">MoE</Term> models, which, as of October
  2026, dominate the open model landscape.
</p>

<h2>Splitting each layer</h2>
<p>
  TP splits each layer of the model and distributes the fragments across the allocated GPUs. <Term id="pipeline-parallelism">Pipeline Parallelism</Term>,
  by contrast, keeps each layer intact. Under TP, the GPUs share the cost of reading each layer's <Term id="weights">weights</Term> from memory
  and of executing its matrix multiplications.
</p>

<TensorParallel />

<p>
  For an MoE model, TP splits every expert across the GPUs. Each GPU holds a slice of every expert.
</p>

<TensorParallel moe />

<h2>All-reduce cost and per-user speed</h2>
<p>
  Each GPU produces a partial result for each layer. The GPUs must combine those results through an
  <Term id="all-reduce">all-reduce</Term> before the next layer can start. High-bandwidth <Term id="nvlink" /> and NVSwitch inside a
  node keep this overhead small.
</p>
<p>
  Raising the degree of TP improves per-user <Term id="tokens-per-second">tokens per second</Term>, because each GPU reads a smaller slice of the weights in every <Term id="decode">decode</Term> step. The gain holds when the model is large enough and
  the sequences long enough that the faster <Term id="forward-pass">forward pass</Term> outweighs the added communication. Most frontier models
  meet that condition.
</p>
