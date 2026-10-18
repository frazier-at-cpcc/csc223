<script module>
  export const pageConfig = { title: 'Consumer and Business Priorities' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Consumer and Business Priorities</h1>

<p>Applications built for consumers and applications built for businesses have different inference needs.</p>

<h2>Consumer applications</h2>

<p>
  A <dfn><strong>consumer application</strong></dfn> is sold to individual people, often at a low price or for free.
  Consumer applications are usually more cost-sensitive, and their usage is harder to predict.
  Many consumer AI apps are designed to spread virally.
  A single launch or marketing campaign can cause a spike in usage overnight.
</p>
<p>
  For consumer apps, inference engineers prioritize marginal cost and flexibility.
  Marginal cost is the cost of serving one more request or one more user.
  Flexibility is the ability to absorb a sudden spike without a long purchase or setup.
  The engineers hold latency and availability at a decent standard.
</p>

<h2>Business-to-business (B2B) applications</h2>

<p>
  A <dfn><strong>business-to-business (B2B) application</strong></dfn> is sold to companies, usually under a contract.
  B2B products usually have better margins, meaning a larger gap between price and cost, and more stable usage.
  They also require high availability and consistently low <Term id="latency">latency</Term>.
  Software in a customer's revenue path, the steps through which that customer earns money, is mission-critical: an outage or a slowdown costs the customer sales.
  Such software is held to a high standard of performance and reliability.
</p>
<p>
  For B2B products, inference engineers prioritize latency and uptime.
  Cost and scale remain important, but they are secondary.
</p>

<div class="ie-table-wrap" role="region" aria-label="Inference priorities by market" use:scrollable>
  <table class="ie-table">
    <caption>Inference priorities by market</caption>
    <thead>
      <tr>
        <th scope="col">Market</th>
        <th scope="col">Typical usage</th>
        <th scope="col">Primary priorities</th>
        <th scope="col">Secondary priorities</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Consumer</th>
        <td>Unpredictable, with viral spikes</td>
        <td>Marginal cost and flexibility</td>
        <td>Decent latency and availability</td>
      </tr>
      <tr>
        <th scope="row">B2B</th>
        <td>Stable, with better margins</td>
        <td>Latency and uptime</td>
        <td>Cost and scale</td>
      </tr>
    </tbody>
  </table>
</div>
