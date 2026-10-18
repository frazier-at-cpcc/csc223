<script module>
  export const pageConfig = { title: 'Knowledge Check: Consumer Versus B2B' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Consumer Versus B2B</h1>

<p>Answer these practice questions. They do not count toward your score.</p>

<MultipleChoice
  id="kc_market_1"
  question="An inference team supports a B2B product that sits in its customers' revenue path. Which priorities should lead its decisions?"
  options={['Latency and uptime', 'Marginal cost and flexibility', 'Throughput and batch size']}
  correct={0}
  optionFeedback={[
    'Correct. Mission-critical B2B software needs consistently low latency and high availability. Cost and scale come second.',
    'Not quite. Marginal cost and flexibility lead for consumer apps with unpredictable, viral usage.',
    'Not quite. Throughput-first priorities fit offline batch workloads, not a real-time product in a revenue path.',
  ]}
/>

<MultipleChoice
  id="kc_market_2"
  question="A hospital's regulators require that patient data never leave the country. Which compliance consideration does this requirement describe?"
  options={['Data sovereignty', 'Usage patterns', 'User privacy']}
  correct={0}
  optionFeedback={[
    'Correct. Data sovereignty concerns the geographic location where data is processed and stored.',
    'Not quite. Usage patterns describe traffic volume and timing, not legal limits on data location.',
    'Not quite. User privacy concerns keeping inputs and outputs private and secure. The rule here concerns geography.',
  ]}
/>
