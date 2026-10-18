<script>
  import Figure from './Figure.svelte';
  const mem = [0, 1, 2, 3, 4, 5, 6, 7];
  const cmp = [0, 1, 2, 3, 4, 5, 6];
  // Example 3g.40gb instance: memory slices 0-3 (40 GB), compute slices 0-2.
  const memSel = (i) => i < 4;
  const cmpSel = (i) => i < 3;
</script>

<Figure
  caption="Figure 3.5: An H100 has eight memory slices and seven compute slices for assembling multi-instance GPU instances. The highlighted example is the 3g.40gb profile."
  description="The top row shows eight memory slices of 10 GB each, for 80 GB of VRAM. The bottom row shows seven equal compute slices followed by a narrow box labeled leftover SMs, which is not a slice and stays idle. Hatched slices with heavy outlines mark one example instance, the 3g.40gb profile. It combines three of the seven compute slices with four memory slices, or 40 GB, which is half of the VRAM. The profile pairs three compute slices with four memory slices, not three."
>
  <svg viewBox="0 0 640 250" role="img" aria-labelledby="mig-title">
    <title id="mig-title">H100 multi-instance GPU slices with the 3g.40gb profile highlighted</title>
    <defs>
      <pattern id="mig-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="#cfe2f7" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#0066cc" stroke-width="3" />
      </pattern>
    </defs>
    <text x="20" y="16" class="ie-svg-small">Memory slices</text>
    {#each mem as i (i)}
      <rect
        x={20 + i * 75}
        y="24"
        width="75"
        height="50"
        class={memSel(i) ? 'ie-svg-selected' : 'ie-svg-box'}
        fill={memSel(i) ? 'url(#mig-hatch)' : undefined}
      />
      <rect x={34 + i * 75} y="38" width="47" height="22" class="ie-svg-chip" />
      <text x={57 + i * 75} y="54" text-anchor="middle" class="ie-svg-small">10 GB</text>
    {/each}
    <text x="20" y="104" class="ie-svg-small">Compute slices</text>
    {#each cmp as i (i)}
      <rect
        x={20 + i * 80}
        y="112"
        width="80"
        height="50"
        class={cmpSel(i) ? 'ie-svg-selected' : 'ie-svg-box'}
        fill={cmpSel(i) ? 'url(#mig-hatch)' : undefined}
      />
      <rect x={33 + i * 80} y="126" width="54" height="22" class="ie-svg-chip" />
      <text x={60 + i * 80} y="142" text-anchor="middle" class="ie-svg-small">Compute</text>
    {/each}
    <rect x="580" y="112" width="40" height="50" class="ie-svg-future" />
    <line x1="584" y1="116" x2="616" y2="158" class="ie-svg-line" />
    <line x1="616" y1="116" x2="584" y2="158" class="ie-svg-line" />
    <rect x="20" y="186" width="22" height="16" class="ie-svg-selected" fill="url(#mig-hatch)" />
    <text x="50" y="199" class="ie-svg-small">3g.40gb example: 3 of 7 compute slices with 4 memory slices (40 GB)</text>
    <rect x="20" y="214" width="22" height="16" class="ie-svg-future" />
    <text x="50" y="227" class="ie-svg-small">Leftover SMs: not a slice, they stay idle</text>
  </svg>
</Figure>
