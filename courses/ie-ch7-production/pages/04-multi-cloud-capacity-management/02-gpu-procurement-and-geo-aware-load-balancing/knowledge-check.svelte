<script module>
  export const pageConfig = { title: 'Knowledge Check: GPU Procurement and Geo-Aware Load Balancing' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: GPU Procurement and Geo-Aware Load Balancing</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 6: select multi-cloud measures</p>
<Sorting
  id="kc_gp_roles"
  question="Sort each statement by the procurement mechanism it describes."
  items={[
    'Committed for a year at a discount to carry the always-present load',
    'Rented by the hour at full price, up to a quota, for an afternoon peak',
    'Discounted, but the provider can reclaim it after a few minutes of notice',
    'Blocks of hundreds of GPUs held for months',
  ]}
  targets={['Reserved', 'On-demand', 'Spot']}
  correct={[0, 1, 2, 0]}
  correctFeedback="Correct. Reserved capacity is committed and discounted, on-demand capacity is flexible and priced high, and spot capacity is discounted but can be pre-empted."
  incorrectFeedback="Look at commitment and price. Long commitments at a discount are reserved. Flexible hourly rental at a high price is on-demand. A discount that the provider can take back on short notice is spot."
/>

<p class="ie-objective">Practices objective 6: select multi-cloud measures</p>
<NumericQuestion
  id="kc_gp_peak"
  question="A service needs 140 GPUs every hour of the day and 230 GPUs at its weekday peak. In a blended plan, how many GPUs should come from on-demand and spot capacity?"
  answer={90}
  unit="GPUs"
  correctFeedback="Correct. Reserve the 140-GPU baseline, and cover the 230 − 140 = 90 peak GPUs with on-demand and spot capacity that the team releases afterward."
  incorrectFeedback="The baseline of 140 GPUs is always present, so it belongs on reserved capacity. Only the peak above the baseline needs flexible capacity: 230 − 140 = 90 GPUs."
/>

<p class="ie-objective">Practices objective 6: select multi-cloud measures</p>
<MultipleChoice
  id="kc_gp_route"
  question="A global load balancer can send a Tokyo user's request to a Tokyo cluster with a 2-second queue, or to a Singapore cluster with free capacity about 70 milliseconds of round trip away. The latency SLO is 1 second to first token. Which choice serves the user better?"
  options={[
    'Hold the request in Tokyo, because the nearer cluster has lower latency.',
    'Reject the request, because both of the options break the SLO.',
    'Send it to Singapore, because 70 milliseconds beats a 2-second wait.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Distance usually wins, but not when the nearby queue costs far more than the trip. A 2-second wait alone breaks the 1-second SLO.',
    'Incorrect. Only the Tokyo option breaks the SLO. The Singapore round trip leaves most of the budget for inference.',
    'Correct. The two goals compete, and the global load balancer weighs them. Here 70 milliseconds of travel costs far less than 2 seconds in a queue.',
  ]}
/>
