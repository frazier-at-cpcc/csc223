<script module>
  export const pageConfig = { title: 'Embedding Architectures and Dimensionality' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Embedding Architectures and Dimensionality</h1>

<p>
  <Term id="hugging-face">Hugging Face</Term> hosts tens of thousands of embedding models. All of them
  use one of two transformer-based architectures.
</p>

<div class="table-wrap" role="region" aria-label="The two embedding model architectures" use:scrollable>
  <table>
    <caption>The two embedding model architectures</caption>
    <thead>
      <tr><th scope="col">Architecture</th><th scope="col">Typical size</th><th scope="col">Typical use today</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>
          BERT-style: <Term id="encoder">encoder</Term>-only networks originally trained as
          <Term id="masked-language-model">masked language models</Term>, which fill in hidden tokens from
          the context on both sides
        </td>
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
  hundred to a few thousand values, and longer vectors encode more information.
</p>
<p>
  Dimensionality trades quality against storage and retrieval speed. It barely affects the model's own
  inference time. Its cost falls on the surrounding system: storage size, retrieval time, and similarity
  computation time.
</p>
<p>
  <strong>Matryoshka representations</strong> are nested vectors in which the early part of the vector
  carries the most semantic meaning. Modern embedding models use them so that a shortened vector keeps
  more information. A team can then store only the leading values of each vector and trade vector
  length against quality without changing the model.
</p>

<Signal kind="mistake" title="Mixing vectors from two models">
  <p>
    Vectors from different embedding models generally cannot be compared, even when they have the same
    length. Each model encodes inputs into its own semantic space. A team that upgrades its embedding
    model must re-embed the stored corpus before queries from the new model can search it. Plan that
    re-embedding as a backfill job.
  </p>
</Signal>
