<script module>
  export const pageConfig = { title: 'Knowledge Check: Requirements' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Requirements</h1>

<p>Answer these practice questions. They do not count toward your score. Each item names the objective it practices.</p>

<p class="ie-obj">Objective 1: Identify the five product requirements.</p>

<Matching
  id="kc_requirements_1"
  question="Match each statement from a product brief to the requirement it defines."
  pairs={[
    { left: 'Replies must start streaming within 400 milliseconds', right: 'Latency budget' },
    { left: 'The service accepts JSON and must return JSON', right: 'Application interface' },
    { left: 'Traffic triples every Monday morning', right: 'Usage patterns' },
    { left: 'Each support conversation may cost at most one cent to serve', right: 'Unit economics' },
    { left: 'The product needs a speech model and a chat model', right: 'Model requirements' },
  ]}
  correctFeedback="Correct. Each statement answers one of the five questions an inference engineer asks before optimizing."
  incorrectFeedback="Not yet. Ask which question each statement answers: which model, what format, how fast, how much it may cost, or how many users and when."
/>

<p class="ie-obj">Objective 2: Evaluate whether a product should move to a dedicated deployment.</p>

<MultipleChoice
  id="kc_requirements_2"
  question="A team is still searching for product-market fit. Its choice of model is still open, and its traffic is small and unpredictable. Which approach fits this stage?"
  options={[
    'Buy GPUs for an on-premises cluster to lock in capacity',
    'Build a dedicated deployment sized for the expected peak',
    'Use off-the-shelf APIs until the requirements are clear',
  ]}
  correct={2}
  optionFeedback={[
    'Not quite. Buying hardware commits the team to costs before it knows its model, latency budget, or traffic.',
    'Not quite. A deployment sized for a guessed peak optimizes for requirements the team has not defined yet.',
    'Correct. Off-the-shelf APIs avoid fixed costs while the requirements are still unknown.',
  ]}
/>
