<script module>
  export const pageConfig = { title: 'Scale to Zero' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import { Callout } from 'tessera-learn';
  import AutoscalingSimulator from '$shared/sims/AutoscalingSimulator.svelte';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Scale to Zero</h1>

<p>
  <strong>Scale to zero</strong> is an advanced <Term id="autoscaling">autoscaling</Term> mechanism. The system scales down to zero active <Term id="replica">replicas</Term>
  when there is no traffic, then scales up automatically when traffic arrives. In autoscaling terms, it sets min
  replicas to 0.
</p>

<h2>Prerequisites for Scale to Zero</h2>
<ul>
  <li><strong>Fast cold starts:</strong> the first user may be waiting live, so the first replica must start as quickly as possible.</li>
  <li><strong>Robust queueing:</strong> the system must hold incoming requests until a replica is live.</li>
</ul>

<h2>Workloads That Fit</h2>
<p>Even with both prerequisites in place, scale to zero does not fit every workload.</p>
<div class="ie-table-wrap" role="region" aria-label="Workloads That Fit table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Workload</th><th scope="col">Fit</th><th scope="col">Reason</th></tr>
  </thead>
  <tbody>
    <tr><td>Development and testing</td><td>Good fit</td><td>Testing is bursty, and latency on the first request does not matter.</td></tr>
    <tr><td>An agent used only during business hours in one country</td><td>Good fit</td><td>Traffic arrives on a predictable schedule.</td></tr>
    <tr><td>An offline system that runs daily batch jobs</td><td>Good fit</td><td>Traffic arrives periodically, and no user waits live.</td></tr>
    <tr><td>A latency-sensitive application with light, unscheduled traffic</td><td>Poor fit</td><td>Random first requests pay the full cold start while a user waits.</td></tr>
  </tbody>
</table>
</div>
<Callout type="tip">
  <p>
    A latency-sensitive application that depends on scale to zero to keep costs low is probably not ready for
    dedicated infrastructure. Chapter 1 reached the same conclusion from the cost side: it should use pay-per-token
    APIs until it reaches greater scale.
  </p>
</Callout>

<Signal kind="try" title="Price the first request">
  <p>The simulator below loads a development environment: no traffic except bursts of 32 requests during minutes 40 to 54 and 85 to 94, with min replicas set to 0.</p>
  <ol>
    <li>Record the minutes with queued requests and the GPU replica-hours with min replicas at 0.</li>
    <li>Set min replicas to 2. Record the same two numbers and the idle capacity.</li>
    <li>Decide which setting a development team should choose, and which a latency-sensitive production service with this traffic should avoid.</li>
  </ol>
</Signal>

<AutoscalingSimulator pattern="burst" minReplicas={0} maxReplicas={4} autoscalingWindow={1} scaleDownDelay={5} coldStart={3} headingLevel={2} />

<p>
  With min replicas at 0, each burst waits for a full 3-minute cold start, but the run uses only about 1.2
  replica-hours. With min replicas at 2, nothing queues, yet the run pays for 4 replica-hours and most of that capacity
  sits idle. A development team accepts the wait. A production service whose users arrive at random cannot.
</p>

<p class="ie-objective">Practices objective 5: judge fit for scale to zero and component scaling</p>
<NumericQuestion
  id="pr_min1"
  question="In the simulator, return to the starting settings and set min replicas to 1. How many GPU replica-hours does the run use?"
  answer={2.6}
  tolerance={0.05}
  unit="replica-hours"
  correctFeedback="Correct. One always-on replica raises the cost from about 1.2 to 2.6 replica-hours. The queue is shorter, because the warm replica serves 16 of the 32 burst requests at once, yet requests still queue for the other 16 during each cold start."
  incorrectFeedback="Start from the Quiet, then bursts pattern with min 0, max 4, target 16, batch 16, window 1, delay 5, and cold start 3, then set only min replicas to 1. The stats panel shows 2.6 GPU replica-hours. A single warm replica halves the burst queue but does not remove it."
/>
