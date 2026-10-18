<script module>
  export const pageConfig = { title: 'Memory and Compute Slices' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import MigSlices from '../../../components/MigSlices.svelte';
</script>

<h1>Memory and Compute Slices</h1>

<p>An H100 divides into two kinds of slices that combine to form MIG instances.</p>
<ul>
  <li>Eight memory slices of 10 GB each, for 80 GB in total.</li>
  <li>Seven compute slices, each built from a group of Streaming Multiprocessors.</li>
</ul>

<MigSlices />

<h2>Why seven compute slices</h2>
<p>
  Software engineering usually works in powers of two, so seven slices look odd. The count follows from the SMs.
  GPUs rarely have a clean power-of-two SM count. An SXM H100 has 132 SMs. MIG creates seven evenly sized compute
  slices and leaves the leftover SMs idle.
</p>

<h2>Worked example: a three-slice instance</h2>
<p>An H100 MIG instance with three slices receives:</p>
<ul>
  <li>About 3/7 of the GPU's compute.</li>
  <li>Up to half of the VRAM, or 40 GB.</li>
  <li>About half of the CPU cores, CPU memory, storage, and network bandwidth allocated to the underlying H100.</li>
</ul>

<Callout type="tip">
  <p>
    Orpheus TTS is a 3-billion-parameter speech model. Running it as two MIG instances on one GPU is sometimes a
    more efficient use of resources than giving it the whole GPU as a single instance.
  </p>
</Callout>
