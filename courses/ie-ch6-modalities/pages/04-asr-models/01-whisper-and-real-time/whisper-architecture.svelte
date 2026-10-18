<script module>
  export const pageConfig = { title: 'Whisper Architecture' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import WhisperPipeline from '../../../components/WhisperPipeline.svelte';
</script>

<h1>Whisper Architecture</h1>

<p>
  An <strong>automatic speech recognition (ASR)</strong> model takes audio as input and produces text
  as output. ASR models power transcription and dictation apps. At the book's publication in 2025, the
  most popular open ASR model was <Term id="whisper">Whisper</Term> from OpenAI, which transcribes dozens
  of languages accurately.
</p>

<h2>Size and hardware</h2>

<p>
  The largest and highest-quality Whisper model has only 1.55 billion parameters. Whisper runs fast on
  a fraction of a large GPU, such as a <Term id="mig">Multi-Instance GPU (MIG)</Term> slice of an
  <Term id="h100">H100</Term>. Smaller variants, distillations, and quantizations exist. In practice,
  the highest-quality models, Whisper large-v3 and Whisper large-v3-turbo, meet most latency budgets.
</p>

<h2>Encoder and decoder</h2>

<ul>
  <li>
    <strong>Encoder:</strong> takes a processed audio waveform and encodes it into audio features. The
    processed form is a <strong>log-Mel spectrogram</strong>, an image-like map of sound energy across
    frequencies over time, with frequencies spaced the way human hearing perceives pitch.
  </li>
  <li><strong>Decoder:</strong> takes the encoded audio features and converts them into text tokens.</li>
</ul>

<p>Whisper reads audio in chunks of at most 30 seconds.</p>

<WhisperPipeline />

<p>
  The decoder consumes the overwhelming majority of inference time. The encoder runs once per chunk of
  audio, while the decoder runs once for every text token it produces. The decoder is an autoregressive
  transformer very similar to an LLM, so LLM tooling applies directly. Whisper large-v3-turbo shows where
  the time goes: it keeps the large-v3 encoder and cuts the decoder from 32 layers to 4, and it runs several
  times faster as a result.
</p>
<p>
  <Term id="tensorrt-llm">TensorRT-LLM</Term> is the main optimization tool. It provides
  <Term id="continuous-batching">in-flight batching</Term> for the decoder and an optimized C++ runtime
  with efficient CUDA kernels. TensorRT-LLM works especially well on <Term id="hopper">Hopper</Term> and
  <Term id="blackwell">Blackwell</Term> GPUs, which makes MIG slices of those GPUs an even better fit for
  ASR.
</p>
