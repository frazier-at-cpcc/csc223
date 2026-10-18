<script module>
  export const pageConfig = { title: 'Diarization' };
</script>

<h1>Diarization</h1>

<p>
  <strong>Diarization</strong> annotates a transcript with who spoke when. It is a problem adjacent to
  transcription. A diarization model categorizes audio by voice features, then segments and clusters
  the file to timestamp each change of speaker.
</p>

<h2>A different class of model</h2>

<p>
  Whisper is an encoder-decoder transformer. Diarization systems such as pyannote audio are pipelines
  of classic machine learning models instead. A diarization pipeline contains three kinds of model:
</p>

<ul>
  <li>a segmentation model,</li>
  <li>an embedding model, and</li>
  <li>a clustering model.</li>
</ul>

<p>
  Optimizing diarization means running each model fast and orchestrating the whole pipeline
  efficiently. Tools include PyTorch and pyannote, with optimizations such as Torch compilation.
</p>

<p>
  Plan capacity accordingly. Even highly optimized diarization takes at least twice as long to process
  an audio file as transcription does.
</p>
