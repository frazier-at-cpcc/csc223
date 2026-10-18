<script module>
  export const pageConfig = { title: 'When to Use Dynamo' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>When to Use Dynamo</h1>

<p>
  As a general principle, more scale makes more optimization tools and
  techniques available. Dynamo is built for scale: big models and big traffic.
</p>

<h2>Strong fits</h2>

<ul>
  <li>Serving foundation models, such as the trillion-parameter Kimi family, to many concurrent users.</li>
  <li>Building an inference API for a foundation model trained from scratch.</li>
  <li>Serving an open model inside a high-usage product.</li>
</ul>

<p>
  Smaller models in large-scale deployments can also gain moderate performance
  improvements from Dynamo.
</p>

<h2>Poor fits</h2>

<p>
  Many deployments do not need the extra complexity. Dynamo's value comes from
  disaggregation and KV-aware routing. Without enough traffic volume for those
  techniques to matter, Dynamo adds work and overhead without a matching benefit.
  Those deployments should use an inference engine directly.
</p>

<Callout type="tip">
  <p>
    Before adopting Dynamo, confirm that the deployment carries enough volume
    for disaggregation and KV-aware routing to pay off. Otherwise, serve the
    model with the inference engine alone.
  </p>
</Callout>

<h2>Project status</h2>

<p>
  Dynamo is the newest project in this chapter, and its features are still being
  built. It is open source under the Apache 2.0 license. Its community is active,
  with a public continuous integration system and support from NVIDIA engineers.
</p>
