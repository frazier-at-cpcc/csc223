<script module>
  export const pageConfig = { title: 'SGLang' };
</script>

<script>
  import CodeFigure from '../../../components/CodeFigure.svelte';
  import Term from '$shared/Term.svelte';

  const launch = `python3 -m sglang.launch_server \\
  --model-path deepseek-ai/DeepSeek-V3-0324 \\
  --speculative-algorithm EAGLE \\
  --speculative-num-steps 1 \\
  --speculative-eagle-topk 1 \\
  --speculative-num-draft-tokens 2 \\
  --trust-remote-code \\
  --tp 8`;
</script>

<h1>SGLang</h1>

<p>
  <strong>SGLang</strong> is a fast inference engine with a flexible frontend,
  a fast backend, and strong support for <Term id="mixture-of-experts">mixture-of-experts (MoE)</Term> models.
  It is the other major community-driven engine. LMSYS Org released it in December
  2023. SGLang rose to prominence alongside Chinese open models such as DeepSeek
  and Qwen. At the time of publication, it was the engine of choice for inference
  at xAI.
</p>

<h2>Strength: customization</h2>

<p>
  SGLang pairs a fast backend runtime with a flexible frontend language. In
  practice, engineers can customize individual components of the engine without
  rewriting the rest. Its open community welcomes teams that contribute changes
  back to the project.
</p>

<h2>Hardware and model support</h2>

<ul>
  <li>
    At the time of publication, SGLang ran on NVIDIA and AMD GPUs. The SGLang
    team announced a TPU backend, SGLang-Jax, in late 2025.
  </li>
  <li>
    SGLang has strong day-zero support for a wide range of models. It works with
    labs such as DeepSeek, Qwen, Kimi, and Z AI to release optimized
    implementations of new architectural features, such as DeepSeek's
    <Term id="multi-latent-attention">Multi-head Latent Attention (MLA)</Term>.
  </li>
  <li>
    SGLang has invested heavily in large-scale MoE deployments, especially
    <Term id="multi-node-inference">multi-node deployments</Term> on systems such as
    the <Term id="nvl72">GB200 NVL72</Term>. These systems deliver very
    cost-efficient inference for large models with heavy traffic.
  </li>
</ul>

<h2>Developer experience</h2>

<p>
  The <code>sglang.launch_server</code> command launches a server, with
  configuration passed as flags.
</p>

<CodeFigure
  code={launch}
  language="shell"
  caption="Figure 4.5. An SGLang inference example on eight GPUs. Each trailing backslash continues the command on the next line."
/>

<p>
  The example serves DeepSeek-V3-0324 with tensor parallelism across
  eight GPUs (<code>--tp 8</code>). It also enables speculative decoding with the
  <Term id="eagle" /> algorithm. Chapter 5 explains both techniques.
</p>

<h2>SGLang Diffusion</h2>

<p>
  SGLang Diffusion adds image and video generation. It introduces a pipeline
  abstraction that orchestrates a series of stages, which maps closely to how
  image and video generation models are built. It adds diffusion-specific
  parallelism methods and reuses the scheduler and optimized kernels from the
  main SGLang package.
</p>

<h2>When to choose SGLang</h2>

<ul>
  <li>You need excellent out-of-the-box throughput with decent latency on large MoE models such as DeepSeek and Kimi.</li>
  <li>You want an inference engine experience for image and video generation models.</li>
  <li>You want control and customization, and you plan to take part in the SGLang community.</li>
</ul>
