<script module>
  export const pageConfig = { title: 'Prefill and Decode' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Prefill and Decode</h1>

<p>An LLM serves each request in two phases.</p>

<dl>
  <dt><dfn><strong>Prefill</strong></dfn></dt>
  <dd>
    The first phase. One <Term id="forward-pass">forward pass</Term> processes every prompt token in parallel and produces the first output
    token.
  </dd>
  <dt><dfn><strong>Decode</strong></dfn></dt>
  <dd>
    The second phase. Each forward pass processes the newest output token and produces the next one, until the response is
    complete.
  </dd>
</dl>

<p>
  A request with a 1,000-token prompt and a 200-token response runs one prefill pass and then 199 decode passes. The
  prefill pass produces output token 1, and each decode pass produces one of tokens 2 through 200.
</p>

<h2>Different Limits on the GPU</h2>

<p>
  Prefill works on many tokens at once. It performs a large amount of arithmetic for every weight it reads, so the speed
  of the GPU's arithmetic limits it. Prefill is <Term id="compute-bound">compute-bound</Term>.
</p>

<p>
  Decode works on one new token per request in each pass. The GPU performs little arithmetic for each weight it reads, so
  it spends most of the pass waiting for weights to arrive from memory. Decode is <Term id="memory-bound">memory-bound</Term>. The limit is
  <Term id="memory-bandwidth">memory bandwidth</Term>, the rate at which data moves from GPU memory to the compute units.
</p>

<Signal kind="mistake" title="Memory-bound does not mean out of memory">
  <p>
    A memory-bound phase has not run out of memory capacity. It is waiting on the speed of memory, not on its size. A GPU
    can hold the whole model with room to spare and still be memory-bound during decode.
  </p>
</Signal>

<h2>What Each Phase Means to a User</h2>

<ul>
  <li>Prefill sets how long the user waits before the first token appears.</li>
  <li>Decode sets how quickly the remaining tokens stream after that.</li>
</ul>

<p>Chapter 2 shows how to tell whether a workload is compute-bound or memory-bound.</p>
