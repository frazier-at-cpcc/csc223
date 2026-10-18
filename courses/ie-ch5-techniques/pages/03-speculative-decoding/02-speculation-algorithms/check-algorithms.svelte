<script module>
  export const pageConfig = { title: 'Knowledge Check: Speculation Algorithms' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Speculation Algorithms</h1>
<p>These questions are ungraded. All three practice objective 5: selecting a speculation algorithm for a workload.</p>

<Matching
  id="kc_algo_1"
  question="Match each speculation algorithm to the source of its draft tokens."
  pairs={[
    { left: 'Draft-target', right: 'A separate, smaller model from the same family' },
    { left: 'Medusa', right: 'Extra decoder heads fine-tuned onto the target model' },
    { left: 'EAGLE', right: 'A small trained speculator that reads the target model’s hidden states' },
    { left: 'N-gram speculation', right: 'Token sequences already seen in the prompt' },
  ]}
  correctFeedback="Correct. The draft source decides the setup cost and the workloads where each algorithm earns high acceptance."
  incorrectFeedback="Draft-target uses a second model. Medusa adds heads to the target. EAGLE trains a speculator on the target's hidden states. N-gram speculation copies sequences from the input, so it needs no model at all."
/>

<MultipleChoice
  id="kc_algo_2"
  question="A team needs speculation running this week for a free-form chat assistant and cannot train or fine-tune any model. Which algorithm fits both constraints?"
  options={['Draft-target', 'EAGLE', 'Medusa', 'N-gram speculation']}
  correct={0}
  optionFeedback={[
    'Correct. Draft-target works with an existing smaller model from the same family that shares the target tokenizer, and it needs no training.',
    'Incorrect. EAGLE requires training a purpose-built speculator.',
    'Incorrect. Medusa requires fine-tuning extra decoder heads onto the target model.',
    'Incorrect. N-gram speculation needs no training, but chat replies rarely repeat the prompt, so acceptance would be low.',
  ]}
/>

<MultipleChoice
  id="kc_algo_3"
  question="A general-purpose chat service runs at low batch sizes, and its team has the data and skills to train speculators. Which algorithm should the team adopt?"
  options={['Draft-target', 'EAGLE', 'Lookahead Decoding', 'Medusa']}
  correct={1}
  optionFeedback={[
    'Incorrect. Draft-target carries the most overhead of any method, so a trained speculator performs better.',
    'Correct. EAGLE reads target hidden states, drafts up to eight tokens with high acceptance, and is the default for general use.',
    'Incorrect. Lookahead Decoding spends extra compute generating n-grams and suits systems with compute to spare.',
    'Incorrect. Medusa is limited in draft count and acceptance rate, and EAGLE superseded it.',
  ]}
/>
