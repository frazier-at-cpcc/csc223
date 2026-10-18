<script module>
  export const pageConfig = { title: 'Experts in Production' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Figure from '../../../components/Figure.svelte';
  import MoeShardingDiagram from '../../../components/MoeShardingDiagram.svelte';
</script>

<h1>Experts in Production</h1>

<h2>Routing is granular</h2>

<p>
  Each forward pass generates one token by working through every layer of the model. The router picks
  experts separately at each layer. Qwen3-235B-A22B has 128 experts per layer. For every generated
  token, its router picks 8 experts at each of its 94 layers.
</p>

<h2>Batched serving changes the picture</h2>

<p>
  Production servers batch many requests together. Different requests activate different experts. Across
  a batch, expect almost all of the model's parameters to be active at any given time. The
  single-request savings largely disappear, unless the deployment achieves sparsity through large-scale
  Expert Parallelism, which section 5.4.2 of the book covers.
</p>

<Callout type="important">
  <p>
    The active parameter count describes one token. It does not describe the memory or compute a busy
    production server needs. Plan capacity for the total parameter count.
  </p>
</Callout>

<h2>Expert Parallelism</h2>

<p>
  MoE unlocks a form of parallelism called <strong>Expert Parallelism</strong>. It shards the experts
  across GPUs so that each GPU holds several complete experts. Expert Parallelism enables high-throughput
  inference for large models on multiple GPUs.
</p>

<Figure
  number="2.9"
  caption="Mixture of Experts architecture includes both sharding and replicating to take advantage of multi-GPU inference."
  description="Each of the 94 decoder layers of Qwen3-235B-A22B is spread across eight GPUs, GPU0 through GPU7. The attention weights for queries, keys, values, and outputs are split across the GPUs with tensor parallelism, and attention is split by KV head. Every GPU holds a full copy of the router, so routing is replicated rather than shared. The 128 experts are sharded, with 16 experts on each GPU. The router sends each token to 8 experts."
>
  <MoeShardingDiagram />
</Figure>

<p>
  The figure shows both strategies at once. Small components that every token needs, such as the router,
  are replicated on every GPU. Large components, such as the experts, are sharded so that each GPU holds
  only part of them.
</p>

<h2>When dense models are the better fit</h2>

<ul>
  <li>MoE architectures are most popular for models with more than 100 billion parameters. Some MoE models are as small as 20 to 30 billion parameters.</li>
  <li>Models under 32 billion parameters, and especially models under 8 billion parameters, tend to use traditional dense architectures efficiently.</li>
  <li>Domain-specific models, such as tab-completion models, gain little from MoE. The entire model is effectively one expert.</li>
</ul>
