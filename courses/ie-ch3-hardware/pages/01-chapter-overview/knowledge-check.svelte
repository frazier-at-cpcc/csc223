<script module>
  export const pageConfig = { title: 'Knowledge Check: Chapter Overview' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Chapter Overview</h1>
<p>These practice questions are ungraded. Each option explains why it is right or wrong.</p>

<MultipleChoice
  id="kc1"
  question="A startup plans to serve a large language model to thousands of users and needs GPUs that can share one model across eight cards at high bandwidth. Which GPU segment fits this requirement?"
  options={['Datacenter GPUs', 'Personal computing GPUs', 'Workstation GPUs']}
  correct={0}
  optionFeedback={[
    'Correct. Datacenter GPUs include high-bandwidth GPU-to-GPU interconnects and ship in standardized racked configurations built for inference at scale.',
    'Incorrect. Personal computing GPUs, such as the GeForce RTX 5090, are individual desktop cards for everyday use. They lack datacenter interconnects.',
    'Incorrect. Workstation GPUs serve professional desktop workflows. They are individual cards and lack the racked interconnects that serving at scale requires.',
  ]}
/>

<MultipleChoice
  id="kc2"
  question="A defense agency installs GPUs in its own facility with no network path to the outside world. Operators must be physically present to run inference. Which deployment mode is this?"
  options={['Air-gapped', 'Cloud', 'On-premise with remote access']}
  correct={0}
  optionFeedback={[
    'Correct. An air-gapped deployment is installed on-premise and requires physical access to the GPUs to run inference.',
    'Incorrect. Cloud deployments rent GPUs in another company\'s datacenter and are reached over the network.',
    'Incorrect. A standard on-premise deployment sits in a datacenter you control, but it can be reached over a network. The absence of any external path makes this deployment air-gapped.',
  ]}
/>
