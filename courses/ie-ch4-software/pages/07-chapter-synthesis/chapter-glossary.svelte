<script module>
  export const pageConfig = { title: 'Chapter 4 Glossary' };
</script>

<script>
  import GlossaryList from '$shared/GlossaryList.svelte';
</script>

<h1>Chapter 4 Glossary</h1>

<p>
  These are the series glossary terms that this chapter teaches in depth. The
  same definitions appear wherever a term is marked in the course.
</p>

<GlossaryList chapter={4} headingLevel={2} />
