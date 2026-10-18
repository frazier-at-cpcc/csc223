<script module>
  export const pageConfig = { title: 'Knowledge Check: AI-Native Applications' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: AI-Native Applications</h1>

<p>Answer these practice questions. They do not count toward your score. Each item names the objective it practices.</p>

<p class="ie-obj">Objective 3: Classify a workload as online or offline.</p>

<Matching
  id="kc_apps_1"
  question="Match each product to the measurement its inference system should protect first."
  pairs={[
    { left: 'A live interpreter for doctor visits', right: 'End-to-end latency of each spoken turn' },
    { left: 'A nightly scan of forum posts for harassment', right: 'Throughput across the whole job' },
    { left: 'A support chatbot that streams its replies', right: 'Time to first token' },
    { left: 'Product suggestions on a busy shopping site', right: 'Consistent latency at high request volume' },
  ]}
  correctFeedback="Correct. Three of these products are online, so a user waits on each response. The nightly scan is offline, so throughput and cost lead."
  incorrectFeedback="Not yet. First ask whether a user waits on each response. If no one waits, throughput leads. If someone waits, ask which part of the wait the user notices most."
/>

<p class="ie-obj">Objective 3: Classify a workload as online or offline.</p>

<MultipleChoice
  id="kc_apps_2"
  question="In a sales prospecting agent, one click by the user starts a chain of 12 inference calls, each of which needs the result of the call before it. How does the latency of each call affect the user?"
  options={[
    'Each call adds to the total time the user waits for a result',
    'Only the slowest call matters, because the calls overlap in time',
    "The first call's time to first token sets the entire wait",
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The calls run in sequence, so per-call latency accumulates into the wait that the user experiences. The agent is an online workload.',
    'Not quite. Each call needs the previous result, so the calls cannot overlap. Their latencies add up.',
    'Not quite. The user waits for the whole chain of calls, not only for the first token of the first call.',
  ]}
/>
