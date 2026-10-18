<script module>
  export const pageConfig = { title: 'Embedding Architectures and Dimensionality' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Embedding Architectures and Dimensionality</h1>

<p>
  Hugging Face hosts tens of thousands of embedding models. All of them use one of two
  transformer-based architectures.
</p>

<div class="table-wrap">
  <table>
    <caption>The two embedding model architectures</caption>
    <thead>
      <tr><th scope="col">Architecture</th><th scope="col">Typical size</th><th scope="col">Typical use today</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>BERT-style: encoder-only networks originally built for masked token prediction</td>
        <td>Under 1 billion parameters</td>
        <td>Simple, latency-sensitive tasks such as classification</td>
      </tr>
      <tr>
        <td>LLM-based: modern language models repurposed to generate embeddings</td>
        <td>Up to about 8 billion parameters</td>
        <td>Most new work, because they offer substantially greater capability</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Dimensionality</h2>

<p>
  <strong>Embedding dimensionality</strong> is the length of the output vector. Vectors hold from a few
  hundred to a few thousand values, and longer vectors encode more information. Dimensionality is the
  embedding model's own speed-quality tradeoff.
</p>

<p>
  Dimensionality barely affects inference time. It does affect storage size, retrieval time, and
  similarity computation time in the surrounding system.
</p>

<p>
  <strong>Matryoshka representations</strong> are nested vectors in which the early part of the vector
  carries the most semantic meaning. Modern embedding models use them so that a shortened vector keeps
  more information. You can then trade vector length against quality at query time.
</p>

<Callout type="warning">
  <p>
    Vectors from different embedding models generally cannot be compared, even when they have the same
    length. Each model encodes inputs into its own semantic space. Switching models means re-embedding
    the stored corpus.
  </p>
</Callout>
