<script module>
  export const pageConfig = { title: 'Knowledge Check: How Disaggregation Works' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: How Disaggregation Works</h1>
<p>These questions are ungraded.</p>

<MultipleChoice
  id="kc_how_1"
  question="Under conditional disaggregation, a follow-up message arrives whose context is almost entirely a cached prefix. Where does prefill for this request run?"
  options={[
    'On the decode engine, which handles it locally',
    'On the prefill engine, after a KV cache transfer',
    'On both engines in parallel',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The decode engine checks the request first, and a cached or short input stays local.',
    'Incorrect. Only inputs that are long and uncached go to the prefill engine.',
    'Incorrect. Each request runs prefill on one engine, chosen by the conditional check.',
  ]}
/>

<MultipleChoice
  id="kc_how_2"
  question="Which engine in a disaggregated deployment computes the first output token?"
  options={['The decode engine', 'The prefill engine', 'The router']}
  correct={1}
  optionFeedback={[
    'Incorrect. The decode engine computes the tokens after the first.',
    'Correct. The prefill engine builds the KV cache and computes the first token before transferring the cache.',
    'Incorrect. The router assigns requests and does not run the model.',
  ]}
/>
