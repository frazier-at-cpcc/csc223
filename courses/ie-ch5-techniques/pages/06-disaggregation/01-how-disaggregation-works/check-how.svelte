<script module>
  export const pageConfig = { title: 'Knowledge Check: How Disaggregation Works' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: How Disaggregation Works</h1>
<p>These questions are ungraded. Both practice objective 9: evaluating disaggregated serving.</p>

<Sorting
  id="kc_how_1"
  question="Under conditional disaggregation, sort each request by where its prefill runs."
  items={['A follow-up turn whose history is already cached', 'A 40-token question with no cached prefix', 'A 60,000-token contract with no cached prefix', 'A 30,000-token log file seen for the first time']}
  targets={['Locally on the decode engine', 'On a prefill engine, after a transfer']}
  correct={[0, 0, 1, 1]}
  correctFeedback="Correct. Cached or short inputs stay on the decode engine. Long, uncached inputs go to a prefill engine."
  incorrectFeedback="The decode engine checks each request first. It prefills cached or short inputs itself and sends long, uncached inputs to a prefill engine."
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
    'Correct. Decode is limited by weight reads, which a higher TP degree splits across more GPUs. Prefill gets more throughput per GPU at a lower degree.',
    'Incorrect. A higher prefill degree adds large all-reduces for every prompt token, so it lowers throughput per GPU.',
    'Incorrect. Engines can use different TP degrees. The KV cache transfer can convert between layouts, as the next lesson shows.',
  ]}
/>
