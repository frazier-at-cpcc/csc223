<script module>
  export const pageConfig = { title: 'Grace and Vera CPUs' };
</script>

<script>
  import GraceInterconnect from '../../../components/GraceInterconnect.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Grace and Vera CPUs</h1>

<p>
  NVIDIA also builds its own <Term id="cpu">CPUs</Term> on the Arm instruction set, the same processor design family used in most
  phones. It pairs them with its GPUs on <strong>superchips</strong>, single boards that join a CPU and GPUs with
  a fast link. The CPU in <Term id="hopper">Hopper</Term> and Blackwell superchips is the <strong>Grace</strong> CPU.
</p>

<h2>Reading superchip names</h2>
<p>A superchip name puts the CPU letter before the GPU letter.</p>
<ul>
  <li>GH200 pairs one Grace CPU with one Hopper GPU.</li>
  <li>GB200 pairs one Grace CPU with two Blackwell GPUs.</li>
  <li>GB300 pairs one Grace CPU with two Blackwell Ultra GPUs, the B300 generation.</li>
</ul>

<h2>The CPU-to-GPU link</h2>
<p>
  Grace CPUs perform well overall, but their key feature for inference is bandwidth to the GPU. Grace uses
  <strong>NVLink Chip to Chip (C2C)</strong> for up to 900 GB/s of bandwidth, counting both directions, between
  CPU memory and GPU memory. A standard server connects its CPU to each GPU over PCIe.
  A PCIe Gen5 link with 16 lanes carries about 128 GB/s counting both directions, so C2C is about seven times
  faster.
</p>

<GraceInterconnect />

<h2>Why the link matters: offloading</h2>
<p>
  CPU memory is far larger than GPU memory. Some inference setups offload data to CPU memory and retrieve it on
  demand, for example:
</p>
<ul>
  <li>
    <Term id="lora">LoRA</Term> adapter <Term id="weights">weights</Term> for many customized variants of one base model.
  </li>
  <li>
    KV caches from previous requests, kept for reuse. Chapter 5 covers this
    <Term id="kv-cache-offloading">KV cache offloading</Term> in its KV Cache Storage lesson.
  </li>
</ul>
<p>With a Grace CPU, the GPU retrieves this offloaded data much faster than over PCIe.</p>

<h2>Vera</h2>
<p>
  For the Rubin architecture, the <strong>Vera</strong> CPU, named for Vera Rubin, replaces the Grace CPU used in
  Hopper and Blackwell systems.
</p>
