<script module>
  export const pageConfig = { title: 'Experts in Production' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import MoeShardingDiagram from '../../../components/MoeShardingDiagram.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Experts in Production</h1>

<h2>Routing is granular</h2>

<p>
  Each <Term id="forward-pass">forward pass</Term> works through every layer of the model, and the router picks
  experts separately at each layer. Qwen3-235B-A22B has 128 experts per layer. For every token, its router
  picks 8 experts at each of its 94 layers.
</p>

<h2>Batched serving changes the picture</h2>

<p>
  Production servers process many requests together, which is called <Term id="batching">batching</Term>.
  Different tokens in a batch route to different experts. If routing were uniform, one token would leave a
  given expert unused with probability 120/128, and a batch of 32 tokens would leave it unused with probability
  (120/128)<sup>32</sup> ≈ 0.13. A batch of 32 tokens therefore touches about 87 percent of a layer's experts on
  each step.
</p>

<Signal kind="mistake" title="Planning capacity from the active count">
  <p>
    Memory must hold every parameter, for one request or for many. Compute per token still follows the active
    count, because each token passes through only 8 experts per layer. Under batching, nearly every expert's
    weights are read on each step, so the memory traffic per step approaches that of the total count. Plan
    memory and bandwidth for the total parameter count.
  </p>
</Signal>

<h2>Expert Parallelism</h2>

<p>
  MoE unlocks a form of parallelism called <Term id="expert-parallelism">Expert Parallelism</Term>. It shards the
  experts across GPUs so that each GPU holds several complete experts. The attention weights are split with
  <Term id="tensor-parallelism">tensor parallelism</Term>, which divides each weight matrix across the GPUs.
  Chapter 5 covers both forms of parallelism in depth.
</p>

<Figure
  number="2.9"
  caption="One layer of Qwen3-235B-A22B on eight GPUs. Attention is split, the router is replicated, and the experts are sharded. One token's eight selected experts are marked."
  description="Eight GPU panels, GPU 0 through GPU 7, each describe one decoder layer. Every GPU holds one eighth of the attention weights, which is 8 of the model's 64 query heads. The model has only 4 KV heads, so each KV head is replicated on two GPUs. Every GPU holds a full copy of the router. Every GPU holds 16 complete experts: GPU 0 holds experts 0 to 15, GPU 1 holds 16 to 31, and so on through GPU 7 with 112 to 127. For one example token, the router selects experts 3, 17, 40, 41, 77, 90, 101, and 126, which sit on GPUs 0, 1, 2, 2, 4, 5, 6, and 7. GPU 3 holds none of this token's experts. All 94 layers follow the same layout."
>
  <MoeShardingDiagram />
</Figure>

<p>
  The figure shows both strategies at once. Small components that every token needs, such as the router, are
  replicated on every GPU. Large components, such as the experts, are sharded so that each GPU holds only part
  of them. One token's experts land on several GPUs, so each layer exchanges tokens between GPUs.
  Attention splits by query head, eight heads per GPU. The model has only four
  <Term id="kv-head">KV heads</Term>, fewer than the eight GPUs, so each KV head is replicated on two GPUs.
</p>
