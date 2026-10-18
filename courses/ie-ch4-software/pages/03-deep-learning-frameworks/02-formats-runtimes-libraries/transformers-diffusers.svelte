<script module>
  export const pageConfig = { title: 'Transformers and Diffusers' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Transformers and Diffusers</h1>

<p>
  Hugging Face maintains two libraries built on PyTorch: <code>transformers</code>
  for language and related models, and <code>diffusers</code> for diffusion
  models. Neither library is designed for large-scale production inference.
  Both offer reference implementations that inference engineers study and adapt.
</p>

<h2>What these libraries provide</h2>

<ul>
  <li>
    Model metadata: the <code>config.json</code> file that ships with each model
    holds essential information about the model's architecture.
  </li>
  <li>
    Utilities: helper functions for Hugging Face operations, such as downloading
    model weights, are widely used in inference servers.
  </li>
  <li>
    Sample code: the model card for most popular open models on Hugging Face
    includes <code>transformers</code> or <code>diffusers</code> sample code.
  </li>
</ul>

<h2>Appropriate uses</h2>

<p>
  The sample code shows the exact input and output specification of a model. It
  also suits local inference and notebook experiments.
</p>

<Callout type="important">
  <p>
    For production, write and compile PyTorch code directly or use a
    production-ready inference engine. The reference libraries are toolboxes for
    learning and experimentation.
  </p>
</Callout>
