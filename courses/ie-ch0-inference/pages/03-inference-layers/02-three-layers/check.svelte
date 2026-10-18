<script module>
  export const pageConfig = { title: 'Knowledge Check: The Three Layers' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: The Three Layers</h1>

<p>
  This check is ungraded. Each item gives feedback when you answer it. Both items practice Objective 4: classify an
  inference task by the layer of the inference stack that owns it.
</p>

<h2>Sorting Tasks by Layer</h2>

<Sorting
  id="kc_layers_sort"
  question="Sort each task into the layer of the inference stack that owns it."
  items={[
    'Swap in a faster attention kernel',
    'Store the KV cache in a lower precision',
    'Split one model across the eight GPUs of a single instance',
    'Add replicas in a second region',
    'Shift traffic away from a cloud with an outage',
    'Find spare GPUs in another cloud provider',
    'Design a command that deploys a model from one config file',
    'Decide which engine settings a deployment dashboard exposes',
  ]}
  targets={['Runtime', 'Infrastructure', 'Tooling']}
  correct={[0, 0, 0, 1, 1, 1, 2, 2]}
  correctFeedback="Correct. Work inside one instance is runtime, work across instances is infrastructure, and the interface engineers use is tooling."
  incorrectFeedback="Apply the instance boundary. Kernels, KV cache precision, and GPUs inside one instance are runtime. Regions, outages, and other clouds are infrastructure. Commands and dashboards that engineers use are tooling."
/>

<h2>Applying the Instance Boundary</h2>

<MultipleChoice
  id="kc_layers_edge"
  question="A model runs on four GPUs inside one instance. To handle more traffic, the team starts a second instance that runs another copy of the model. Which layer owns the second change?"
  options={['Infrastructure', 'Runtime', 'Tooling']}
  correct={0}
  optionFeedback={[
    'Correct. A second replica on a second instance crosses the instance boundary, which makes it infrastructure work.',
    'Incorrect. Splitting the model across the four GPUs of one instance is runtime work. Adding another instance is not.',
    'Incorrect. Tooling shapes how engineers reach the platform. Adding a replica on new hardware is infrastructure.',
  ]}
/>
