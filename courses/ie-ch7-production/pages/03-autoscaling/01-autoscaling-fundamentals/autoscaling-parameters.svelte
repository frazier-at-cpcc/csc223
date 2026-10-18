<script module>
  export const pageConfig = { title: 'Autoscaling Parameters' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import AutoscalingSimulator from '$shared/sims/AutoscalingSimulator.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
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

<h2>Tradeoffs in Each Setting</h2>
<p>
  The exact configuration decides how well the system meets its latency target without wasting resources. Each
  parameter pulls in two directions.
</p>
<ul>
  <li>A longer autoscaling window keeps replica counts steady. A shorter window reacts faster to spikes.</li>
  <li>A longer scale down delay prevents premature scale-downs when traffic is spiky. It also keeps paying for replicas after traffic has truly cooled off.</li>
  <li>A higher min replicas value absorbs sudden demand without waiting for a cold start. It also pays for idle replicas during quiet periods.</li>
  <li>A max replicas value set too low caps capacity, so requests queue even while the autoscaler wants more replicas.</li>
</ul>

<Signal kind="try" title="Watch the window and the delay at work">
  <p>The simulator below starts on the Sudden spikes pattern with min replicas 1, max replicas 10, a concurrency target and <Term id="batch-size">batch size</Term> of 16, a 2-minute window, a 10-minute scale down delay, and a 3-minute cold start.</p>
  <ol>
    <li>Leave every setting as it loads. Record the minutes with queued requests and the GPU replica-hours.</li>
    <li>Set the autoscaling window to 10 minutes. Record the minutes with queued requests, and read the verdict to see why they rose.</li>
    <li>Set the window back to 2 minutes, then set the scale down delay to 0 minutes. Compare the replica-hours and the idle capacity with step 1, and note whether queueing changed.</li>
  </ol>
</Signal>

<AutoscalingSimulator headingLevel={2} />

<p>
  In step 2 the queued minutes rise from 8 to 21, because a long window averages each spike away. In step 3 the
  replica-hours fall from about 8.2 to about 6.5 with no change in queueing. This trace has two spikes about 10
  minutes apart, so the scale down delay protects little here. Traffic that returns in bursts a few minutes apart is
  where a delay pays for itself.
</p>

<p class="ie-objective">Practices objective 2: configure autoscaling parameters</p>
<NumericQuestion
  id="pr_window5"
  question="Return every setting to the starting values listed in the Try it box. Then set the autoscaling window to 5 minutes and leave everything else unchanged. How many minutes have queued requests?"
  answer={14}
  unit="minutes"
  correctFeedback="Correct. A 5-minute window sits between the 2-minute and 10-minute runs: 14 queued minutes against 8 and 21. Each extra minute of averaging delays the scale-up decision at the start of each spike."
  incorrectFeedback="Start from Sudden spikes with min 1, max 10, target 16, batch 16, delay 10, and cold start 3, then set only the window to 5 minutes. The stats panel reads 14 minutes with queued requests. The longer window dilutes each spike in the average, so the autoscaler requests replicas later."
/>
