<script module>
  export const pageConfig = { title: 'Why and How to Optimize Attention' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Why and How to Optimize Attention</h1>

<h2>Why attention is expensive</h2>

<p>
  For <Term id="llm">LLMs</Term>, <Term id="attention">attention</Term> scales quadratically with the length of the input sequence, because
  each <Term id="token">token</Term> is compared with the keys of every previous token. During <Term id="decode">decode</Term>, the
  <Term id="kv-cache">KV cache</Term> makes each step linear in the context length. Even a linear-time step
  becomes very expensive at long sequence lengths.
</p>

<p>
  Attention is one of the most expensive parts of inference across models and architectures. Optimizing
  it is an important and highly active research area.
</p>

<h2>Why attention is delicate</h2>

<p>
  Each token depends on every previous token. Small errors in attention therefore accumulate quickly.
  Any optimization that changes the result of attention puts output quality at risk.
</p>

<h2>Where the basic algorithm wastes work</h2>

<p>
  The standard algorithm in Figure 2.14 is short, but it is inefficient. It writes the intermediate
  matrices S and P to memory at the end of one step and immediately reads them back in the next step.
  Those round trips are pure memory traffic.
</p>

<h2>Two strategies</h2>

<div class="ie-table-wrap" role="region" aria-label="The two strategies for optimizing attention" use:scrollable>
  <table class="ie-table">
    <caption>The two strategies for optimizing attention</caption>
    <thead>
      <tr><th scope="col">Strategy</th><th scope="col">Approach</th><th scope="col">Effect on quality</th><th scope="col">Effect on complexity</th></tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Implementation improvements</th>
        <td>Write higher-performance <Term id="kernel">kernels</Term> that use memory and compute more efficiently.</td>
        <td>Lossless. The output does not change.</td>
        <td>Still quadratic in time, but long sequences become feasible on current hardware.</td>
      </tr>
      <tr>
        <th scope="row">New algorithms</th>
        <td>Create attention algorithms that scale better than quadratic time.</td>
        <td>Some quality loss, which training techniques can minimize.</td>
        <td>Lower time or memory cost, often better than quadratic in time.</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  The KV cache from Section 3 belongs to the first strategy. It removes recomputation during decode without
  changing a single output token. The next page covers two more implementation improvements.
</p>
