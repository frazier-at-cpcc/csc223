<script module>
  export const pageConfig = { title: 'New Attention Algorithms' };
</script>

<h1>New Attention Algorithms</h1>

<p>New variants of attention improve the underlying time and space complexity, at some cost to exactness.</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Attention variants that change complexity</caption>
    <thead>
      <tr><th scope="col">Variant</th><th scope="col">How it works</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Sliding window attention</th><td>Computes attention over a sliding window of the previous w tokens. Complexity drops from O(N²) to O(Nw), where w is often 8K to 32K.</td></tr>
      <tr><th scope="row">Gated attention</th><td>Uses layers introduced in training to approximate attention for certain chunks of context in linear time with respect to chunk length.</td></tr>
      <tr><th scope="row">Linear attention</th><td>Replaces the quadratic softmax equation with a linear-time approximation.</td></tr>
      <tr><th scope="row">Compressed attention</th><td>Periodically compresses earlier context. Attention considers both the compressed context and the uncompressed recent tokens.</td></tr>
      <tr><th scope="row">Multi-latent attention</th><td>Approximates attention in a low-dimensional latent space.</td></tr>
    </tbody>
  </table>
</div>

<h2>Worked example: sliding window savings</h2>

<pre><code>N = 128,000 tokens, w = 8,000 tokens

Full attention:     N² = 128,000 × 128,000 = 16,384,000,000 comparisons
Sliding window:     Nw = 128,000 ×   8,000 =  1,024,000,000 comparisons

Sliding window does 1/16 of the work.</code></pre>

<h2>Why locality works</h2>

<p>
  Tokens near each other in a sequence usually affect each other more than distant tokens do. A sentence
  follows closely from the sentence before it and only loosely from the first sentence of a chapter.
  Training can reinforce this intuition. A model trained with sliding window attention keeps quality
  high when the same technique is used at inference time.
</p>

<h2>Beyond transformers</h2>

<p>
  Another research avenue avoids attention altogether with a different architecture.
  <strong>Mamba</strong> is a selective state-space model. It replaces self-attention with a recurrent
  state update and scales linearly with sequence length.
</p>

<p>
  Hybrid models mix Mamba-style state-space blocks with transformer blocks. State-space models still
  have limited applications, but hybrid models are becoming more popular. Open models such as NVIDIA
  Nemotron 3 Nano adopt hybrid architectures.
</p>
