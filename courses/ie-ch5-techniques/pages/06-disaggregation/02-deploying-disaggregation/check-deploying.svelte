<script module>
  export const pageConfig = { title: 'Knowledge Check: Deploying Disaggregation' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Deploying Disaggregation</h1>
<p>These questions are ungraded. All three practice objective 9: evaluating disaggregated serving and its bottlenecks.</p>

<Sorting
  id="kc_deploy_1"
  question="Sort each remedy by the disaggregation bottleneck it relieves."
  items={[
    'Shift one engine from decode to prefill',
    'Raise the input length that decode engines may prefill locally',
    'Store the KV cache in FP8',
    'Offload cold KV cache blocks to host memory',
  ]}
  targets={['Prefill queue grows too large', 'Decode engines run out of KV cache memory']}
  correct={[0, 0, 1, 1]}
  correctFeedback="Correct. More prefill capacity or more local prefill drains the queue. A smaller or partly offloaded KV cache frees decode memory."
  incorrectFeedback="The prefill queue shrinks when more work can be prefilled, either by more prefill engines or by letting decode engines handle more inputs locally. Decode memory recovers when each cache entry is smaller or when cold blocks move out of VRAM."
/>

<MultipleChoice
  id="kc_deploy_2"
  question="A 3P5D deployment shows a prefill queue that keeps growing while the decode engines run at 40 percent utilization. Which change addresses the bottleneck?"
  options={[
    'Reconfigure to 2P6D',
    'Reconfigure to 4P4D',
    'Quantize the KV cache on the decode engines',
    'Turn off conditional disaggregation',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Removing a prefill engine makes the prefill queue grow faster.',
    'Correct. Decode has spare capacity, so shifting one engine to prefill drains the queue without starving decode.',
    'Incorrect. KV cache quantization relieves decode memory, which is not the bottleneck here.',
    'Incorrect. Without the conditional check, even short and cached inputs would join the prefill queue.',
  ]}
/>

<MultipleChoice
  id="kc_deploy_3"
  question="A team serves a 70-billion-parameter model at 20 million tokens per day of long-document summaries. Should the team adopt disaggregated serving?"
  options={[
    'No, because the model size and the volume both fall short',
    'No, because summarization traffic is mostly decode-heavy',
    'Yes, because long documents make the traffic prefill-heavy',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The traffic is prefill-heavy, but a 70-billion-parameter model and 20 million tokens per day both sit below the thresholds, so extra replicas serve better.',
    'Incorrect. Long documents with short summaries are prefill-heavy, so this condition actually holds.',
    'Incorrect. Prefill-heavy traffic is only one of three conditions. The model size and the volume both fail.',
  ]}
/>
