<script>
  // Reference page listing glossary entries alphabetically, grouped by first letter.
  // <GlossaryList /> lists every entry; <GlossaryList chapter={3} /> lists entries taught in Chapter 3.
  import { glossary } from './glossary.js';

  let { chapter, headingLevel = 2 } = $props();
  const uid = $props.id();
  const tag = $derived(`h${Math.min(6, Math.max(1, headingLevel))}`);

  // Aliases share an object with their target, so a Set of values removes them.
  const groups = $derived.by(() => {
    const entries = [...new Set(Object.values(glossary))]
      .filter((e) => chapter === undefined || e.chapter === chapter)
      .sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }));
    const map = new Map();
    for (const e of entries) {
      const first = e.term[0].toUpperCase();
      const letter = /[A-Z]/.test(first) ? first : '#';
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter).push(e);
    }
    return [...map];
  });
  const groupId = (letter) => `${uid}-${letter === '#' ? 'num' : letter}`;
</script>

<div class="glossary-list">
  {#if groups.length > 1}
    <nav aria-label="Glossary letters">
      <ul>
        {#each groups as [letter]}
          <li><a href="#{groupId(letter)}">{letter}</a></li>
        {/each}
      </ul>
    </nav>
  {/if}

  {#each groups as [letter, entries]}
    <section aria-labelledby={groupId(letter)}>
      <svelte:element this={tag} id={groupId(letter)} class="letter">{letter === '#' ? 'Numbers and symbols' : letter}</svelte:element>
      <dl>
        {#each entries as e}
          <dt>{e.term}</dt>
          <dd>
            {e.def}{#if chapter === undefined && e.chapter !== undefined}<span class="ch"> Covered in depth in Chapter {e.chapter}.</span>{/if}
          </dd>
        {/each}
      </dl>
    </section>
  {:else}
    <p>No glossary entries match this chapter.</p>
  {/each}
</div>

<style>
  .glossary-list { overflow-wrap: anywhere; }
  nav ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--tessera-spacing-sm);
    margin: 0 0 var(--tessera-spacing-lg);
    padding: 0;
    list-style: none;
  }
  nav a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.75rem;
    min-height: 2.75rem;
    border: 1px solid var(--tessera-border);
    border-radius: 6px;
    color: var(--tessera-primary);
    text-decoration: underline;
    font-weight: 600;
  }
  nav a:focus-visible { outline: var(--tessera-focus-ring, 2px solid var(--tessera-primary)); outline-offset: 2px; }
  .letter {
    margin-top: var(--tessera-spacing-lg);
    padding-bottom: var(--tessera-spacing-sm);
    border-bottom: 1px solid var(--tessera-border);
    scroll-margin-top: var(--tessera-spacing-lg);
  }
  dl { margin: 0; }
  dt {
    margin-top: var(--tessera-spacing-md);
    font-weight: 700;
    color: var(--tessera-text);
  }
  dd {
    margin: var(--tessera-spacing-sm) 0 0;
    color: var(--tessera-text);
    line-height: var(--tessera-line-height, 1.6);
  }
  .ch { color: var(--tessera-text-light); }
  @media (min-width: 40rem) {
    dd { margin-left: var(--tessera-spacing-lg); }
  }
</style>
