<script module>
  export const pageConfig = { title: 'Knowledge Check: Attention' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Attention</h1>

<p>
  These questions are ungraded and practice objective 4, explaining how the KV cache changes the cost of
  attention. Retry them as often as you like.
</p>

<Matching
  id="kc_attn_1"
  question="Match each part of attention to its role."
  pairs={[
    { left: 'Query', right: 'The projection of the current token that is scored against every key' },
    { left: 'Key', right: 'The projection of a context token that a query is scored against' },
    { left: 'Value', right: 'The projection of a context token that the attention weights blend' },
    { left: 'Causal mask', right: 'Blocks each token from attending to later tokens' },
  ]}
  correctFeedback="Queries and keys produce the scores. Values carry the content that the scores blend. The causal mask hides the future."
  incorrectFeedback="Query times key gives a relevance score for each context token. Softmax turns the scores into weights, which blend the values. The causal mask prevents any token from seeing a later token."
/>

<NumericQuestion
  id="kc_attn_2"
  question="An engine runs without a KV cache. A request has a 1,000-token prompt. Prefill produces the first output token, and 3 decode steps follow. How many token positions have their keys and values computed in total across the 4 forward passes?"
  answer={4006}
  unit="positions"
  correctFeedback="Without a cache, each pass recomputes the whole sequence so far: 1,000 + 1,001 + 1,002 + 1,003 = 4,006. A cache would cut this to 1,000 + 1 + 1 + 1 = 1,003."
  incorrectFeedback="Without a cache, prefill computes 1,000 positions and each decode step recomputes every position in the sequence so far, which grows by one each step: 1,000 + 1,001 + 1,002 + 1,003 = 4,006."
/>

<MultipleChoice
  id="kc_attn_3"
  question="An image generation model attends from the image being generated to the tokens of its text prompt. Which type of attention is this?"
  options={['Causal self-attention', 'Cross-attention', 'Self-attention']}
  correct={1}
  optionFeedback={[
    'Incorrect. Causal self-attention relates tokens within one sequence and blocks later tokens. The prompt is a separate sequence.',
    'Correct. Q comes from the image while K and V come from the prompt, so attention is conditioned on external information.',
    'Incorrect. Self-attention draws Q, K, and V from the same sequence. Here the image and the prompt are different sequences.',
  ]}
/>
