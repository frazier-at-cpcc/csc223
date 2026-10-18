<script module>
  export const pageConfig = { title: 'Reliability and Latency' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Reliability and Latency</h1>

<p>Thoughtful multi-cloud infrastructure delivers two benefits beyond raw capacity.</p>

<h2>Reliability</h2>

<p>
  Any single region or cloud provider can suffer downtime. A multi-cloud system protects against that downtime. When one
  region fails, the <Term id="control-plane">control plane</Term> moves its deployments to healthy workload planes in other regions and
  clouds. Routing then sends traffic to those workload planes.
</p>

<h2>Latency</h2>

<p>
  <Term id="end-to-end-latency">End-to-end latency</Term> is the total time a user waits, including the time a request spends traveling across
  the network. For global applications, running inference near end users improves end-to-end latency.
</p>

<p>
  For example, a network round trip between Singapore and the eastern United States takes more than 200 milliseconds. A
  user in Singapore whose requests travel to a data center in Virginia pays that delay on every request, before any token
  is generated. A workload plane in Asia removes most of that travel time.
</p>

<p>Chapter 7 covers multi-cloud deployment, routing, and failover in production.</p>
