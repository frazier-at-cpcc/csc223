<script module>
  export const pageConfig = { title: 'Knowledge Check: Tokens and Sequences' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Tokens and Sequences</h1>

<p>These questions are ungraded. Retry them as often as you like.</p>

<MultipleChoice
  id="kc_tokens_1"
  question="An inference engine converts the string 'Inference' into the token IDs 644 and 2251. Which component performs this conversion?"
  options={['The chat template', 'The output layer', 'The tokenizer']}
  correct={2}
  optionFeedback={[
    'Incorrect. The chat template combines messages, roles, and tool definitions into one string. It does not map strings to token IDs.',
    'Incorrect. The output layer is part of the neural network and produces logits. Tokenization requires no neural network.',
    'Correct. The tokenizer is a deterministic mapping between strings and token IDs.',
  ]}
/>

<MultipleChoice
  id="kc_tokens_2"
  question="A model has an 8,000-token context window. A request sends a 7,500-token input to a model that does not reason and sets max_tokens to 1,000. What is the largest output the model can generate for this request?"
  options={['500 tokens', '1,000 tokens', '8,000 tokens']}
  correct={0}
  optionFeedback={[
    'Correct. Input and output share the 8,000-token context window, so only 500 tokens remain for output.',
    'Incorrect. max_tokens is an upper limit, but the context window is reached first. Only 500 tokens remain after the 7,500-token input.',
    'Incorrect. The context window covers input and output together, not output alone.',
  ]}
/>
