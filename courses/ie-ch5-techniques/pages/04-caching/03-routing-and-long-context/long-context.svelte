<script module>
  export const pageConfig = { title: 'Long Context Handling' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Long Context Handling</h1>

<p>
  A sequence becomes <strong>long context</strong> when its KV cache grows large enough to cause problems during
  inference. Depending on the model, hardware, engine, and traffic, problems can emerge past common cutoffs such as
  32K, 64K, or 128K tokens. Include very large input sequences in performance benchmarks to test a service against
  long-context requests.
</p>

<h2>Long context and decode memory</h2>
<p>
  Model labs extend <Term id="context-window">context windows</Term> with scaling methods built on
  <Term id="rope">rotary positional embeddings (RoPE)</Term>. Serving those windows creates new challenges. The KV
  cache grows linearly with sequence length, and over long sequences it can become the main consumer of <Term id="vram">VRAM</Term>. <Term id="decode">Decode</Term>
  reads that whole cache at every step, so a long context also slows each decode step.
</p>

<h2>General optimizations</h2>
<p>
  Some models use <Term id="sliding-window-attention">sliding window attention</Term> or other <Term id="attention">attention</Term> variants
  that store less of the cache. Those solutions apply model by model. Three general approaches optimize standard
  attention.
</p>

<Signal kind="recall" chapter={2} title="Attention kernels">
  <p>
    Chapter 2 introduced <Term id="flashattention" /> and <Term id="pagedattention" /> as attention optimizations.
    The table below adds a third, <Term id="chunked-prefill">chunked prefill</Term>, which schedules work rather
    than changing the kernel.
  </p>
</Signal>

<table class="ie-table">
  <caption>General optimizations for long-context attention</caption>
  <thead>
    <tr><th scope="col">Optimization</th><th scope="col">Problem it solves</th></tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">FlashAttention</th>
      <td>Attention reads and writes too much memory. Optimized <Term id="kernel">kernels</Term> reduce those reads and writes.</td>
    </tr>
    <tr>
      <th scope="row">PagedAttention</th>
      <td>KV cache memory fragments and duplicates. Fixed-size pages reduce the waste.</td>
    </tr>
    <tr>
      <th scope="row">Chunked <Term id="prefill">prefill</Term></th>
      <td>One long prefill stalls every other request. Splitting the input into chunks lets them run alongside decode.</td>
    </tr>
  </tbody>
</table>
<p>
  When a KV cache still needs more VRAM than one GPU offers after these optimizations, inference must spread across
  multiple GPUs. <Term id="model-parallelism">Model parallelism</Term> is the subject of the next section.
</p>
