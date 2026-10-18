<script module>
  export const pageConfig = { title: 'Knowledge Check: Cold Starts' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Cold Starts</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 3: recommend cold start techniques</p>
<Matching
  id="kc_cs_stages"
  question="Match each cold start stage to the technique that shortens it."
  pairs={[
    { left: 'GPU procurement', right: 'A warm node pool, or a contract term for node start time' },
    { left: 'Image loading', right: 'An image that includes only necessary dependencies' },
    { left: 'Model loading', right: 'A weight cache in the same datacenter as the GPUs' },
    { left: 'Engine startup', right: 'A cached, prebuilt engine for the same GPU and CUDA version' },
  ]}
  correctFeedback="Correct. Each stage has its own lever: procurement depends on the provider or a warm pool, image loading on image size, model loading on weight source bandwidth, and engine startup on caching the compiled engine."
  incorrectFeedback="Ask what each stage waits for. Procurement waits for a machine, image loading for the image bytes, model loading for the weight bytes, and engine startup for compilation. Pick the technique that shrinks that wait."
/>

<p class="ie-objective">Practices objective 3: recommend cold start techniques</p>
<NumericQuestion
  id="kc_cs_load"
  question="A model's FP8 weights total 405 GB. A cache in the same datacenter delivers 4.5 GB/s to a new instance. How many seconds does model loading take?"
  answer={90}
  tolerance={1}
  unit="seconds"
  correctFeedback="Correct. 405 GB ÷ 4.5 GB/s = 90 seconds. The same weights in FP16 would be 810 GB and take twice as long."
  incorrectFeedback="Load time is size divided by bandwidth: 405 ÷ 4.5 = 90 seconds."
/>

<p class="ie-objective">Practices objective 3: recommend cold start techniques</p>
<MultipleChoice
  id="kc_cs_overnight"
  question="A team keeps 6 replicas running all night for traffic that needs only 2, because a new replica takes 15 minutes to start and morning traffic arrives quickly. Profiling shows 12 of the 15 minutes go to downloading weights from object storage in another region. Which change lets the team lower min replicas safely?"
  options={[
    'Bake the weights into the container image.',
    'Cache the weights in the GPUs’ own datacenter.',
    'Raise the concurrency target above the batch size.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. The weights would still cross the same network inside a much larger image, so image loading would absorb the time that model loading loses.',
    'Correct. A nearby cache raises the bandwidth of the slowest stage. With a cold start of a few minutes, the autoscaler can add replicas as morning traffic rises, so fewer replicas need to stay warm overnight.',
    'Incorrect. A target above the batch size makes requests queue inside replicas. It hides demand from the autoscaler instead of making replicas start faster.',
  ]}
/>
