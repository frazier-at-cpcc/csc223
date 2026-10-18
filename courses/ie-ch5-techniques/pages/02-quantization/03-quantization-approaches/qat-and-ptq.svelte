<script module>
  export const pageConfig = { title: 'Training-Time and Post-Training Quantization' };
</script>

<h1>Training-Time and Post-Training Quantization</h1>

<p>
  Models with more parameters are less sensitive to quantization, because each individual parameter matters less.
  Even very large models still need careful quantization.
</p>

<h2>Two points at which quantization happens</h2>
<ul>
  <li>
    <strong>Quantization-aware training</strong> computes scale factors and optimizes weights together during
    training. The converged weights are already accurate at the target precision.
  </li>
  <li>
    <strong>Post-training quantization</strong> converts finished weights to a new precision. It computes scale
    factors and preserves accuracy through <strong>calibration</strong>.
  </li>
</ul>
<p>
  Some labs release models built with quantization-aware training. GPT-OSS ships in MXFP4, and Kimi K2 Thinking
  ships in INT4. Engineers who serve open models work with finished weights, so post-training quantization is the
  only approach available to them.
</p>

<h2>Tooling</h2>
<p>
  NVIDIA TensorRT Model Optimizer (ModelOpt) is a leading open-source library for post-training quantization. It
  also supports pruning, distillation, and sparsity. Its outputs work with vLLM, SGLang, and TensorRT-LLM.
</p>

<h2>Two decisions before quantizing</h2>
<p>After you pick a target precision, post-training quantization requires two more decisions.</p>
<ol>
  <li>Which parts of the model to quantize: weights, activations, KV cache, or attention.</li>
  <li>Which number format offers the dynamic range and granularity those parts need.</li>
</ol>
<p>These decisions turn quantization from a yes-or-no choice into a spectrum of performance and quality tradeoffs.</p>
