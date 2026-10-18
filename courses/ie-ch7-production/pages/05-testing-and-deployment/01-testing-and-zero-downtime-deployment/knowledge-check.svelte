<script module>
  export const pageConfig = { title: 'Knowledge Check: Testing and Zero-Downtime Deployment' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Testing and Zero-Downtime Deployment</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_td_1"
  question="A team wants to measure a candidate deployment against real production requests without exposing any user to its responses. Which testing strategy fits?"
  options={['Load testing', 'Manual testing', 'Shadow traffic']}
  correct={2}
  optionFeedback={[
    'Incorrect. Load testing sends a large volume of generated traffic to probe scaling limits, not copies of real requests.',
    'Incorrect. Manual testing sends synthetic traffic from scripts, which may not reflect real-world requests.',
    'Correct. Shadow traffic copies live requests to the test deployment, so it measures real-world conditions without serving those responses to users.',
  ]}
/>

<MultipleChoice
  id="kc_td_2"
  question="During a canary rollout, the new deployment begins receiving 10 percent of traffic and users immediately see a latency spike. Monitoring shows no errors in the new code. What is the most likely cause?"
  options={[
    'The new deployment sat at its minimum replica count and queued requests while autoscaling caught up.',
    'The old deployment scaled down as its share of traffic fell below 100 percent.',
    'The canary process requires a full second environment, which doubled GPU demand.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. An idle autoscaled deployment defaults to its minimum replicas. Shifting traffic before enough replicas are active causes queueing.',
    'Incorrect. The old deployment scales down because its traffic falls, so its remaining replicas still match their load.',
    'Incorrect. A full second environment describes blue-green deployment. Canary rollouts avoid that requirement.',
  ]}
/>
