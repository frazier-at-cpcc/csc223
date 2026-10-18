<script module>
  export const pageConfig = { title: 'The Long-File Pipeline' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import LongAudioPipeline from '../../../components/LongAudioPipeline.svelte';
</script>

<h1>The Long-File Pipeline</h1>

<p>Fast transcription of long files uses a multi-step pipeline.</p>
<ol>
  <li>
    <strong>Chunk with VAD.</strong> A <Term id="vad">VAD</Term> model, running on its own dedicated
    hardware, removes silence and cuts the audio into meaningful speech segments. Splitting at fixed time
    intervals would risk cutting words in half.
  </li>
  <li>
    <strong>Transcribe chunks in parallel.</strong> Multiple GPUs, or multiple
    <Term id="mig">MIG</Term> slices, transcribe many chunks at once. Each GPU also processes several
    chunks together with <Term id="continuous-batching">in-flight batching</Term> for high utilization.
    RTF improves roughly linearly with the number of GPUs.
  </li>
  <li><strong>Stitch.</strong> The chunk transcripts are reassembled in order by timestamp.</li>
</ol>

<LongAudioPipeline />

<p>
  In Figure 6.5, the chunker replicas run on CPUs, and the Whisper replicas run on H100 MIG slices. The
  two stages scale independently, and any chunker can send work to any Whisper replica.
</p>

<h2>Comparing the two ASR pipelines</h2>

<p>
  The real-time pipeline from the previous lesson and the long-file pipeline use the same Whisper
  runtime. They differ in when the audio arrives and in what the user waits for.
</p>

<div class="table-wrap" role="region" aria-label="Real-time and long-file speech recognition pipelines compared" use:scrollable>
  <table>
    <caption>Real-time and long-file speech recognition pipelines compared</caption>
    <thead>
      <tr><th scope="col">Aspect</th><th scope="col">Real-time pipeline</th><th scope="col">Long-file pipeline</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">How audio arrives</th><td>Continuously, over a WebSocket, while the person speaks</td><td>All at once, as a finished file</td></tr>
      <tr><th scope="row">Order of chunks</th><td>Sequential, one chunk after another on the same GPU</td><td>Parallel, across many GPUs or MIG slices</td></tr>
      <tr><th scope="row">Previous-chunk prefix</th><td>Available, which improves quality</td><td>Not available, because chunks run at the same time</td></tr>
      <tr><th scope="row">Main metric</th><td>Round-trip time per chunk, with a 200 ms target</td><td>Real-time factor</td></tr>
      <tr><th scope="row">Where gains come from</th><td>Streaming and orchestration</td><td>Parallelism across GPUs, plus hallucination checks</td></tr>
    </tbody>
  </table>
</div>
