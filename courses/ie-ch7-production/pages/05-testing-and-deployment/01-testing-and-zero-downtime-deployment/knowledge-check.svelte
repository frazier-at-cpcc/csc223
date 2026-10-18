<script module>
  export const pageConfig = { title: 'Knowledge Check: Testing and Zero-Downtime Deployment' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Testing and Zero-Downtime Deployment</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 7: choose a testing and release strategy</p>
<Matching
  id="kc_td_purpose"
  question="Match each strategy to the question it answers before or during a release."
  pairs={[
    { left: 'Manual testing', right: 'Does the service return sensible output for a few scripted requests?' },
    { left: 'Load testing', right: 'Does the system keep its latency as traffic grows to its limit?' },
    { left: 'Shadow traffic', right: 'How does the candidate perform on real requests that no user sees?' },
    { left: 'Canary deployment', right: 'Does the update stay healthy while a small share of users relies on it?' },
  ]}
  correctFeedback="Correct. Manual tests check basic behavior, load tests check scaling, shadow traffic checks real-world performance without user exposure, and a canary checks the update with real users at small scale."
  incorrectFeedback="Separate who sees the output and how much traffic flows. Manual tests use a few synthetic requests. Load tests push volume. Shadow traffic copies real requests and discards the responses. A canary serves real users, starting with a small share."
/>

<p class="ie-objective">Practices objective 7: choose a testing and release strategy</p>
<MultipleChoice
  id="kc_td_spike"
  question="During a canary rollout, the new deployment moves from 2 percent to 25 percent of traffic, and users immediately see a latency spike. Monitoring shows no errors in the new code. What is the most likely cause?"
  options={[
    'The canary process doubled GPU demand by requiring a second full environment.',
    'The new deployment held only its minimum replicas and queued the extra traffic.',
    'The old deployment scaled down as its share of traffic fell below 100 percent.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. A full second environment describes blue-green deployment. A canary avoids that requirement.',
    'Correct. At 2 percent of traffic the new deployment sat near its minimum replica count. The jump to 25 percent arrived before autoscaling added replicas, so requests queued.',
    'Incorrect. The old deployment scales down because its traffic falls, so its remaining replicas still match their load.',
  ]}
/>
