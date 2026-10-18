<script module>
  export const pageConfig = { title: 'Batch Size and the Concurrency Target' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Batch Size and the Concurrency Target</h1>

<p>
  <strong>Batch sizing</strong> trades latency for throughput. A larger batch produces more total throughput, but each
  user waits longer for a response. Test performance across several batch sizes to find the right fit for the model,
  the instance, the latency target, and the budget.
</p>

<h2>Two settings that must agree</h2>

<p>The same limit appears at two levels of the system.</p>

<ul>
  <li>At the autoscaling level, the <strong>concurrency target</strong> states how many requests each replica handles at once.</li>
  <li>At the replica level, the inference engine's batch size sets how many requests it processes together.</li>
</ul>

<Callout type="important">
  <p>Set the concurrency target to match the replica batch size.</p>
</Callout>

<h2>How the autoscaler uses the target</h2>

<p>
  When every active replica reaches its maximum concurrency, the autoscaler spins up more replicas. When enough
  replicas are running half-full batches, the autoscaler scales back down.
</p>

<div class="ie-worked">
  <h2>Worked example</h2>
  <p>
    Each replica runs a batch size of 16, and the concurrency target is also 16. Four replicas are active, so the
    deployment holds 64 concurrent requests. When the 65th concurrent request arrives, every replica is full, and the
    autoscaler adds a fifth replica.
  </p>
  <p>
    Suppose the concurrency target were set to 32 instead. The autoscaler would believe each replica had room for
    32 requests while the engine processed only 16 at a time. Excess requests would queue inside the replicas, and
    latency would climb before any scale-up occurred.
  </p>
</div>
