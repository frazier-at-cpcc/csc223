<script module>
  export const pageConfig = { title: 'Knowledge Check: Speculation Algorithms' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Speculation Algorithms</h1>
<p>These questions are ungraded.</p>

<MultipleChoice
  id="kc_algo_1"
  question="A team needs speculative decoding running this week and cannot train or fine-tune any model. Which algorithm fits the constraint?"
  options={['Draft-target with a smaller model from the same family', 'EAGLE', 'Medusa']}
  correct={0}
  optionFeedback={[
    'Correct. Draft-target works out of the box with an existing smaller model that shares the target tokenizer.',
    'Incorrect. EAGLE requires training a purpose-built speculator.',
    'Incorrect. Medusa requires fine-tuning extra decoder heads onto the target model.',
  ]}
/>

<MultipleChoice
  id="kc_algo_2"
  question="A general-purpose chat service runs at low batch sizes, and its team can train speculators. Which algorithm should the team adopt?"
  options={['Draft-target', 'EAGLE', 'N-gram speculation']}
  correct={1}
  optionFeedback={[
    'Incorrect. Draft-target carries the most overhead of any method, so other algorithms generally perform better.',
    'Correct. EAGLE reads target hidden states, drafts up to eight tokens with high acceptance, and is the default for general use.',
    'Incorrect. N-gram acceptance stays high only when output resembles input, which chat output usually does not.',
  ]}
/>
