<script module>
  export const pageConfig = { title: 'Why Multi-Instance GPUs Exist' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Why Multi-Instance GPUs Exist</h1>

<p>
  Multi-GPU instances solve models that are too large for one GPU. Inference engineers also face the opposite
  problem: a GPU that is too large for the model.
</p>
<p>
  Datacenter <Term id="hopper">Hopper</Term> and <Term id="blackwell">Blackwell</Term> GPUs such as the <Term id="h100" /> and the
  <Term id="b200" /> are large GPUs, with large compute and memory allocations. Such a GPU is hard to use effectively
  for a model with a couple of billion <Term id="parameter">parameters</Term> or fewer. At modest traffic, much of the GPU's compute and
  memory sits idle. A small model can fill the GPU only when it runs at very large <Term id="batch-size">batch sizes</Term>, and many
  services never see that much traffic.
</p>

<h2>Two options for small models</h2>
<ul>
  <li>Run the small model on an older, lower-performance GPU.</li>
  <li>Run the small model on a fraction of a newer, high-performance GPU.</li>
</ul>
<p>
  <strong>Multi-Instance GPU (MIG)</strong> enables the second option. MIG is a hardware-level capability in larger
  GPUs, including the A100, H100, H200, and B200. It splits one GPU into as many as seven isolated pieces, each with
  its own compute and memory.
</p>
<p>
  MIG itself divides only the GPU. A cloud provider that sells a MIG slice as an
  <Term id="instance">instance</Term> also assigns that instance a share of the host's <Term id="cpu">CPU</Term> cores, RAM, storage,
  and network bandwidth.
</p>
