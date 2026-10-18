<script module>
  export const pageConfig = { title: 'Autoscaling Parameters' };
</script>

<h1>Autoscaling Parameters</h1>

<p>A traffic-based autoscaling system is configured through five parameters.</p>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Parameter</th><th scope="col">Question it answers</th></tr>
  </thead>
  <tbody>
    <tr><td>Min replicas</td><td>How many replicas stay running regardless of traffic?</td></tr>
    <tr><td>Max replicas</td><td>How many replicas can the system allocate when traffic is high?</td></tr>
    <tr><td>Autoscaling window</td><td>How long is the sliding timeframe used to measure traffic and make scaling decisions?</td></tr>
    <tr><td>Scale down delay</td><td>How long does the system wait after a scale-down is suggested, in case another spike arrives?</td></tr>
    <tr><td>Concurrency target</td><td>How many requests can each replica handle at once?</td></tr>
  </tbody>
</table>

<h2>Every setting is a tradeoff</h2>

<p>
  The exact configuration decides how well the system meets latency SLAs without wasting resources. Each parameter
  pulls in two directions.
</p>

<ul>
  <li>A longer <strong>autoscaling window</strong> keeps replica counts steady. A shorter window reacts faster to spikes.</li>
  <li>A longer <strong>scale down delay</strong> prevents premature scale-downs when traffic is spiky. It also keeps paying for replicas after traffic has truly cooled off.</li>
  <li>A higher <strong>min replicas</strong> value absorbs sudden demand without a cold start. It also pays for idle replicas during quiet periods.</li>
</ul>

<div class="ie-worked">
  <h2>Worked example</h2>
  <p>
    A chat service sees traffic bursts every few minutes. After each burst, the autoscaler removes replicas, and the
    next burst arrives before new replicas are ready. Users see latency spikes at the start of every burst.
  </p>
  <p>
    Increasing the scale down delay keeps replicas online between bursts. The cost is extra GPU time after the final
    burst of the day ends.
  </p>
</div>
