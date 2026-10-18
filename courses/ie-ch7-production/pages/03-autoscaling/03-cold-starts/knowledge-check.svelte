<script module>
  export const pageConfig = { title: 'Knowledge Check: Cold Starts' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Cold Starts</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_cs_1"
  question="New replicas of a 400-billion-parameter model spend most of their cold start downloading weights from a third-party model hub. Which change most directly shortens that stage?"
  options={[
    'Bake the weights into the container image.',
    'Cache the weights in the same datacenter as the GPU instances.',
    'Switch the inference engine to one with a compilation step.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Weights for a model this large dwarf the image. Baking them in makes the image huge without adding bandwidth.',
    'Correct. A cache physically near the GPU instance provides the gigabytes per second of bandwidth that large models need.',
    'Incorrect. A compilation step adds engine startup time and does nothing for weight loading.',
  ]}
/>

<MultipleChoice
  id="kc_cs_2"
  question="Why does slow cold start performance lead to over-provisioning?"
  options={[
    'Slow cold starts force the provider to reserve extra GPUs for each cluster.',
    'Slow replica startup makes the inference engine run smaller batches.',
    'Teams cannot scale down with confidence when new replicas are slow to come online.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Provider reservations are a procurement decision, not a consequence of cold start speed.',
    'Incorrect. Batch size is an engine setting. Startup speed does not change it.',
    'Correct. If the system cannot add replicas quickly when traffic returns, it keeps extra replicas running instead.',
  ]}
/>
