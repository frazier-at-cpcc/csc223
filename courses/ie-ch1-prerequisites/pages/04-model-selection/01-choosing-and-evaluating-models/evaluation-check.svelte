<script module>
  export const pageConfig = { title: 'Knowledge Check: Choosing and Evaluating Models' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Choosing and Evaluating Models</h1>

<p>Answer these practice questions. They do not count toward your score.</p>

<MultipleChoice
  id="kc_evals_1"
  question="A team is about to apply an optimization that can reduce model quality. What role do its evals play in this decision?"
  options={[
    'They provide a baseline for detecting any loss the change causes',
    'They replace latency measurements for the optimized model',
    'They select the inference engine that supports the optimization',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. A baseline score lets the team compare quality before and after the optimization.',
    'Not quite. Evals measure model intelligence. Latency still needs its own measurement.',
    'Not quite. Engine choice depends on architecture support, not on eval scores.',
  ]}
/>

<MultipleChoice
  id="kc_evals_2"
  question="Model labs compete to post record scores on popular benchmarks with each release. Which principle explains why those scores become less reliable?"
  options={["Elo rating", "Goodhart's Law", 'Percentile measurement']}
  correct={1}
  optionFeedback={[
    'Not quite. Elo rating is an alternative quality measure based on head-to-head win rates. It does not explain why benchmark scores degrade.',
    "Correct. Goodhart's Law holds that a measure stops being a good measure once it becomes a target.",
    'Not quite. Percentiles describe latency distributions, not the reliability of intelligence benchmarks.',
  ]}
/>
