<script module>
  export const pageConfig = { title: 'What Inference Engines Provide' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>What Inference Engines Provide</h1>

<Signal kind="recall" chapter={0} title="Inference engines">
  <p>
    Chapter 0 defined an <Term id="inference-engine">inference engine</Term> as a high-performance runtime
    with built-in support for optimization techniques such as batching, caching,
    quantization, and speculation. This section compares the engines that put
    that definition into practice.
  </p>
</Signal>

<p>
  At the time of the book's publication in 2025, three engines led the market:
  vLLM, SGLang, and TensorRT-LLM. All three remain in wide use as of October
  2026.
</p>

<h2>Supported modalities</h2>

<p>
  All three engines deliver good out-of-the-box performance for LLMs and for
  other <Term id="modality">modalities</Term> with similar architectures, which
  Chapter 6 covers.
</p>

<p>
  In late 2025, two engines added image and video generation. vLLM added it
  through vLLM Omni, and SGLang added it through SGLang Diffusion. At the time
  of publication, TensorRT-LLM did not support image or video generation models.
  Engineers can also run those models with TensorRT or PyTorch directly.
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
  Each engine runs out of the box with core features such as
  <Term id="continuous-batching">continuous batching</Term>, which Chapter 7 details. Each engine also
  supports the main performance optimization techniques that Chapter 5 details:
</p>

<ul>
  <li><Term id="post-training-quantization">Post-training quantization</Term></li>
  <li><Term id="speculative-decoding">Speculative decoding</Term></li>
  <li><Term id="prefix-caching">Prefix caching</Term></li>
  <li><Term id="model-parallelism">Parallelism</Term> across GPUs</li>
  <li><Term id="disaggregation">Disaggregation</Term> of prefill and decode</li>
</ul>
