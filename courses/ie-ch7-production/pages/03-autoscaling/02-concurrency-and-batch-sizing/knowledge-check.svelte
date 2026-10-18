<script module>
  export const pageConfig = { title: 'Knowledge Check: Concurrency and Batch Sizing' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Concurrency and Batch Sizing</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 2: configure autoscaling parameters</p>
<MultipleChoice
  id="kc_cb_mismatch"
  question="A deployment runs a batch size of 16 with a concurrency target of 32. During a traffic rise, latency climbs for several minutes before any new replica is requested. Which setting is wrong?"
  options={[
    'The concurrency target, which should equal the batch size',
    'The max replicas value, which caps the replica count',
    'The scale down delay, which removes replicas too soon',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The autoscaler plans for 32 requests per replica while the engine serves 16. Requests queue inside each replica, and the autoscaler sees no need to scale until load reaches twice what the replicas can actually serve.',
    'Incorrect. A low ceiling would show the replica count stuck at max replicas. Here the autoscaler never asks for more replicas in the first place.',
    'Incorrect. The scale down delay acts after traffic falls. This problem appears while traffic is rising.',
  ]}
/>

<p class="ie-objective">Practices objective 2: configure autoscaling parameters</p>
<NumericQuestion
  id="kc_cb_count"
  question="A chat deployment uses a batch size and concurrency target of 20. Peak window-average concurrency is 230 requests. What is the smallest max replicas value that avoids queueing at the peak?"
  answer={12}
  unit="replicas"
  correctFeedback="Correct. 230 ÷ 20 = 11.5, which rounds up to 12. With max replicas at 11, the deployment holds 220 requests and 10 wait."
  incorrectFeedback="Divide peak concurrency by the per-replica target and round up: 230 ÷ 20 = 11.5, so 12 replicas. Max replicas must be at least 12, or the ceiling blocks the twelfth replica."
/>
