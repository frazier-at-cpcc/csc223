<script module>
  export const pageConfig = { title: 'Knowledge Check: Why Quantize' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Why Quantize</h1>
<p>These questions are ungraded.</p>

<MultipleChoice
  id="kc_why_1"
  question="Why does halving numerical precision speed up the decode phase of LLM inference?"
  options={[
    'Decode generates fewer tokens when values use fewer bits.',
    'Decode no longer needs a KV cache at lower precision.',
    'Each value requires half as many bytes to load from memory.',
    'Lower-precision Tensor Cores deliver twice the FLOPS.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Precision changes how values are stored, not how many tokens the model produces.',
    'Incorrect. Decode still reads the KV cache. Quantizing the KV cache makes it smaller, but it remains essential.',
    'Correct. Decode is bound by memory bandwidth, so loading half the data effectively doubles bandwidth.',
    'Incorrect. Extra FLOPS help compute-bound prefill. Decode is limited by memory bandwidth, not compute.',
  ]}
/>

<MultipleChoice
  id="kc_why_2"
  question="A team quantizes an LLM from FP16 to FP8. What performance improvement should the team plan for?"
  options={[
    'No measurable change',
    'About 30 to 50 percent',
    'Exactly 100 percent',
    'About 300 percent',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Lower precision improves both compute-bound prefill and memory-bound decode.',
    'Correct. Overhead from working with quantized data keeps one level of quantization below a full doubling.',
    'Incorrect. Halving the bits would double speed only if quantization added no overhead.',
    'Incorrect. One level of precision cannot exceed a doubling, and overhead keeps the gain lower still.',
  ]}
/>
