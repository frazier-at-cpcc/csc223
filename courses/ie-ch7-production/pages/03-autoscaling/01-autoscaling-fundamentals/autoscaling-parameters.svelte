<script module>
  export const pageConfig = { title: 'Autoscaling Parameters' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Autoscaling Parameters</h1>

<p>A traffic-based autoscaling system is configured through five parameters.</p>
<div class="ie-table-wrap" role="region" aria-label="Autoscaling Parameters table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Parameter</th><th scope="col">Question it answers</th></tr>
  </thead>
  <tbody>
    <tr><td>Min replicas</td><td>How many replicas stay running regardless of traffic?</td></tr>
    <tr><td>Max replicas</td><td>How many replicas can the system allocate when traffic is high?</td></tr>
    <tr><td>Autoscaling window</td><td>How long is the sliding timeframe used to measure traffic and make scaling decisions?</td></tr>
    <tr><td>Scale down delay</td><td>How long does the system wait after a scale-down is suggested, in case another spike arrives?</td></tr>
    <tr><td>Concurrency target</td><td>How many requests should each replica handle at once?</td></tr>
  </tbody>
</table>
</div>

<h2>How the Autoscaler Uses the Parameters</h2>
<p>
  A traffic-based autoscaler, such as the Knative autoscaler for Kubernetes, applies a rule of this form each time it
  decides. It averages the number of concurrent requests over the <Term id="autoscaling-window">autoscaling window</Term>, divides by the
  <Term id="concurrency-target">concurrency target</Term>, and rounds up. The result is clamped between min replicas and max replicas. A new
  replica serves traffic only after its <Term id="cold-start">cold start</Term> ends, which the Cold Starts lesson covers.
</p>

<Signal kind="worked" title="Desired replicas from a window average">
  <p>
    The autoscaling window is 2 minutes. Concurrent requests averaged 40 in the first minute and 72 in the second. The
    concurrency target is 16, min replicas is 1, and max replicas is 10.
  </p>
  <ol>
    <li>Window average: (40 + 72) ÷ 2 = 56 concurrent requests.</li>
    <li>Raw replica count: 56 ÷ 16 = 3.5.</li>
    <li>Round up: 4 replicas, because 3 replicas at 16 requests each hold only 48.</li>
    <li>Clamp: 4 lies between 1 and 10, so the autoscaler requests 4 replicas.</li>
  </ol>
  <p>
    The 72 requests of the second minute alone would need 5 replicas. The window average asks for 4, so a longer
    window reacts more slowly to a rise.
  </p>
</Signal>
