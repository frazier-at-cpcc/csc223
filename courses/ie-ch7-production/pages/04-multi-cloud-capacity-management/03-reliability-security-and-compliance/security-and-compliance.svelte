<script module>
  export const pageConfig = { title: 'Security and Compliance' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Security and Compliance</h1>

<p>
  Security and compliance teams have scrutinized cloud infrastructure for more than twenty years. Inference must be
  secure and compliant before AI models can power mission-critical applications.
</p>

<h2>Three Areas of Concern</h2>
<div class="ie-table-wrap" role="region" aria-label="Three Areas of Concern table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Area</th><th scope="col">Concern</th></tr>
  </thead>
  <tbody>
    <tr><td>User data</td><td>All data, including user inputs and model outputs, must be protected.</td></tr>
    <tr><td>Model weights</td><td>Fine-tuned or proprietary weights are a valuable trade secret.</td></tr>
    <tr><td>Infrastructure</td><td>GPUs and access to model intelligence are both targets for abuse.</td></tr>
  </tbody>
</table>
</div>

<h2>Attack Surface</h2>
<p>
  The <strong>attack surface</strong> of a system is the set of places where an attacker could reach data or gain
  access. One of the most effective security decisions is to not store user inputs or model outputs at all, because
  data that does not exist cannot be stolen. Logging requirements or user agreements that retain data for training
  can rule this out. When retention is not required, skipping it shrinks the attack surface.
</p>
<p>
  Securing an inference workload otherwise resembles securing any containerized workload. The standard measures are
  data encryption, container security, network and access controls, and workload isolation, which keeps one
  customer's workload from reaching another's. Extensive third-party penetration testing, in which outside security
  specialists attempt to break in, validates all of these measures.
</p>

<h2>Compliance Benefits of Multi-Cloud</h2>
<ul>
  <li>
    <strong>Compliant providers:</strong> an application that must meet a certification such as SOC 2 Type II, an
    audit of a company's security controls over time, or a regulation such as HIPAA, the United States health privacy
    law, generally needs compliant providers too. Multi-cloud infrastructure can move workloads onto compliant
    providers.
  </li>
  <li>
    <strong>Data residency:</strong> some industries and countries require that user data from their country is
    processed only on servers inside that country. Running one model across several regions meets this requirement.
  </li>
</ul>

<Signal kind="worked" title="Residency across a border">
  <p>
    A company serves users in Canada and the United States. It runs one cluster with a provider near Toronto and another
    with a provider near New York. The global load balancer sends each user to the cluster in that user's own country.
    Canadian data stays in Canada, American data stays in the United States, and users across the region see minimal
    added latency, because Toronto and New York are only about 550 kilometers apart.
  </p>
</Signal>
