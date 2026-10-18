<script module>
  export const pageConfig = { title: 'Speculation' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
  import SpeculationDiagram from '../../../components/SpeculationDiagram.svelte';
</script>

<h1>Speculation</h1>

<p>
  <dfn><strong>Speculation</strong></dfn>, also called speculative decoding, drafts several tokens cheaply and then has
  the full model verify them. During <Term id="decode">decode</Term>, one verification pass can produce more than one token.
</p>

<h2>Why Verification Is Cheap</h2>

<p>
  Without speculation, each decode <Term id="forward-pass">forward pass</Term> produces exactly one token. Decode is
  <Term id="memory-bound">memory-bound</Term>, so most of each pass is spent reading the weights from memory. A pass that scores five token
  positions reads the weights once, the same as a pass that scores one position.
</p>

<p>
  Speculation exploits that fact. A cheap drafting step, often a small <Term id="draft-model">draft model</Term>, proposes several tokens.
  The full model, called the <Term id="target-model">target model</Term>, then checks every draft in one parallel forward pass. The target
  model computes its own prediction at each position in that single pass.
</p>

<h2>The Acceptance Rule</h2>

<ul>
  <li>With greedy decoding, the target model accepts drafts from left to right while each draft matches its own prediction. Chapter 5 extends the rule to sampled output.</li>
  <li>The first draft that does not match is rejected.</li>
  <li>Every draft after a rejection is discarded, because it was built on a wrong token.</li>
  <li>
    The target model always adds one token of its own: its prediction at the rejected position, or a bonus token after the
    last draft when every draft is accepted.
  </li>
</ul>

<p>One pass with k drafts therefore yields between 1 and k + 1 tokens.</p>

<h2>A Speculation Step</h2>

<SpeculationDiagram />

<Signal kind="worked" title="Reading Figure 0.2">
  <p>The figure traces one step for the prompt "Look at the."</p>
  <ol>
    <li>A drafting step proposes four tokens: "tel", "le", "vis", and "ion".</li>
    <li>
      In one forward pass, the target model accepts "tel" and "le". Its own prediction at the third position is "scope",
      so it rejects "vis".
    </li>
    <li>The model discards "ion", because "ion" follows a rejected draft.</li>
    <li>The model adds its own token, "scope", at the rejected position.</li>
  </ol>
  <p>
    The output gains three tokens, "tel", "le", and "scope", from one target forward pass. Standard decoding would have
    produced one.
  </p>
</Signal>

<Signal kind="mistake" title="Speculation does not always add several tokens">
  <p>
    When the target model rejects the first draft, the pass yields one token, the same as plain decode. The drafting work
    for that step is wasted. The gain from speculation depends on how many drafts the target model accepts and on how much
    drafting costs. The bottleneck that speculation targets is slow decode for each user, and it helps most when the text is
    predictable and the GPU is not already saturated with a large batch.
  </p>
</Signal>

<p>
  The next page measures how the <Term id="acceptance-rate">acceptance rate</Term> and the draft length set the speedup that
  speculation delivers.
</p>
