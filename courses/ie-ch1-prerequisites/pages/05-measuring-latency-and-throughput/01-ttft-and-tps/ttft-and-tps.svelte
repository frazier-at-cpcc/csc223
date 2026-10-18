<script module>
  export const pageConfig = { title: 'TTFT and TPS' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import TokenStreamFigure from '../../../components/TokenStreamFigure.svelte';
</script>

<h1>TTFT and TPS</h1>

<p>
  The two most common performance metrics for <Term id="llm">large language models (LLMs)</Term> are time to first token and tokens per second.
  Both count <Term id="token">tokens</Term>, the units of text that the model writes.
  Chapter 6 covers metrics for other modalities, such as speech and images.
</p>

<Signal kind="recall" chapter={0} title="Prefill and decode">
  <p>
    <Term id="prefill">Prefill</Term> processes every token of the input in one pass and produces the first output token.
    <Term id="decode">Decode</Term> then generates each remaining output token with one <Term id="forward-pass">forward pass</Term> per token.
    This lesson attaches one metric to each phase.
  </p>
  <p>Chapter 0 also named the two metrics attached to these phases, time to first token and inter-token latency. This lesson defines them precisely and calculates them.</p>
</Signal>

<div class="ie-table-wrap" role="region" aria-label="The two core LLM latency metrics" use:scrollable>
  <table class="ie-table">
    <caption>The two core LLM latency metrics</caption>
    <thead>
      <tr>
        <th scope="col">Property</th>
        <th scope="col">Time to first token (TTFT)</th>
        <th scope="col">Tokens per second (TPS)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Question it answers</th>
        <td>With streaming output, how long does the user wait to see the first output token?</td>
        <td>After the first token, how many tokens does the user receive each second?</td>
      </tr>
      <tr>
        <th scope="row">Phase that dominates it on the server</th>
        <td>Prefill, which is <Term id="compute-bound">compute-bound</Term></td>
        <td>Decode, which is <Term id="memory-bound">memory-bound</Term> at typical <Term id="batch-size">batch sizes</Term></td>
      </tr>
      <tr>
        <th scope="row">Better latency means</th>
        <td>Lower TTFT</td>
        <td>Higher TPS</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  <dfn><strong>Time to first token (TTFT)</strong></dfn> is the time from sending a request until the first output token arrives, and it is a <Term id="latency">latency</Term> metric.
  <dfn><strong>Tokens per second (TPS)</strong></dfn> is the rate at which output tokens arrive after the first one.
  Streaming output means that the server sends each token as soon as it is generated, instead of waiting for the full reply.
</p>

<p>
  Prefill is limited by arithmetic, and its arithmetic grows with every prompt token, so a longer prompt raises TTFT.
  Decode is limited by how fast the GPU can read the model's weights from memory, a rate called <Term id="memory-bandwidth">memory bandwidth</Term>.
  Chapter 2 explains why each phase has its limit, and Chapter 3 connects those limits to GPU specifications.
</p>

<TokenStreamFigure />

<Signal kind="mistake" title="Equating TTFT with prefill time">
  <p>
    On the server, prefill dominates TTFT.
    The TTFT a user sees also includes network time and any time the request waits in a <Term id="queue">request queue</Term> for a free GPU.
    A slow TTFT therefore does not always mean a slow prefill.
    The End-to-End Metrics lesson shows how to separate the parts.
  </p>
</Signal>
