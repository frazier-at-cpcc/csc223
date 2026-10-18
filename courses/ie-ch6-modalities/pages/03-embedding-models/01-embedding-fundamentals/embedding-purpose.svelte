<script module>
  export const pageConfig = { title: 'What Embedding Models Do' };
</script>

<script>
  import ModalityFlow from '../../../components/ModalityFlow.svelte';
</script>

<h1>What Embedding Models Do</h1>

<p>
  An <strong>embedding model</strong> transforms a variable-length chunk of text, or another input
  such as an image, into a fixed-length vector. The vector captures the semantic meaning of the input.
</p>

<ModalityFlow
  number="6.2"
  caption="Embedding models convert unstructured input data into vectors that encode semantic meaning."
  alt="Text and image inputs flow into an embedding model, which outputs a vector of numbers"
  description="Two inputs, a text chunk and an image, flow into a box labeled embedding model. The model outputs a fixed-length vector, shown as a short column of numbers such as 4, 7, 3, 6."
  inputs={['Text chunk', 'Image']}
  model="Embedding|model"
  output="Vector|[4, 7, 3, 6, …]"
/>

<p>
  Once content sits in a shared semantic vector space, simple math compares the distance between
  items. Embedding models, together with vector databases, power agent memory, retrieval-augmented
  generation (RAG), search, and recommendation systems.
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
  both and traffic is high enough to justify the cost, build a separate system for each profile.
</p>
