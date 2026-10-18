<script module>
  export const pageConfig = { title: 'Consumer and Business Priorities' };
</script>

<h1>Consumer and Business Priorities</h1>

<p>Applications built for consumers and applications built for businesses have different inference needs.</p>

<h2>Consumer applications</h2>

<p>
  Consumer applications are usually more cost-sensitive, and their usage is harder to predict.
  Many consumer AI apps are designed to spread virally.
  A single launch or marketing campaign can cause a spike in usage overnight.
</p>
<p>
  For consumer apps, inference engineers prioritize marginal cost and flexibility.
  They hold latency and availability at a decent standard.
</p>

<h2>Business-to-business (B2B) applications</h2>

<p>
  B2B products usually have better margins and more stable usage.
  They also require high availability and consistently low latency.
  Mission-critical software in a customer's revenue path is held to a high standard of performance and reliability.
</p>
<p>
  For B2B products, inference engineers prioritize latency and uptime.
  Cost and scale remain important, but they are secondary.
</p>

<div class="ie-table-wrap">
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
