<script module>
  export const pageConfig = { title: 'Knowledge Check: End-to-End Metrics' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: End-to-End Metrics</h1>

<p>Answer these practice questions. They do not count toward your score. Each item names the objective it practices.</p>

<p class="ie-obj">Objective 9: Diagnose where to direct optimization work.</p>

<Sorting
  id="kc_e2e_1"
  question="Sort each measurement by where the team should work first."
  items={[
    'GPU time is 150 ms of a 2,000 ms end-to-end wait',
    'GPU time is 900 ms of a 1,000 ms end-to-end wait',
    'Requests wait 3 seconds in a queue at peak, and GPU time is 0.4 seconds',
    'Users on another continent see 600 ms of network time, and GPU time is 300 ms',
    'A reply takes 2.5 seconds on the GPU out of a 2.7-second wait',
  ]}
  targets={['Network and queues first', 'Model performance first']}
  correct={[0, 1, 0, 0, 1]}
  correctFeedback="Correct. Work goes to whichever part holds most of the wait."
  incorrectFeedback="Not yet. Subtract GPU time from the end-to-end wait. If most of the wait is outside the GPU, fix infrastructure first. If most is inside, optimize the model."
/>

<p class="ie-obj">Objective 9: Diagnose where to direct optimization work.</p>

<MultipleChoice
  id="kc_e2e_2"
  question="Inference time is 1,100 milliseconds, and end-to-end latency is 1,200 milliseconds. Where should the team focus its work?"
  options={[
    'Model performance optimization',
    'Network routing between regions',
    'Request queue capacity',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Inference accounts for over 90 percent of the wait, so faster inference gives the largest gain.',
    'Not quite. Network and queue delays together add only 100 milliseconds here.',
    'Not quite. Queue time is part of the 100 milliseconds outside the GPU, which is a small share of the wait.',
  ]}
/>
