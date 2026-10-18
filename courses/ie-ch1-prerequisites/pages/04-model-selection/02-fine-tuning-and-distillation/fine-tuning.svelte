<script module>
  export const pageConfig = { title: 'Fine-Tuning' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import WeightMatrixFigure from '../../../components/WeightMatrixFigure.svelte';
</script>

<h1>Fine-Tuning</h1>

<p>
  <dfn><strong>Fine-tuning</strong></dfn> takes a pre-trained <Term id="foundation-model">foundation model</Term> and adapts it to a specific use case by training it further on new data.
  Fine-tuning can let a much smaller model meet a product's quality needs.
</p>

<WeightMatrixFigure mode="fine-tune" />

<p>
  Full fine-tuning changes the values of the model's <Term id="weights">weights</Term>.
  The architecture stays the same, so the model keeps its size and its compatibility with existing inference tooling.
  Chapter 2 introduces <Term id="lora">low-rank adaptation (LoRA)</Term>, a lighter method that trains a small set of added adapter weights instead of changing every weight.
</p>

<h2>Why fine-tuning helps inference</h2>

<p>
  A small model that passes the product's <Term id="evals">evals</Term> is easier to serve within <Term id="latency">latency</Term> and cost targets.
  Fine-tuning is one of the most direct routes to a small model that passes.
</p>

<h2>Example: text-to-SQL</h2>

<p>
  Translating English questions into SQL, the language used to query databases, is a domain where fine-tuning works well.
</p>

<ul>
  <li>General-purpose coding models write good SQL, but these models have hundreds of billions of <Term id="parameter">parameters</Term>.</li>
  <li>SQL is a relatively constrained language.</li>
  <li>For an application that only generates SQL from natural language prompts, a fine-tuned model of a few billion parameters can match the large model on this one task.</li>
</ul>

<p>
  Text-to-SQL is an extreme case.
  Many domains do not allow such a large reduction in model size.
  The example shows what a cleanly scoped domain, strong evaluation criteria, and high-quality labeled training data make possible.
  Labeled data here means example inputs paired with correct outputs, usually written or checked by people.
</p>
