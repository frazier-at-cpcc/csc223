<script module>
  export const pageConfig = { title: 'Categories of AI-Native Applications' };
</script>

<h1>Categories of AI-Native Applications</h1>

<p>
  Generative AI models support a new class of applications across many industries.
  Each category relies on different models and modalities and needs inference tailored to it.
</p>

<div class="ie-table-wrap">
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
      <tr><th scope="row">Agents</th><td>Prospecting agent for sales teams</td><td>One user action triggers many inference calls.</td></tr>
      <tr><th scope="row">Chat</th><td>Front-line customer support chat with retrieval-augmented generation (RAG)</td><td>A short time to first token makes chat feel fast.</td></tr>
      <tr><th scope="row">Voice</th><td>Real-time translation between languages</td><td>End-to-end latency must support natural conversation.</td></tr>
      <tr><th scope="row">Media</th><td>Virtual try-on for clothes, shoes, and jewelry</td><td>Output quality must be balanced against speed.</td></tr>
      <tr><th scope="row">Search</th><td>Legal document discovery</td><td>Offline corpus processing competes with online user requests.</td></tr>
      <tr><th scope="row">Recommendation systems</th><td>E-commerce product recommendations</td><td>Latency must stay consistent under high request volume.</td></tr>
      <tr><th scope="row">Completion</th><td>Tab completion for coding in an IDE</td><td>A full completion chunk must arrive at the user's typing speed.</td></tr>
      <tr><th scope="row">Moderation</th><td>Safety scanning of user-generated content</td><td>High throughput keeps the checks cost-effective.</td></tr>
    </tbody>
  </table>
</div>

<h2>Reading the table</h2>

<p>
  The categories span latency-first products, such as voice and completion, and throughput-first products, such as moderation.
  Agents multiply cost and latency, because each user action fans out into many model calls.
</p>
<p>
  This list is a small sample.
  As models become faster, cheaper, and smarter, new categories will appear that no one has built yet.
</p>
