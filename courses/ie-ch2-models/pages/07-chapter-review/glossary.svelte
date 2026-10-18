<script module>
  export const pageConfig = { title: 'Chapter 2 Glossary' };
</script>

<script>
  import GlossaryList from '$shared/GlossaryList.svelte';
</script>

<h1>Chapter 2 Glossary</h1>

<p>
  These are the terms this chapter teaches in depth, with the same definitions every course in the series uses.
  Review them before the chapter quiz.
</p>

<GlossaryList chapter={2} headingLevel={2} />
