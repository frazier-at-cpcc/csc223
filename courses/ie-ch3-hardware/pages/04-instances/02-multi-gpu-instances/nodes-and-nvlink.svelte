<script module>
  export const pageConfig = { title: 'Nodes, NVLink, and NVSwitch' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Nodes, NVLink, and NVSwitch</h1>

<p>
  Many models are too large for one <Term id="gpu">GPU</Term>. Engineers also combine GPUs to improve performance. Large models such as
  DeepSeek-V3, and demanding modalities such as video generation, commonly need two, four, eight, or more GPUs.
</p>

<h2>The node</h2>
<p>
  A <strong>node</strong> is the standard unit of datacenter GPUs: one server chassis, typically with eight
  interconnected GPUs. A <Term id="b200">B200</Term> node contains eight B200 GPUs.
</p>

<h2>Two layers of connection inside a node</h2>
<dl>
  <dt><strong>NVLink</strong></dt>
  <dd>
    A direct, high-bandwidth link between GPUs. Each GPU has about 900 GB/s of NVLink bandwidth on <Term id="hopper">Hopper</Term> and
    1,800 GB/s on <Term id="blackwell">Blackwell</Term>, counting both directions.
  </dd>
  <dt><strong>NVSwitch</strong></dt>
  <dd>
    A switch layer on top of NVLink. It coordinates traffic among all GPUs in a node, so any GPU can reach any
    other GPU at full NVLink speed.
  </dd>
</dl>
<p>
  Together, these links let one model's inference spread across several GPUs, up to a full eight-GPU node.
  <Term id="tensor-parallelism">Tensor parallelism</Term>, which exchanges data between GPUs in every layer,
  depends on them.
</p>
