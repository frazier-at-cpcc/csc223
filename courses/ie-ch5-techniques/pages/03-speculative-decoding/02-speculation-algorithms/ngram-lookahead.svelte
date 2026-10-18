<script module>
  export const pageConfig = { title: 'N-gram Speculation and Lookahead Decoding' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import NgramDictionary from '../../../components/NgramDictionary.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>N-gram Speculation and Lookahead Decoding</h1>

<h2>N-gram speculation</h2>
<p>
  <strong>N-gram speculation</strong> uses no draft model at all. While it builds the <Term id="kv-cache" />, the engine also
  builds an n-gram dictionary. The dictionary maps a starting token to an observed sequence of N tokens, called an
  n-gram.
</p>
<ol>
  <li>During <Term id="prefill">prefill</Term>, the engine fills the dictionary with common sequences from the input text.</li>
  <li>During decode, the engine looks up each generated token in the dictionary and uses any matching suffix as draft tokens.</li>
  <li>On the next forward pass, the target model verifies those draft tokens as usual.</li>
</ol>

<NgramDictionary />

<p>
  N-gram drafts can be much longer than EAGLE drafts. EAGLE produces about eight draft tokens with a good acceptance
  rate, while n-gram sequences can exceed ten. The acceptance rate stays high only when the output resembles the
  input. N-gram speculation therefore serves mainly code completion and code revision, where syntax is predictable
  and output closely matches input. Within that domain, it outperforms EAGLE.
</p>

<h2>Lookahead Decoding</h2>
<p>
  <strong>Lookahead Decoding</strong> is a related method that generates n-grams during inference to fill the
  dictionary. It depends less on highly repetitive context, so it generalizes beyond code. It needs extra compute to
  generate the n-grams.
</p>

<h2>Algorithm comparison</h2>
<div class="ie-table-wrap" role="region" aria-label="Speculative decoding algorithms compared" use:scrollable>
  <table class="ie-table">
    <caption>Speculative decoding algorithms compared</caption>
    <thead>
      <tr>
        <th scope="col">Algorithm</th>
        <th scope="col">Source of draft tokens</th>
        <th scope="col">Training needed</th>
        <th scope="col">Best fit</th>
      </tr>
    </thead>
    <tbody>
      <tr><th scope="row">Draft-target</th><td>Smaller model from the same family</td><td>None required</td><td>Quick setup with no training</td></tr>
      <tr><th scope="row">Medusa</th><td>Extra decoder heads on the target</td><td>Fine-tune the target</td><td>Rarely used in production as of October 2026</td></tr>
      <tr><th scope="row">EAGLE</th><td>Small model reading target hidden states</td><td>Train the EAGLE speculator</td><td>General-purpose workloads</td></tr>
      <tr><th scope="row">N-gram</th><td>Dictionary built from the input</td><td>None</td><td>Code completion and revision</td></tr>
      <tr><th scope="row">Lookahead</th><td>N-grams generated during inference</td><td>None</td><td>Systems with excess compute</td></tr>
    </tbody>
  </table>
</div>
<p>
  Every algorithm aims to reduce the number of forward passes needed to complete an output sequence. Fewer passes
  improve overall latency and, specifically, <Term id="tokens-per-second">tokens per second</Term> per user during decode.
</p>
