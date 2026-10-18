<script module>
  export const pageConfig = { title: 'Allocating Memory to the KV Cache' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Allocating Memory to the KV Cache</h1>

<p>
  The <Term id="kv-cache" /> is valuable, but it consumes a large amount of memory, and GPUs have limited
  <Term id="vram" />. Inference engines let you set how much memory to give the KV cache. In
  <Term id="tensorrt-llm">TensorRT-LLM</Term>, the setting is <code>free_gpu_memory_fraction</code>: the share of
  the VRAM still free after the model loads that the engine hands to the KV cache. It is an engine setting applied at
  startup, not a rule for sizing GPUs.
</p>

<Figure
  number="5.9"
  caption="Allocating free GPU memory to the KV cache is an essential configuration decision when running inference engines."
>
  <pre class="ie-code"><code>kv_cache_config.free_gpu_memory_fraction = 0.8
# or any value 0.0 &lt; n &lt; 1.0</code></pre>
</Figure>

<Signal kind="worked" title="KV cache allocation on one B200">
  <p>
    A <Term id="b200">B200</Term> GPU has 180 GB of usable VRAM. Model <Term id="weights">weights</Term> and buffers use 100 GB after loading. The engine setting is
    0.8.
  </p>
  <table class="ie-table">
    <caption>KV cache allocation on one B200</caption>
    <tbody>
      <tr><th scope="row">Total VRAM</th><td>180 GB</td></tr>
      <tr><th scope="row">Weights and buffers after loading</th><td>100 GB</td></tr>
      <tr><th scope="row">Free VRAM</th><td>180 GB − 100 GB = 80 GB</td></tr>
      <tr><th scope="row">KV cache at a fraction of 0.8</th><td>0.8 × 80 GB = 64 GB</td></tr>
    </tbody>
  </table>
  <p>The remaining 16 GB stays free for <Term id="activations">activations</Term> and temporary buffers during each <Term id="forward-pass">forward pass</Term>.</p>
</Signal>

<Signal kind="mistake" title="Confusing the engine fraction with the planning factor">
  <p>
    The fraction of 0.8 answers a runtime question: of the memory left on a GPU that is already running, how much
    goes to the KV cache? The planning factor in section 5.4 answers a sizing question asked before deployment: how
    much total VRAM does a model need? A fraction of 0.8 says nothing about how many GPUs to buy.
  </p>
</Signal>

<h2>Eviction from a full allocation</h2>
<p>
  The allocation fills quickly. Once it is full, the engine must evict saved KV caches, which raises the chance of a
  cache miss on future requests. The next page describes where else the KV cache can live.
</p>
