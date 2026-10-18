<script module>
  export const pageConfig = { title: 'Routers and Load Balancers' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Routers and Load Balancers</h1>

<p>
  Once several replicas are online, the system must decide which request goes to which <Term id="replica">replica</Term>. Two types of
  components make that decision.
</p>
<div class="ie-table-wrap" role="region" aria-label="Routers and Load Balancers table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Component</th><th scope="col">Level</th><th scope="col">Question it answers</th></tr>
  </thead>
  <tbody>
    <tr><td>Router</td><td>Request level</td><td>Where should this request go?</td></tr>
    <tr><td>Load balancer</td><td>System level</td><td>Where could this request go?</td></tr>
  </tbody>
</table>
</div>
<p>
  A <strong>router</strong> finds the ideal destination for one specific request. A <strong>load balancer</strong>
  evens out requests across several acceptable destinations. Complex systems contain many of each. Routing happens
  throughout the stack, and load balancers sit at key points to keep system-wide performance stable.
</p>

<h2>Request Count Versus Load</h2>
<p>
  The goal is to split load evenly across replicas. The simplest load balancing policy, <strong>round-robin</strong>,
  hands requests to replicas in turn, so 12 requests across 3 replicas become 4 requests each. Equal counts do not
  achieve equal load. Requests differ in size. If most requests carry 100 input tokens, one request with 10,000 input
  tokens unbalances a round-robin scheme.
</p>

<h2>Routing to a Suitable Replica</h2>
<ul>
  <li>
    <Term id="cache-aware-routing">KV cache-aware routing</Term>, which Chapter 5 taught as cache-aware routing, sends a
    request to a replica that already holds a matching prefix in its <Term id="kv-cache">KV cache</Term>, so that replica can skip
    recomputing the shared prefix.
  </li>
  <li>LoRA-aware routing sends a request to a replica that already holds the requested <Term id="lora">LoRA</Term> fine-tuned weights in memory.</li>
</ul>
<p>
  Intelligent request routing draws on information from the <Term id="inference-engine">inference engine</Term> and from orchestrators such as
  <Term id="nvidia-dynamo" />. It places requests based on sequence length, prefix, and LoRA needs. The Multi-Cloud
  section adds one more component, the global load balancer, which chooses a cluster or region for each request.
</p>
