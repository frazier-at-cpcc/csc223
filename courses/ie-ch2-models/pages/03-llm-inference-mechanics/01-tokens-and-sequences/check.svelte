<script module>
  export const pageConfig = { title: 'Knowledge Check: Tokens and Sequences' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Tokens and Sequences</h1>

<p>
  These questions are ungraded and practice objective 2, tracing an LLM request from its tokenized prompt.
  Retry them as often as you like.
</p>

<Matching
  id="kc_tokens_1"
  question="Match each component of step zero to what it does."
  pairs={[
    { left: 'Chat template', right: 'Combines messages, roles, and separators into one input string' },
    { left: 'Tokenizer', right: 'Converts strings to token IDs without a neural network' },
    { left: 'Vocabulary', right: 'The complete mapping between token IDs and strings' },
    { left: 'Context window', right: 'The most tokens one request can hold across input, reasoning, and output' },
  ]}
  correctFeedback="The chat template and the tokenizer run before the model does. The vocabulary and the context window are properties of the model."
  incorrectFeedback="Step zero applies the chat template to build one string, then the tokenizer converts that string to token IDs drawn from the vocabulary. The context window caps the total tokens per request."
/>

<NumericQuestion
  id="kc_tokens_2"
  question="A reasoning model has a 16,384-token context window. A request sends a 12,000-token input, and the model spends 3,000 tokens reasoning. What is the largest visible answer, in tokens, the model can still produce?"
  answer={1384}
  unit="tokens"
  correctFeedback="Input, reasoning, and output share the window: 16,384 − 12,000 − 3,000 = 1,384 tokens."
  incorrectFeedback="Input, reasoning, and output all count against the context window. Subtract both the input and the reasoning tokens: 16,384 − 12,000 − 3,000 = 1,384 tokens."
/>

<MultipleChoice
  id="kc_tokens_3"
  question="Two models decode at the same 80 tokens per second. Model A's tokenizer needs 1,300 tokens to write a given answer, and Model B's tokenizer needs 1,000 tokens for the same text. Which model finishes the answer sooner?"
  options={['Model A', 'Model B', 'Neither, because both decode at 80 tokens per second']}
  correct={1}
  optionFeedback={[
    'Incorrect. Model A must generate 300 more tokens at the same rate, so it finishes later.',
    'Correct. At equal speed, fewer tokens means less decode time: 1,000 / 80 = 12.5 seconds against 1,300 / 80 = 16.25 seconds.',
    'Incorrect. Equal tokens per second does not mean equal latency. The model that needs fewer tokens for the same text finishes first.',
  ]}
/>
