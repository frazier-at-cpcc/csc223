<script module>
  export const pageConfig = { title: 'Training-Time and Post-Training Quantization' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Training-Time and Post-Training Quantization</h1>

<p>
  Models with more <Term id="parameter">parameters</Term> are less sensitive to quantization, because each
  individual parameter matters less. Even very large models still need careful quantization.
</p>

<h2>Two points at which quantization happens</h2>
<ul>
  <li>
    <strong>Quantization-aware training</strong> computes <Term id="scale-factor">scale factors</Term> and optimizes <Term id="weights">weights</Term> together during
    training. The converged weights are already accurate at the target precision.
  </li>
  <li>
    <strong>Post-training quantization</strong> converts finished weights to a new precision. It sets scale factors
    through <strong>calibration</strong>: running a small, representative dataset through the model to measure the
    range of its values, then choosing scale factors that cover that range.
  </li>
</ul>
<p>
  Some labs release models built with quantization-aware training. GPT-OSS ships in MXFP4, and Kimi K2 Thinking
  ships in INT4. Engineers who serve open models start from finished weights. Post-training quantization is their
  usual approach, because it needs only a small calibration set. Quantization-aware training remains possible as a
  fine-tuning stage, but it needs training data, training compute, and a full evaluation cycle.
</p>

<h2>Quantization tooling</h2>
<p>
  NVIDIA TensorRT Model Optimizer (ModelOpt) is a leading open-source library for post-training quantization. It
  also supports <Term id="pruning">pruning</Term>, <Term id="distillation">distillation</Term>, and <Term id="sparsity">sparsity</Term>. Its outputs work with
  <Term id="vllm" />, <Term id="sglang">SGLang</Term>, and <Term id="tensorrt-llm">TensorRT-LLM</Term>.
</p>

<h2>Two decisions before quantizing</h2>
<p>After you pick a target precision, post-training quantization requires two more decisions.</p>
<ol>
  <li>Which parts of the model to quantize: weights, <Term id="activations">activations</Term>, <Term id="kv-cache">KV cache</Term>, or <Term id="attention">attention</Term>.</li>
  <li>Which number format offers the dynamic range and granularity those parts need.</li>
</ol>
<p>These decisions turn quantization from a yes-or-no choice into a spectrum of performance and quality tradeoffs.</p>
