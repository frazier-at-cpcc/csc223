<script module>
  export const pageConfig = { title: 'Inference Time and End-to-End Time' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Inference Time and End-to-End Time</h1>

<p>The second key distinction in latency metrics is what the measurement covers.</p>

<ul>
  <li><strong>Inference time</strong> is the on-GPU time required to generate tokens.</li>
  <li><strong>End-to-end latency</strong> is the full time a user waits, including network latency and any time the request spends in a queue.</li>
</ul>

<h2>What each measurement tells you</h2>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Inference-only and end-to-end measurements</caption>
    <thead>
      <tr>
        <th scope="col">Measurement</th>
        <th scope="col">What it reveals</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Inference time</th>
        <td>How effective the model performance work is</td>
      </tr>
      <tr>
        <th scope="row">End-to-end latency</th>
        <td>How fast users perceive the application to be</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Using both to find the bottleneck</h2>

<p>Compare the two numbers to decide where to work next.</p>

<ul>
  <li>When inference time is fast but end-to-end latency is slow, the delay comes from infrastructure. Investigate network paths and request queues before touching the model.</li>
  <li>When inference time accounts for most of the end-to-end latency, model performance optimization is the right focus.</li>
</ul>

<h2>Worked example</h2>

<pre><code>Inference time      =   200 ms
End-to-end latency  = 1,400 ms
Outside the GPU     = 1,400 ms - 200 ms = 1,200 ms</code></pre>

<p>
  More than 85 percent of the user's wait happens outside the GPU.
  Making the model twice as fast would save only 100 milliseconds.
  The team gains far more by fixing network latency and queue time.
</p>

<Callout type="info">
  <p>Track both measurements. Inference time alone can show excellent results while users still experience a slow product.</p>
</Callout>
