<script module>
  export const pageConfig = { title: 'Chapter 5 Glossary' };
</script>

<script>
  import GlossaryList from '$shared/GlossaryList.svelte';
</script>

<h1>Chapter 5 Glossary</h1>
<p>
  These are the series definitions of the terms this chapter teaches. Each one matches the definition that appears
  when you select a dotted-underlined term on a page.
</p>

<GlossaryList chapter={5} headingLevel={2} />
