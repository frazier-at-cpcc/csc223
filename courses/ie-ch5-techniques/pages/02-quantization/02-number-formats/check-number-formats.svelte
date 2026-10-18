<script module>
  export const pageConfig = { title: 'Knowledge Check: Number Formats' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Number Formats</h1>
<p>These questions are ungraded. All three practice objective 2: selecting a quantization format by comparing its properties.</p>

<Matching
  id="kc_formats_1"
  question="Match each format to its defining property."
  pairs={[
    { left: 'FP8', right: '8-bit floating point with tensor or channel scales, first supported by Hopper' },
    { left: 'MXFP8', right: '8-bit floating point with a shared power-of-two scale for each block of 32 values' },
    { left: 'NVFP4', right: '4-bit floating point with an FP8 scale for each block of 16 values plus a tensor scale' },
    { left: 'INT8', right: '8-bit integer with evenly spaced values and a narrower dynamic range' },
  ]}
  correctFeedback="Correct. The type, the block size, and the hardware generation separate these four formats."
  incorrectFeedback="FP8 uses coarse scales and runs on Hopper. MXFP8 shares one scale across 32 values. NVFP4 uses blocks of 16 and a second, tensor-wide scale. INT8 spaces its 256 values evenly, so its dynamic range is narrower than FP8's."
/>

<MultipleChoice
  id="kc_formats_2"
  question="A format divides each feature vector into groups of 32 values and computes a scale factor for each group. At which level of granularity does this format quantize?"
  options={['Block level', 'Channel level', 'Layer level', 'Tensor level']}
  correct={0}
  optionFeedback={[
    'Correct. A scale factor for each group of values within a feature vector is block-level quantization, as in MXFP8 and MXFP4.',
    'Incorrect. Channel-level quantization computes one scale factor for each whole feature vector.',
    'Incorrect. This chapter defines tensor, channel, and block levels. A per-layer scale is coarser than any of the three.',
    'Incorrect. Tensor-level quantization computes one scale factor for the entire tensor.',
  ]}
/>

<MultipleChoice
  id="kc_formats_3"
  question="A team serves a quality-sensitive customer support model on B200 GPUs and wants to quantize both the weights and the KV cache. Which format should the team try first?"
  options={['1.58-bit dynamic GGUF', 'FP32', 'INT4 weights only', 'MXFP8']}
  correct={3}
  optionFeedback={[
    'Incorrect. Layer-by-layer integer quantization suits local inference on consumer hardware, not quality-sensitive datacenter serving.',
    'Incorrect. FP32 is higher precision than the native BF16 or FP16 weights, so it would slow inference down.',
    'Incorrect. A weights-only scheme leaves the KV cache unquantized, and the team wants to quantize both.',
    'Correct. B200 is a Blackwell GPU, so MXFP8 runs at full speed. Its 8-bit floating-point values and small blocks balance speed and quality for weights and the KV cache.',
  ]}
/>
