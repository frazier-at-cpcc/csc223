<script module>
  export const pageConfig = { title: 'Grace and Vera CPUs' };
</script>

<script>
  import GraceInterconnect from '../../../components/GraceInterconnect.svelte';
</script>

<h1>Grace and Vera CPUs</h1>

<p>
  NVIDIA also builds its own ARM-based CPUs. It pairs them with its GPUs on <strong>superchips</strong> such as the
  GH200 and GB200. The G stands for <strong>Grace</strong>, as in Grace Hopper, to match the Hopper GPUs.
</p>

<h2>What matters for inference: the CPU-to-GPU link</h2>
<p>
  Grace CPUs perform well overall, but their key feature for inference is bandwidth to the GPU. Grace uses
  <strong>NVLink Chip to Chip</strong> for up to 900 GB/s of bidirectional bandwidth between CPU memory and GPU
  memory. This link is several times faster than PCIe and other standard CPU-to-GPU connections.
</p>

<GraceInterconnect />

<h2>Why the link matters: offloading</h2>
<p>
  CPU memory is far larger than GPU memory. Some inference setups offload data to CPU memory and retrieve it on
  demand, for example:
</p>
<ul>
  <li>LoRA fine-tune weights for many customized model variants.</li>
  <li>KV caches from previous inference calls, kept for reuse.</li>
</ul>
<p>With a Grace CPU, the GPU retrieves this offloaded data much faster than over PCIe.</p>

<h2>Vera</h2>
<p>
  For the Rubin architecture, the <strong>Vera</strong> CPU, named for Vera Rubin, replaces the Grace CPU used in
  Hopper and Blackwell systems.
</p>
