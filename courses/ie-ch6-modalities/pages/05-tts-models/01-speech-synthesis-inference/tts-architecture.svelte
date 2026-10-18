<script module>
  export const pageConfig = { title: 'TTS Architecture' };
</script>

<script>
  import ModalityFlow from '../../../components/ModalityFlow.svelte';
</script>

<h1>TTS Architecture</h1>

<p>
  A <strong>text-to-speech (TTS)</strong> model, also called a speech synthesis model, takes text as
  input and produces spoken audio as output. In 2025, open models such as Orpheus TTS brought very
  lifelike speech synthesis to the open model ecosystem. Many companies fine-tuned Orpheus for better
  vocal quality and product-specific voices, which drove high adoption of open models in voice AI.
</p>

<ModalityFlow
  number="6.6"
  caption="Text-to-speech models synthesize input text into audio."
  alt="Text input flows into a TTS model, which outputs an audio waveform"
  description="One input, a text document, flows into a box labeled TTS model. The model outputs an audio waveform of synthesized speech."
  inputs={['Text']}
  model="TTS model"
  output="Speech audio"
/>

<h2>A fine-tuned LLM</h2>

<p>
  Modern TTS models are fine-tuned LLMs. Orpheus TTS, for example, derives from Llama 3.2 3B. Many LLM
  runtime and performance optimizations therefore apply to speech synthesis.
</p>

<ul>
  <li>TTS models are small. At 3 billion parameters, Orpheus is on the larger end. Like ASR models, they run efficiently on MIG slices of H100 GPUs.</li>
  <li>ASR models generally run in FP16. TTS model weights and KV cache can be quantized to FP8 for better performance.</li>
  <li>TensorRT-LLM adds optimized kernels and in-flight batching.</li>
</ul>

<h2>Audio tokens and the audio decoder</h2>

<p>
  Training a TTS model on an LLM backbone expands the LLM's vocabulary with tens of thousands of
  encoded audio tokens. The model then trains on pairs of text inputs and tokenized audio outputs. In
  production, the model emits audio tokens, and a separate <strong>audio decoder</strong> converts those
  tokens into a waveform. SNAC is one such decoder.
</p>

<p>The audio decoder is a potential bottleneck. Configure it as follows:</p>

<ul>
  <li>Implement it in PyTorch and compile it for the target GPU.</li>
  <li>Use dynamic batching with a short timeout, such as 15 milliseconds.</li>
  <li>Do not plan on in-flight batching, which the audio decoder cannot use.</li>
</ul>
