<script module>
  export const pageConfig = { title: 'The GPU Cache Hierarchy' };
</script>

<script>
  import GpuAnatomy from '../../../components/GpuAnatomy.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>The GPU Cache Hierarchy</h1>

<p>
  GPUs place SRAM caches in three levels between VRAM and the cores inside each
  <Term id="streaming-multiprocessor" />.
</p>
<dl>
  <dt><strong>L0</strong></dt>
  <dd>
    An instruction cache for each of the four processing blocks inside an SM. Each block has its own scheduler
    and its own share of the SM's cores.
  </dd>
  <dt><strong>L1</strong></dt>
  <dd>Shared memory within each Streaming Multiprocessor, used by every core in that SM.</dd>
  <dt><strong>L2</strong></dt>
  <dd>A global cache shared across all Streaming Multiprocessors.</dd>
</dl>
<p>
  The sizes are small compared with VRAM. An NVIDIA <Term id="h100">H100</Term> has 256 KB of L1 cache per SM and 50 MB of L2 cache in
  total. The same GPU has 80 GB of VRAM. The figure shows this gradient: each step away from the
  <Term id="tensor-core">Tensor Cores</Term> holds far more data and delivers it more slowly.
</p>

<GpuAnatomy />

<h2>VRAM bandwidth</h2>
<p>
  <strong>VRAM bandwidth</strong> is the peak transfer rate between the GPU cores and VRAM over the memory bus.
  In practice, it determines how quickly VRAM can feed data into the cache hierarchy, and from there into the
  Tensor Cores. When the Tensor Cores finish their math faster than VRAM can deliver the next data, bandwidth
  becomes the limit.
</p>
<p>
  The caches cannot hide that limit for large models. A model's weights occupy many gigabytes, and the L2 cache
  holds tens of megabytes. Each <Term id="forward-pass">forward pass</Term> must stream most of the weights from VRAM again.
</p>
