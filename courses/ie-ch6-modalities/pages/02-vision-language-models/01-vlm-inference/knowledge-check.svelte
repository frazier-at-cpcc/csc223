<script module>
  export const pageConfig = { title: 'Knowledge Check: VLM Inference' };
</script>

<script>
  import { MultipleChoice, Matching } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: VLM Inference</h1>

<p>
  This check is ungraded. The first item practices objective 2, estimating visual tokens. The other two
  practice objective 3, selecting VLM optimizations.
</p>

<NumericQuestion
  id="kc_vlm_tokens"
  question="A shopper asks a 300-token question about six high-resolution product photos. At about 1,000 visual tokens per image, how many input tokens does the request carry?"
  answer={6300}
  unit="tokens"
  correctFeedback="6 × 1,000 = 6,000 visual tokens, plus 300 text tokens, gives 6,300 input tokens."
  incorrectFeedback="Multiply the images by the tokens per image, then add the text: 6 × 1,000 = 6,000 visual tokens, and 6,000 + 300 = 6,300 input tokens."
/>

<MultipleChoice
  id="kc_vlm_downsample"
  question="A catalog tool asks a VLM to name the product category in 12 high-resolution photos per request. The task needs no fine detail. Time to first token is long, and decode speed is acceptable. Which change most directly targets the slow first token?"
  options={[
    'Add speculative decoding with an EAGLE draft model',
    'Downsample the photos to a lower resolution',
    'Raise the maximum output length',
    'Replace the vision encoder with a larger encoder',
  ]}
  correct={1}
  optionFeedback={[
    'Speculation speeds up decode. The symptom is a slow prefill caused by about 12,000 visual tokens.',
    'Correct. Low resolution cuts the visual tokens by about four times, from about 12,000 to about 3,000, which shortens prefill. The category task does not need the lost detail.',
    'Output length affects decode time, not the prefill that produces the first token.',
    'A larger encoder adds work in front of prefill and does not reduce the number of visual tokens.',
  ]}
/>

<Matching
  id="kc_vlm_techniques"
  question="Match each VLM symptom to the Chapter 5 technique that addresses it."
  pairs={[
    { left: 'Users ask several questions about the same uploaded image', right: 'Prefix caching' },
    { left: 'Long image-heavy sequences fill GPU memory with keys and values', right: 'KV cache quantization' },
    { left: 'The text answer streams slowly after the first token', right: 'Speculative decoding' },
    { left: 'Image-heavy prefills delay decode for other users on shared GPUs', right: 'Disaggregation' },
  ]}
  correctFeedback="Name the phase first: repeated prefill, KV cache memory, decode speed, or interference between the two phases."
  incorrectFeedback="Prefix caching reuses an image's cached keys and values. KV cache quantization shrinks that cache. Speculation speeds decode. Disaggregation moves prefill to separate workers so it stops competing with decode."
/>
