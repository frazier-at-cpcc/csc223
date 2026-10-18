<script>
  const tokens = [
    ['In', 644],
    ['ference', 2251],
    [' engineering', 15000],
    [' makes', 3727],
    [' AI', 15502],
    [' apps', 10721],
    [' fast', 5043],
    ['.', 13],
  ];
</script>

<p style="text-align:center">Text: <code>Inference engineering makes AI apps fast.</code></p>
<ul class="ie-stats" aria-label="Counts for the example sentence">
  <li><span class="ie-stat-value">8</span> tokens</li>
  <li><span class="ie-stat-value">41</span> characters</li>
  <li><span class="ie-stat-value">6</span> words</li>
</ul>
<ol class="ie-tokens" aria-label="Tokens with their token IDs">
  {#each tokens as [text, id]}
    <li>
      <span class="ie-token-text">{text.replace(' ', '·')}</span>
      <span class="ie-token-id">ID {id}</span>
    </li>
  {/each}
</ol>
<p style="text-align:center;font-size:0.85rem">A middle dot (·) marks a leading space that belongs to the token.</p>
