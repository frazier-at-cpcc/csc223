<script module>
  export const pageConfig = { title: 'Reliability and Latency' };
</script>

<h1>Reliability and Latency</h1>

<p>Thoughtful multi-cloud infrastructure delivers two benefits beyond raw capacity.</p>

<h2>Reliability</h2>

<p>
  Any single region or cloud provider can suffer downtime. A multi-cloud system protects against that downtime. When one
  region fails, the control plane serves traffic from workload planes in other regions and clouds.
</p>

<h2>Latency</h2>

<p>
  <dfn><strong>End-to-end latency</strong></dfn> is the total time a user waits, including the time a request spends
  traveling across the network. For global applications, running inference near end users improves end-to-end latency.
</p>

<p>
  For example, a user in Singapore whose request travels to a North American data center waits for the round trip on
  every request. A workload plane in Asia removes most of that travel time.
</p>
