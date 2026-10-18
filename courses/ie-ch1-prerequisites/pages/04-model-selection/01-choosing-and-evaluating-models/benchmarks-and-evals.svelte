<script module>
  export const pageConfig = { title: 'Benchmarks Versus Evals' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Benchmarks Versus Evals</h1>

<p>
  An <dfn><strong>intelligence benchmark</strong></dfn> measures a model's ability to answer questions correctly or take appropriate actions on common tasks.
  MMLU, which tests broad knowledge, and SWE-bench, which tests software engineering, are two widely used <Term id="benchmark-suite">benchmark suites</Term>.
  Evals, by contrast, are tailored to one product, domain, and set of tasks.
</p>

<h2>The limits of benchmarks</h2>

<p>
  Benchmarks are useful for building a shortlist of candidate models.
  Many popular benchmarks, however, have become saturated, and some have been gamed.
</p>
<p>
  <dfn><strong>Goodhart's Law</strong></dfn> states: "When a measure becomes a target, it ceases to be a good measure."
  Frontier labs have a strong incentive to post record benchmark scores with each model release.
  That incentive turns the benchmark into a target, and the scores lose meaning.
</p>
<p>
  Better measures of overall intelligence exist.
  An <dfn><strong>Elo rating</strong></dfn> scores models by their head-to-head win rate against other models, usually in comparisons where people pick the better of two outputs.
  No general measure, though, replaces a direct measurement of how a model performs for your application.
</p>

<h2>Practices for useful evals</h2>

<ul>
  <li><strong>Look at your data.</strong> Check eval results against your intuition for the product and the problem space.</li>
  <li><strong>Be precise.</strong> Identify the hardest problems the model must solve and focus the evaluation there.</li>
  <li><strong>Use tools.</strong> Eval tooling already exists for this core problem in AI engineering, so build on it.</li>
</ul>

<p>Appendix B of the book recommends eval tools and further reading.</p>

<p>
  The word benchmark has a second meaning in this series.
  Chapter 4 uses a <Term id="performance-benchmark">performance benchmark</Term> to measure the <Term id="latency">latency</Term> and <Term id="throughput">throughput</Term> of a deployment, not the intelligence of a model.
</p>
