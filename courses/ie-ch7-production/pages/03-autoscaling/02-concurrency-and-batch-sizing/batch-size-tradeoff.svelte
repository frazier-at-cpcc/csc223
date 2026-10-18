<script module>
  export const pageConfig = { title: 'Batch Size and the Concurrency Target' };
</script>

<script>
  import AutoscalingSimulator from '$shared/sims/AutoscalingSimulator.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Batch Size and the Concurrency Target</h1>

<p>
  <strong>Batch sizing</strong> trades latency for throughput. A larger <Term id="batch-size">batch size</Term>
  produces more total <Term id="throughput">throughput</Term>, but each user receives tokens more slowly. Chapter 1 described the same effect:
  serving more users at once raises <Term id="total-tps">total tokens per second</Term> and lowers each user's speed. Test performance across
  several batch sizes to find the right fit for the model, the instance, the latency target, and the budget.
</p>

<h2>Two Settings That Describe One Limit</h2>
<p>The same limit appears at two levels of the system.</p>
<ul>
  <li>At the autoscaling level, the <Term id="concurrency-target">concurrency target</Term> states how many requests each replica should handle at once.</li>
  <li>At the replica level, the <Term id="inference-engine">inference engine</Term>'s batch size sets how many requests it actually processes together.</li>
</ul>
<p>
  Set the concurrency target to match the replica batch size. The autoscaler adds a replica when the window-average
  concurrency exceeds what the current replicas hold at the target. It removes a replica when the load fits on one
  fewer replica at the target, and only after the scale down delay has passed.
</p>

<Signal kind="worked" title="The 65th request">
  <p>
    Each replica runs a batch size of 16, and the concurrency target is also 16. Four replicas are active, so the
    deployment holds 4 × 16 = 64 concurrent requests.
  </p>
  <ol>
    <li>Concurrency rises to 70. Every slot is full, so 6 requests wait in the queue.</li>
    <li>Once the average over the <Term id="autoscaling-window">autoscaling window</Term> passes 64, the autoscaler computes 70 ÷ 16 = 4.4, rounds up, and requests a fifth replica.</li>
    <li>The queue holds the excess until the fifth replica finishes its <Term id="cold-start">cold start</Term>. The new replica then takes up to 16 queued requests.</li>
  </ol>
  <p>Capacity does not appear the moment the 65th request arrives. The window and the cold start both delay it.</p>
</Signal>

<Signal kind="mistake" title="A concurrency target above the batch size">
  <p>
    Suppose the concurrency target were 32 while the engine batched only 16. The autoscaler would believe four replicas
    held 128 requests while they processed only 64. Requests 65 through 128 would queue inside the replicas, and
    latency would climb with no scale-up at all. A target below the batch size errs the other way: the autoscaler adds
    replicas early and pays for slots that never fill.
  </p>
</Signal>

<p class="ie-objective">Practices objective 2: configure autoscaling parameters</p>
<p>
  Complete the last step of this faded example. Batch size and concurrency target are both 12, and window-average
  concurrency is 100. Raw replica count: 100 ÷ 12 = 8.33.
</p>
<NumericQuestion
  id="pr_desired"
  question="After rounding, how many replicas does the autoscaler request?"
  answer={9}
  unit="replicas"
  correctFeedback="Correct. 100 ÷ 12 = 8.3, and the autoscaler rounds up to 9. Eight replicas would hold only 96 requests."
  incorrectFeedback="Divide the window-average concurrency by the target and round up: 100 ÷ 12 = 8.33, which rounds up to 9 replicas. Rounding down to 8 would leave 100 − 96 = 4 requests without a slot."
/>

<Signal kind="try" title="See the mismatch, then fix it">
  <ol>
    <li>Select the preset named Concurrency target above batch size. It runs the Morning ramp pattern with a target of 32 and a batch size of 16. Record the minutes with queued requests and the peak queue.</li>
    <li>Set the concurrency target to 16. Record the same two numbers, and compare the GPU replica-hours with step 1.</li>
    <li>Set the concurrency target to 8. Record the idle capacity and the GPU replica-hours.</li>
  </ol>
</Signal>

<AutoscalingSimulator pattern="ramp" concurrencyTarget={32} batchSize={16} autoscalingWindow={1} coldStart={2} headingLevel={2} />

<p>
  In step 1 requests queue for 100 of 120 minutes, because the autoscaler stops at 4 replicas. Matching the target in
  step 2 cuts that to 14 minutes with a peak queue of 4, at the price of more replica-hours. Halving the target in
  step 3 removes queueing but leaves about a third of paid capacity idle.
</p>

<p class="ie-objective">Practices objective 2: configure autoscaling parameters</p>
<NumericQuestion
  id="pr_target24"
  question="In the simulator, select the preset named Concurrency target above batch size, then set the concurrency target to 24. What is the peak queue, in requests?"
  answer={40}
  unit="requests"
  correctFeedback="Correct. With a target of 24, the autoscaler stops at 5 replicas, because 120 ÷ 24 = 5. Five replicas with a batch size of 16 serve only 80 requests, so 40 wait at the plateau."
  incorrectFeedback="Load the preset, then move only the concurrency target to 24. The stats panel shows a peak queue of 40 requests. The autoscaler plans for 24 requests per replica and stops at 120 ÷ 24 = 5 replicas, but each replica serves 16, so 120 − 80 = 40 requests wait."
/>
