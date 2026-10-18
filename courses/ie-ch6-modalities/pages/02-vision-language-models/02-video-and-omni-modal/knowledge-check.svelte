<script module>
  export const pageConfig = { title: 'Knowledge Check: Video and Omni-Modal Models' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Video and Omni-Modal Models</h1>

<p>
  This check is ungraded. The first item practices objective 2, estimating visual tokens. The other two
  practice objective 3, selecting VLM optimizations.
</p>

<NumericQuestion
  id="kc_video_tokens"
  question="A team downsamples a 6-second security clip to 4 frames per second at low resolution, about 250 tokens per frame. How many visual tokens does the clip produce?"
  answer={6000}
  unit="tokens"
  correctFeedback="6 seconds × 4 frames per second = 24 frames, and 24 × 250 = 6,000 visual tokens."
  incorrectFeedback="Count the frames first, then multiply by tokens per frame: 6 × 4 = 24 frames, and 24 × 250 = 6,000 visual tokens."
/>

<MultipleChoice
  id="kc_video_motion"
  question="A sports app asks a VLM whether a player's foot crossed a line during a 10-second clip. At full frame rate and resolution, the clip exceeds the model's context window. Which approach keeps the answer about motion accurate?"
  options={[
    'Keep only the first and last frames at full resolution',
    'Reduce the resolution and frame rate, then send the whole clip in one request',
    'Send each frame as its own request and combine the answers',
  ]}
  correct={1}
  optionFeedback={[
    'Two frames cannot show the moment the foot crossed the line. The model needs the frames in between to see the motion.',
    'Correct. Downsampling shrinks the sequence so it fits, and one request lets the model see motion across frames, which is what the question asks about.',
    'Separate requests show the model static images. The motion between frames disappears, so the model cannot judge when the foot crossed.',
  ]}
/>

<MultipleChoice
  id="kc_omni_ocr"
  question="A document-processing service must read printed text from scanned pages as accurately and cheaply as possible before a VLM summarizes them. Which component should handle the text reading?"
  options={[
    'Run the VLM at a higher image resolution',
    'Send the pages to a larger omni-modal model',
    'Use a dedicated OCR model as a preprocessing stage',
  ]}
  correct={2}
  optionFeedback={[
    'Higher resolution adds visual tokens and cost, and VLM text recognition still lags behind dedicated OCR models.',
    'Built-in text recognition in multimodal models lags behind dedicated OCR models, and a larger model costs more to run.',
    'Correct. Dedicated OCR models outperform the text recognition built into VLMs and are a fraction of the size. As its own stage, OCR can also scale independently.',
  ]}
/>
