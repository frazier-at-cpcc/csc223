<script module>
  export const pageConfig = { title: 'From Neural Networks to Transformers' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>From Neural Networks to Transformers</h1>

<p>
  Generative AI models are compositions of large, complex neural networks. The research behind them spans
  about seven decades, from single-layer perceptrons in the 1950s to deep networks trained on
  <Term id="gpu">GPUs</Term> in the 2010s. The decisive step came in 2017, when Vaswani and colleagues published
  "Attention Is All You Need" and introduced the transformer.
</p>

<p>
  A <strong>transformer</strong> is a neural network with an <Term id="attention">attention</Term> mechanism that learns
  relationships between the parts of a sequence. Transformers are the foundation of generative AI.
  They power every modality, from embeddings to voice to image and video generation.
</p>

<h2>Two styles of generation</h2>

<p>Transformer-based models generate output in one of two styles.</p>

<div class="ie-table-wrap" role="region" aria-label="The two generation styles covered in this chapter" use:scrollable>
  <table class="ie-table">
    <caption>The two generation styles covered in this chapter</caption>
    <thead>
      <tr><th scope="col">Style</th><th scope="col">Starting point</th><th scope="col">Process</th><th scope="col">Example models</th></tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Autoregressive token generation</th>
        <td>A tokenized sequence</td>
        <td>Score every possible next token, select one, append it, and repeat.</td>
        <td><Term id="llm">LLMs</Term></td>
      </tr>
      <tr>
        <th scope="row">Iterative denoising</th>
        <td>Random noise</td>
        <td>Refine the noise toward the most likely output over many steps. This process is called <Term id="diffusion">diffusion</Term>.</td>
        <td>Image and video generation models</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  This chapter examines the architecture of LLMs first and then the architecture of image generation
  models. The distinction between the two styles returns throughout the chapter, because each style
  stresses GPU hardware differently.
</p>
