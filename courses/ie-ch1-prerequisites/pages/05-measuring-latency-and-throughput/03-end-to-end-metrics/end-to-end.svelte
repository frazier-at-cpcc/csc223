<script module>
  export const pageConfig = { title: 'Inference Time and End-to-End Time' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Callout } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Inference Time and End-to-End Time</h1>

<p>The second key distinction in <Term id="latency">latency</Term> metrics is what the measurement covers.</p>

<ul>
  <li><dfn><strong>Inference time</strong></dfn> is the on-GPU time required to generate tokens.</li>
  <li>
    <Term id="end-to-end-latency">End-to-end latency</Term>, from Chapter 0, is the full time a user waits.
    It adds network time and any time the request spends in a <Term id="queue">request queue</Term> to the inference time.
  </li>
</ul>

<h2>What each measurement tells you</h2>

<div class="ie-table-wrap" role="region" aria-label="Inference-only and end-to-end measurements" use:scrollable>
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

<Signal kind="worked" title="Finding where the wait goes">
  <pre class="ie-steps"><code>Inference time      =   200 ms
End-to-end latency  = 1,400 ms
Outside the GPU     = 1,400 ms − 200 ms = 1,200 ms
Share outside GPU   = 1,200 ÷ 1,400 = about 86 percent</code></pre>
  <div
    class="ie-bar"
    role="img"
    aria-label="A bar for 1,400 milliseconds of end-to-end latency. Network and queue time fill 1,200 milliseconds, about 86 percent of the bar. Inference time fills the remaining 200 milliseconds."
  >
    <span class="ie-bar-out" style="width: 85.7%">Network and queue: 1,200 ms</span>
    <span class="ie-bar-gpu" style="width: 14.3%">GPU</span>
  </div>
  <p>
    About 86 percent of the user's wait happens outside the GPU.
    Making the model twice as fast would save only 100 milliseconds.
    The team gains far more by fixing network latency and queue time.
  </p>
</Signal>

<Callout type="info">
  <p>Track both measurements. Inference time alone can show excellent results while users still experience a slow product.</p>
</Callout>
