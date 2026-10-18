<script module>
  export const pageConfig = { title: 'Knowledge Check: Desktop and Mobile Inference' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Desktop and Mobile Inference</h1>
<p>These practice questions are ungraded. Each option explains why it is right or wrong.</p>

<MultipleChoice
  id="kc1"
  question="A researcher wants to run a 200 GB quantized model locally and accepts slower token generation. Which desktop fits better?"
  options={[
    'A Chromebook with an integrated GPU',
    'An Apple M3 Ultra with 512 GB of unified memory',
    'An NVIDIA RTX 5090 with 32 GB of VRAM',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Low-end computers such as Chromebooks cannot run meaningful local inference.',
    'Correct. Unified memory gives the M3 Ultra enough capacity to load the model, at lower bandwidth than the RTX 5090.',
    'Incorrect. The RTX 5090 is faster, but 32 GB of VRAM cannot hold a 200 GB model.',
  ]}
/>

<MultipleChoice
  id="kc2"
  question="Which feature is the best candidate to run on-device on a modern phone?"
  options={[
    'A 70-billion-parameter chat assistant',
    'A real-time speech transcription model',
    'A video generation model',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Even high-end phones struggle with models above one or two billion parameters.',
    'Correct. Transcription is latency-sensitive, and some transcription models are small enough to run in real time on modern phones.',
    'Incorrect. Video generation is compute-bound and demanding, so it belongs on datacenter GPUs.',
  ]}
/>
