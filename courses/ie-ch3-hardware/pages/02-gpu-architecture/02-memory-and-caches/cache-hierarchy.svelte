<script module>
  export const pageConfig = { title: 'The GPU Cache Hierarchy' };
</script>

<script>
  import GpuAnatomy from '../../../components/GpuAnatomy.svelte';
</script>

<h1>The GPU Cache Hierarchy</h1>

<p>GPUs place SRAM caches between the compute units and VRAM. There are three levels.</p>
<dl>
  <dt><strong>L0</strong></dt>
  <dd>An instruction cache for a single Tensor Core.</dd>
  <dt><strong>L1</strong></dt>
  <dd>Shared memory within each Streaming Multiprocessor.</dd>
  <dt><strong>L2</strong></dt>
  <dd>A global cache shared across all Streaming Multiprocessors.</dd>
</dl>
<p>
  The sizes are small compared with VRAM. An NVIDIA H100 has 256 KB of L1 cache per SM and 50 MB of L2 cache in
  total. The same GPU has 80 GB of VRAM.
</p>

<GpuAnatomy />

<h2>VRAM bandwidth</h2>
<p>
  <strong>VRAM bandwidth</strong> is the peak transfer rate between the GPU cores and VRAM over the memory bus.
  In practice, it determines how quickly VRAM can feed data into the cache hierarchy, and from there into the
  Tensor Cores. When the Tensor Cores finish their math faster than VRAM can deliver the next data, bandwidth
  becomes the limit.
</p>
