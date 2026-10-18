<script module>
  export const pageConfig = { title: 'Knowledge Check: Scale and Specialization' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Scale and Specialization</h1>

<p>Answer these practice questions. They do not count toward your score. Each item names the objective it practices.</p>

<p class="ie-obj">Objective 2: Evaluate whether a product should move to a dedicated deployment.</p>

<Sorting
  id="kc_scale_1"
  question="Sort each product situation by the option it favors."
  items={[
    'Traffic is low and arrives in unpredictable bursts',
    'The product runs a fine-tuned model that no endpoint offers',
    'The monthly token bill exceeds the full cost of GPUs that could serve it',
    'The team is still choosing between several models',
    'Each user turn chains three models hosted by three providers',
    'No one on the team has operated GPUs, and the API meets every target',
  ]}
  targets={['Favors shared inference', 'Favors a dedicated deployment']}
  correct={[0, 1, 1, 0, 1, 0]}
  correctFeedback="Correct. Scale, specialization, and orchestration favor dedicated deployments. Uncertainty, low volume, and a lack of need favor shared inference."
  incorrectFeedback="Not yet. A situation favors a dedicated deployment only when it shows scale, specialization, or orchestration. Low or uncertain demand, an unsettled model, or no unmet need favors shared inference."
/>

<p class="ie-obj">Objective 2: Evaluate whether a product should move to a dedicated deployment.</p>

<MultipleChoice
  id="kc_scale_2"
  question="A product runs speech recognition, a language model, and speech synthesis for every user turn, each from a different provider. Network hops between the three providers add delay to each turn. Which reason for a dedicated deployment does this situation match?"
  options={['Orchestration', 'Scale', 'Specialization']}
  correct={0}
  optionFeedback={[
    'Correct. Multi-model pipelines benefit from dedicated deployments that cut network latency and deployment complexity.',
    'Not quite. Scale concerns traffic volume and per-token cost. The problem here is the delay between models.',
    'Not quite. Specialization concerns custom models or strict latency and uptime targets. The problem here is coordinating several models.',
  ]}
/>
