<script module>
  export const pageConfig = { title: 'Speculation Speedup' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import SpeculationSimulator from '$shared/sims/SpeculationSimulator.svelte';
</script>

<h1>Speculation Speedup</h1>

<p>
  Each speculation step costs drafting work and yields between one token and one more than the number of drafts. The
  simulator below runs many steps and reports the speedup over plain decode for a chosen acceptance rate and draft length.
</p>

<Signal kind="try" title="Measure what speculation gains">
  <ol>
    <li>
      Select &ldquo;Predictable text (high acceptance)&rdquo;, then select &ldquo;Run 10 steps&rdquo;. Record the tokens per
      pass so far and compare them with the expected tokens per pass.
    </li>
    <li>
      Select &ldquo;Creative text (low acceptance)&rdquo;. Record the estimated speedup and explain why it is lower than in
      the first scenario.
    </li>
    <li>
      Select &ldquo;Draft too long&rdquo;. Read the best draft length in the status text, set the draft length slider to that
      value, and record the new speedup.
    </li>
  </ol>
</Signal>

<SpeculationSimulator title="Speculative Decoding Simulator" headingLevel={2} />

<h2>Practice: When Speculation Pays Off</h2>

<p>
  Answer each item by running the named scenario. These items explore when speculation pays off. Chapter 5 assesses speedup;
  Objective 6 is practiced in the lesson knowledge check.
</p>

<NumericQuestion
  id="sim_spec_bestk"
  question="Load the Draft too long scenario. Which draft length k gives the highest estimated speedup?"
  answer={3}
  unit="tokens"
  correctFeedback="Correct. At an acceptance rate of 0.6, drafts beyond the third are usually discarded, so their drafting cost outweighs their gain."
  incorrectFeedback="The status text names the best draft length: k = 3, at about 1.67 times. Longer drafts add drafting cost, but at an acceptance rate of 0.6 the later drafts are rarely accepted."
/>

<NumericQuestion
  id="sim_spec_creative"
  question="Load the Creative text scenario. What estimated speedup over plain decode does the simulator report? Give the value to two decimal places."
  answer={1.37}
  tolerance={0.01}
  unit="times"
  correctFeedback="Correct. With an acceptance rate of 0.4, one pass yields about 1.65 tokens and costs 1.2 target steps."
  incorrectFeedback="The simulator reports about 1.37 times. At an acceptance rate of 0.4, most passes stop at the first or second draft, so one pass yields about 1.65 tokens for a cost of 1.2 target steps."
/>

<p>Chapter 5 covers draft models, acceptance rates, and when speculation stops paying off.</p>
