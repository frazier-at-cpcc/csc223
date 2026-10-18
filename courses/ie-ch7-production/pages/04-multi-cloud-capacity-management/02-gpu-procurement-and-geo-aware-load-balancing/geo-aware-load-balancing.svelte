<script module>
  export const pageConfig = { title: 'Geo-Aware Load Balancing' };
</script>

<h1>Geo-Aware Load Balancing</h1>

<p>
  Successful AI applications have users around the world. A single cluster uses a load balancer so that every GPU
  receives the right amount of traffic. A multi-cluster system needs a <strong>global load balancer</strong> that does
  the same job across clusters.
</p>

<h2>Two competing goals</h2>

<ul>
  <li>A request should not sit in a queue while spare capacity waits elsewhere.</li>
  <li>A request should not routinely travel a long distance, such as from Singapore to a server in San Francisco.</li>
</ul>

<h2>Distance costs latency</h2>

<p>
  As a rule of thumb, a request takes about five milliseconds to cross one time zone. Latency budgets are small, so
  workloads should run as close to end users as possible.
</p>

<div class="ie-worked">
  <h2>Worked example</h2>
  <p>New York and San Francisco are three time zones apart.</p>
  <ul>
    <li>One way: 3 time zones × 5 milliseconds = 15 milliseconds.</li>
    <li>Round trip: 2 × 15 = 30 milliseconds.</li>
  </ul>
  <p>Those 30 milliseconds are spent before the model does any work.</p>
</div>
