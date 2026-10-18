<script module>
  export const pageConfig = { title: 'Knowledge Check: Multi-Cloud Architecture' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Multi-Cloud Architecture</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_ma_1"
  question="In a multi-cloud inference architecture, which component handles live inference traffic inside a single cluster?"
  options={['Global control plane', 'Global load balancer', 'Workload plane']}
  correct={2}
  optionFeedback={[
    'Incorrect. The control plane handles model deployment and global scaling decisions, not direct inference traffic.',
    'Incorrect. A global load balancer distributes requests among clusters. It does not run inference.',
    'Correct. Each workload plane handles inference traffic and in-cluster scaling, and reports utilization and demand.',
  ]}
/>

<MultipleChoice
  id="kc_ma_2"
  question="A company runs separate inference silos on two clouds. One cloud has spare GPUs while the other is overloaded. What limitation of siloed multi-cloud does this expose?"
  options={[
    'Compute cannot flow between clouds, so the spare GPUs cannot absorb the overload.',
    'Each silo needs its own model weights, so the spare GPUs cannot load the model.',
    'Siloed clouds cannot use autoscaling, so neither silo can add replicas.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Siloed setups cannot use inter-cloud compute fluidly. True multi-cloud treats the pools as interchangeable.',
    'Incorrect. Loading weights is possible on any cloud. The problem is the lack of a scheduler that moves work between silos.',
    'Incorrect. Each silo can still autoscale within its own cluster. The limitation is between clouds.',
  ]}
/>
