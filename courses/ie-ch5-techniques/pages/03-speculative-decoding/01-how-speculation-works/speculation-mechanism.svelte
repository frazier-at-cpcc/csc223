<script module>
  export const pageConfig = { title: 'The Speculation Mechanism' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import SpeculationSteps from '../../../components/SpeculationSteps.svelte';
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>The Speculation Mechanism</h1>

<Signal kind="recall" chapter={2} title="Why decode leaves compute idle">
  <p>
    <Term id="decode">Decode</Term> is <Term id="autoregressive-generation">autoregressive</Term>: each
    <Term id="forward-pass">forward pass</Term> produces one token, and the next pass needs that token as input. Each pass reads
    every weight from memory, so decode is memory bound. At low to moderate batch sizes, compute sits idle while the
    weights stream in.
  </p>
</Signal>

<p>
  <strong>Speculative decoding</strong> is a family of strategies that use this spare compute to produce several
  tokens per forward pass of the model being served. Chapter 0 introduced the idea with one example. This lesson
  explains why it works and how to calculate its payoff.
</p>

<h2>Three shared steps</h2>
<p>Every speculative decoding algorithm follows the same mechanism.</p>
<ol>
  <li>A cheap <strong>speculator</strong> proposes k <strong>draft tokens</strong>, one after another.</li>
  <li>
    The <strong>target model</strong>, which is the model you are accelerating, checks all k drafts in a single
    forward pass. That one pass computes the target model's own prediction at every draft position, plus one
    position beyond the last draft, all in parallel.
  </li>
  <li>
    The target model keeps drafts from left to right until the first one it rejects. It then adds one token of its
    own: the correct token at the rejected position, or a bonus token when every draft passes.
  </li>
</ol>
<p>
  One target forward pass therefore produces N + 1 tokens, where N is the number of accepted draft tokens. When the
  target model rejects every draft, the pass still produces the one token that ordinary decode would have
  produced.
</p>

<SpeculationSteps />

<p>
  Figure 5.3 extends the Chapter 0 example. The speculator proposed four drafts. The target model accepted "tel" and
  "le", rejected "vis", and supplied "scope" in its place. The draft "ion" was discarded without counting, because
  it was built on the rejected "vis". The pass produced 2 + 1 = 3 tokens.
</p>

<h2>Parallel verification in one pass</h2>
<p>
  In <Term id="memory-bound">memory-bound</Term> decode, the cost of a forward pass is mostly the time to read the <Term id="weights">weights</Term>. Scoring k + 1 positions
  reads the same weights once, so it costs about the same as scoring one position. Speculation turns one trip of the
  weights through memory into several tokens instead of one.
</p>

<Signal kind="mistake" title="Thinking verification is cheap because checking is easier than generating">
  <p>
    For each position, verification performs the same computation as generating a token. Checking a draft is not a
    lighter kind of work. Speculation is fast because all k + 1 positions share one forward pass, and in
    memory-bound decode that pass costs about the same as a single ordinary step. When decode becomes <Term id="compute-bound">compute bound</Term>
    at large <Term id="batch-size">batch sizes</Term>, the extra positions are no longer free and the speedup disappears.
  </p>
</Signal>

<h2>Acceptance under sampling</h2>
<p>
  With greedy decoding, the target model accepts a draft when the draft matches the token it would have chosen.
  Most services sample with a <Term id="temperature">temperature</Term> above zero. Under sampling, the target model accepts each
  draft with a probability set by comparing the two models' token probabilities. This rule keeps the distribution of
  outputs identical to the distribution the target model would produce alone, which is why speculation is lossless.
</p>

<Callout type="important">
  <p>
    Speculative decoding improves <Term id="tokens-per-second">tokens per second</Term> (TPS) and <Term id="inter-token-latency">inter-token latency
    (ITL)</Term>. It does not improve <Term id="time-to-first-token">time to first token</Term> (TTFT), because the first token comes from <Term id="prefill">prefill</Term>.
  </p>
</Callout>
