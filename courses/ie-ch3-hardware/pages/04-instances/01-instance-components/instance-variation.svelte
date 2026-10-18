<script module>
  export const pageConfig = { title: 'How Instances Differ' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>How Instances Differ</h1>

<p>
  Instances with the same GPU name are not identical. NVIDIA publishes reference architectures, which are
  recommended system designs, but each cloud provider builds systems to its own preferences. Compute, memory,
  storage, and interconnect vary from provider to provider.
</p>

<h2>Form factors: SXM and PCIe</h2>
<p>Even the GPU itself can differ. Datacenter GPUs come in two form factors.</p>
<dl>
  <dt><strong>SXM</strong></dt>
  <dd>
    A socketed GPU module mounted on a board with its sibling GPUs. SXM GPUs connect to every other GPU in the
    <Term id="node">node</Term> through NVLink and <Term id="nvswitch">NVSwitch</Term>, and they run at higher power limits. They are the
    standard for large-scale inference.
  </dd>
  <dt><strong>PCIe</strong></dt>
  <dd>
    A GPU card that plugs into a standard PCI Express slot. PCIe GPUs draw less power and communicate mainly
    over the PCIe bus. At most, a bridge joins a pair of cards with NVLink.
  </dd>
</dl>
<p>
  The full NVLink connectivity is the main reason SXM GPUs dominate multi-GPU inference. The higher power limit
  also raises their base specifications. The NVIDIA A100 shows a smaller, secondary difference: the SXM variant
  has about 5 percent more <Term id="memory-bandwidth">memory bandwidth</Term> than the PCIe variant, 2.039 TB/s against 1.935 TB/s for the 80 GB
  models.
</p>

<Callout type="important">
  <p>
    Know exactly what an instance includes before you provision it. Any component, not only the GPU, can become a
    bottleneck or a point of failure during inference.
  </p>
</Callout>
