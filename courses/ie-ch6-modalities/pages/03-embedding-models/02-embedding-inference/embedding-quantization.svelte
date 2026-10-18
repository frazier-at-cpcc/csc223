<script module>
  export const pageConfig = { title: 'Quantizing Embedding Models' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Quantizing Embedding Models</h1>

<p>
  <Term id="quantization">Quantization</Term> adds further gains. Smaller models are more likely to lose
  quality when quantized. Even so, <Term id="fp8">FP8</Term> quantization of embedding model weights
  improves performance with minimal quality loss.
</p>

<h2>Checking quality after quantization</h2>

<p>The most direct check compares the quantized model against the original.</p>
<ol>
  <li>Run the same set of inputs through the original model and the quantized model.</li>
  <li>For each input, compute the cosine similarity between the two output vectors.</li>
  <li>Confirm that the similarity is at least 99 percent.</li>
</ol>
<p>
  <strong>Cosine similarity</strong> measures how closely two vectors point in the same direction. A
  value of 100 percent means the vectors are identical in direction. A result of 99 percent or higher
  gives confidence that quantization preserved the model's behavior.
</p>

<Signal kind="worked" title="Checking an FP8 embedding model">
  <p>A team quantizes an embedding model to FP8 and tests 10,000 sample documents.</p>
  <ol>
    <li>Mean cosine similarity between original and quantized vectors: 99.6 percent.</li>
    <li>Lowest single result: 99.1 percent.</li>
    <li>Both values clear the 99 percent bar.</li>
  </ol>
  <p>The quantized model is a reasonable candidate for deployment.</p>
</Signal>

<Signal kind="mistake" title="Comparing against a different model">
  <p>
    The check compares the quantized model with its own original on the same inputs. Comparing against a
    different embedding model, even one with the same vector length, measures nothing, because the two
    models encode different semantic spaces.
  </p>
</Signal>
