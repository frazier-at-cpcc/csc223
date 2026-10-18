<script module>
  export const pageConfig = { title: 'Nodes, NVLink, and NVSwitch' };
</script>

<h1>Nodes, NVLink, and NVSwitch</h1>

<p>
  Many models are too large for one GPU. Engineers also combine GPUs to improve performance. Large models such as
  DeepSeek, and demanding modalities such as video generation, commonly need two, four, eight, or more GPUs.
</p>

<h2>The node</h2>
<p>
  A <strong>node</strong> is the standard unit of datacenter GPUs: a chassis of eight interconnected GPUs. A B200
  node contains eight B200 GPUs.
</p>

<h2>Two layers of connection inside a node</h2>
<dl>
  <dt><strong>NVLink</strong></dt>
  <dd>
    A one-to-one communication layer between GPUs. It provides up to 1,800 GB/s on Blackwell and 900 GB/s on
    Hopper.
  </dd>
  <dt><strong>NVSwitch</strong></dt>
  <dd>
    An all-to-all communication layer on top of NVLink. It coordinates traffic among all GPUs in a node, so any
    GPU can reach any other GPU at NVLink speed.
  </dd>
</dl>
<p>
  Together, these high-bandwidth interconnects let one model's inference spread across several GPUs, up to a full
  eight-GPU node.
</p>
