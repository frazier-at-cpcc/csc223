<script module>
  export const pageConfig = { title: 'Tuning Autoscaling Parameters' };
</script>

<script>
  import AutoscalingSimulator from '$shared/sims/AutoscalingSimulator.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Tuning Autoscaling Parameters</h1>

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
    <li>Set the autoscaling window to 10 minutes. Record the minutes with queued requests, and read the verdict. In the chart, compare how quickly the replica count climbs after minute 30 with step 1.</li>
    <li>Set the window back to 2 minutes, then set the scale down delay to 0 minutes. Compare the replica-hours and the idle capacity with step 1, and compare the queue at the start of the second spike, near minute 55, with step 1.</li>
  </ol>
</Signal>

<AutoscalingSimulator headingLevel={2} />

<p>
  In step 2 the queued minutes rise from 8 to 21, because a long window averages each spike away, and the verdict
  names the window as the cause. In step 3 the replica-hours fall from about 8.2 to about 6.5, and the queued minutes
  stay at 8. The chart shows the price of that saving. With no delay, the replicas leave during the 10-minute gap
  between the spikes, so the second spike meets 2 ready replicas and queues 80 requests instead of 32. A scale down
  delay at least as long as the gap between bursts keeps capacity ready for the next burst.
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
