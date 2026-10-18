<script module>
  export const pageConfig = { title: 'Self-Attention and Cross-Attention' };
</script>

<h1>Self-Attention and Cross-Attention</h1>

<p>Attention comes in two main types, which differ in where Q, K, and V come from.</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>The two main types of attention</caption>
    <thead>
      <tr><th scope="col">Type</th><th scope="col">Source of Q, K, and V</th><th scope="col">Where it is used</th></tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Self-attention</th>
        <td>Q, K, and V all come from the same sequence.</td>
        <td>LLMs</td>
      </tr>
      <tr>
        <th scope="row">Cross-attention</th>
        <td>Q comes from a different sequence than K and V, which conditions Q on external information.</td>
        <td>Image generation and multimodal models, for example between the image being generated and its text prompt</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>The causal mask</h2>

<p>
  LLMs use self-attention with a <strong>causal mask</strong>. The mask prevents each token from
  attending to tokens that come after it in the sequence. A causal language model must predict the next
  token from previous tokens only, and the mask enforces that rule during attention.
</p>

<p>
  Image generation models also use self-attention. They add cross-attention so that the prompt steers
  the image throughout generation.
</p>
