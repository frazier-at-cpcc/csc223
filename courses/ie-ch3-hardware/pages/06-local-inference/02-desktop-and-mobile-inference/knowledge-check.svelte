<script module>
  export const pageConfig = { title: 'Knowledge Check: Desktop and Mobile Inference' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Desktop and Mobile Inference</h1>
<p>These practice items are ungraded. Each one gives feedback that explains the answer.</p>

<p class="ie-obj">Objective 9: Recommend a deployment target</p>
<MultipleChoice
  id="kc_desktop_200gb"
  question="A researcher wants to run a 200 GB quantized model locally and accepts slower token generation. Which desktop fits better?"
  options={[
    'An Apple M3 Ultra with 512 GB of unified memory',
    'An NVIDIA RTX 5090 with 32 GB of VRAM',
    'Two NVIDIA RTX 5090 cards with 64 GB of VRAM in total',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Unified memory gives the M3 Ultra enough capacity to load the model, at lower bandwidth than the RTX 5090.',
    'Incorrect. The RTX 5090 is faster, but 32 GB of VRAM cannot hold a 200 GB model.',
    'Incorrect. Two cards add up to 64 GB, which is still far short of 200 GB. Capacity, not speed, decides this case.',
  ]}
/>

<p class="ie-obj">Objective 5: Select the specification that relieves a bottleneck</p>
<NumericQuestion
  id="kc_desktop_ceiling"
  question="A 20 GB quantized model runs on an RTX 5090 with 1,792 GB/s of memory bandwidth. At a batch of 1, each decode step reads all the weights once. What is the most decode steps per second the GPU can sustain?"
  answer={89.6}
  tolerance={1}
  unit="steps per second"
  correctFeedback="Correct. Bandwidth divided by the bytes read per step sets the ceiling: 1,792 GB/s ÷ 20 GB ≈ 90 steps per second. The M3 Ultra, at 819 GB/s, would reach about 41."
  incorrectFeedback="At a batch of 1, decode is memory-bound, so the ceiling is bandwidth ÷ weight memory: 1,792 GB/s ÷ 20 GB ≈ 89.6 steps per second."
/>

<p class="ie-obj">Objective 9: Recommend a deployment target</p>
<MultipleChoice
  id="kc_phone_feature"
  question="Which feature is the best candidate to run on-device on a modern phone?"
  options={[
    'A 70-billion-parameter chat assistant',
    'A real-time speech transcription model',
    'A video generation model',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Even high-end phones struggle with models above a few billion parameters, and 70 billion is far beyond that.',
    'Correct. Transcription is latency-sensitive, and some transcription models are small enough to run in real time on modern phones.',
    'Incorrect. Video generation is compute-bound and demanding, so it belongs on datacenter GPUs.',
  ]}
/>
