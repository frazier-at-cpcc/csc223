<script module>
  export const pageConfig = { title: 'Allocating Memory to the KV Cache' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
</script>

<h1>Allocating Memory to the KV Cache</h1>

<p>
  The KV cache is valuable, but it consumes a large amount of memory, and GPUs have limited VRAM. Inference engines
  let you set how much memory to allocate to the KV cache. In TensorRT-LLM, the setting is a fraction of the GPU
  memory that remains free after the model loads.
</p>

<Figure
  number="5.9"
  caption="Allocating free GPU memory to the KV cache is an essential configuration decision when running inference engines."
>
  <pre class="ie-code"><code>kv_cache_config.free_gpu_memory_fraction = 0.8
# or any value 0.0 &lt; n &lt; 1.0</code></pre>
</Figure>

<h2>Worked example</h2>
<p>
  A B200 GPU has 180 GB of VRAM. Model weights and buffers use 100 GB, which leaves 80 GB free. A fraction of 0.8
  allocates 80 percent of the free 80 GB, or 64 GB, to the KV cache.
</p>
<table class="ie-table">
  <caption>KV cache allocation on one B200</caption>
  <tbody>
    <tr><th scope="row">Total VRAM</th><td>180 GB</td></tr>
    <tr><th scope="row">Weights and buffers</th><td>100 GB</td></tr>
    <tr><th scope="row">Free VRAM</th><td>80 GB</td></tr>
    <tr><th scope="row">KV cache at fraction 0.8</th><td>0.8 × 80 GB = 64 GB</td></tr>
  </tbody>
</table>

<h2>When the allocation fills</h2>
<p>
  The allocation fills quickly. Once it is full, the engine must evict saved KV caches, which raises the chance of a
  cache miss on future requests. The next page describes where else the KV cache can live.
</p>
