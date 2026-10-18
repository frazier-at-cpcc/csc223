<script module>
  export const pageConfig = { title: 'Memory-Bound Workloads' };
</script>

<h1>Memory-Bound Workloads</h1>

<p>
  <strong>Decode</strong> is the phase of LLM inference in which the model emits one token per forward pass.
  Each pass reads the full set of weights from VRAM to produce a single token per sequence. At low to medium
  batch sizes, the Tensor Cores finish that small amount of math long before the next weights arrive. Memory
  bandwidth, not compute, sets the pace.
</p>
<p>
  High-end GPUs deliver terabytes per second of memory bandwidth. When you want more tokens per second from
  decode, choose the accelerator with higher memory bandwidth.
</p>

<h2>Example: H100 versus H200</h2>
<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Two Hopper GPUs with identical compute</caption>
    <thead>
      <tr>
        <th scope="col">GPU</th>
        <th scope="col">FP8 compute (dense)</th>
        <th scope="col">Memory</th>
        <th scope="col">Bandwidth</th>
      </tr>
    </thead>
    <tbody>
      <tr><th scope="row">H100</th><td>1,979 teraFLOPS</td><td>80 GB</td><td>3.35 TB/s</td></tr>
      <tr><th scope="row">H200</th><td>1,979 teraFLOPS</td><td>141 GB</td><td>4.8 TB/s</td></tr>
    </tbody>
  </table>
</div>
<p>
  The two GPUs have the same compute. The H200 has more memory and about 43 percent more bandwidth. For a
  decode-heavy chat workload, the H200 generates more tokens per second.
</p>

<h2>Matching the bottleneck to the specification</h2>
<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Workload bottlenecks and the specification that relieves them</caption>
    <thead>
      <tr><th scope="col">Workload</th><th scope="col">Bottleneck</th><th scope="col">Choose the GPU with more</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">LLM prefill</th><td>Compute</td><td>FLOPS</td></tr>
      <tr><th scope="row">Image and video generation</th><td>Compute</td><td>FLOPS</td></tr>
      <tr><th scope="row">LLM decode, low to medium batch</th><td>Memory bandwidth</td><td>Memory bandwidth</td></tr>
      <tr><th scope="row">Large model or long context</th><td>Memory capacity</td><td>VRAM</td></tr>
    </tbody>
  </table>
</div>
