<script module>
  export const pageConfig = { title: 'What Is an Instance' };
</script>

<h1>What Is an Instance</h1>

<p>
  An <strong>instance</strong> is the atomic unit of GPU allocation in the cloud. It is a provisioned virtual
  machine that bundles six components.
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>The six components of a cloud GPU instance</caption>
    <thead>
      <tr><th scope="col">Component</th><th scope="col">Also called</th><th scope="col">Role</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">GPUs</th><td>Device</td><td>One or more GPUs that run inference</td></tr>
      <tr><th scope="row">CPUs</th><td>Host</td><td>General-purpose compute for any task that does not run on the GPU</td></tr>
      <tr><th scope="row">Memory</th><td>Host memory</td><td>Traditional RAM for CPU operations</td></tr>
      <tr><th scope="row">Storage</th><td>Disk</td><td>Loads and stores large files, such as model weights</td></tr>
      <tr><th scope="row">Networking</th><td>Not applicable</td><td>Physical connections to the datacenter and the public internet</td></tr>
      <tr><th scope="row">Interconnect</th><td>Not applicable</td><td>Physical GPU-to-GPU and node-to-node links for multi-GPU work</td></tr>
    </tbody>
  </table>
</div>

<p>
  The device and host vocabulary appears throughout inference engineering. Device memory means VRAM on the GPU.
  Host memory means RAM attached to the CPU.
</p>
