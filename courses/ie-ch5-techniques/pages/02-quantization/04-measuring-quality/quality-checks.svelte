<script module>
  export const pageConfig = { title: 'Checking Quality After Quantization' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Checking Quality After Quantization</h1>

<p>
  The standard for production-ready quantization is zero perceptible quality loss. After quantizing a model, test
  its output quality thoroughly against the original precision.
</p>

<h2>Three quality checks</h2>
<ol>
  <li><strong>Perplexity.</strong> Calculate the perplexity of the quantized model and compare it with the original.</li>
  <li>
    <strong>Intelligence benchmarks.</strong> Run a standard benchmark such as MMLU or SWE-bench and compare with the
    original scores.
  </li>
  <li>
    <strong>Custom evals.</strong> Run a product-specific evaluation suite on the quantized model and compare with
    the original weights.
  </li>
</ol>
<p>
  In every case, you are looking for a difference that cannot be distinguished from noise. LLMs are
  non-deterministic, so scores vary slightly from run to run.
</p>

<h2>Perplexity</h2>
<p>
  Perplexity is the simplest check. It does not ask the model to generate output. It gives the model expected
  sequences and measures how likely the model was to predict those tokens. A higher perplexity means the model is
  more surprised by the sequences, which is undesirable for a model that predicts tokens. After quantization, look
  for a minimal increase in perplexity.
</p>

<h2>Benchmarks and evals</h2>
<p>
  A public intelligence benchmark gives a broader check. A domain-specific eval that matches expected real-world
  usage is better still. On either, look for a minimal reduction in score. The full picture comes from running all
  three checks and comparing each one against the original weights.
</p>

<Callout type="info">
  <p>
    Quantization is a scale, not a binary decision. Quantizing to FP8 instead of FP4, or quantizing fewer
    components, as in weights-only quantization, still improves performance with a lower risk of quality loss.
    When a domain cannot tolerate any quality risk, the other four techniques in this chapter remain available,
    because each of them is lossless.
  </p>
</Callout>
