<script module>
  export const pageConfig = { title: 'Knowledge Check: Autoscaling Fundamentals' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Autoscaling Fundamentals</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_af_1"
  question="A deployment receives a handful of requests that each carry hundreds of thousands of uncached input tokens. Request count stays low, yet GPUs are saturated. Which conclusion follows?"
  options={[
    'GPU utilization and traffic can diverge, so the autoscaler should combine both signals.',
    'Traffic is a lagging indicator, so the autoscaler should rely on utilization alone.',
    'Utilization is unreliable for LLMs, so the autoscaler should rely on traffic alone.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Long uncached prompts raise utilization without raising request count. Combining both signals keeps capacity matched to demand.',
    'Incorrect. Utilization is the lagging signal. Traffic supports proactive decisions.',
    'Incorrect. Traffic alone would miss this load entirely, because request count stays low while the GPUs are saturated.',
  ]}
/>

<MultipleChoice
  id="kc_af_2"
  question="In a Kubernetes cluster, which component makes routing and scaling decisions?"
  options={['Container layer', 'Control plane', 'Worker plane']}
  correct={1}
  optionFeedback={[
    'Incorrect. The container layer is the writable filesystem layer of a running container.',
    'Correct. The control plane makes routing and scaling decisions for the cluster.',
    'Incorrect. The worker plane runs the containerized applications that the control plane schedules.',
  ]}
/>
