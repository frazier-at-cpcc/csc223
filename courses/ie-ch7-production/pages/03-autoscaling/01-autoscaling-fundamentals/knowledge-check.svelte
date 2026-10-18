<script module>
  export const pageConfig = { title: 'Knowledge Check: Autoscaling Fundamentals' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Autoscaling Fundamentals</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 2: configure autoscaling parameters</p>
<Matching
  id="kc_af_symptoms"
  question="Match each autoscaling parameter to the symptom that adjusting it addresses."
  pairs={[
    { left: 'Min replicas', right: 'The first users each morning wait for replicas to start' },
    { left: 'Max replicas', right: 'Requests queue while the replica count sits flat at its ceiling' },
    { left: 'Autoscaling window', right: 'New replicas arrive after a short spike has already passed' },
    { left: 'Scale down delay', right: 'Replicas are removed between bursts that arrive minutes apart' },
  ]}
  correctFeedback="Correct. Each symptom points to one setting: a cold first request to min replicas, a flat ceiling to max replicas, a slow reaction to the window, and churn between bursts to the scale down delay."
  incorrectFeedback="Ask what each setting controls. Min replicas sets the floor that is always warm. Max replicas sets the ceiling. The window sets how quickly a rise registers. The scale down delay sets how long replicas survive after traffic drops."
/>

<p class="ie-objective">Practices objective 2: configure autoscaling parameters</p>
<MultipleChoice
  id="kc_af_ramp"
  question="A coding assistant's traffic climbs steadily every weekday morning from 20 to 150 concurrent requests. The concurrency target and batch size are both 16, min replicas is 2, and max replicas is 6. From mid-morning until noon, requests queue and the replica count stays at 6. Which change removes the queue?"
  options={[
    'Lengthen the scale down delay to 30 minutes.',
    'Raise max replicas to at least 10.',
    'Shorten the autoscaling window to 30 seconds.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. The scale down delay governs how fast replicas leave after traffic falls. Here traffic is rising and the count is stuck at its ceiling.',
    'Correct. 150 ÷ 16 = 9.4, so the peak needs 10 replicas. A ceiling of 6 holds only 96 requests, and the rest queue no matter how fast the autoscaler reacts.',
    'Incorrect. A shorter window speeds up the decision to add replicas, but the autoscaler already wants more than 6. The ceiling blocks it.',
  ]}
/>

<p class="ie-objective">Practices objective 2: configure autoscaling parameters</p>
<MultipleChoice
  id="kc_af_flash"
  question="A news app sees flash spikes that last about 3 minutes. The autoscaling window is 10 minutes, and new replicas take 1 minute to start. Replicas usually come online as each spike ends. Which change lets capacity arrive during the spike?"
  options={[
    'Lower the concurrency target to half the batch size.',
    'Raise min replicas until it covers the spike peak.',
    'Shorten the autoscaling window to about 1 minute.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. A target below the batch size adds replicas earlier, but it also leaves half of every replica idle all day, and the 10-minute window still delays each decision.',
    'Incorrect. Enough always-on replicas for the peak would remove the queue, but the team would pay for peak capacity around the clock. Fix the slow decision first.',
    'Correct. A 3-minute spike barely moves a 10-minute average. A short window registers the spike within a minute, and the 1-minute cold start then delivers replicas while the spike is still underway.',
  ]}
/>
