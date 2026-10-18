<script module>
  export const pageConfig = { title: 'Knowledge Check: Reliability, Security, and Compliance' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Reliability, Security, and Compliance</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_rs_1"
  question="A team keeps a second region fully provisioned but idle, ready to take over if the primary region fails. Which posture is this?"
  options={['Active-active', 'Active-passive', 'Blue-green']}
  correct={1}
  optionFeedback={[
    'Incorrect. In active-active, every region serves live traffic at the same time.',
    'Correct. Active-passive keeps a hot standby ready but idle and cuts traffic over to it on failure.',
    'Incorrect. Blue-green is a deployment strategy for releasing updates, not a failover posture for outages.',
  ]}
/>

<MultipleChoice
  id="kc_rs_2"
  question="An application has no logging or training requirement to retain user data. Which decision most directly reduces its attack surface?"
  options={[
    'Do not store user inputs or model outputs.',
    'Encrypt stored user inputs and model outputs.',
    'Move stored user data to a compliant provider.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Data that is never stored cannot be stolen, which shrinks the attack surface.',
    'Incorrect. Encryption protects stored data, but the data still exists as a target.',
    'Incorrect. A compliant provider helps with certification, but the stored data remains a target.',
  ]}
/>
