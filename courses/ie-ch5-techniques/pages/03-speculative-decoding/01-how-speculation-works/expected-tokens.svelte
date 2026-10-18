<script module>
  export const pageConfig = { title: 'Calculating Expected Tokens per Pass' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Calculating Expected Tokens per Pass</h1>

<p>
  One target pass produces between 1 and k + 1 tokens, depending on how many drafts survive. Planning a deployment
  needs the average. Two quantities describe the drafts, and they are easy to confuse.
</p>
<ul>
  <li>
    The <strong>acceptance rate</strong>, written α (alpha), is the probability that the target model accepts one
    draft token, given that every draft before it was accepted.
  </li>
  <li>
    The <strong>observed share of drafts accepted</strong> is the number of drafts kept divided by the number of
    drafts proposed, measured over many passes.
  </li>
</ul>

<h2>Acceptance under sampling</h2>
<p>
  With greedy decoding, the target model accepts a draft when the draft matches the token it would have chosen.
  Most services sample with a <Term id="temperature">temperature</Term> above zero. Under sampling, the target model accepts each
  draft with a probability set by comparing the two models' token probabilities. This rule keeps the distribution of
  outputs identical to the distribution the target model would produce alone, which is why speculation is lossless.
</p>

<h2>The expected-tokens formula</h2>
<p>
  The pass always contributes one token of its own. Draft 1 survives with probability α. Draft 2 survives only if
  drafts 1 and 2 are both accepted, with probability α². Draft i survives with probability α<sup>i</sup>. Adding
  these terms gives the expected tokens per target pass, E.
</p>
<p class="ie-formula">E = 1 + α + α² + … + α<sup>k</sup> = (1 − α<sup>k+1</sup>) ÷ (1 − α)</p>
<p>
  The observed share of drafts accepted is (E − 1) ÷ k. This model treats α as the same at every draft position.
  Real acceptance often falls deeper in a draft, so the formula gives an upper estimate for long drafts.
</p>

<Signal kind="worked" title="Four drafts at an acceptance rate of 0.8">
  <p>A speculator proposes k = 4 drafts, and each is accepted with probability α = 0.8.</p>
  <ol>
    <li>List the terms: 1, 0.8, 0.8² = 0.64, 0.8³ = 0.512, and 0.8⁴ = 0.4096.</li>
    <li>Add them: E = 1 + 0.8 + 0.64 + 0.512 + 0.4096 = 3.36 tokens per target pass.</li>
    <li>Check with the closed form: (1 − 0.8⁵) ÷ (1 − 0.8) = (1 − 0.32768) ÷ 0.2 = 3.36.</li>
    <li>Find the observed share: (3.36 − 1) ÷ 4 = 0.59, or 59 percent of drafts kept.</li>
  </ol>
  <p>
    Decode without speculation produces 1 token per pass, so this setting produces about 3.4 times as many tokens
    per trip of the weights through memory, before the cost of drafting.
  </p>
</Signal>

<Signal kind="mistake" title="Reading the acceptance rate as the share of drafts kept">
  <p>
    In the worked example, α is 80 percent, yet only 59 percent of drafts were kept. Every draft after a rejection
    is discarded unchecked, so the observed share always sits below α when k is greater than 1. A dashboard that
    reports "59 percent of drafts accepted" describes a per-token acceptance rate of 80 percent at k = 4.
  </p>
</Signal>

<h2>Faded example: three drafts at an acceptance rate of 0.9</h2>
<p>
  A speculator proposes k = 3 drafts at α = 0.9. The first steps are done for you: α<sup>k+1</sup> = 0.9⁴ = 0.6561,
  and 1 − α = 0.1.
</p>
<NumericQuestion
  id="spec_faded"
  question="Complete the final step. How many tokens does one target pass produce on average?"
  answer={3.439}
  tolerance={0.01}
  unit="tokens per pass"
  correctFeedback="Correct. (1 − 0.6561) ÷ 0.1 = 3.439. The sum 1 + 0.9 + 0.81 + 0.729 gives the same result."
  incorrectFeedback="Divide (1 − 0.6561) = 0.3439 by 0.1 to get 3.439. As a check, add the terms 1 + 0.9 + 0.81 + 0.729 = 3.439."
/>

<h2>Practice: expected tokens and observed share</h2>
<NumericQuestion
  id="spec_practice_1"
  question="A speculator proposes k = 2 drafts at an acceptance rate of 0.5. How many tokens does one target pass produce on average?"
  answer={1.75}
  tolerance={0.01}
  unit="tokens per pass"
  correctFeedback="Correct. E = 1 + 0.5 + 0.25 = 1.75 tokens per pass."
  incorrectFeedback="Add one term for the target model's own token and one for each draft: 1 + 0.5 + 0.5² = 1 + 0.5 + 0.25 = 1.75. The closed form agrees: (1 − 0.125) ÷ 0.5 = 1.75."
/>

<NumericQuestion
  id="spec_practice_2"
  question="A speculator proposes k = 5 drafts at an acceptance rate of 0.7. How many tokens does one target pass produce on average? Round to two decimal places."
  answer={2.94}
  tolerance={0.02}
  unit="tokens per pass"
  correctFeedback="Correct. (1 − 0.7⁶) ÷ 0.3 = (1 − 0.117649) ÷ 0.3 = 2.94 tokens per pass."
  incorrectFeedback="Compute 0.7⁶ = 0.117649. Then E = (1 − 0.117649) ÷ (1 − 0.7) = 0.882351 ÷ 0.3 = 2.94. The term-by-term sum is 1 + 0.7 + 0.49 + 0.343 + 0.2401 + 0.16807 = 2.94."
/>

<NumericQuestion
  id="spec_practice_3"
  question="For the same setting, k = 5 and α = 0.7, what percentage of proposed drafts does the target model keep on average? Round to the nearest whole percent."
  answer={39}
  tolerance={1}
  unit="percent"
  correctFeedback="Correct. (2.94 − 1) ÷ 5 = 0.39, so about 39 percent of drafts are kept, well below the 70 percent acceptance rate."
  incorrectFeedback="Subtract the target model's own token and divide by the drafts proposed: (2.94 − 1) ÷ 5 = 0.39, or 39 percent. The share is lower than α = 70 percent because drafts after a rejection never count."
/>
