<script module>
  export const pageConfig = { title: 'Knowledge Check: Chapter Overview' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Chapter Overview</h1>
<p>These practice items are ungraded. Each one gives feedback that explains the answer.</p>

<p class="ie-obj">Objective 9: Recommend a deployment target</p>
<Matching
  id="kc_modes"
  question="Match each deployment term to its description."
  pairs={[
    { left: 'Air-gapped', right: 'GPUs on-premise with no external network path' },
    { left: 'Hyperscaler', right: 'A general-purpose cloud provider that also rents GPUs' },
    { left: 'Neocloud', right: 'A cloud provider that specializes in GPU capacity' },
    { left: 'On-premise', right: 'GPUs that you buy and run in a datacenter you control' },
  ]}
  correctFeedback="Correct. Cloud capacity comes from hyperscalers or neoclouds. On-premise and air-gapped deployments both use GPUs you own, and only the air-gapped one cuts every external network path."
  incorrectFeedback="Review the pairs. Hyperscalers such as AWS and GCP sell many services, and neoclouds such as CoreWeave focus on GPUs. On-premise means you own and control the datacenter, and air-gapped adds the absence of any external network."
/>

<p class="ie-obj">Objective 9: Recommend a deployment target</p>
<MultipleChoice
  id="kc_mode_scenario"
  question="A hospital network must keep patient records inside facilities that it owns. Its engineers operate the inference service remotely from offices across the region. Which deployment mode fits these requirements?"
  options={['Air-gapped', 'Cloud, rented from a neocloud', 'On-premise']}
  correct={2}
  optionFeedback={[
    'Incorrect. An air-gapped deployment has no external network path, so engineers in other offices could not operate it remotely.',
    'Incorrect. A neocloud runs GPUs in its own datacenter, so patient records would leave facilities the hospital owns.',
    'Correct. On-premise GPUs keep the data in a datacenter the hospital controls, and a network path still lets engineers operate the service remotely.',
  ]}
/>

<p class="ie-obj">Objective 9: Recommend a deployment target</p>
<MultipleChoice
  id="kc_segment"
  question="A startup will serve a large language model to thousands of users and needs to split the model across eight GPUs that exchange data at high bandwidth. Which GPU segment fits this requirement?"
  options={['Datacenter GPUs', 'Personal computing GPUs, two per desktop', 'Workstation GPUs with the most VRAM available']}
  correct={0}
  optionFeedback={[
    'Correct. Datacenter GPUs include high-bandwidth GPU-to-GPU links and ship in standardized racked configurations built for inference at scale.',
    'Incorrect. Personal computing GPUs such as the GeForce RTX 5090 are individual desktop cards. Two cards per desktop still lack the links that eight-GPU serving needs.',
    'Incorrect. Workstation GPUs offer large memory for professional desktop work, but they are individual cards without the racked GPU-to-GPU links that serving at scale requires.',
  ]}
/>
