<script module>
  export const pageConfig = { title: 'Knowledge Check: Prefill, Decode, and Sampling' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Prefill, Decode, and Sampling</h1>

<p>These questions are ungraded. Retry them as often as you like.</p>

<MultipleChoice
  id="kc_decode_1"
  question="A model's vocabulary contains 151,936 tokens. How many values are in the logit vector that one decode forward pass produces?"
  options={['1', '4,096', '151,936']}
  correct={2}
  optionFeedback={[
    'Incorrect. The forward pass produces scores for every candidate token. Sampling then reduces them to one selected token.',
    'Incorrect. 4,096 is a typical hidden dimension or sequence length, not the logit count. The logit vector has one value per vocabulary token.',
    'Correct. The logit vector has one value for each token in the vocabulary.',
  ]}
/>

<MultipleChoice
  id="kc_decode_2"
  question="After normalization, the four most likely next tokens have probabilities of 0.50, 0.30, 0.15, and 0.05. The request sets top-p to 0.75. Which tokens remain candidates for selection?"
  options={['The top token only', 'The top two tokens', 'The top three tokens']}
  correct={1}
  optionFeedback={[
    'Incorrect. The top token reaches only 0.50, which is less than 0.75. Top-p keeps adding tokens until the total reaches p.',
    'Correct. 0.50 + 0.30 = 0.80, the smallest set that reaches 0.75. Those two tokens are re-normalized and sampled.',
    'Incorrect. The top two tokens already sum to 0.80. Top-p keeps the smallest set that reaches p, so the third token is excluded.',
  ]}
/>
