<script>
  // Figure 7.10: a dictation pipeline where each model scales on its own hardware.
  const mig = [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1],
  ];
</script>

<svg viewBox="0 0 560 250" role="img" aria-label="Dictation pipeline. Audio flows into a Whisper transcription step that runs on five H100 MIG slices, then into an LLM step that runs on two full B200 nodes, which outputs a document.">
  <text class="ie-svg-text" x="280" y="20" text-anchor="middle" font-size="15" font-weight="600">Dictation pipeline</text>
  <!-- Audio input -->
  {#each [6, 14, 24, 10, 30, 18, 8, 22, 12, 6] as h, i}
    <line x1={20 + i * 5} y1={200 - h} x2={20 + i * 5} y2={200 + h} stroke="var(--ie-ink)" stroke-width="2" />
  {/each}
  <text class="ie-svg-text" x="42" y="244" text-anchor="middle" font-size="12">Audio</text>
  <line x1="74" y1="200" x2="124" y2="200" stroke="var(--ie-line)" stroke-width="2" marker-end="url(#ie-arrow-cs)" />
  <!-- Whisper step and its MIG slices -->
  <rect x="130" y="180" width="140" height="40" rx="4" fill="var(--ie-accent-soft)" stroke="var(--ie-accent)" stroke-width="2" />
  <text class="ie-svg-text" x="200" y="205" text-anchor="middle" font-size="14" font-weight="600">Whisper</text>
  {#each mig as [col, row]}
    <rect x={135 + col * 68} y={130 - row * 42} width="62" height="36" rx="3" fill="var(--ie-surface)" stroke="var(--ie-accent)" stroke-dasharray="4 3" />
    <text class="ie-svg-text" x={166 + col * 68} y={152 - row * 42} text-anchor="middle" font-size="11">H100 MIG</text>
  {/each}
  <line x1="270" y1="200" x2="320" y2="200" stroke="var(--ie-line)" stroke-width="2" marker-end="url(#ie-arrow-cs)" />
  <!-- LLM step and its nodes -->
  <rect x="326" y="180" width="140" height="40" rx="4" fill="var(--ie-accent-soft)" stroke="var(--ie-accent)" stroke-width="2" />
  <text class="ie-svg-text" x="396" y="205" text-anchor="middle" font-size="14" font-weight="600">LLM</text>
  {#each [0, 1] as n}
    <rect x={331 + n * 68} y="130" width="62" height="36" rx="3" fill="var(--ie-surface)" stroke="var(--ie-accent)" stroke-dasharray="4 3" />
    <text class="ie-svg-text" x={362 + n * 68} y="152" text-anchor="middle" font-size="11">B200 node</text>
  {/each}
  <line x1="466" y1="200" x2="506" y2="200" stroke="var(--ie-line)" stroke-width="2" marker-end="url(#ie-arrow-cs)" />
  <!-- Output document -->
  <path d="M512,175 h26 l12,12 v38 h-38 z" fill="var(--ie-surface)" stroke="var(--ie-ink)" stroke-width="2" />
  <text class="ie-svg-text" x="530" y="244" text-anchor="middle" font-size="12">Document</text>
  <defs>
    <marker id="ie-arrow-cs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--ie-line)" />
    </marker>
  </defs>
</svg>
