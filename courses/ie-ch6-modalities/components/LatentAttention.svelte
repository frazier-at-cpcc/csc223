<script>
  // Figure 6.8, redrawn as a mechanism: a video latent adds a time dimension, so the number of
  // positions grows linearly with frames while attention pairs grow with the square of positions.
  import Figure from './Figure.svelte';

  const side = 4;
  const frames = 4;
  const cell = 18;
  const imagePositions = side * side; // 16
  const videoPositions = imagePositions * frames; // 64
  const imagePairs = imagePositions ** 2; // 256
  const videoPairs = videoPositions ** 2; // 4,096
  const barMax = 300;
  const grid = Array.from({ length: side * side }, (_, i) => [i % side, Math.floor(i / side)]);

  const description =
    'On the left, an image latent is a 4 by 4 grid of 16 positions, with width and height only. On the right, a video latent stacks four such grids along a time axis, for 64 positions. Two pairs of bars compare them. Positions grow from 16 to 64, four times as many, which is how much more work the linear layers do. Attention pairs, every position compared with every other position, grow from 256 to 4,096, sixteen times as many. Because attention work grows with the square of the sequence length while linear-layer work grows in proportion to it, attention takes 70 to 80 percent of compute time in video generation models.';
</script>

<Figure
  number="6.8"
  caption="Video generation models take text prompts and may take keyframes or other media. Their latent adds a time dimension, so attention pairs grow with the square of the number of positions. Grid sizes are illustrative."
  {description}
>
  <svg viewBox="0 0 760 330" role="img" aria-label="A 4 by 4 image latent with 16 positions beside a four-frame video latent with 64 positions; bars show positions growing 4 times and attention pairs growing 16 times">
    <text x="90" y="22" text-anchor="middle" font-size="14" font-weight="700">Image latent</text>
    <text x="90" y="40" text-anchor="middle" font-size="12">width × height</text>
    <g transform="translate(54, 54)">
      {#each grid as [c, r]}
        <rect x={c * cell} y={r * cell} width={cell - 2} height={cell - 2} fill="#e6f0fa" stroke="#0b5cad" stroke-width="1" />
      {/each}
    </g>
    <text x="90" y="148" text-anchor="middle" font-size="12">{imagePositions} positions</text>

    <text x="330" y="22" text-anchor="middle" font-size="14" font-weight="700">Video latent</text>
    <text x="330" y="40" text-anchor="middle" font-size="12">width × height × time</text>
    {#each { length: frames } as _, f}
      <g transform="translate({250 + f * 30}, {96 - f * 14})">
        {#each grid as [c, r]}
          <rect x={c * cell} y={r * cell} width={cell - 2} height={cell - 2} fill={f === frames - 1 ? '#e6f0fa' : '#ffffff'} stroke="#0b5cad" stroke-width="1" />
        {/each}
      </g>
    {/each}
    <text x="340" y="190" text-anchor="middle" font-size="12">{frames} latent frames offset in time, {videoPositions} positions</text>

    <text x="470" y="40" font-size="13" font-weight="700">Positions (linear-layer work)</text>
    <rect x="470" y="50" width={(barMax * imagePositions) / videoPositions} height="20" fill="#e6f0fa" stroke="#0b5cad" />
    <text x={476 + (barMax * imagePositions) / videoPositions} y="65" font-size="12">image {imagePositions}</text>
    <rect x="470" y="76" width={barMax * 0.94} height="20" fill="#0b5cad" />
    <text x="476" y="91" font-size="12" style="fill:#ffffff">video {videoPositions} (4 ×)</text>

    <text x="470" y="128" font-size="13" font-weight="700">Attention pairs (attention work)</text>
    <rect x="470" y="138" width={Math.max(3, (barMax * imagePairs) / videoPairs)} height="20" fill="#e6f0fa" stroke="#0b5cad" />
    <text x={480 + (barMax * imagePairs) / videoPairs} y="153" font-size="12">image {imagePairs.toLocaleString('en-US')}</text>
    <rect x="470" y="164" width={barMax * 0.94} height="20" fill="#0b5cad" />
    <text x="476" y="179" font-size="12" style="fill:#ffffff">video {videoPairs.toLocaleString('en-US')} (16 ×)</text>

    <rect x="20" y="226" width="720" height="84" rx="6" fill="#ffffff" stroke="#0b5cad" stroke-width="1.5" stroke-dasharray="6 4" />
    <text x="380" y="252" text-anchor="middle" font-size="13">Each bar pair is scaled to the video value.</text>
    <text x="380" y="274" text-anchor="middle" font-size="13">Four times the positions means sixteen times the attention pairs.</text>
    <text x="380" y="296" text-anchor="middle" font-size="13" font-weight="700">In video models, attention takes 70 to 80 percent of compute time.</text>
  </svg>
</Figure>
