<script module>
  export const pageConfig = { title: 'Deployment Modes' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Deployment Modes</h1>

<p>Few engineers own a datacenter GPU outright. Inference on datacenter GPUs runs in one of three modes.</p>

<dl>
  <dt><strong>Cloud</strong></dt>
  <dd>
    You rent GPUs in another company's datacenter. Providers include <strong>hyperscalers</strong>, which are
    general cloud providers such as AWS and GCP, and <strong>neoclouds</strong>, which are GPU-focused providers
    such as CoreWeave and Nebius.
  </dd>
  <dt><strong>On-premise</strong></dt>
  <dd>You purchase GPUs and install them in a datacenter that you control directly.</dd>
  <dt><strong>Air-gapped</strong></dt>
  <dd>
    You install GPUs on-premise with no external network path. Running inference requires physical access to
    the GPUs.
  </dd>
</dl>

<h2>Which mode engineers use</h2>
<p>
  Most inference engineers use cloud GPUs. Fast-growing AI products need the flexibility and on-demand
  capacity that the cloud provides. Large enterprises and governments run on-premise and air-gapped
  deployments when control or security requirements outweigh that flexibility.
</p>

<Callout type="info">
  <p>
    Choosing the cloud does not end the hardware decision. Providers differ in how they build systems, and
    NVIDIA's naming conventions add further nuance. The rest of this chapter equips you to read those
    differences.
  </p>
</Callout>
