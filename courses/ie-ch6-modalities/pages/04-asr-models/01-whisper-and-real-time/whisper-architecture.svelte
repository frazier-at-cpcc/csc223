<script module>
  export const pageConfig = { title: 'Whisper Architecture' };
</script>

<script>
  import ModalityFlow from '../../../components/ModalityFlow.svelte';
</script>

<h1>Whisper Architecture</h1>

<p>
  An <strong>automatic speech recognition (ASR)</strong> model takes audio as input and produces text
  as output. ASR models power transcription and dictation apps. The most popular open ASR model is
  Whisper from OpenAI, which transcribes dozens of languages accurately.
</p>

<ModalityFlow
  number="6.4"
  caption="ASR models transcribe input audio into text."
  alt="Audio input flows into an ASR model, which outputs a text transcript"
  description="One input, an audio waveform, flows into a box labeled ASR model. The model outputs a text transcript."
  inputs={['Audio waveform']}
  model="ASR model"
  output="Text transcript"
/>

<h2>Size and hardware</h2>

<p>
  The largest and highest-quality Whisper model has only 1.55 billion parameters. Whisper runs fast on
  a fraction of a large GPU, such as a Multi-Instance GPU (MIG) slice of an H100. Smaller variants,
  distillations, and quantizations exist. In practice, the highest-quality models, Whisper 3 Large and
  Whisper 3 Turbo, meet most latency budgets.
</p>

<h2>Encoder and decoder</h2>

<ul>
  <li>
    <strong>Encoder:</strong> takes a processed audio waveform, a log-Mel spectrogram, and encodes it into
    audio features.
  </li>
  <li><strong>Decoder:</strong> takes the encoded audio features and converts them into text tokens.</li>
</ul>

<p>
  The decoder consumes the overwhelming majority of inference time. It is an autoregressive
  transformer very similar to an LLM, so LLM tooling applies directly. TensorRT-LLM is the main
  optimization tool. It provides in-flight batching for the decoder and an optimized C++ runtime with
  efficient CUDA kernels. TensorRT-LLM works especially well on Hopper and Blackwell GPUs, which makes
  MIG slices of those GPUs an even better fit for ASR.
</p>
