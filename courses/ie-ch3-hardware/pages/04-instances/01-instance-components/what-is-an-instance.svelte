<script module>
  export const pageConfig = { title: 'Cloud GPU Instances' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import InstanceDiagram from '../../../components/InstanceDiagram.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Cloud GPU Instances</h1>

<p>
  An <strong>instance</strong> is the atomic unit of <Term id="gpu">GPU</Term> allocation in the cloud. It is a provisioned virtual
  machine that bundles six components.
</p>

<div class="ie-table-wrap" role="region" aria-label="The six components of a cloud GPU instance" use:scrollable>
  <table class="ie-table">
    <caption>The six components of a cloud GPU instance</caption>
    <thead>
      <tr><th scope="col">Component</th><th scope="col">Also called</th><th scope="col">Role</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">GPUs</th><td>Device</td><td>One or more GPUs that run inference</td></tr>
      <tr><th scope="row">CPUs</th><td>Host</td><td>General-purpose compute for any task that does not run on the GPU</td></tr>
      <tr><th scope="row">Memory</th><td>Host memory</td><td>Traditional RAM for <Term id="cpu">CPU</Term> operations</td></tr>
      <tr><th scope="row">Storage</th><td>Disk</td><td>Loads and stores large files, such as model <Term id="weights">weights</Term></td></tr>
      <tr><th scope="row">Networking</th><td>Not applicable</td><td>Physical connections to the datacenter and the public internet</td></tr>
      <tr><th scope="row">Interconnect</th><td>Not applicable</td><td>Physical GPU-to-GPU and node-to-node links for multi-GPU work</td></tr>
    </tbody>
  </table>
</div>

<p>
  The <strong>host</strong> and <strong>device</strong> vocabulary appears throughout inference engineering.
  Device memory means <Term id="vram">VRAM</Term> on the GPU. Host memory means RAM attached to the CPU.
</p>

<InstanceDiagram />

<h2>Tracing a data path</h2>
<p>
  Every transfer in an instance crosses at least one link, and the slowest link on the path sets its speed.
  Weights loaded from disk pass through host memory and cross <Term id="pcie">PCIe</Term> into VRAM. Traffic
  between GPUs in the same server crosses <Term id="nvlink" />. Traffic to another server leaves through a
  network interface. The next lesson measures each of these links.
</p>
