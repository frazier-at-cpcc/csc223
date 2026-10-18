<script module>
  export const pageConfig = { title: 'Speculation' };
</script>

<script>
  import SpeculationDiagram from '../../../components/SpeculationDiagram.svelte';
</script>

<h1>Speculation</h1>

<p>
  <dfn><strong>Speculation</strong></dfn>, also called speculative decoding, generates draft tokens and then validates
  them. It produces more than one token per forward pass during decode.
</p>

<p>
  <dfn><strong>Decode</strong></dfn> is the phase of LLM inference that generates output. Without speculation, each
  forward pass through the model emits exactly one token.
</p>

<h2>A speculation step</h2>

<SpeculationDiagram />

<p>Figure 0.2 traces one step for the prompt "Look at the."</p>

<ol>
  <li>A drafting step proposes four tokens: "tel", "le", "vis", and "ion".</li>
  <li>
    The model verifies all four drafts in one forward pass. It accepts "tel" and "le". It rejects "vis". It discards
    "ion", because a token that follows a rejection cannot stand.
  </li>
  <li>The model supplies its own token, "scope", in place of the rejected draft.</li>
</ol>

<p>
  The output gains three tokens, "tel", "le", and "scope", from a single forward pass. Standard decoding would have
  produced one. That gain is how speculation improves inference latency.
</p>
