<script module>
  export const pageConfig = { title: 'Knowledge Check: Quantization Approaches' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Quantization Approaches</h1>
<p>These questions are ungraded. All three practice objective 3: evaluating a quantization plan for its quality risk.</p>

<Sorting
  id="kc_approach_1"
  question="Sort each part of a model by how a moderate post-training quantization plan treats it."
  items={['Linear-layer weights', 'Activations', 'KV cache', 'Softmax inside attention', 'Input and output layers']}
  targets={['Quantize first (lowest risk)', 'Quantize with long-context testing (moderate risk)', 'Usually keep at original precision (highest risk)']}
  correct={[0, 0, 1, 2, 2]}
  correctFeedback="Correct. Weights and activations are the safest targets. The KV cache needs testing over long sequences. Softmax and the first and last layers usually stay at original precision."
  incorrectFeedback="The ranking runs weights, then activations, then the KV cache, then attention. The KV cache compounds errors across tokens, so it needs long-context testing. Softmax is the most sensitive operation, and the input and output layers are more sensitive than the layers between them."
/>

<MultipleChoice
  id="kc_approach_2"
  question="An engineer downloads an open model whose weights were released in BF16. Which quantization approach is available to the engineer?"
  options={[
    'No approach, because the model shipped in BF16',
    'Post-training quantization with calibration',
    'Quantization-aware training on the finished weights',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. BF16 is the most common native format, and post-training quantization starts from it.',
    'Correct. Finished weights can only be quantized after training, with calibration data to set the scale factors.',
    'Incorrect. Quantization-aware training happens during training, so it requires the training process, not finished weights.',
  ]}
/>

<MultipleChoice
  id="kc_approach_3"
  question="A team plans to quantize the KV cache of a model that serves 100,000-token documents. Which risk should the team test for most carefully?"
  options={[
    'Cache entries that can no longer be shared through prefix caching',
    'Errors in early cache entries that compound across every later token',
    'A KV cache that grows larger and evicts entries sooner',
    'A model that stops producing a first token',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Quantized cache entries are still reusable, and a smaller cache fits more prefixes in memory.',
    'Correct. Every later token reads earlier KV cache entries, so precision errors compound over long sequences.',
    'Incorrect. Quantization makes the KV cache smaller, not larger.',
    'Incorrect. Prefill still computes the first token. The risk lies in output quality, not in failure to generate.',
  ]}
/>
