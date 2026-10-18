<script module>
  export const pageConfig = { title: 'Offline Workloads' };
</script>

<h1>Offline Workloads</h1>

<p>Offline workloads run on a schedule or in bulk, with no user waiting on each response.</p>

<div class="ie-table-wrap">
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
        <td>Embeds, converts, or analyzes a set of documents on a regular cadence.</td>
      </tr>
      <tr>
        <th scope="row">Corpus preparation</th>
        <td>Cleans, embeds, or otherwise prepares massive data corpora for model training.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>One model, two deployments</h2>

<p>A single model can serve both online and offline jobs.</p>

<p>
  Whisper is a speech-to-text model.
  One company could use Whisper for a real-time dictation app and for a batch transcription job.
  The dictation app is online and needs low latency.
  The batch job is offline and needs high throughput.
</p>
<p>
  When both uses have enough volume, two separate deployments of the same model are more cost-effective than one shared deployment.
  One deployment is optimized for latency.
  The other is optimized for throughput.
</p>
