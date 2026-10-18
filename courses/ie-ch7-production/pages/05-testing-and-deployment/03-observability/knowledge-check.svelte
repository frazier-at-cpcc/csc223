<script module>
  export const pageConfig = { title: 'Knowledge Check: Observability' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Observability</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_ob_1"
  question="Users of an asynchronous batch service report that jobs take hours longer than usual. GPU utilization is at 100 percent on every replica. Which metric shows how much work is still waiting?"
  options={['Queue depth', 'Replica count', 'Response codes']}
  correct={0}
  optionFeedback={[
    'Correct. Queue depth counts requests that are enqueued and waiting to be processed.',
    'Incorrect. Replica count shows how many instances serve traffic, not how much work is waiting.',
    'Incorrect. Response codes count successes and errors for completed requests, not pending ones.',
  ]}
/>

<MultipleChoice
  id="kc_ob_2"
  question="An engineer needs to find out who changed the engine configuration of an inference service shortly before an outage. Which record answers this?"
  options={['Audit logs', 'Latency percentiles', 'Server logs']}
  correct={0}
  optionFeedback={[
    'Correct. Audit logs record changes made to the inference service.',
    'Incorrect. Latency percentiles show how fast requests completed, not who changed the service.',
    'Incorrect. Server logs record request handling. Configuration changes belong in audit logs.',
  ]}
/>
