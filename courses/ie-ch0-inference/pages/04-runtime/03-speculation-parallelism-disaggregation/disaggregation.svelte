<script module>
  export const pageConfig = { title: 'Disaggregation' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Disaggregation</h1>

<p>
  LLM inference runs in two phases. <Term id="prefill">Prefill</Term> processes the prompt and produces the first token.
  <Term id="decode">Decode</Term> then produces the remaining tokens one forward pass at a time.
</p>

<p>
  <dfn><strong>Disaggregation</strong></dfn> separates prefill and decode onto independently scaling workers.
</p>

<h2>Why Separate the Phases</h2>

<p>
  The two phases stress the GPU in different ways. Prefill is <Term id="compute-bound">compute-bound</Term>: the speed of the GPU's
  arithmetic limits it. Decode is <Term id="memory-bound">memory-bound</Term>: it is limited by
  <Term id="memory-bandwidth">memory bandwidth</Term>, the rate at which the GPU reads the weights and the KV cache from memory.
</p>

<p>
  When both phases share a worker, each one interferes with the other. A long prompt that arrives in the middle of other
  users' decode can pause their streams while its prefill runs.
</p>

<h2>Scaling Each Phase</h2>

<p>
  Separate workers let each phase run on resources suited to it. A workload with long prompts and short answers can add
  prefill workers. A workload with short prompts and long answers can add decode workers.
</p>

<p>
  The bottlenecks that disaggregation targets are interference between the phases and traffic whose prefill and decode
  demands differ. Chapter 5 covers disaggregation in production, and Chapter 2 shows how to tell compute-bound work from
  memory-bound work.
</p>
