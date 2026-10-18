<script module>
  export const pageConfig = { title: 'Fine-Tuning' };
</script>

<script>
  import WeightMatrixFigure from '../../../components/WeightMatrixFigure.svelte';
</script>

<h1>Fine-Tuning</h1>

<p>
  <strong>Fine-tuning</strong> takes a pre-trained foundation model and adapts it to a specific use case by training it on new data.
  Fine-tuning often lets a much smaller model meet a product's quality needs.
</p>

<WeightMatrixFigure mode="fine-tune" />

<p>
  Fine-tuning changes the values of the model's weights.
  The architecture stays the same, so the model keeps its size and its compatibility with existing inference tooling.
</p>

<h2>Why fine-tuning helps inference</h2>

<p>
  A small model that passes the product's evals is easier to serve within latency and cost targets.
  Fine-tuning is one of the most direct routes to a small model that passes.
</p>

<h2>Example: text-to-SQL</h2>

<p>
  Translating English questions into SQL, the language used to query databases, is a domain where fine-tuning works well.
</p>
<ul>
  <li>General-purpose coding models write good SQL, but these models have hundreds of billions of parameters.</li>
  <li>SQL is a relatively constrained language.</li>
  <li>For an application that only generates SQL from natural language prompts, a fine-tuned model of a few billion parameters can match the large model on this one task.</li>
</ul>
<p>
  Text-to-SQL is an extreme case.
  Many domains do not allow such a large reduction in model size.
  The example shows what a cleanly scoped domain, strong evaluation criteria, and high-quality labeled training data make possible.
</p>
