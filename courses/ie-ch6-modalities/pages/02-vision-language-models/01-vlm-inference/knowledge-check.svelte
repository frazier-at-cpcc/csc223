<script module>
  export const pageConfig = { title: 'Knowledge Check: VLM Inference' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: VLM Inference</h1>

<p>This check is ungraded. Use it to confirm your understanding before you continue.</p>

<MultipleChoice
  id="kc_vlm_1"
  question="A VLM deployment shows a long time to first token whenever users attach several high-resolution images. Decode speed is acceptable. Which change most directly targets this symptom?"
  options={[
    'Add speculative decoding with an EAGLE draft model',
    'Downsample the images to a lower resolution',
    'Increase the maximum output length',
    'Replace the vision encoder with a larger encoder',
  ]}
  correct={1}
  optionFeedback={[
    'Speculation speeds up decode, but the symptom is a slow prefill caused by many image tokens.',
    'Correct. Lower resolution cuts the visual tokens by about four times, which shortens prefill and the time to first token.',
    'Output length affects decode time, not the prefill that produces the first token.',
    'A larger encoder adds work in front of prefill and does not reduce the number of image tokens.',
  ]}
/>
