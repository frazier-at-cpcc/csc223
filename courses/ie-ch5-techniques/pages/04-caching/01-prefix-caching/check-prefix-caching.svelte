<script module>
  export const pageConfig = { title: 'Knowledge Check: Prefix Caching' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Prefix Caching</h1>
<p>These questions are ungraded. All three practice objective 6: choosing a KV cache technique, here by reordering context.</p>

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

<Sorting
  id="kc_prefix_2"
  question="A support chatbot builds each prompt from these parts. Sort each part by where it belongs in the template to maximize prefix cache hits."
  items={['Tool definitions shared by every request', 'Company policy text shared by every request', 'The customer’s name', 'The customer’s question', 'The current date and time']}
  targets={['Early in the prompt', 'Late in the prompt']}
  correct={[0, 0, 1, 1, 1]}
  correctFeedback="Correct. Content that every request shares goes first, so it forms a long shared prefix. Anything that varies per request goes last."
  incorrectFeedback="Shared content, such as tool definitions and policy text, belongs at the start. A name, a question, or a timestamp differs between requests, so placing it early ends the shared prefix."
/>

<NumericQuestion
  id="kc_prefix_3"
  question="Every request begins with the same 3,000-token system prompt, followed by a 200-token profile of the user and a 40-token question. A second user sends a request after the first user's request is cached. How many prompt tokens must prefill compute for the second request?"
  answer={240}
  unit="tokens"
  correctFeedback="Correct. The 3,000-token system prompt is a shared prefix. The profile and the question differ, so prefill computes 200 + 40 = 240 tokens."
  incorrectFeedback="The shared prefix ends where the two requests first differ, at the start of the user profile. Prefill computes everything from there: 200 + 40 = 240 tokens."
/>
