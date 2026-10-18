<script module>
  export const pageConfig = { title: 'When to Use Dynamo' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>When to Use Dynamo</h1>

<p>
  As a general principle, more scale makes more optimization tools and
  techniques available. Dynamo is built for scale: big models and big traffic.
</p>

<h2>Strong fits</h2>

<ul>
  <li>Serving <Term id="foundation-model">foundation models</Term>, such as the trillion-parameter Kimi family, to many concurrent users.</li>
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
  disaggregation and cache-aware routing. Both need volume. Disaggregation pays
  off when enough requests arrive to keep separate prefill and decode pools busy.
  Cache-aware routing pays off when many requests share prefixes and several
  workers exist to choose among. Without that volume, Dynamo adds work and
  overhead without a matching benefit. Those deployments should use an inference
  engine directly.
</p>

<Callout type="tip">
  <p>
    Before adopting Dynamo, ask two questions. Does the deployment run enough
    workers that routing and separate pools have choices to make? Does it carry
    enough traffic to keep those workers busy? If either answer is no, serve the
    model with the inference engine alone.
  </p>
</Callout>

<h2>Project status</h2>

<p>
  At the time of the book's publication, Dynamo was the newest project in this
  chapter, and its features were still being built. It is open source under the
  Apache 2.0 license. Its community is active, with a public continuous
  integration system and support from NVIDIA engineers.
</p>
