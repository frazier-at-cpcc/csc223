<script module>
  export const pageConfig = { title: 'What Inference Engines Provide' };
</script>

<h1>What Inference Engines Provide</h1>

<p>
  An <strong>inference engine</strong> is a high-performance runtime with
  built-in support for optimization techniques such as batching, caching,
  quantization, and speculation. Three engines compete in the market today:
  vLLM, SGLang, and TensorRT-LLM.
</p>

<h2>Supported modalities</h2>

<p>
  All three engines deliver good out-of-the-box performance for LLMs and for
  other modalities with similar architectures, which Chapter 6 covers.
</p>

<p>
  In late 2025, two engines added image and video generation. vLLM added it
  through vLLM Omni, and SGLang added it through SGLang Diffusion. TensorRT-LLM
  does not support image or video generation models. Engineers can also run those
  models with TensorRT or PyTorch directly.
</p>

<h2>Configurability is the core value</h2>

<p>
  Inference engines are powerful because they are configurable. Engineers work
  with pre-optimized components at a high level of abstraction. They spend their
  time testing combinations of techniques instead of re-implementing routine
  components.
</p>

<h2>Shared features</h2>

<p>
  Each engine runs out of the box with core features such as continuous
  batching. Each engine also supports the main performance optimization
  techniques that Chapter 5 details:
</p>

<ul>
  <li>Post-training quantization</li>
  <li>Speculative decoding</li>
  <li>Prefix caching</li>
  <li>Parallelism</li>
  <li>Disaggregation</li>
</ul>
