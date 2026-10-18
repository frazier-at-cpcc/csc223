<script module>
  export const pageConfig = { title: 'When to Use Disaggregation' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>When to Use Disaggregation</h1>

<p>
  <Term id="disaggregation">Disaggregation</Term> is powerful, but it requires multiple GPUs and extra engineering
  work. Adopt it only when all three conditions hold.
</p>
<ol>
  <li>You serve a large volume of traffic, starting at one hundred million to one billion tokens per day depending on model size.</li>
  <li>You serve a large model, with at least one hundred billion parameters.</li>
  <li>Your traffic is <Term id="prefill">prefill</Term>-heavy, with long input sequences.</li>
</ol>

<h2>Consequences of a failed condition</h2>
<ul>
  <li>
    If the first or second condition fails, disaggregation likely spends money on extra hardware for minimal
    performance gain.
  </li>
  <li>
    If the third condition fails, the extra GPUs usually serve better as additional <Term id="replica">replicas</Term>
    for horizontal scaling. <Term id="decode">Decode</Term> engines are more efficient for short sequences and for prefix cache hits.
  </li>
</ul>

<Callout type="tip">
  <p>
    The textbook workload for disaggregation is a frontier LLM behind a code editor. Many developers send large,
    varied chunks of code as context at the same time. The result is a very high volume of mostly prefill tokens on
    a model with a trillion parameters.
  </p>
</Callout>
