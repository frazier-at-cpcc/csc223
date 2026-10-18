<script module>
  export const pageConfig = { title: 'Knowledge Check: Observability' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Observability</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 9: diagnose the source of a latency problem</p>
<MultipleChoice
  id="kc_ob_backlog"
  question="Users of an asynchronous document service report that results arrive hours later than usual. Every replica shows 100 percent GPU utilization. Which metric tells the team whether the delay will keep growing?"
  options={[
    'Queue depth over the last hour',
    'Replica count over the last hour',
    'Response codes over the last hour',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. If queue depth keeps climbing while the replicas are saturated, arrivals exceed throughput and the delay will grow. A falling depth means the backlog is draining.',
    'Incorrect. Replica count shows how much capacity exists, not whether that capacity keeps up with arrivals.',
    'Incorrect. Response codes count completed requests by outcome. They say nothing about the work still waiting.',
  ]}
/>

<p class="ie-objective">Practices objective 9: diagnose the source of a latency problem</p>
<MultipleChoice
  id="kc_ob_audit"
  question="Latency and error rates jump at 3:05 p.m., and the team suspects that someone changed the engine configuration shortly before. Which record answers who changed it?"
  options={['Latency percentiles', 'Server logs', 'Audit logs']}
  correct={2}
  optionFeedback={[
    'Incorrect. Latency percentiles show how fast requests completed, not who changed the service.',
    'Incorrect. Server logs record how the service handled requests. Changes to the service itself belong in audit logs.',
    'Correct. Audit logs record changes made to the inference service, with who made each change and when.',
  ]}
/>
