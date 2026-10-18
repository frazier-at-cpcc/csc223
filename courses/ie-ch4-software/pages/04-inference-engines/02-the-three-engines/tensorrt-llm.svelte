<script module>
  export const pageConfig = { title: 'TensorRT-LLM' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Callout } from 'tessera-learn';
  import CodeFigure from '../../../components/CodeFigure.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';

  const serve = `trtllm-serve deepseek-ai/DeepSeek-R1-0528 \\
  --host 0.0.0.0 \\
  --port 8000 \\
  --backend pytorch \\
  --max_batch_size 1024 \\
  --max_num_tokens 3200 \\
  --max_seq_len 2048 \\
  --kv_cache_free_gpu_memory_fraction 0.8 \\
  --tp_size 8 \\
  --ep_size 8 \\
  --trust_remote_code \\
  --extra_llm_api_options \${EXTRA_LLM_API_FILE}`;
</script>

<h1>TensorRT-LLM</h1>

<p>
  <strong>TensorRT-LLM</strong> is NVIDIA's open-source inference engine. Of the
  three engines, it offers the highest performance and the most flexibility to
  expert users.
</p>

<h2>Two major versions</h2>

<p>
  Only the older major version of TensorRT-LLM actually depends on
  <Term id="tensorrt" />.
</p>

<div class="table-wrap" role="region" aria-label="TensorRT-LLM major versions" use:scrollable>
<table class="data">
  <caption>TensorRT-LLM major versions</caption>
  <thead>
    <tr>
      <th scope="col">Version</th>
      <th scope="col">Architecture</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">V0 (0.X.Y)</th>
      <td>An extension of NVIDIA TensorRT, which the book calls a TensorRT plugin. It compiles each language model into a TensorRT engine file for serving. This sense of "plugin" differs from a plugin kernel, which is one hand-picked kernel.</td>
    </tr>
    <tr>
      <th scope="row">V1 (1.X.Y)</th>
      <td>A standalone package based on PyTorch with no dependency on TensorRT. Released in the summer of 2025.</td>
    </tr>
  </tbody>
</table>
</div>

<Callout type="warning">
  <p>
    Deployments of V0 remain common. Always check which major version a
    deployment uses before following documentation or examples.
  </p>
</Callout>

<h2>Why TensorRT-LLM performs best</h2>

<p>
  TensorRT-LLM has access to kernels written by NVIDIA engineers, including some
  closed-source kernels. These handwritten, manually fused kernels support the
  latest architectures, such as <Term id="hopper" /> and <Term id="blackwell" />. They
  also support NVIDIA-specific number formats such as <Term id="nvfp4" />.
</p>

<p>
  TensorRT-LLM implements in-flight batching, its name for token-level
  <Term id="continuous-batching">continuous batching</Term>, which raises throughput. It also supports nearly
  every performance setting: quantization, speculation algorithms, prefix caching,
  <Term id="chunked-prefill">chunked prefill</Term>, flexible parallelism, and disaggregation. Chapter 5
  covers each of these settings.
</p>

<h2>Developer experience</h2>

<p>
  V1 offers a command-line experience similar to vLLM and SGLang through the
  <code>trtllm-serve</code> command. It also accepts a YAML configuration file,
  passed with <code>--extra_llm_api_options</code>, for deeper customization. The
  recommended installation is one of NVIDIA's official Docker containers.
</p>

<CodeFigure
  code={serve}
  language="shell"
  caption="Figure 4.6. A TensorRT-LLM inference example on eight GPUs. Each trailing backslash continues the command on the next line."
/>

<p>
  The example selects the PyTorch backend and sets tensor parallelism and expert
  parallelism to eight. The final flag points to an extra options file for
  settings beyond the command line.
</p>

<Signal kind="mistake" title="An engine setting is not a sizing rule">
  <p>
    The flag <code>--kv_cache_free_gpu_memory_fraction 0.8</code> is an
    <Term id="gpu-memory-fraction">engine setting</Term>. After the model weights
    load, it tells TensorRT-LLM to give 80 percent of the remaining free
    <Term id="vram" /> to the <Term id="kv-cache">KV cache</Term>. It does not tell you how many GPUs
    to buy. Sizing still follows the Chapter 3
    <Term id="memory-planning-factor">memory planning factor</Term>: total VRAM of at least 1.5 times the weight
    memory.
  </p>
</Signal>

<h2>When to choose TensorRT-LLM</h2>

<ul>
  <li>You run a well-supported model architecture on a Hopper or later GPU.</li>
  <li>You will invest extra engineering work to reach the best possible performance.</li>
  <li>You plan to serve with NVIDIA Dynamo and want the most deeply integrated engine.</li>
</ul>
