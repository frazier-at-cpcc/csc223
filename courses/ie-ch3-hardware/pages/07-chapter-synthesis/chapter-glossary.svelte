<script module>
  export const pageConfig = { title: 'Chapter 3 Glossary' };
</script>

<script>
  import GlossaryList from '$shared/GlossaryList.svelte';
</script>

<h1>Chapter 3 Glossary</h1>

<p>
  These are the series glossary entries that this chapter teaches. The same definitions appear when you select a
  marked term on any page. Terms from other chapters, such as prefill, decode, and the KV cache, appear in the
  glossaries of the chapters that teach them.
</p>

<GlossaryList chapter={3} headingLevel={2} />
