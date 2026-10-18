<script module>
  export const pageConfig = { title: 'Offline Workloads' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Offline Workloads</h1>

<p>Offline workloads run on a schedule or in bulk, with no user waiting on each response.</p>

<div class="ie-table-wrap" role="region" aria-label="Examples of offline workloads" use:scrollable>
  <table class="ie-table">
    <caption>Examples of offline workloads</caption>
    <thead>
      <tr>
        <th scope="col">Workload</th>
        <th scope="col">What it does</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Catalog transcription</th>
        <td>Transcribes a back catalog of podcasts, interviews, or other audio so that it becomes searchable.</td>
      </tr>
      <tr>
        <th scope="row">Document processing</th>
        <td>Converts, analyzes, or computes an <Term id="embedding">embedding</Term> for each document in a set on a regular cadence.</td>
      </tr>
      <tr>
        <th scope="row">Corpus preparation</th>
        <td>Cleans, embeds, or otherwise prepares massive data corpora for model training.</td>
      </tr>
    </tbody>
  </table>
</div>

<Signal kind="mistake" title="Classifying by the word batch or bulk">
  <p>
    A workload is not offline because it sounds large or repetitive.
    Embedding each search query the moment a user types it is online, because the user waits for the results.
    Embedding last week's new documents overnight is offline, because no one waits on any single document.
    Apply the waiting-user test, not the vocabulary of the task.
  </p>
</Signal>

<h2>One model, two deployments</h2>

<p>A single model can serve both online and offline jobs.</p>

<p>
  <Term id="whisper">Whisper</Term> is a speech-to-text model.
  One company could use Whisper for a real-time dictation app and for a batch transcription job.
  The dictation app is online and needs low latency.
  The batch job is offline and needs high throughput.
</p>

<p>
  When both uses have enough volume, two separate deployments of the same model are more cost-effective than one shared deployment.
  One deployment is optimized for latency.
  The other is optimized for throughput.
</p>
