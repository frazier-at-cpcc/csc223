<script module>
  export const pageConfig = { title: 'Tradeoffs of Shared Inference' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Tradeoffs of Shared Inference</h1>

<p>Shared inference removes most of the work of running a model, and the team gives up control in exchange.</p>

<div class="ie-table-wrap" role="region" aria-label="Pros and cons of shared inference" use:scrollable>
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
        <td>The team has no control over <Term id="latency">latency</Term>, model quality, or <Term id="rate-limit">rate limits</Term>.</td>
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
  A <Term id="cold-start">cold start</Term> is the time it takes to bring a new <Term id="replica">replica</Term> of a model from nothing to its first response.
  It includes provisioning a GPU, loading the model weights, and starting the <Term id="inference-engine">inference engine</Term>.
  A dedicated deployment pays this delay each time it adds a replica to meet rising traffic.
  A shared provider keeps its replicas running, so its customers do not see the delay.
  Chapter 7 covers cold starts and <Term id="autoscaling">autoscaling</Term> in depth.
</p>

<p>
  Customers who share an endpoint compete for the same capacity.
  These <dfn><strong>noisy neighbors</strong></dfn> can slow a product's requests without any change on the product's side.
</p>
