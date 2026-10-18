<script module>
  export const pageConfig = { title: 'What Embedding Models Do' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>What Embedding Models Do</h1>

<p>
  An <strong>embedding model</strong> transforms a variable-length chunk of text, or another input
  such as an image, into a fixed-length vector. The vector captures the semantic meaning of the input.
  A product description and a shopper's query about the same product land close together, even when
  they share few words.
</p>
<p>
  Once content sits in a shared semantic vector space, simple math compares the distance between
  items. Embedding models, together with <Term id="vector-database">vector databases</Term>, power agent
  memory, <Term id="rag">retrieval-augmented generation (RAG)</Term>, search, and recommendation systems.
  A vector database stores the vectors and returns the stored vectors closest to a query vector.
</p>

<h2>Two traffic profiles</h2>

<ol>
  <li>
    <strong>High-throughput backfills</strong> are bulk jobs, such as indexing millions of documents,
    updating a product catalog, or preparing data for LLM pretraining. Total throughput matters most.
  </li>
  <li>
    <strong>Low-latency lookups</strong> are individual, user-facing queries for search, retrieval, or
    recommendation. Every millisecond affects the user experience.
  </li>
</ol>
<p>
  Embedding inference engineering starts by identifying which profile you must serve. When you need
  both and traffic is high enough to justify the cost, build a separate system for each profile. A
  shared system forces a compromise: a large backfill fills the batches and queue that a user's search
  query must wait behind.
</p>
