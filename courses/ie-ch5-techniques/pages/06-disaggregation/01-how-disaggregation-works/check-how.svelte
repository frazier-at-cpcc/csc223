<script module>
  export const pageConfig = { title: 'Knowledge Check: How Disaggregation Works' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: How Disaggregation Works</h1>
<p>These questions are ungraded. Both practice objective 9: evaluating disaggregated serving.</p>

<MultipleChoice
  id="kc_how_1"
  question="Under conditional disaggregation, a follow-up message arrives whose context is almost entirely a cached prefix. Where does prefill for this request run?"
  options={[
    'On both engines in parallel',
    'On the decode engine, locally',
    'On the prefill engine, after a transfer',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Each request runs prefill on one engine, chosen by the conditional check.',
    'Correct. The decode engine checks the request first, and a cached or short input stays local.',
    'Incorrect. Only inputs that are long and uncached go to the prefill engine.',
  ]}
/>

<MultipleChoice
  id="kc_how_2"
  question="A team runs disaggregated serving and must choose Tensor Parallelism degrees for each engine. Which assignment follows the reasoning of this lesson?"
  options={[
    'A higher TP degree on the decode engine than on the prefill engine',
    'A higher TP degree on the prefill engine than on the decode engine',
    'The same TP degree on both engines, so the KV cache layouts match',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Decode is limited by weight reads, which a higher TP degree splits across more GPUs. Prefill is already compute saturated and gains less.',
    'Incorrect. Prefill already saturates compute, so extra TP mostly adds all-reduce traffic.',
    'Incorrect. Engines can use different TP degrees. The KV cache transfer can convert between layouts, as the next lesson shows.',
  ]}
/>
