<script module>
  export const pageConfig = { title: 'Benchmarks Versus Evals' };
</script>

<h1>Benchmarks Versus Evals</h1>

<p>
  An <strong>intelligence benchmark</strong> measures a model's ability to answer questions correctly or take appropriate actions on common tasks.
  MMLU and SWE-bench are examples.
  Evals, by contrast, are tailored to one product, domain, and set of tasks.
</p>

<h2>The limits of benchmarks</h2>

<p>
  Benchmarks are useful for building a shortlist of candidate models.
  Many popular benchmarks, however, have become saturated, and some have been gamed.
</p>
<p>
  <strong>Goodhart's Law</strong> states: "When a measure becomes a target, it ceases to be a good measure."
  Frontier labs have a strong incentive to post record benchmark scores with each model release.
  That incentive turns the benchmark into a target, and the scores lose meaning.
</p>
<p>
  Better measures of overall intelligence exist.
  An <strong>Elo rating</strong> scores models by their head-to-head win rate against other models.
  No general measure, though, replaces a direct measurement of how a model performs for your application.
</p>

<h2>Practices for useful evals</h2>

<ul>
  <li><strong>Look at your data.</strong> Check eval results against your intuition for the product and the problem space.</li>
  <li><strong>Be precise.</strong> Identify the hardest problems the model must solve and focus the evaluation there.</li>
  <li><strong>Use tools.</strong> Eval tooling already exists for this core problem in AI engineering, so build on it.</li>
</ul>

<p>Appendix B of the book recommends eval tools and further reading.</p>
