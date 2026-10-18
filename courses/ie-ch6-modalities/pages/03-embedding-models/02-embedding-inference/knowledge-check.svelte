<script module>
  export const pageConfig = { title: 'Knowledge Check: Embedding Inference' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Embedding Inference</h1>

<p>This check is ungraded. Use it to confirm your understanding before you continue.</p>

<MultipleChoice
  id="kc_embed_inf_1"
  question="An FP8 version of an embedding model is compared with the original on the same inputs. The mean cosine similarity of the paired output vectors is 96 percent. What should the team conclude?"
  options={[
    'The quantization lost too much quality, because the result is below 99 percent',
    'The quantization is acceptable, because any result above 90 percent is close enough',
    'The test is invalid, because cosine similarity applies only to vectors from different models',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The chapter sets at least 99 percent similarity as the bar for confidence in a quantized embedding model.',
    'The bar is 99 percent. A 96 percent result shows the quantized model changed its outputs noticeably.',
    'Comparing the original and quantized model on the same inputs is exactly the recommended use of cosine similarity here.',
  ]}
/>
