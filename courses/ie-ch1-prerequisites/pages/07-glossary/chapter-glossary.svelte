<script module>
  export const pageConfig = { title: 'Chapter 1 Glossary' };
</script>

<script>
  import GlossaryList from '$shared/GlossaryList.svelte';
</script>

<h1>Chapter 1 Glossary</h1>

<p>
  These are the terms that Chapter 1 teaches in depth.
  The definitions are shared across the whole series, so each term means the same thing in every chapter.
  Review them before the chapter quiz.
</p>

<GlossaryList chapter={1} headingLevel={2} />
