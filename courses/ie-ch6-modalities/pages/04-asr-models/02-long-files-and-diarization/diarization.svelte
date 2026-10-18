<script module>
  export const pageConfig = { title: 'Diarization' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Diarization</h1>

<Callout type="info">
  <p>
    This page is enrichment. It describes a problem next to transcription that long-file pipelines often
    include. No knowledge check or quiz item assesses it.
  </p>
</Callout>

<p>
  <strong>Diarization</strong> annotates a transcript with who spoke when. It is a problem adjacent to
  transcription. A diarization model categorizes audio by voice features, then segments and clusters
  the file to timestamp each change of speaker.
</p>

<h2>A pipeline of specialized models</h2>

<p>
  Whisper is a single encoder-decoder transformer. Diarization systems such as pyannote audio are
  pipelines of several small specialized components rather than one transformer. A diarization
  pipeline contains three stages:
</p>
<ul>
  <li>a segmentation model, a small neural network that finds where speech and speaker changes occur;</li>
  <li>a speaker embedding model, a neural network that turns each segment into a voice vector; and</li>
  <li>a clustering algorithm that groups the voice vectors by speaker.</li>
</ul>
<p>
  Optimizing diarization means running each stage fast and orchestrating the whole pipeline
  efficiently. Tools include PyTorch and pyannote, with optimizations such as Torch compilation for the
  neural network stages.
</p>
<p>
  Plan capacity accordingly. Even highly optimized diarization takes at least twice as long to process
  an audio file as transcription does.
</p>
