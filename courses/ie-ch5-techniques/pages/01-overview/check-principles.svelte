<script module>
  export const pageConfig = { title: 'Knowledge Check: Principles' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Principles</h1>
<p>These questions are ungraded. Use them to confirm your understanding before moving on.</p>

<MultipleChoice
  id="kc_principles_1"
  question="Which pair of choices pulls in opposite directions, so that strengthening one weakens the other?"
  options={[
    'Increasing batch size and using speculative decoding',
    'Quantizing the KV cache and using disaggregation',
    'Using prefix caching and using cache-aware routing',
    'Using Tensor Parallelism and using NVLink within a node',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Larger batches consume the spare compute that speculative decoding needs to validate draft tokens.',
    'Incorrect. Quantizing the KV cache relieves a bottleneck in disaggregation, so the two are symbiotic.',
    'Incorrect. Cache-aware routing sends requests to the replica that holds their prefix, which raises the prefix cache hit rate.',
    'Incorrect. NVLink supplies the high intra-node bandwidth that Tensor Parallelism depends on.',
  ]}
/>

<MultipleChoice
  id="kc_principles_2"
  question="Which technique from this chapter can reduce a model's output quality?"
  options={['Disaggregation', 'Prefix caching', 'Quantization', 'Speculative decoding']}
  correct={2}
  optionFeedback={[
    'Incorrect. Disaggregation moves prefill and decode onto separate engines without changing the computation.',
    'Incorrect. Prefix caching re-uses KV cache values that are identical to what prefill would compute.',
    'Correct. Lowering numerical precision can introduce errors that compound through the model.',
    'Incorrect. The target model verifies every draft token, so the output matches what the model would have generated.',
  ]}
/>
