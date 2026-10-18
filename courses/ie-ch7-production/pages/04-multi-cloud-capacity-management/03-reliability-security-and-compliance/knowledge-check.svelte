<script module>
  export const pageConfig = { title: 'Knowledge Check: Reliability, Security, and Compliance' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Reliability, Security, and Compliance</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 6: select multi-cloud measures</p>
<NumericQuestion
  id="kc_rs_failures"
  question="A team runs 4 nodes of 8 GPUs each for inference, all year. At the Llama 3 rate of about one failure per 50,000 GPU-hours, how many GPU failures should the team expect per year?"
  answer={5.6}
  tolerance={0.1}
  unit="failures"
  correctFeedback="Correct. 4 × 8 = 32 GPUs, and 32 × 8,760 hours = 280,320 GPU-hours. Dividing by 50,000 gives about 5.6 failures per year, roughly one every two months."
  incorrectFeedback="Count GPU-hours first: 4 nodes × 8 GPUs × 8,760 hours per year = 280,320 GPU-hours. Then divide by 50,000 GPU-hours per failure: 280,320 ÷ 50,000 ≈ 5.6 failures per year."
/>

<p class="ie-objective">Practices objective 6: select multi-cloud measures</p>
<MultipleChoice
  id="kc_rs_posture"
  question="A trading firm's assistant must keep answering through the loss of a whole region, with no cutover pause. The firm accepts paying for spare capacity in every region it serves from. Which posture fits?"
  options={[
    'Active-active across at least two regions',
    'Active-passive with a hot standby region',
    'Blue-green across a pair of identical regions',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. In active-active, every region already serves live traffic, so the survivors absorb a failed region without a cutover. The price is spare capacity in each region.',
    'Incorrect. Active-passive keeps a standby idle and cuts traffic over after a failure. That cutover is the pause the firm cannot accept.',
    'Incorrect. Blue-green is a release strategy for updates, not a posture for surviving outages.',
  ]}
/>

<p class="ie-objective">Practices objective 6: select multi-cloud measures</p>
<MultipleChoice
  id="kc_rs_attack"
  question="An application has no logging or training requirement to retain user data. Which decision most directly reduces its attack surface?"
  options={[
    'Encrypt stored user inputs and model outputs.',
    'Move stored user data to a compliant provider.',
    'Stop storing user inputs and model outputs.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Encryption protects stored data, but the data still exists as a target.',
    'Incorrect. A compliant provider helps with certification, but the stored data remains a target.',
    'Correct. Data that is never stored cannot be stolen, which removes it from the attack surface entirely.',
  ]}
/>
