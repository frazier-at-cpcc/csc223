<script module>
  export const pageConfig = { title: 'Tokens' };
</script>

<script>
  import Term from '$shared/Term.svelte';

  const example = ['Inference', ' engineering', ' is', ' a', ' systems', ' problem', '.'];
</script>

<h1>Tokens</h1>

<p>
  This section defines the vocabulary that the rest of the series builds on. It starts with the unit that a
  <Term id="llm">large language model (LLM)</Term> reads and writes.
</p>

<p>
  A <dfn><strong>token</strong></dfn> is the unit of text that a language model reads and writes. A
  <Term id="tokenizer">tokenizer</Term> splits text into tokens and maps each token to an integer. The model never sees characters or
  whole words. It sees a sequence of integers, one per token.
</p>

<h2>Splitting Text into Tokens</h2>

<p>A tokenizer might split the sentence "Inference engineering is a systems problem." into seven tokens:</p>

<ol class="tokens" aria-label="Seven example tokens">
  {#each example as t, i (i)}
    <li><span class="tok">{t.trim()}</span><span class="idx">token {i + 1}</span></li>
  {/each}
</ol>

<p>
  Common words usually map to one token. A rare or long word splits into several tokens. A tokenizer might split
  "tokenization" into "token" and "ization". Each model family has its own tokenizer, so the same text can produce
  different token counts on different models.
</p>

<h2>Estimating Token Counts</h2>

<p>
  English text averages about four tokens for every three words. A 900-word article is therefore about 1,200 tokens. Code
  and languages other than English usually produce more tokens per word.
</p>

<h2>Why Inference Counts Tokens</h2>

<p>Every measure of inference cost and speed counts tokens.</p>

<ul>
  <li>A prompt is measured in input tokens, and a response in output tokens.</li>
  <li>Generation speed is measured in <Term id="tokens-per-second">tokens per second</Term>.</li>
  <li>Hosted model providers price their APIs per million input tokens and per million output tokens.</li>
</ul>

<p>Chapter 2 covers tokenizers, vocabularies, and how token efficiency affects latency.</p>

<style>
  .tokens {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin: var(--tessera-spacing-md) 0;
    padding: 0;
    list-style: none;
  }
  .tokens li {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.3rem 0.6rem;
    border: 2px solid var(--tessera-primary);
    border-radius: 4px;
    background: var(--tessera-bg);
  }
  .tok {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-weight: 600;
  }
  .idx {
    font-size: 0.75rem;
    color: var(--tessera-text);
  }
</style>
