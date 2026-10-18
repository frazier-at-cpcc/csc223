<script module>
  export const pageConfig = { title: 'Chapter 0 Glossary' };
</script>

<script>
  import GlossaryList from '$shared/GlossaryList.svelte';
  import { glossary } from '$shared/glossary.js';

  // Core Concepts terms are taught in depth in later chapters, so GlossaryList (filtered by chapter) omits them.
  const core = [
    'token', 'parameter', 'weights', 'forward-pass', 'prefill', 'decode', 'kv-cache', 'gpu', 'vram', 'latency',
    'throughput', 'instance', 'replica',
  ].map((id) => glossary[id]);
</script>

<h1>Chapter 0 Glossary</h1>

<p>
  This page lists the series definitions for the terms this chapter introduces. The same definitions appear in every
  chapter of the series.
</p>

<h2>Core Concepts</h2>

<p>Section 02 introduced these terms. Later chapters teach each one in depth.</p>

<dl class="core">
  {#each core as e (e.term)}
    <dt>{e.term}</dt>
    <dd>{e.def} Covered in depth in Chapter {e.chapter}.</dd>
  {/each}
</dl>

<h2>Terms Defined in This Chapter</h2>

<GlossaryList chapter={0} headingLevel={3} />

<style>
  .core dt {
    margin-top: var(--tessera-spacing-md);
    font-weight: 700;
  }
  .core dd {
    margin: var(--tessera-spacing-sm) 0 0;
  }
  @media (min-width: 40rem) {
    .core dd {
      margin-left: var(--tessera-spacing-lg);
    }
  }
</style>
