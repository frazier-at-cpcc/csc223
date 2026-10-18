<script module>
  export const pageConfig = { title: 'Geo-Aware Load Balancing' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Geo-Aware Load Balancing</h1>

<p>
  Successful AI applications have users around the world. A single cluster uses a
  <Term id="load-balancer">load balancer</Term> so that every GPU receives the right amount of traffic. A multi-cluster system needs a
  <strong>global load balancer</strong> that does the same job across clusters and regions.
</p>

<h2>Two Competing Goals</h2>
<ul>
  <li>A request should not sit in a queue while spare capacity waits elsewhere.</li>
  <li>A request should not routinely travel a long distance, such as from Singapore to a server in San Francisco.</li>
</ul>

<h2>Network Distance and Latency</h2>
<p>
  Light in optical fiber travels about 200 kilometers per millisecond, roughly two thirds of its speed in a vacuum.
  That speed sets a physical floor on network latency. Each 100 kilometers of fiber path adds at least 1 millisecond of
  round-trip time. Real fiber routes run longer than the straight-line distance, and routers and switches add delay,
  so measured latency always sits above the floor.
</p>

<Signal kind="worked" title="New York to San Francisco">
  <p>The great-circle distance between New York and San Francisco is about 4,100 kilometers.</p>
  <ol>
    <li>One-way floor: 4,100 ÷ 200 = 20.5 milliseconds.</li>
    <li>Round-trip floor: 2 × 20.5 = 41 milliseconds.</li>
    <li>Measured reality: as of October 2026, round trips between the two cities commonly run 60 to 70 milliseconds, because fiber paths are longer than the great circle.</li>
  </ol>
  <p>
    Every request from New York served in San Francisco spends at least 41 milliseconds, and in practice about 60
    milliseconds, before the model does any work. <Term id="latency-budget">Latency budgets</Term> are small, so workloads should run as close to end
    users as possible.
  </p>
</Signal>

<Signal kind="mistake" title="The five-milliseconds-per-time-zone rule">
  <p>
    The book offers a rule of thumb of five milliseconds per time zone, which gives 15 milliseconds one way from New
    York to San Francisco. That figure falls below the 20.5-millisecond physical floor, so the rule understates real
    paths. Estimate from distance instead, and treat the result as a minimum.
  </p>
</Signal>

<p class="ie-objective">Practices objective 6: select multi-cloud measures</p>
<NumericQuestion
  id="pr_rtt_floor"
  question="A user in Frankfurt reaches a cluster in Madrid over a fiber path about 1,800 kilometers long. What is the minimum round-trip time, in milliseconds?"
  answer={18}
  tolerance={0.5}
  unit="milliseconds"
  correctFeedback="Correct. The one-way floor is 1,800 ÷ 200 = 9 milliseconds, so the round trip takes at least 18 milliseconds. Measured latency will be somewhat higher."
  incorrectFeedback="Divide the fiber path by 200 kilometers per millisecond for one way: 1,800 ÷ 200 = 9 milliseconds. Double it for the round trip: 18 milliseconds. The shortcut of 1 millisecond of round trip per 100 kilometers gives the same answer."
/>
