<script module>
  export const pageConfig = { title: 'TTS Architecture' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import TtsPipeline from '../../../components/TtsPipeline.svelte';
</script>

<h1>TTS Architecture</h1>

<p>
  A <strong>text-to-speech (TTS)</strong> model, also called a speech synthesis model, takes text as
  input and produces spoken audio as output. In 2025, open models such as Orpheus TTS brought very
  lifelike speech synthesis to the open model ecosystem. Many companies fine-tuned Orpheus for better
  vocal quality and product-specific voices, which drove high adoption of open models in voice AI.
</p>

<h2>A fine-tuned LLM backbone</h2>

<p>
  Many modern TTS models, including the ones this lesson follows, are fine-tuned LLMs. Orpheus TTS, for
  example, derives from Llama 3.2 3B. Other production TTS models use flow-matching or diffusion
  designs, so check the architecture before you choose a runtime. For LLM-based TTS models, many LLM
  runtime and performance optimizations apply directly.
</p>
<ul>
  <li>
    TTS models are small. At 3 billion parameters, Orpheus is on the larger end. Like ASR models, they run
    efficiently on <Term id="mig">MIG</Term> slices of H100 GPUs.
  </li>
  <li>
    ASR models generally run in FP16. TTS model weights and KV cache can be quantized to
    <Term id="fp8">FP8</Term> for better performance.
  </li>
  <li>
    <Term id="tensorrt-llm">TensorRT-LLM</Term> adds optimized kernels and
    <Term id="continuous-batching">in-flight batching</Term> for the backbone.
  </li>
</ul>

<h2>Audio tokens and the audio decoder</h2>

<p>
  Training a TTS model on an LLM backbone expands the LLM's vocabulary with tens of thousands of
  encoded audio tokens. The model then trains on pairs of text inputs and tokenized audio outputs. In
  production, the model emits audio tokens, and a separate <strong>audio decoder</strong> converts those
  tokens into a waveform. The decoder of SNAC, a <Term id="neural-audio-codec">neural audio
  codec</Term>, is one such decoder.
</p>

<TtsPipeline />

<p>The audio decoder is a potential bottleneck. Configure it as follows:</p>
<ul>
  <li>Implement it in PyTorch and compile it for the target GPU.</li>
  <li>
    Use <Term id="dynamic-batching">dynamic batching</Term> with a short timeout, such as 15
    milliseconds. Dynamic batching collects requests until the batch is full or the timeout expires,
    then runs them together. Chapter 7 covers it in detail.
  </li>
  <li>
    Do not plan on in-flight batching for the decoder. In-flight batching lets requests join a running
    decode loop between steps. The audio decoder converts each block of tokens in a single forward pass,
    so it has no token-by-token loop for a request to join.
  </li>
</ul>
