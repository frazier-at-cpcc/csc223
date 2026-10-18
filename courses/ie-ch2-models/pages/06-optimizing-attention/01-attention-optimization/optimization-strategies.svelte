<script module>
  export const pageConfig = { title: 'Why and How to Optimize Attention' };
</script>

<h1>Why and How to Optimize Attention</h1>

<h2>Why attention is expensive</h2>

<p>
  For LLMs, attention scales quadratically with the length of the input sequence, because each
  calculation depends on the K and V values of every previous token. During decode, the KV cache makes
  attention a linear-time operation in practice. Even a linear-time algorithm becomes very expensive at
  long sequence lengths.
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

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>The two strategies for optimizing attention</caption>
    <thead>
      <tr><th scope="col">Strategy</th><th scope="col">Approach</th><th scope="col">Effect on quality</th><th scope="col">Effect on complexity</th></tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Implementation improvements</th>
        <td>Write higher-performance kernels that use memory and compute more efficiently.</td>
        <td>Lossless. The output does not change.</td>
        <td>Still quadratic, but long sequences become feasible on current hardware.</td>
      </tr>
      <tr>
        <th scope="row">New algorithms</th>
        <td>Create attention algorithms that scale better than quadratic time.</td>
        <td>Some quality loss, which training techniques can minimize.</td>
        <td>Better than quadratic in time and space.</td>
      </tr>
    </tbody>
  </table>
</div>
