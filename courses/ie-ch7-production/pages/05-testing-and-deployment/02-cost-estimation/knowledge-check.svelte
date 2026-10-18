<script module>
  export const pageConfig = { title: 'Knowledge Check: Cost Estimation' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Cost Estimation</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_ce_1"
  question="A dedicated deployment runs 2,000 GPU-hours at $4.00 per GPU-hour over one week. What is its GPU cost for the week?"
  options={['$500', '$2,004', '$8,000']}
  correct={2}
  optionFeedback={[
    'Incorrect. This result divides GPU-hours by price. Total cost multiplies them.',
    'Incorrect. This result adds GPU-hours and price. Total cost multiplies them.',
    'Correct. 2,000 GPU-hours × $4.00 per GPU-hour = $8,000.',
  ]}
/>

<MultipleChoice
  id="kc_ce_2"
  question="Which comparison does the chapter recommend when deciding between a per-token API and a dedicated deployment?"
  options={[
    'Compare the total API cost with the total GPU cost for the workload.',
    'Compare the API price per token with a per-token price derived from GPU spend.',
    'Compare the API price per token with the hourly price of one GPU.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Converting the token price into a total cost avoids reverse-engineering a per-token price from many dedicated variables.',
    'Incorrect. The chapter advises against reverse-engineering a per-token price from GPU spend, because dedicated cost depends on many variables.',
    'Incorrect. These units do not compare directly. One is per token and the other is per GPU-hour.',
  ]}
/>
