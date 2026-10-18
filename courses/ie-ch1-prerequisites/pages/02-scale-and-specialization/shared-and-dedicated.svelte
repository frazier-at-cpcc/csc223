<script module>
  export const pageConfig = { title: 'Shared Inference and Dedicated Deployments' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Shared Inference and Dedicated Deployments</h1>

<p>A product can add an AI model in one of two ways.</p>

<ul>
  <li>
    <strong>Shared inference</strong> sends the product's traffic to a public API endpoint for a model.
    The provider charges per million tokens or by another consumption metric.
  </li>
  <li>
    <strong>Dedicated deployments</strong> run an inference service that serves only one application.
    The team rents GPUs and pays per hour of GPU time, or it buys and installs GPUs on-premises.
  </li>
</ul>

<h2>Shared versus dedicated is not open versus closed</h2>

<p>
  The shared-or-dedicated choice is a separate question from the choice between open and closed models.
  Many shared endpoints serve open models.
  Many model labs also offer large customers a dedicated setup for their closed models.
</p>
<p>
  An <strong>open model</strong> is a model whose weights are freely available, such as Llama, DeepSeek, or Whisper.
  Open weights are a major reason teams adopt open models, because open weights allow unrestricted dedicated inference.
</p>

<Callout type="info">
  <p>Most AI products start on pay-per-token APIs. The tradeoffs favor shared inference while a team searches for product-market fit or is early in its growth.</p>
</Callout>
