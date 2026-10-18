<script module>
  export const pageConfig = { title: 'Categories of AI-Native Applications' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Categories of AI-Native Applications</h1>

<p>
  Generative AI models support a new class of applications across many industries.
  Each category relies on different models and modalities and needs inference tailored to it.
</p>

<div class="ie-table-wrap" role="region" aria-label="Application categories and their main inference consideration" use:scrollable>
  <table class="ie-table">
    <caption>Application categories and their main inference consideration</caption>
    <thead>
      <tr>
        <th scope="col">Category</th>
        <th scope="col">Example</th>
        <th scope="col">Main consideration</th>
      </tr>
    </thead>
    <tbody>
      <tr><th scope="row">Agents</th><td>Prospecting <Term id="agent">agent</Term> for sales teams</td><td>One user action triggers many inference calls.</td></tr>
      <tr><th scope="row">Chat</th><td>Front-line customer support chat with <Term id="rag">retrieval-augmented generation (RAG)</Term></td><td>A short <Term id="ttft">time to first token</Term> makes chat feel fast.</td></tr>
      <tr><th scope="row">Voice</th><td>Real-time translation between languages</td><td><Term id="end-to-end-latency">End-to-end latency</Term> must support natural conversation.</td></tr>
      <tr><th scope="row">Media</th><td>Virtual try-on for clothes, shoes, and jewelry</td><td>Output quality must be balanced against speed.</td></tr>
      <tr><th scope="row">Search</th><td>Legal document discovery</td><td>Offline corpus indexing and online user queries need different optimization targets.</td></tr>
      <tr><th scope="row">Recommendation systems</th><td>E-commerce product recommendations</td><td><Term id="latency">Latency</Term> must stay consistent under high request volume.</td></tr>
      <tr><th scope="row">Completion</th><td>Tab completion for coding in a code editor</td><td>A full completion chunk must arrive at the user's typing speed.</td></tr>
      <tr><th scope="row">Moderation</th><td>Safety scanning of user-generated content</td><td>High <Term id="throughput">throughput</Term> keeps the checks cost-effective.</td></tr>
    </tbody>
  </table>
</div>

<p>
  An agent is an application that takes actions by calling tools, such as a search service or a database, instead of only returning text.
  Retrieval-augmented generation (RAG) retrieves relevant documents and adds them to the prompt before the model answers.
</p>

<h2>Reading the table</h2>

<p>
  The categories span latency-first products, such as voice and completion, and throughput-first products, such as moderation.
  Search holds both kinds of work: indexing a corpus runs offline, and answering a user's query runs online.
  Agents multiply cost and latency, because each user action fans out into many model calls.
</p>

<p>
  This list is a small sample.
  As models become faster, cheaper, and smarter, new categories will appear that no one has built yet.
</p>
