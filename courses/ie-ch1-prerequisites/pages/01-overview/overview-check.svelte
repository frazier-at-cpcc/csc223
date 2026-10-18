<script module>
  export const pageConfig = { title: 'Knowledge Check: Requirements' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Requirements</h1>

<p>Answer these practice questions. They do not count toward your score.</p>

<MultipleChoice
  id="kc_requirements_1"
  question="A product manager asks how much the company can afford to spend on inference for each user every month. Which requirement does this question define?"
  options={['Latency budget', 'Unit economics', 'Usage patterns']}
  correct={1}
  optionFeedback={[
    'Not quite. The latency budget sets how fast the product must respond, not how much it may cost.',
    'Correct. Unit economics sets the acceptable spend per request, per user, or per month.',
    'Not quite. Usage patterns describe how many users are active and when, not the spending limit.',
  ]}
/>

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
