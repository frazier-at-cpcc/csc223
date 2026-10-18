<script module>
  export const pageConfig = { title: 'The Long-File Pipeline' };
</script>

<script>
  import LongAudioPipeline from '../../../components/LongAudioPipeline.svelte';
</script>

<h1>The Long-File Pipeline</h1>

<p>Fast transcription of long files uses a multi-step pipeline.</p>

<ol>
  <li>
    <strong>Chunk with VAD.</strong> A VAD model, running on its own dedicated hardware, removes silence
    and cuts the audio into meaningful speech segments. Splitting at fixed time intervals would risk
    cutting words in half.
  </li>
  <li>
    <strong>Transcribe chunks in parallel.</strong> Multiple GPUs, or multiple MIG slices, transcribe
    many chunks at once. Each GPU also processes several chunks together with in-flight batching for
    high utilization. RTF improves roughly linearly with the number of GPUs.
  </li>
  <li>
    <strong>Stitch.</strong> The chunk transcripts are reassembled in order by timestamp.
  </li>
</ol>

<LongAudioPipeline />

<p>
  The chunker stage runs on CPUs, and the Whisper stage runs on GPU slices. The two stages scale
  independently, and any chunker can send work to any Whisper replica.
</p>
