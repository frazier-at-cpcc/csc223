<script module>
  export const pageConfig = { title: 'Disaggregated Serving' };
</script>

<script>
  import DisaggregationFlow from '../../../components/DisaggregationFlow.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Disaggregated Serving</h1>

<p>
  <strong>Disaggregation</strong>, or disaggregated serving, separates prefill and decode onto independent engines
  that run on separate GPUs or nodes. Inference becomes a three-step process.
</p>
<ol>
  <li>The prefill engine takes the input sequence, builds its <Term id="kv-cache" />, and computes the first token.</li>
  <li>The prefill engine sends the KV cache over the hardware interconnect to the decode engine.</li>
  <li>The decode engine computes every subsequent token.</li>
</ol>

<DisaggregationFlow />

<h2>Conditional disaggregation</h2>
<p>
  In <strong>conditional disaggregation</strong>, each request goes first to the decode engine. The decode engine
  checks whether the input sequence is already cached or short enough to handle locally.
</p>
<ul>
  <li>If it is, the decode engine runs prefill itself and skips the transfer.</li>
  <li>If it is not, the decode engine sends the request to the prefill engine.</li>
</ul>
<p>
  Conditional disaggregation handles real-world traffic better than sending every request to a prefill engine. A
  short or cached input costs less to prefill locally than to transfer.
</p>

<h2>Tuning each engine separately</h2>
<p>
  Separate engines can each be optimized for their own phase, and the system can be optimized as a whole. For
  example, the prefill engine needs a lower degree of <Term id="tensor-parallelism">Tensor Parallelism</Term> than
  the decode engine. Decode is limited by reading <Term id="weights">weights</Term>, and a higher TP degree splits those reads across more
  GPUs, so each decode step finishes sooner. Prefill already saturates compute on each GPU, so it gains less from
  extra GPUs and pays for the added <Term id="all-reduce">all-reduce</Term> traffic.
</p>
