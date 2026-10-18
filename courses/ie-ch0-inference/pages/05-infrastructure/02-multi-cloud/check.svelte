<script module>
  export const pageConfig = { title: 'Knowledge Check: Multi-Cloud Inference' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Multi-Cloud Inference</h1>

<p>
  This check is ungraded. Each item gives feedback when you answer it. Both items practice Objective 7: select the
  infrastructure response to a described scale, reliability, or latency problem.
</p>

<h2>Control Plane or Workload Plane</h2>

<Sorting
  id="kc_mc_sort"
  question="Sort each responsibility into the component that carries it out."
  items={[
    'Decides which cluster runs each model',
    'Moves deployments away from a failed region',
    'Allocates GPUs across every cloud',
    'Runs the model replicas',
    'Processes inference requests',
    'Holds the GPUs that compute each forward pass',
  ]}
  targets={['Control plane', 'Workload plane']}
  correct={[0, 0, 0, 1, 1, 1]}
  correctFeedback="Correct. The control plane decides and allocates. The workload planes run models and serve requests."
  incorrectFeedback="The control plane is the global orchestrator: it places models and allocates resources. Each workload plane is a cluster that runs replicas and processes requests."
/>

<h2>Serving Users on Three Continents</h2>

<MultipleChoice
  id="kc_mc_latency"
  question="A chat application has users on three continents and runs all inference in one region. Which multi-cloud practice improves end-to-end latency for those users?"
  options={[
    'Run inference close to where requests originate',
    'Run inference in the region with the cheapest GPUs',
    'Run inference in the single largest cluster',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Workload planes near users shorten network travel, which improves end-to-end latency.',
    'Incorrect. The cheapest region may be far from users. Network travel then adds latency to every request.',
    'Incorrect. One cluster sits on one continent. Users on the other two continents still wait for long network round trips.',
  ]}
/>
