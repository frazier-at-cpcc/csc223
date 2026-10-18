<script>
  // Inline glossary term: <Term id="kv-cache" /> or <Term id="kv-cache">KV caches</Term>.
  // Renders the term as a button that opens its series-wide definition (native popover).
  import { glossary } from './glossary.js';

  let { id, children } = $props();
  const entry = $derived(glossary[id]);
  $effect(() => {
    if (!entry) console.error(`[Term] unknown glossary id "${id}"`);
  });
  const uid = $props.id();
  const popId = `term-${uid}`;
</script>

{#if entry}<button type="button" class="term" popovertarget={popId}>{#if children}{@render children()}{:else}{entry.term}{/if}</button><span
    id={popId}
    class="term-pop"
    popover="auto"
    role="note"
    aria-label="Definition of {entry.term}"
    ><strong>{entry.term}</strong>{' '}{entry.def}{#if entry.chapter !== undefined}<span class="term-ch"> Covered in depth in Chapter {entry.chapter}.</span>{/if}</span
  >{:else}{@render children?.()}{/if}

<style>
  .term {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    padding: 0;
    text-align: inherit;
    border-bottom: 1px dashed var(--tessera-primary);
    cursor: help;
  }
  .term:focus-visible { outline: 2px solid var(--tessera-primary); outline-offset: 2px; }
  .term-pop {
    max-width: min(26rem, calc(100vw - 2rem));
    margin: auto;
    padding: var(--tessera-spacing-md);
    border: 1px solid var(--tessera-border);
    border-radius: 8px;
    background: var(--tessera-bg);
    color: var(--tessera-text);
    font-size: 0.95rem;
    line-height: 1.5;
    box-shadow: 0 8px 24px rgb(0 0 0 / 0.18);
  }
  .term-ch { display: block; margin-top: var(--tessera-spacing-sm); color: var(--tessera-text-light); }
</style>
