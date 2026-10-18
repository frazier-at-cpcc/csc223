<script module>
  export const pageConfig = { title: 'Knowledge Check: Multi-Cloud Inference' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Multi-Cloud Inference</h1>

<p>This check is ungraded. Choose an answer to see feedback.</p>

<MultipleChoice
  id="kc_multicloud_1"
  question="A cloud provider suffers an outage in one region. In a multi-cloud system with a global control plane, what happens to traffic for models deployed there?"
  options={[
    'It is held in a queue until the region recovers.',
    'It is served by workload planes in other regions and clouds.',
    'It is served by a smaller quantized copy in the same region.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Holding traffic until recovery is the downtime that multi-cloud design protects against.',
    'Correct. Multi-cloud infrastructure protects against downtime in any individual region or cloud provider.',
    'Incorrect. A copy in the failed region is also down. Quantization is a runtime technique and does not address outages.',
  ]}
/>

<MultipleChoice
  id="kc_multicloud_2"
  question="A chat application has users on three continents. Which multi-cloud practice improves end-to-end latency for those users?"
  options={[
    'Running inference close to where requests originate',
    'Running inference in the region with the cheapest GPUs',
    'Running inference in the single largest cluster',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Running inference near end users shortens network travel and improves end-to-end latency.',
    'Incorrect. The cheapest region may be far from users. Network travel then adds latency to every request.',
    'Incorrect. One cluster sits on one continent. Users on the other two continents still wait for long network round trips.',
  ]}
/>
