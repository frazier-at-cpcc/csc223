<script module>
  export const pageConfig = { title: 'Chapter 6 Glossary' };
</script>

<script>
  import GlossaryList from '$shared/GlossaryList.svelte';
</script>

<h1>Chapter 6 Glossary</h1>

<p>
  These terms are taught in this chapter. The definitions match the series glossary, so the same term
  means the same thing in every chapter. Terms from earlier chapters appear as underlined links on the
  lesson pages, where you can open their definitions.
</p>

<GlossaryList chapter={6} headingLevel={2} />
