<script module>
  export const pageConfig = { title: 'Knowledge Check: Choosing and Evaluating Models' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Choosing and Evaluating Models</h1>

<p>Answer these practice questions. They do not count toward your score. Each item names the objective it practices.</p>

<p class="ie-obj">Objective 6: Explain why model selection and product-specific evals come before performance optimization.</p>

<Matching
  id="kc_evals_1"
  question="Match each term to its description."
  pairs={[
    { left: 'Intelligence benchmark', right: 'A public test that compares models on common tasks' },
    { left: 'Eval', right: "A test built from one product's real tasks" },
    { left: 'Elo rating', right: 'A score from head-to-head comparisons of model outputs' },
    { left: "Goodhart's Law", right: 'A measure loses its value once it becomes a target' },
    { left: 'Quality baseline', right: 'The eval score recorded before an optimization' },
  ]}
  correctFeedback="Correct. Benchmarks and Elo ratings compare models in general. Evals and their baseline measure one product."
  incorrectFeedback="Not yet. Separate the general measures, which compare models on common tasks, from the product measures, which test one product's own work."
/>

<p class="ie-obj">Objective 6: Explain why model selection and product-specific evals come before performance optimization.</p>

<MultipleChoice
  id="kc_evals_2"
  question="A team has a working prototype on a 70-billion-parameter model and three tasks on its list. Which task should it complete first?"
  options={[
    'Benchmark three inference engines on the current model',
    'Build an eval set from real product requests',
    'Tune batch sizes on the current GPUs',
  ]}
  correct={1}
  optionFeedback={[
    'Not quite. Engine benchmarks tune the speed of a model that has not yet been shown to be the right one.',
    'Correct. An eval set shows whether a smaller model can do the job, and it sets the baseline for every later optimization.',
    'Not quite. Batch tuning optimizes the current model before the team knows whether it is the right model.',
  ]}
/>

<p class="ie-obj">Objective 6: Explain why model selection and product-specific evals come before performance optimization.</p>

<MultipleChoice
  id="kc_evals_3"
  question="A new open model posts a record score on a public coding benchmark. The team's product writes database queries for financial analysts. What should the team do before adopting the new model?"
  options={[
    'Adopt it, because a record coding score shows it writes better queries',
    'Run the team\'s own evals on the new model with real analyst questions',
    'Wait until the model also posts a record Elo rating',
  ]}
  correct={1}
  optionFeedback={[
    'Not quite. A benchmark that labs compete on can be gamed, and it does not test this product\'s queries.',
    'Correct. Only product-specific evals show how the model performs on the team\'s own tasks.',
    'Not quite. An Elo rating is a better general measure, but it still does not test the product\'s own tasks.',
  ]}
/>
