<script module>
  export const pageConfig = { title: 'Rethinking Metrics for Each Modality' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Rethinking Metrics for Each Modality</h1>

<p>
  <Term id="latency">Latency</Term>, <Term id="throughput">throughput</Term>, and quality keep their
  meaning across modalities, but the way you measure them changes. A metric is useful only when it
  tracks what the user experiences.
</p>
<p>
  <Term id="time-to-first-token">Time to first token (TTFT)</Term> works for a chat LLM because one text
  token is visible and readable. A single token of audio from a TTS model is not useful to a listener.
  For speech output, measure the time to first word or the time to first sentence instead.
</p>

<div class="table-wrap" role="region" aria-label="Examples of metrics that fit each workload" use:scrollable>
  <table>
    <caption>Examples of metrics that fit each workload</caption>
    <thead>
      <tr>
        <th scope="col">Workload</th>
        <th scope="col">Metric that tracks the user experience</th>
        <th scope="col">What it captures</th>
        <th scope="col">Defined in the lesson on</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Vision language model</td>
        <td>TTFT, which grows with the number of images</td>
        <td>How long prefill of text and visual tokens delays the first word of the answer</td>
        <td>VLM inference</td>
      </tr>
      <tr>
        <td>Embedding lookup</td>
        <td>Request latency for a single query</td>
        <td>How long a search or retrieval call waits for its vector</td>
        <td>Embedding fundamentals</td>
      </tr>
      <tr>
        <td>Real-time transcription (ASR)</td>
        <td>Round-trip time per audio chunk</td>
        <td>How far the transcript lags behind the speaker</td>
        <td>Whisper and real-time transcription</td>
      </tr>
      <tr>
        <td>Long-file transcription (ASR)</td>
        <td>Real-time factor</td>
        <td>How many times faster than playback the file is transcribed</td>
        <td>Long files and diarization</td>
      </tr>
      <tr>
        <td>Speech synthesis (TTS)</td>
        <td>Time to first byte, time to first sentence</td>
        <td>When the listener first hears meaningful speech</td>
        <td>Speech synthesis inference</td>
      </tr>
      <tr>
        <td>Image or video generation</td>
        <td>End-to-end time per output image or clip</td>
        <td>The full wait, which grows with the number of denoising steps</td>
        <td>Image generation inference</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  Quality checks change as well. The embedding lesson uses cosine similarity to the original model's
  vectors to confirm that quantization preserved quality. Each modality lesson defines its metrics in
  detail.
</p>
