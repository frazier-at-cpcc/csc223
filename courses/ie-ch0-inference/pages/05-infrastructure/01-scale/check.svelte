<script module>
  export const pageConfig = { title: 'Knowledge Check: Levels of Scale' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Levels of Scale</h1>

<p>
  This check is ungraded. Each item gives feedback when you answer it. Both items practice Objective 7: select the
  infrastructure response to a described scale, reliability, or latency problem.
</p>

<h2>Matching Problems to Responses</h2>

<Matching
  id="kc_scale_match"
  question="Match each infrastructure problem to the response it calls for."
  pairs={[
    { left: 'Traffic triples every afternoon in one region', right: 'Add and remove replicas automatically' },
    { left: 'No single region can supply enough GPUs', right: 'Spread workloads across regions and clouds' },
    { left: 'One cluster queues while another cluster sits idle', right: 'Treat every cluster as one pool of compute' },
  ]}
  correctFeedback="Correct. The three problems are the three levels of scale: autoscaling, capacity, and a unified pool."
  incorrectFeedback="Daily swings in one region are an autoscaling problem. Too few GPUs is a capacity problem. Idle capacity beside a queue is a silo problem that a unified pool solves."
/>

<h2>Choosing a Response</h2>

<MultipleChoice
  id="kc_scale_cold"
  question="A startup serves one model on 16 GPUs in one region. Every morning, traffic rises sharply, and requests queue for about five minutes while new copies of the model load onto GPUs. Which improvement addresses this problem?"
  options={[
    'Move the model into a second cloud provider',
    'Place every cluster under a global control plane',
    'Start new replicas sooner and shorten their cold start',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. A second cloud addresses a shortage of GPUs. This startup has enough GPUs. Its replicas start too slowly.',
    'Incorrect. A global control plane removes silos across many clusters. This startup runs one cluster.',
    'Correct. At this scale the problem is autoscaling timing and speed: add replicas earlier and make them serve sooner.',
  ]}
/>
