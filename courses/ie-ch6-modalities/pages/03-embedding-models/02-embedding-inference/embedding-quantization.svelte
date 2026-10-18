<script module>
  export const pageConfig = { title: 'Quantizing Embedding Models' };
</script>

<h1>Quantizing Embedding Models</h1>

<p>
  Quantization adds further gains. Smaller models are more likely to lose quality when quantized.
  Even so, FP8 quantization of embedding model weights improves performance with minimal quality loss.
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

<div class="worked">
  <p><strong>Worked example.</strong> A team quantizes an embedding model to FP8 and tests 10,000 sample documents.</p>
  <ul>
    <li>Mean cosine similarity between original and quantized vectors: 99.6 percent</li>
    <li>Lowest single result: 99.1 percent</li>
  </ul>
  <p>Both values clear the 99 percent bar, so the quantized model is a reasonable candidate for deployment.</p>
</div>
