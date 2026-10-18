<script>
  /** @type {{ code: string; caption: string; language?: string }} */
  let { code, caption, language = '' } = $props();
</script>

<figure class="figure">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <pre tabindex="0"><code class={language ? `language-${language}` : undefined}>{code}</code></pre>
  <figcaption>{caption}</figcaption>
</figure>
