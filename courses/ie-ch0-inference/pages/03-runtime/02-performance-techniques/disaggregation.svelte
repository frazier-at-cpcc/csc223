<script module>
  export const pageConfig = { title: 'Disaggregation' };
</script>

<h1>Disaggregation</h1>

<p>LLM inference runs in two phases.</p>

<dl>
  <dt><dfn><strong>Prefill</strong></dfn></dt>
  <dd>The compute-bound phase that processes the input sequence and builds the KV cache.</dd>
  <dt><dfn><strong>Decode</strong></dfn></dt>
  <dd>The memory-bound phase that generates output, one token per forward pass.</dd>
</dl>

<p>
  <dfn><strong>Disaggregation</strong></dfn> separates prefill and decode onto independently scaling workers.
</p>

<h2>Why separate the phases</h2>

<p>
  The two phases stress the GPU in different ways. Prefill is limited by compute. Decode is limited by memory. When both
  phases share a worker, each one interferes with the other.
</p>

<p>
  Separate workers let each phase run on resources suited to it. A workload with long prompts and short answers can add
  prefill workers. A workload with short prompts and long answers can add decode workers.
</p>
