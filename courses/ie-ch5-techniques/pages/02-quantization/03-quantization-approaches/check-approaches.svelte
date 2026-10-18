<script module>
  export const pageConfig = { title: 'Knowledge Check: Quantization Approaches' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Quantization Approaches</h1>
<p>These questions are ungraded.</p>

<MultipleChoice
  id="kc_approach_1"
  question="An engineer downloads an open model whose weights were released in BF16. Which quantization approach is available to the engineer?"
  options={[
    'Dynamic integer quantization is the only option for open weights',
    'Post-training quantization with calibration',
    'Quantization-aware training on the finished weights',
    'Quantization is unavailable because the model shipped in BF16',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Dynamic integer quantization is one post-training option for local inference, and it is unsuitable for quality-sensitive production.',
    'Correct. Finished weights can only be quantized after training, using calibration to preserve accuracy.',
    'Incorrect. Quantization-aware training happens during training, so it requires the training process, not finished weights.',
    'Incorrect. BF16 is the most common native format, and post-training quantization starts from it.',
  ]}
/>

<MultipleChoice
  id="kc_approach_2"
  question="A team plans to quantize the KV cache of a long-context model. Which risk should the team test for most carefully?"
  options={[
    'Errors in early cache entries compound across every later token',
    'Quantized cache entries can no longer be shared through prefix caching',
    'The KV cache becomes larger and evicts entries sooner',
    'The model stops producing a first token',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Every later token reads earlier KV cache entries, so precision errors compound over long sequences.',
    'Incorrect. Quantizing the KV cache helps prefix caching by fitting more cache in memory.',
    'Incorrect. Quantization makes the KV cache smaller, not larger.',
    'Incorrect. Prefill still computes the first token. The risk lies in output quality, not in failure to generate.',
  ]}
/>
