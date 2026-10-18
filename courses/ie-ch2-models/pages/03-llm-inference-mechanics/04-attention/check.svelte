<script module>
  export const pageConfig = { title: 'Knowledge Check: Attention' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Attention</h1>

<p>These questions are ungraded. Retry them as often as you like.</p>

<MultipleChoice
  id="kc_attn_1"
  question="An image generation model attends from the image being generated to the tokens of its text prompt. Which type of attention is this?"
  options={['Causal self-attention', 'Cross-attention', 'Self-attention']}
  correct={1}
  optionFeedback={[
    'Incorrect. Causal self-attention relates tokens within one sequence and blocks later tokens. The prompt is a separate sequence.',
    'Correct. Q comes from the image while K and V come from the prompt, so attention is conditioned on external information.',
    'Incorrect. Self-attention draws Q, K, and V from the same sequence. Here the image and the prompt are different sequences.',
  ]}
/>

<MultipleChoice
  id="kc_attn_2"
  question="During decode, which data does the KV cache let the model avoid recomputing for each new token?"
  options={['The keys and values of all previous tokens', 'The logits of all previous tokens', 'The query of the new token']}
  correct={0}
  optionFeedback={[
    'Correct. The KV cache stores the key and value tensors of prior tokens, so only the new token needs fresh computation.',
    'Incorrect. Logits are produced by the output layer for selecting the next token. They are not stored in the KV cache.',
    'Incorrect. The query belongs to the token being generated. It changes every step, so the model computes it fresh each time.',
  ]}
/>
