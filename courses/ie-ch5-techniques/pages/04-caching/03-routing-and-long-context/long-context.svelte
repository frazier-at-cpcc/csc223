<script module>
  export const pageConfig = { title: 'Long Context Handling' };
</script>

<h1>Long Context Handling</h1>

<p>
  A sequence becomes <strong>long context</strong> when its KV cache grows large enough to cause problems during
  inference. Depending on the model, hardware, engine, and traffic, problems can emerge past common cutoffs such as
  32K, 64K, or 128K tokens. Include very large input sequences in performance benchmarks to test a service against
  long-context requests.
</p>

<h2>Why long context strains decode</h2>
<p>
  Model labs use scaling techniques such as RoPE to extend context windows. Serving those windows creates new
  challenges. With a KV cache, attention scales linearly with sequence length. Over long sequences, attention can
  become the main consumer of VRAM, which is the resource that decode depends on.
</p>

<h2>General optimizations</h2>
<p>
  Some models use sliding window, compressed, or sparse attention. Those solutions apply model by model. Three
  general approaches optimize standard attention.
</p>
<table class="ie-table">
  <caption>General optimizations for long-context attention</caption>
  <thead>
    <tr><th scope="col">Optimization</th><th scope="col">What it does</th></tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">FlashAttention</th>
      <td>A series of optimized attention kernels that reduce reads from and writes to memory</td>
    </tr>
    <tr>
      <th scope="row">PagedAttention</th>
      <td>Stores the KV cache in fixed-size pages, which reduces fragmentation and duplication</td>
    </tr>
    <tr>
      <th scope="row">Chunked prefill</th>
      <td>Splits a long input into chunks that run alongside decode as resources allow, so one long sequence cannot overwhelm the engine</td>
    </tr>
  </tbody>
</table>
<p>
  When a KV cache still needs more VRAM than one GPU offers after these optimizations, inference must spread across
  multiple GPUs. Model parallelism is the subject of the next section.
</p>
