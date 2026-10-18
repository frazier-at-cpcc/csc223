<script module>
  export const pageConfig = { title: 'Knowledge Check: Deploying Disaggregation' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Deploying Disaggregation</h1>
<p>These questions are ungraded.</p>

<MultipleChoice
  id="kc_deploy_1"
  question="A 4P4D deployment shows a prefill queue that keeps growing while decode engines sit partly idle. Which change addresses the bottleneck?"
  options={[
    'Disable conditional disaggregation',
    'Reconfigure to 5P3D',
    'Reconfigure to 3P5D',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Disabling the conditional check would send even more requests to the saturated prefill engines.',
    'Correct. Shifting one engine from decode to prefill gives the queued prefill work more capacity.',
    'Incorrect. Adding decode engines and removing a prefill engine makes the prefill queue worse.',
  ]}
/>

<MultipleChoice
  id="kc_deploy_2"
  question="Under heavy load, decode engines in a disaggregated deployment run out of KV cache memory. Which remedy fits this bottleneck?"
  options={[
    'Lower the local prefill threshold on the decode engines',
    'Quantize the KV cache and offload it to other storage tiers',
    'Increase the number of prefill engines',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. The local prefill threshold controls the prefill queue, not decode memory.',
    'Correct. Quantization shrinks each cache entry, and offloading moves less-used blocks out of VRAM.',
    'Incorrect. More prefill engines add prefill capacity, which does not relieve memory on the decode engines.',
  ]}
/>
