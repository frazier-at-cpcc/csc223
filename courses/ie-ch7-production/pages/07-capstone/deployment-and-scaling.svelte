<script module>
  export const pageConfig = { title: 'Capstone Step 6: Deployment and Scaling' };
</script>

<script>
  import AutoscalingSimulator from '$shared/sims/AutoscalingSimulator.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Capstone Step 6: Deployment and Scaling</h1>

<Signal kind="recall" chapter={7}>
  <p>
    The autoscaler requests ceil(window-average concurrency ÷ <Term id="concurrency-target">concurrency target</Term>) replicas, clamped
    between min and max replicas. The concurrency target must match the replica batch size, and every new replica
    serves only after its <Term id="cold-start">cold start</Term>.
  </p>
</Signal>

<p>
  Beacon ships as a pinned <Term id="container-image">container image</Term>, referenced by digest, with the FP8 weights in a cache in the same
  datacenter as the GPUs. Each <Term id="replica">replica</Term> runs a <Term id="batch-size">batch size</Term> of 16. At the projected volume, the morning ramp climbs from
  about 8 concurrent requests overnight to a plateau of about 120 by late morning.
</p>

<p class="ie-objective">Decision 6a, drawing on Chapter 7</p>
<NumericQuestion
  id="cap_max"
  question="With a concurrency target of 16, what is the smallest max replicas value that lets Beacon serve the 120-request plateau without a queue?"
  answer={8}
  unit="replicas"
  correctFeedback="Correct. 120 ÷ 16 = 7.5, which rounds up to 8 replicas. At 2 H100s each, the plateau uses 16 GPUs."
  incorrectFeedback="Divide the plateau by the concurrency target and round up: 120 ÷ 16 = 7.5, so 8 replicas. A max of 7 would hold only 112 requests."
/>

<Signal kind="try" title="Stress-test Beacon's autoscaling">
  <p>The simulator loads Beacon's settings: the Morning ramp pattern, min replicas 1, max replicas 10, a concurrency target and batch size of 16, a 1-minute window, a 10-minute scale down delay, and a 2-minute cold start.</p>
  <ol>
    <li>Record the minutes with queued requests and the peak queue with these settings.</li>
    <li>Set the cold start to 8 minutes, which models a replica that compiles its engine at startup with no cache. Record the same two numbers.</li>
    <li>Set the cold start back to 2 minutes, then set max replicas to 6. Read the verdict and the replica count on the plateau.</li>
  </ol>
</Signal>

<AutoscalingSimulator pattern="ramp" minReplicas={1} maxReplicas={10} concurrencyTarget={16} batchSize={16} autoscalingWindow={1} scaleDownDelay={10} coldStart={2} headingLevel={2} />

<p>
  With a 2-minute cold start, short queues of at most 4 requests form while each new replica starts. An 8-minute cold
  start stretches the queueing to 56 of 120 minutes, which is why step 4 favored an engine with a compile cache and
  this step keeps the weights nearby. A ceiling of 6 replicas caps the plateau at 96 requests, and the queue never
  drains.
</p>

<p class="ie-objective">Decision 6b, drawing on Chapter 7</p>
<NumericQuestion
  id="cap_cold5"
  question="Return the simulator to Beacon's settings, then set the cold start to 5 minutes. How many minutes have queued requests?"
  answer={35}
  unit="minutes"
  correctFeedback="Correct. A 5-minute cold start produces 35 queued minutes, between the 14 of the 2-minute run and the 56 of the 8-minute run. Every minute of cold start lengthens each wait at the top of the ramp."
  incorrectFeedback="Use Morning ramp, min 1, max 10, target 16, batch 16, window 1, delay 10, and change only the cold start to 5 minutes. The stats panel shows 35 minutes with queued requests."
/>

<details class="ie-decision">
  <summary>Decision carried forward</summary>
  <p>
    Beacon runs with min replicas 1, max replicas 10, a concurrency target of 16 that matches the batch size, a
    1-minute window, a 10-minute scale down delay, and a cold start near 2 minutes. It scales from 1 replica overnight
    to 8 replicas, or 16 H100s, at the plateau.
  </p>
</details>
