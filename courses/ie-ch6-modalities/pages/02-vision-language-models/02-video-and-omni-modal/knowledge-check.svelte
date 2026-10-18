<script module>
  export const pageConfig = { title: 'Knowledge Check: Video and Omni-Modal Models' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Video and Omni-Modal Models</h1>

<p>This check is ungraded. Use it to confirm your understanding before you continue.</p>

<MultipleChoice
  id="kc_video_1"
  question="A two-second clip at 24 frames per second is sent to a VLM at full resolution, at about 1,000 tokens per frame. About how many input tokens does the video produce before downsampling?"
  options={['2,000', '24,000', '48,000', '480,000']}
  correct={2}
  optionFeedback={[
    'This counts one frame per second. The clip has 2 × 24 = 48 frames.',
    'This counts one second of frames. The clip lasts two seconds.',
    'Correct. 2 seconds × 24 frames per second = 48 frames, and 48 × 1,000 = 48,000 tokens.',
    'This is ten times too large. Recheck the multiplication: 48 frames × 1,000 tokens.',
  ]}
/>

<MultipleChoice
  id="kc_omni_1"
  question="A document-processing service must read printed text from scanned pages as accurately and cheaply as possible. Based on the chapter, which component should handle the text reading?"
  options={[
    'A dedicated OCR model in a preprocessing stage',
    'A larger omni-modal model with built-in text recognition',
    'The VLM itself at a higher image resolution',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Dedicated OCR models outperform the text recognition built into VLMs and are a fraction of the size.',
    'Built-in text recognition in multimodal models lags behind dedicated OCR models, and a larger model costs more to run.',
    'Higher resolution adds visual tokens and cost, and VLM text recognition still lags behind dedicated OCR.',
  ]}
/>
