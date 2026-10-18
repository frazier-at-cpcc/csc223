<script module>
  export const pageConfig = { title: 'Shared Inference and Dedicated Deployments' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>Shared Inference and Dedicated Deployments</h1>

<p>A product can add an AI model in one of two ways.</p>

<ul>
  <li>
    <dfn><strong>Shared inference</strong></dfn> sends the product's traffic to a public <Term id="api">API</Term> endpoint for a model.
    The provider serves many customers on the same hardware and charges per million <Term id="token">tokens</Term> or by another consumption metric.
  </li>
  <li>
    A <dfn><strong>dedicated deployment</strong></dfn> runs an inference service that serves only one application.
    The team rents <Term id="gpu">GPUs</Term> and pays per hour of GPU time, or it buys and installs GPUs on-premises.
  </li>
</ul>

<p>
  A token is the unit of text that a model reads and writes, about three-quarters of an English word on average.
  Chapter 2 explains how text becomes tokens.
</p>

<h2>Shared versus dedicated is not open versus closed</h2>

<p>
  The shared-or-dedicated choice is a separate question from the choice between open and closed models.
  Many shared endpoints serve open models.
  Many model labs also offer large customers a dedicated setup for their closed models.
</p>

<ul>
  <li>
    An <dfn><strong>open model</strong></dfn> is a model whose <Term id="weights">weights</Term> are published for download, usually under a license.
    Llama, DeepSeek, Qwen, and <Term id="whisper">Whisper</Term> are examples.
  </li>
  <li>
    A <dfn><strong>closed model</strong></dfn> is a proprietary model whose weights are not available, so it runs only through the provider's API.
  </li>
</ul>

<p>Teams often adopt open models because downloadable weights allow unrestricted dedicated inference.</p>

<Callout type="info">
  <p>Most AI products start on pay-per-token APIs. The tradeoffs favor shared inference while a team searches for product-market fit or is early in its growth.</p>
</Callout>
