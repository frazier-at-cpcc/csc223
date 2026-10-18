<script module>
  export const pageConfig = { title: 'Knowledge Check: Consumer Versus B2B' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Consumer Versus B2B</h1>

<p>Answer these practice questions. They do not count toward your score. Each item names the objective it practices.</p>

<p class="ie-obj">Objective 4: Differentiate consumer priorities from business-to-business priorities.</p>

<Sorting
  id="kc_market_1"
  question="Sort each statement by the market it describes."
  items={[
    'Usage can double overnight after one viral post',
    'The software sits in each customer\'s revenue path',
    'Marginal cost and flexibility lead the priorities',
    'Latency and uptime lead the priorities',
    'Decent latency and availability are acceptable',
    'Usage is stable, and margins are better',
  ]}
  targets={['Consumer application', 'B2B application']}
  correct={[0, 1, 0, 1, 0, 1]}
  correctFeedback="Correct. Consumer products face unpredictable demand and tight costs. B2B products face contracts and mission-critical use."
  incorrectFeedback="Not yet. Consumer products are cost-sensitive and see viral spikes. B2B products have stable usage and better margins, and they must stay fast and available for paying businesses."
/>

<p class="ie-obj">Objective 5: Determine which infrastructure options a compliance requirement rules out.</p>

<MultipleChoice
  id="kc_market_2"
  question="A hospital's regulator requires that patient data be processed only inside Germany. The team's preferred shared API runs its GPUs in the United States and in Ireland. Which option satisfies the rule?"
  options={[
    'A dedicated deployment on GPUs in a German cloud region',
    'The shared API, called over an encrypted connection',
    'The shared API, called through its Irish endpoint',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Only GPUs located in Germany meet a rule that limits where the data is processed.',
    'Not quite. Encryption protects privacy in transit, but the data would still be processed in another country.',
    'Not quite. Ireland is in the European Union, but the rule names Germany. The data would still leave the permitted country.',
  ]}
/>

<p class="ie-obj">Objective 4: Differentiate consumer priorities from business-to-business priorities.</p>

<MultipleChoice
  id="kc_market_3"
  question="An inference team supports an invoicing product that thousands of companies use under contract to bill their own customers. Which priorities should lead its decisions?"
  options={['Latency and uptime', 'Marginal cost and flexibility', 'Throughput and batch size']}
  correct={0}
  optionFeedback={[
    'Correct. A contracted product in each customer\'s revenue path needs consistently low latency and high availability. Cost and scale come second.',
    'Not quite. Marginal cost and flexibility lead for consumer apps with unpredictable, viral usage.',
    'Not quite. Throughput-first priorities fit offline batch workloads. Each customer bills its own clients through this product, so it must stay available and responsive.',
  ]}
/>
