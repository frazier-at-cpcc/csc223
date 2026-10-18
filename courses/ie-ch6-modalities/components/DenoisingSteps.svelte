<script>
  // Figure 6.7 (stylized): the outline forms in early denoising steps; late steps add detail.
  // The guidance band below the panels is an addition that illustrates the guidance trick.
  import Figure from './Figure.svelte';
  const uid = $props.id();

  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const panels = [
    { label: 'Step 1', noise: 260, clarity: 0.12 },
    { label: 'Step 10', noise: 130, clarity: 0.5 },
    { label: 'Step 30', noise: 45, clarity: 0.85 },
    { label: 'Step 50', noise: 0, clarity: 1 },
  ].map((p) => ({
    ...p,
    dots: Array.from({ length: p.noise }, () => [rand() * 136, rand() * 136]),
  }));
  const px = (i) => 20 + i * 170;

  const description =
    'Four panels show one image at denoising steps 1, 10, 30 and 50 of a 50-step run. At step 1 the panel is almost entirely random noise. By step 10 the rough outline of a cat is visible through the noise. By step 30 the outline is clear and only light noise remains. At step 50 the image is complete and sharp. A band below the panels shows a guidance schedule added for this course: steps 1 through 30 run with guidance on, which takes two forward passes per step, and steps 31 through 50 run with guidance off, which takes one pass per step. The run therefore makes 80 passes instead of 100.';
</script>

<Figure number="6.7" caption="Diffusion is a step-by-step process, and the general outline of the image is established in early steps. The guidance band is an addition to the book figure." {description}>
  <svg viewBox="0 0 700 300" role="img" aria-label="Four denoising steps from noise to a clear image, with guidance on for steps 1 to 30 and off for steps 31 to 50">
    <defs>
      <clipPath id="clip-{uid}"><rect x="0" y="0" width="136" height="136" rx="4" /></clipPath>
      <pattern id="hatch-{uid}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="#ffffff" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#0b5cad" stroke-width="2" />
      </pattern>
    </defs>

    {#each panels as p, i}
      <g transform="translate({px(i)}, 16)">
        <rect width="136" height="136" rx="4" fill="#e6f0fa" stroke="#0b5cad" stroke-width="1.5" />
        <g clip-path="url(#clip-{uid})">
          <g opacity={p.clarity} fill="#0b5cad">
            <polygon points="38,58 46,26 62,48" />
            <polygon points="98,58 90,26 74,48" />
            <circle cx="68" cy="74" r="36" />
          </g>
          <g opacity={p.clarity} fill="#ffffff">
            <circle cx="55" cy="68" r="5" />
            <circle cx="81" cy="68" r="5" />
            <polygon points="64,82 72,82 68,88" />
          </g>
          {#each p.dots as [dx, dy]}
            <rect x={dx} y={dy} width="4" height="4" fill="#1f2937" opacity="0.55" />
          {/each}
        </g>
        <text x="68" y="158" text-anchor="middle" font-size="14" font-weight="700">{p.label}</text>
      </g>
    {/each}
    <text x="168" y="208" text-anchor="middle" font-size="13">Early steps: outline forms</text>
    <text x="530" y="208" text-anchor="middle" font-size="13">Later steps: details refined</text>

    <rect x="20" y="222" width="396" height="34" fill="#0b5cad" />
    <rect x="416" y="222" width="264" height="34" fill="url(#hatch-{uid})" stroke="#0b5cad" stroke-width="1.5" />
    <text x="218" y="240" text-anchor="middle" dominant-baseline="middle" font-size="13" style="fill:#ffffff">Guidance on: 2 passes per step</text>
    <rect x="452" y="230" width="192" height="20" fill="#ffffff" />
    <text x="548" y="240" text-anchor="middle" dominant-baseline="middle" font-size="13">Guidance off: 1 pass per step</text>
    <text x="20" y="276" font-size="12">Step 1</text>
    <text x="416" y="276" text-anchor="middle" font-size="12">Step 31</text>
    <text x="680" y="276" text-anchor="end" font-size="12">Step 50</text>
    <text x="350" y="294" text-anchor="middle" font-size="13">30 × 2 + 20 × 1 = 80 forward passes</text>
  </svg>
</Figure>
