<script>
  // Illustrative raw logits. Softmax over the full vocabulary gives Abs about 80 percent and Act about 12 percent,
  // because exp(9.2 - 7.3) is about 6.7, the ratio of 80 to 12.
  const rows = [
    ['A', '-1.5'],
    ['Ab', '0.4'],
    ['Abr', '-2.1'],
    ['Abs', '9.2'],
    ['Ace', '2.6'],
    ['Acr', '-0.8'],
    ['Act', '7.3'],
    ['…', '…'],
    ['Zym', '-3.0'],
    ['ZZZ', '1.1'],
  ];
</script>

<ol class="ie-flow" aria-label="Stages from logits to the next token">
  <li>
    <span class="ie-flow__step">1. Vocabulary and logits</span>
    <table class="ie-table">
      <caption class="ie-flow__note">One raw score per vocabulary token</caption>
      <thead><tr><th scope="col">Token</th><th scope="col">Logit</th></tr></thead>
      <tbody>
        {#each rows as [tok, logit]}
          <tr><td>{tok}</td><td>{logit}</td></tr>
        {/each}
      </tbody>
    </table>
  </li>
  <li class="ie-flow__model">
    <span class="ie-flow__step">2. Softmax</span>
    <span class="ie-flow__note">Softmax turns the logits into probabilities that sum to one:</span>
    <ul>
      <li>Abs: 80%</li>
      <li>Act: 12%</li>
      <li>All others share the remaining 8%</li>
    </ul>
  </li>
  <li>
    <span class="ie-flow__step">3. Next token</span>
    <span class="ie-flow__note">A weighted random draw selects <code>Abs</code>.</span>
  </li>
</ol>
