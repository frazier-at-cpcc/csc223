<script module>
  export const pageConfig = { title: 'Knowledge Check: Number Formats' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Number Formats</h1>
<p>These questions are ungraded.</p>

<MultipleChoice
  id="kc_formats_1"
  question="A format divides each feature vector into groups of 32 values and computes a scale factor for each group. At which level of granularity does this format quantize?"
  options={['Block level', 'Channel level', 'Layer level', 'Tensor level']}
  correct={0}
  optionFeedback={[
    'Correct. Computing a scale factor for each group of N values within a feature vector is block-level quantization, as in MXFP8 and MXFP4.',
    'Incorrect. Channel-level quantization computes one scale factor for each whole feature vector.',
    'Incorrect. The chapter defines tensor, channel, and block levels. A per-layer scale is coarser than any of the three.',
    'Incorrect. Tensor-level quantization computes one scale factor for the entire tensor.',
  ]}
/>

<MultipleChoice
  id="kc_formats_2"
  question="A team serves a quality-sensitive customer support model in a datacenter. Which format should the team try first?"
  options={['1.58-bit dynamic GGUF', 'FP32', 'INT4', 'MXFP8']}
  correct={3}
  optionFeedback={[
    'Incorrect. Dynamic integer quantization suits local inference on consumer hardware, not quality-sensitive production serving.',
    'Incorrect. FP32 is higher precision than the native BF16 or FP16 weights, so it would slow inference down.',
    'Incorrect. Integer formats lack the dynamic range that quality-sensitive production workloads require.',
    'Correct. 8-bit floating-point formats balance performance and quality, and microscaling adds finer granularity.',
  ]}
/>
