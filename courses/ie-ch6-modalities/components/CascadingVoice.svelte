<script>
  // Figure 6.6: cascading multi-model voice pipeline.
  import Figure from './Figure.svelte';
  const uid = $props.id();
  const stages = ['VAD', 'ASR', 'LLM', 'TTS'];
  const x = (i) => 40 + i * 170;
  const description =
    'A user speaks. The audio flows through four models in order: a voice activity detection (VAD) model, an automatic speech recognition (ASR) model, a large language model (LLM), and a text-to-speech (TTS) model. The TTS output returns to the user as speech, which closes the loop. Each arrow between models is a hand-off between separate models in the pipeline.';
</script>

<Figure number="6.6" caption="Most voice-based applications use a cascading approach with a multi-model pipeline." {description}>
  <svg viewBox="0 0 680 200" role="img" aria-label="Cascading voice pipeline: user to VAD, ASR, LLM, TTS, and back to the user">
    <defs>
      <marker id="arrow-{uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#0b5cad" />
      </marker>
    </defs>
    <circle cx="340" cy="40" r="26" fill="#e6f0fa" stroke="#0b5cad" stroke-width="1.5" />
    <text x="340" y="41" text-anchor="middle" dominant-baseline="middle" font-size="14" font-weight="700">User</text>
    <polyline points="314,40 80,40 80,126" fill="none" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <polyline points="600,128 600,40 368,40" fill="none" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <text x="196" y="30" text-anchor="middle" font-size="12">Speech in</text>
    <text x="484" y="30" text-anchor="middle" font-size="12">Speech out</text>
    {#each stages as s, i}
      <rect x={x(i)} y="130" width="80" height="44" rx="5" fill="#e6f0fa" stroke="#0b5cad" stroke-width="1.5" />
      <text x={x(i) + 40} y="153" text-anchor="middle" dominant-baseline="middle" font-size="16" font-weight="700">{s}</text>
      {#if i < stages.length - 1}
        <line x1={x(i) + 80} y1="152" x2={x(i + 1) - 4} y2="152" stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
      {/if}
    {/each}
  </svg>
</Figure>
