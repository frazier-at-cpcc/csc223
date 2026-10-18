<script module>
  export const pageConfig = { title: 'Tradeoffs of Shared Inference' };
</script>

<h1>Tradeoffs of Shared Inference</h1>

<p>Shared inference removes most of the work of running a model, and the team gives up control in exchange.</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Pros and cons of shared inference</caption>
    <thead>
      <tr>
        <th scope="col">Pro of shared inference</th>
        <th scope="col">Matching con</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>No overhead. The team pays only for what it consumes.</td>
        <td>Cost grows linearly with usage.</td>
      </tr>
      <tr>
        <td>No cold start time. The model is always available.</td>
        <td>The provider's uptime caps the product's uptime, and other customers on the same endpoint can degrade performance.</td>
      </tr>
      <tr>
        <td>Minimal engineering work. An API key is enough to start.</td>
        <td>The team has no control over latency, model quality, or rate limits.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Reading the tradeoffs</h2>

<p>
  Each row pairs a benefit with its cost.
  Consumption pricing is ideal at low volume, and the same pricing becomes expensive at high volume.
  A shared endpoint is always warm, and the product inherits every outage the provider has.
</p>
<p>
  A <strong>cold start</strong> is the time from scaling a model replica up from zero to its first successful response.
  Dedicated deployments must manage cold starts themselves. Shared endpoints hide them.
</p>
<p>
  Customers who share an endpoint compete for the same capacity.
  These "noisy neighbors" can slow a product's requests without any change on the product's side.
</p>
