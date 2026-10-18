<script module>
  export const pageConfig = { title: 'New Attention Algorithms' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Accordion, AccordionItem } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>New Attention Algorithms</h1>

<p>
  New variants of attention change the underlying time or memory cost. Each one changes what attention computes,
  so each one risks some quality. A model is usually trained with the variant it serves with.
</p>

<div class="ie-table-wrap" role="region" aria-label="Attention variants that change time or memory cost" use:scrollable>
  <table class="ie-table">
    <caption>Attention variants that change time or memory cost</caption>
    <thead>
      <tr><th scope="col">Variant</th><th scope="col">How it works</th><th scope="col">What it changes</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row"><Term id="sliding-window-attention">Sliding window attention</Term></th><td>Attends only to the previous w tokens. As of early 2026, production models use windows from about 1K to 32K tokens.</td><td>Time drops from O(N²) to O(Nw). The KV cache is capped at w tokens.</td></tr>
      <tr><th scope="row">Gated attention</th><td>Uses layers introduced in training to approximate attention for certain chunks of context.</td><td>Time becomes linear in chunk length for those chunks.</td></tr>
      <tr><th scope="row">Linear attention</th><td>Replaces the <Term id="softmax">softmax</Term> equation with a linear-time approximation.</td><td>Time becomes linear in N.</td></tr>
      <tr><th scope="row">Compressed attention</th><td>Periodically compresses earlier context. Attention considers the compressed context and the uncompressed recent tokens.</td><td>Time and the KV cache both shrink for long contexts.</td></tr>
      <tr><th scope="row"><Term id="multi-latent-attention">Multi-latent attention</Term></th><td>Compresses keys and values into a small latent vector, which the model expands when it attends.</td><td>The KV cache shrinks greatly. Time stays quadratic in N.</td></tr>
    </tbody>
  </table>
</div>

<Signal kind="worked" title="Sliding window savings">
  <pre><code>N = 128,000 tokens, w = 8,000 tokens

Full attention:     N² = 128,000 × 128,000 = 16,384,000,000 comparisons
Sliding window:     Nw = 128,000 ×   8,000 =  1,024,000,000 comparisons

Sliding window does w / N = 1/16 of the work.</code></pre>
</Signal>

<h2>Why locality works</h2>

<p>
  Tokens near each other in a sequence usually affect each other more than distant tokens do. A sentence follows
  closely from the sentence before it and only loosely from the first sentence of a chapter. Training can
  reinforce this intuition. A model trained with sliding window attention keeps quality high when the same
  technique is used at inference time. A model trained with full attention and switched to a sliding window only
  at inference time loses information it learned to use.
</p>

<h2>Beyond transformers</h2>

<p>
  Another research avenue avoids attention altogether. The details below are context beyond this chapter's
  objectives.
</p>

<Accordion>
  <AccordionItem title="State-space models and hybrid models">
    <p>
      Mamba is a selective <Term id="state-space-model">state-space model</Term>. It replaces self-attention with
      a recurrent state update and scales linearly with sequence length.
    </p>
    <p>
      Hybrid models mix Mamba-style state-space blocks with <Term id="transformer">transformer</Term> blocks. As of early 2026, state-space
      models still have limited applications, but hybrid models are becoming more popular. Open models such as
      NVIDIA Nemotron 3 Nano adopt hybrid architectures.
    </p>
  </AccordionItem>
</Accordion>
