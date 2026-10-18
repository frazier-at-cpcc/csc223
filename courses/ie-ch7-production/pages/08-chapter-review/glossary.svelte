<script module>
  export const pageConfig = { title: 'Chapter 7 Glossary' };
</script>

<script>
  import GlossaryList from '$shared/GlossaryList.svelte';
</script>

<h1>Chapter 7 Glossary</h1>
<p>
  These terms are defined in this chapter. Each definition matches the one that appears when you select a term in the
  lessons, and the same definitions are used across the whole series.
</p>
<GlossaryList chapter={7} headingLevel={2} />
