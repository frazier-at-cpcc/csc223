<script module>
  export const pageConfig = { title: 'VRAM and High-Bandwidth Memory' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>VRAM and High-Bandwidth Memory</h1>

<p>
  A <Term id="gpu">GPU</Term> carries its own high-speed onboard memory called <strong>VRAM</strong>, also called device memory.
  VRAM holds the model <Term id="weights">weights</Term>, the <Term id="kv-cache" />, and the <Term id="activations">activations</Term> during inference. The V stands for video, in the same
  way that the G in GPU stands for graphics. Both letters recall the original purpose of these accelerators.
</p>
<p>
  Modern datacenter GPUs build VRAM from <strong>high-bandwidth memory (HBM)</strong>. HBM3, HBM3e, and HBM4
  are successive generations of this memory. A datacenter GPU carries dozens or hundreds of gigabytes of VRAM,
  and HBM delivers several terabytes per second of bandwidth to it.
</p>

<h2>DRAM and SRAM</h2>
<p>Every chip, <Term id="cpu">CPU</Term> or GPU, uses two kinds of memory.</p>
<div class="ie-table-wrap" role="region" aria-label="The two kinds of chip memory" use:scrollable>
  <table class="ie-table">
    <caption>The two kinds of chip memory</caption>
    <thead>
      <tr>
        <th scope="col">Memory</th>
        <th scope="col">Location</th>
        <th scope="col">Speed and cost</th>
        <th scope="col">Typical size</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">DRAM (Dynamic RAM)</th>
        <td>Off-chip</td>
        <td>General purpose, slower, cheaper per byte</td>
        <td>Gigabytes</td>
      </tr>
      <tr>
        <th scope="row">SRAM (Static RAM)</th>
        <td>On-chip</td>
        <td>Faster, more expensive per byte</td>
        <td>Kilobytes or megabytes</td>
      </tr>
    </tbody>
  </table>
</div>
<p>
  VRAM is a type of DRAM. It is large but sits off the compute die. A GPU also carries SRAM on-chip in the form
  of caches, which the next page describes.
</p>
