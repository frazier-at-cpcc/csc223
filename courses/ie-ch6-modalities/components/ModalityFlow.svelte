<script>
  // Input -> model -> output flow used for Figures 6.1, 6.2, 6.4, 6.6, 6.8 and 6.10.
  // Labels split onto two lines at "|".
  import Figure from './Figure.svelte';

  let { number, caption, description, alt, inputs, model, output } = $props();
  const uid = $props.id();

  const rowH = 64;
  const height = $derived(Math.max(150, inputs.length * rowH + 40));
  const mid = $derived(height / 2);
  const lines = (s) => s.split('|');
  const inputY = (i) => mid - (inputs.length * rowH) / 2 + i * rowH + 8;
</script>

<Figure {number} {caption} {description}>
  <svg viewBox="0 0 640 {height}" role="img" aria-label={alt}>
    <defs>
      <marker id="arrow-{uid}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#0b5cad" />
      </marker>
    </defs>

    {#each inputs as label, i}
      <rect x="16" y={inputY(i)} width="160" height="48" rx="6" fill="#e6f0fa" stroke="#0b5cad" stroke-width="1.5" />
      {#each lines(label) as line, j}
        <text x="96" y={inputY(i) + 24 + (j - (lines(label).length - 1) / 2) * 17} text-anchor="middle" dominant-baseline="middle" font-size="15">{line}</text>
      {/each}
      <line x1="176" y1={inputY(i) + 24} x2="200" y2={inputY(i) + 24} stroke="#0b5cad" stroke-width="1.5" />
    {/each}
    <line x1="200" y1={inputY(0) + 24} x2="200" y2={inputY(inputs.length - 1) + 24} stroke="#0b5cad" stroke-width="1.5" />
    <line x1="200" y1={mid} x2="236" y2={mid} stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />

    <rect x="240" y={mid - 40} width="160" height="80" rx="6" fill="#ffffff" stroke="#0b5cad" stroke-width="2" stroke-dasharray="6 4" />
    {#each lines(model) as line, j}
      <text x="320" y={mid + (j - (lines(model).length - 1) / 2) * 19} text-anchor="middle" dominant-baseline="middle" font-size="16" font-weight="700">{line}</text>
    {/each}

    <line x1="400" y1={mid} x2="456" y2={mid} stroke="#0b5cad" stroke-width="1.5" marker-end="url(#arrow-{uid})" />
    <rect x="462" y={mid - 26} width="162" height="52" rx="6" fill="#e6f0fa" stroke="#0b5cad" stroke-width="1.5" />
    {#each lines(output) as line, j}
      <text x="543" y={mid + (j - (lines(output).length - 1) / 2) * 17} text-anchor="middle" dominant-baseline="middle" font-size="15">{line}</text>
    {/each}

    <text x="96" y={height - 8} text-anchor="middle" font-size="12">Input</text>
    <text x="320" y={height - 8} text-anchor="middle" font-size="12">Model</text>
    <text x="543" y={height - 8} text-anchor="middle" font-size="12">Output</text>
  </svg>
</Figure>
