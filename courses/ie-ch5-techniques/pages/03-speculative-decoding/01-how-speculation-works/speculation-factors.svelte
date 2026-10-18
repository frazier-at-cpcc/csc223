<script module>
  export const pageConfig = { title: 'What Determines the Speedup' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import SpeculationSimulator from '$shared/sims/SpeculationSimulator.svelte';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>What Determines the Speedup</h1>

<p>Expected tokens per pass is only half of the payoff. The speedup from any speculation strategy depends on three factors.</p>
<ol>
  <li><strong>Draft token cost</strong> is the time required to generate one draft token, as a fraction of one target step.</li>
  <li><strong>Draft sequence length</strong>, k, is the number of draft tokens proposed before each target pass.</li>
  <li><strong>Acceptance rate</strong>, α, is the probability that each draft token is accepted.</li>
</ol>
<p>
  Speedup equals the expected tokens per pass divided by the cost of one speculation step. That cost is k drafts at
  the draft token cost, plus one verification pass.
</p>

<h2>Draft length and acceptance</h2>
<p>
  Aim for short draft sequences with a high acceptance rate. Each extra draft adds drafting cost, but it adds an
  expected token only with probability α<sup>k</sup>, which shrinks quickly. Once the target model rejects one draft,
  it also discards every draft after it. In practice, drafts deeper in a sequence are also less reliable, because
  each one builds on earlier guesses. The simulator below holds α constant at every position, so it overstates the
  value of long drafts slightly.
</p>

<h2>Factors that move the acceptance rate</h2>
<ul>
  <li>
    <strong>Temperature</strong> has the largest effect. Higher temperatures produce token distributions that are
    harder to predict, which lowers acceptance.
  </li>
  <li>
    <strong>Subject matter</strong> also matters. A <Term id="draft-model">draft model</Term> or speculation head that is stronger in mathematics
    than in history accepts more tokens on mathematics prompts.
  </li>
</ul>

<h2>Batch size and spare compute</h2>
<p>
  Speculative decoding helps most at low <Term id="batch-size">batch sizes</Term>, where decode is memory bound and
  the extra positions in the verification pass are nearly free. At high batch sizes, decode approaches the compute
  bound, so each extra position costs real compute. The engine must then disable speculation dynamically. Each
  algorithm in the next lesson balances these tradeoffs differently.
</p>

<Signal kind="try" title="Explore the speedup">
  <ol>
    <li>Select the "Predictable text (high acceptance)" preset. Record the estimated speedup and the best draft length the simulator reports.</li>
    <li>Select the "Draft too long" preset. Compare the speedup at k = 10 with the speedup at the best draft length.</li>
    <li>Select the "High batch size" preset. Move the batch pressure slider from 0.80 down to 0 and record how the speedup changes.</li>
  </ol>
</Signal>

<SpeculationSimulator headingLevel={2} title="Speculative decoding simulator" />

<h2>Simulator practice: speedup and batch pressure</h2>
<NumericQuestion
  id="spec_sim_1"
  question="Select the Creative text preset, then set the draft length to 2. What estimated speedup does the simulator report? Enter the number without the word times."
  answer={1.42}
  tolerance={0.01}
  unit="times"
  correctFeedback="Correct. At α = 0.4 and k = 2, one pass yields 1.56 tokens, and one step costs 2 × 0.05 + 1 = 1.1 target steps, so the speedup is 1.56 ÷ 1.1 = 1.42."
  incorrectFeedback="With the Creative text preset, α = 0.4 and the draft cost is 0.05. At k = 2, E = 1 + 0.4 + 0.16 = 1.56 tokens, and one step costs 2 × 0.05 + 1 = 1.1 target steps. The simulator reports 1.56 ÷ 1.1 = 1.42 times."
/>

<MultipleChoice
  id="spec_sim_2"
  question="Select the High batch size preset and read the status panel. Which conclusion does the simulator support?"
  options={[
    'Speculation still helps, because each pass yields more than three tokens',
    'Speculation slows decode, because verifying costs over four target steps',
    'Speculation is unaffected, because batch size changes only the draft cost',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Each pass does yield about 3.36 tokens, but the step costs 4.4 target steps, so the speedup falls below 1.',
    'Correct. At a batch pressure of 0.8, verifying 5 positions costs 4.2 target steps. The speedup drops to about 0.76, so speculation slows decode.',
    'Incorrect. The draft cost stays at 0.05. Batch pressure raises the verification cost, which is what erases the gain.',
  ]}
/>
