<script module>
  export const pageConfig = { title: 'Queueing' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Queueing</h1>

<p>
  Routing and load balancing cannot help when every replica is busy. An autoscaling system that receives more traffic
  than it can serve needs somewhere to hold requests while it scales up or waits for capacity to free up.
</p>
<p>
  A <strong>queue</strong> is the infrastructure primitive for this situation. It holds excess traffic while <Term id="autoscaling">autoscaling</Term>
  brings replicas online. The number of requests waiting in it, called the queue depth, is one of the observability
  metrics in the Testing and Deployment section.
</p>

<h2>Queue Designs</h2>
<ul>
  <li>A standard queue is first in, first out. Requests leave in the order they arrived.</li>
  <li>A priority queue reorders requests by rule. For example, it can serve paid users ahead of free users during high traffic.</li>
</ul>

<h2>Draining the Queue onto New Replicas</h2>
<p>
  The queue must see new replicas as soon as they come online. Otherwise, queued requests keep waiting for the
  original replicas while new capacity sits idle. Each new replica should receive queued traffic up to its concurrency
  limit as soon as it is active.
</p>
