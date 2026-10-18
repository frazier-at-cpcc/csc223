<script module>
  export const pageConfig = { title: 'What Determines the Speedup' };
</script>

<script>
  import SpeculationSteps from '../../../components/SpeculationSteps.svelte';
</script>

<h1>What Determines the Speedup</h1>

<p>The performance gain from any speculative decoding strategy depends on three factors.</p>
<ol>
  <li><strong>Draft token cost</strong> is the time required to generate one draft token.</li>
  <li><strong>Draft sequence length</strong> is the number of draft tokens generated per forward pass.</li>
  <li><strong>Token acceptance rate</strong> is the percentage of draft tokens the target model accepts.</li>
</ol>
<p>
  Acceptance rate is high early in a draft sequence. Draft tokens become less reliable the deeper they sit in the
  sequence.
</p>

<SpeculationSteps />

<h2>Short, reliable drafts win</h2>
<p>
  Aim for short draft sequences with a high acceptance rate. Generating and validating drafts is inexpensive
  relative to ordinary generation, but it still carries meaningful overhead. Once the target model rejects one draft
  token, it also discards every draft token after it. In the figure, the rejection of <code>vis</code> discards
  <code>ion</code> even though <code>ion</code> was never checked.
</p>

<h2>Factors that move the acceptance rate</h2>
<ul>
  <li>
    <strong>Temperature</strong> has the largest effect. Higher temperatures produce token distributions that are
    harder to predict, which lowers acceptance.
  </li>
  <li>
    <strong>Subject matter</strong> also matters. A draft model or speculation head that is stronger in mathematics
    than in history accepts more tokens on mathematics prompts.
  </li>
</ul>

<h2>Batch size limits speculation</h2>
<p>
  Speculative decoding helps most at low batch sizes, where spare compute exists. At high batch sizes, compute is
  too saturated to afford verification, so the engine must disable speculation dynamically. Each algorithm in the
  next lesson balances these tradeoffs differently.
</p>
