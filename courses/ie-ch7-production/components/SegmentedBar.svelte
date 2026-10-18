<script>
  // Figures 7.9 and 7.16: a timeline split into stages whose widths show relative duration.
  // segments: [{ label, size, alt? }]; size is a relative width, not a measured time.
  let { title, segments } = $props();
</script>

<p class="ie-segbar-title">{title}</p>
<ol class="ie-segbar">
  {#each segments as s}
    <li class:ie-seg-alt={s.alt} style="flex: {s.size} 1 0">{s.label}</li>
  {/each}
</ol>
