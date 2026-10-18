<script module>
  export const pageConfig = { title: 'Routers and Load Balancers' };
</script>

<h1>Routers and Load Balancers</h1>

<p>
  Once several replicas are online, the system must decide which request goes to which replica. Two types of
  components make that decision.
</p>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Component</th><th scope="col">Level</th><th scope="col">Question it answers</th></tr>
  </thead>
  <tbody>
    <tr><td>Router</td><td>Request level</td><td>Where should this request go?</td></tr>
    <tr><td>Load balancer</td><td>System level</td><td>Where could this request go?</td></tr>
  </tbody>
</table>

<p>
  A <strong>router</strong> finds the ideal destination for one specific request. A <strong>load balancer</strong>
  evens out requests across several acceptable destinations. Complex systems contain many of each. Routing happens
  throughout the stack, and load balancers sit at key points to keep system-wide performance stable.
</p>

<h2>Equal request counts are not equal load</h2>

<p>
  The goal is to split load evenly across replicas. Dividing 12 requests across 3 replicas as 4 requests each does not
  achieve that goal. Requests differ in size. If most requests carry 100 input tokens, one request with 10,000 input
  tokens unbalances a simple scheme.
</p>

<h2>Some replicas suit some requests</h2>

<ul>
  <li><strong>KV cache-aware routing</strong> sends a request to a replica that already holds a matching prefix in its KV cache, so that replica can skip recomputing the shared prefix.</li>
  <li><strong>LoRA-aware routing</strong> sends a request to a replica that already holds the requested LoRA fine-tuned weights in memory.</li>
</ul>

<p>
  Intelligent request routing draws on information from the inference engine and from orchestrators such as NVIDIA
  Dynamo. It places requests based on sequence length, prefix, and LoRA needs.
</p>
