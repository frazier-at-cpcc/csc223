<script module>
  export const pageConfig = { title: 'Knowledge Check: Prefill, Decode, and Sampling' };
</script>

<script>
  import { Sorting } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Prefill, Decode, and Sampling</h1>

<p>
  These questions are ungraded and practice objective 2, tracing an LLM request through prefill, decode, and
  token sampling. Retry them as often as you like.
</p>

<Sorting
  id="kc_decode_1"
  question="Sort each event in one LLM request into the stage where it happens."
  items={[
    'Convert the prompt text to token IDs',
    'Write the keys and values of every prompt token',
    'Produce the first output token',
    'Produce the fifth output token',
    'Append one generated token’s keys and values to the cache',
    'Format the chat messages with the model’s roles and separators',
  ]}
  targets={['Step zero, before the model runs', 'Prefill', 'Decode']}
  correct={[0, 1, 1, 2, 2, 0]}
  correctFeedback="Step zero formats and tokenizes. Prefill writes the prompt’s keys and values and produces the first token. Decode produces every later token and grows the cache by one entry per pass."
  incorrectFeedback="Step zero runs the chat template and the tokenizer. The single prefill pass writes every prompt token’s keys and values and yields the first output token. Each decode pass yields one later token and appends one entry to the KV cache."
/>

<NumericQuestion
  id="kc_decode_2"
  question="After softmax, the five most likely next tokens have probabilities of 0.42, 0.25, 0.18, 0.09, and 0.06. The request sets top-p to 0.8. How many tokens remain candidates for sampling?"
  answer={3}
  unit="tokens"
  correctFeedback="0.42 + 0.25 = 0.67 falls short of 0.8. Adding 0.18 reaches 0.85, so the smallest qualifying set has three tokens."
  incorrectFeedback="Top-p keeps the smallest set of most likely tokens whose probabilities reach p. 0.42 + 0.25 = 0.67 is below 0.8. Adding the third token gives 0.85, which reaches 0.8, so three tokens remain."
/>

<NumericQuestion
  id="kc_decode_3"
  question="After softmax, the three most likely tokens have probabilities of 0.60, 0.30, and 0.10. The request sets top-k to 2. After re-normalization, what is the probability of the most likely token, in percent?"
  answer={66.7}
  tolerance={0.5}
  unit="percent"
  correctFeedback="Top-k = 2 keeps 0.60 and 0.30. Re-normalizing divides each by their sum: 0.60 / 0.90 ≈ 66.7 percent."
  incorrectFeedback="Top-k = 2 keeps the two most likely tokens, 0.60 and 0.30, which sum to 0.90. Re-normalization divides each kept probability by that sum: 0.60 / 0.90 ≈ 0.667, or 66.7 percent."
/>
