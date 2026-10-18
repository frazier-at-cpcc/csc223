<script module>
  export const pageConfig = { title: 'How Instances Differ' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>How Instances Differ</h1>

<p>
  Instances with the same GPU name are not identical. NVIDIA publishes reference architectures, but each cloud
  provider builds systems to its own preferences. Compute, memory, storage, and interconnect vary from provider
  to provider.
</p>

<h2>Form factors: SXM and PCIe</h2>
<p>Even the GPU itself can differ. Datacenter GPUs come in two form factors.</p>
<dl>
  <dt><strong>SXM</strong></dt>
  <dd>
    A socketed GPU module that supports higher-bandwidth connections and draws more power. SXM GPUs often have
    higher base specifications and are the standard for inference.
  </dd>
  <dt><strong>PCIe</strong></dt>
  <dd>
    A GPU that plugs into a standard PCI Express slot. PCIe GPUs often have lower base specifications and fewer
    interconnect options than the SXM variant of the same GPU.
  </dd>
</dl>
<p>
  The NVIDIA A100 illustrates the difference. Most A100 inference runs on the SXM variant, which has 5 percent
  more memory bandwidth than the PCIe variant.
</p>

<Callout type="important">
  <p>
    Know exactly what an instance includes before you provision it. Any component, not only the GPU, can become a
    bottleneck or a point of failure during inference.
  </p>
</Callout>
