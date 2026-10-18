<script module>
  export const pageConfig = { title: 'vLLM' };
</script>

<script>
  import CodeFigure from '../../../components/CodeFigure.svelte';
  import Term from '$shared/Term.svelte';

  const serve = `vllm serve deepseek-ai/DeepSeek-V3.1 \\
  --enable-expert-parallel \\
  --tensor-parallel-size 8 \\
  --served-model-name ds31`;
</script>

<h1>vLLM</h1>

<p>
  <strong>vLLM</strong> is a widely adopted <Term id="inference-engine">inference engine</Term> with broad
  model and hardware support and strong defaults. At the time of publication, it
  had the largest market share of the three engines and twice as many GitHub
  stars as SGLang and TensorRT-LLM combined. Star counts are only a rough measure
  of popularity.
</p>

<h2>History</h2>

<p>
  vLLM was first released in the summer of 2023, a few months before the other
  two engines. It began at UC Berkeley. The PyTorch Project within the Linux
  Foundation now hosts it.
</p>

<h2>Strength: breadth of support</h2>

<ul>
  <li>Hardware: at the time of publication, vLLM ran on NVIDIA, AMD, and Intel GPUs, along with Google TPUs.</li>
  <li>Models: vLLM supports the most models and architectures of any engine. Nearly every open LLM works with vLLM on its release day.</li>
  <li>Modalities: vLLM Omni extends the engine to image, audio, and video inputs and outputs.</li>
</ul>

<p>
  Breadth has a cost. A properly configured vLLM deployment performs well. In the
  author's experience, it still falls short of the peak performance that a narrow
  engine such as TensorRT-LLM reaches.
</p>

<h2>Developer experience</h2>

<p>
  The <code>vllm serve</code> command launches a server. Flags on the command line
  carry the server configuration. vLLM installs with <code>pip</code>, the Python
  package installer, and official Docker images bundle its dependencies for
  several hardware architectures.
</p>

<CodeFigure
  code={serve}
  language="shell"
  caption="Figure 4.4. A vLLM inference example on eight GPUs. Each trailing backslash continues the command on the next line."
/>

<p>
  The example serves DeepSeek-V3.1 across eight GPUs. It combines
  <Term id="tensor-parallelism">tensor parallelism</Term>, which splits each layer's weights across the
  GPUs, with <Term id="expert-parallelism">expert parallelism</Term>, which places different experts on
  different GPUs. Chapter 5 explains both. The example exposes the model under the
  short name <code>ds31</code>.
</p>

<h2>When to choose vLLM</h2>

<ul>
  <li>You need a model server with solid out-of-the-box performance for almost any open model, quickly.</li>
  <li>You need to run an "Omni" model with multiple input and output modalities, which Chapter 6 covers.</li>
  <li>You use a smaller GPU or an older architecture, where TensorRT-LLM offers few performance benefits.</li>
</ul>
