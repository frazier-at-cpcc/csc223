<script module>
  export const pageConfig = { title: 'Knowledge Check: GPU Procurement and Geo-Aware Load Balancing' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: GPU Procurement and Geo-Aware Load Balancing</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_gp_1"
  question="Which procurement mechanism offers discounted GPUs that the provider can reclaim after a short notice period?"
  options={['On-demand', 'Reserved', 'Spot']}
  correct={2}
  optionFeedback={[
    'Incorrect. On-demand instances carry a relatively high hourly cost and are not pre-empted.',
    'Incorrect. Reserved capacity is discounted, but it is committed for months or years rather than reclaimed on short notice.',
    'Correct. Spot instances are discounted and can be pre-empted after an agreed notice period, often minutes.',
  ]}
/>

<MultipleChoice
  id="kc_gp_2"
  question="Using the rule of thumb of five milliseconds per time zone, how long does a one-way trip across four time zones take?"
  options={['5 milliseconds', '20 milliseconds', '40 milliseconds']}
  correct={1}
  optionFeedback={[
    'Incorrect. Five milliseconds covers only one time zone.',
    'Correct. Four time zones at five milliseconds each take 20 milliseconds one way.',
    'Incorrect. Forty milliseconds is the round trip. The question asks for one way.',
  ]}
/>
