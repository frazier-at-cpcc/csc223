<script module>
  export const pageConfig = { title: 'Knowledge Check: Prefix Caching' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Prefix Caching</h1>
<p>This question is ungraded.</p>

<MultipleChoice
  id="kc_prefix_1"
  question="An agent's prompt template begins with the current timestamp, followed by a 4,000-token system prompt and then the user's message. Prefix cache hits are near zero. Which change raises the hit rate most?"
  options={[
    'Move the timestamp after the system prompt',
    'Move the user message before the system prompt',
    'Raise the KV cache memory fraction',
    'Shorten the system prompt to 2,000 tokens',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The timestamp changes on every request, so placing it first ends the prefix at token one. Moving it later lets the system prompt form a shared prefix.',
    'Incorrect. The user message is also novel, so placing it first would still end the prefix immediately.',
    'Incorrect. More cache memory does not help when no two requests share a prefix.',
    'Incorrect. A shorter system prompt still sits behind a unique timestamp, so it still cannot be matched.',
  ]}
/>
