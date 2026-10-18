<script>
  import Figure from './Figure.svelte';
  const slots = [0, 1, 2, 3, 4, 5, 6, 7];
  // Example 3-slice instance: memory slices 0-3 (40 GB), compute slices 1-3.
  const memSel = (i) => i < 4;
  const cmpSel = (i) => i >= 1 && i <= 3;
</script>

<Figure
  caption="Figure 3.5: An H100 has eight memory slices and seven compute slices for assembling multi-instance GPU instances."
  description="The top row shows eight memory slices of 10 GB each, for 80 GB of VRAM. The bottom row shows eight positions: the first is crossed out because the leftover Streaming Multiprocessors stay idle, and the remaining seven are compute slices. Hatched slices with heavy outlines mark one example three-slice instance. It combines three of the seven compute slices with four memory slices, or 40 GB, which is half of the VRAM."
>
  <svg viewBox="0 0 640 240" role="img" aria-labelledby="mig-title">
    <title id="mig-title">H100 multi-instance GPU slices with an example three-slice instance</title>
    <defs>
      <pattern id="mig-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="#cfe2f7" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#0066cc" stroke-width="3" />
      </pattern>
    </defs>
    <text x="20" y="16" class="ie-svg-small">Memory slices</text>
    {#each slots as i (i)}
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
    {#each slots as i (i)}
      <rect
        x={20 + i * 75}
        y="112"
        width="75"
        height="50"
        class={cmpSel(i) ? 'ie-svg-selected' : 'ie-svg-box'}
        fill={cmpSel(i) ? 'url(#mig-hatch)' : undefined}
      />
      {#if i === 0}
        <line x1="26" y1="118" x2="89" y2="156" class="ie-svg-line" />
        <line x1="89" y1="118" x2="26" y2="156" class="ie-svg-line" />
      {:else}
        <rect x={30 + i * 75} y="126" width="55" height="22" class="ie-svg-chip" />
        <text x={57 + i * 75} y="142" text-anchor="middle" class="ie-svg-small">Compute</text>
      {/if}
    {/each}
    <rect x="20" y="186" width="22" height="16" class="ie-svg-selected" fill="url(#mig-hatch)" />
    <text x="50" y="199" class="ie-svg-small">Example 3-slice instance: 3 of 7 compute slices, 4 memory slices (40 GB)</text>
    <line x1="20" y1="218" x2="42" y2="232" class="ie-svg-line" />
    <line x1="42" y1="218" x2="20" y2="232" class="ie-svg-line" />
    <text x="50" y="230" class="ie-svg-small">Leftover SMs that do not fill a slice stay idle</text>
  </svg>
</Figure>
