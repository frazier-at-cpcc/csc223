<script>
  const rows = [
    ['A', '.0001'],
    ['Ab', '.0004'],
    ['Abr', '.0001'],
    ['Abs', '.6987'],
    ['Ace', '.0020'],
    ['Acr', '.0001'],
    ['Act', '.0983'],
    ['…', '…'],
    ['Zym', '.0001'],
    ['ZZZ', '.0007'],
  ];
</script>

<ol class="ie-flow" aria-label="Decode output stages">
  <li>
    <span class="ie-flow__step">1. Vocabulary and logits</span>
    <table class="ie-table">
      <caption class="ie-flow__note">One logit per vocabulary token</caption>
      <thead><tr><th scope="col">Token</th><th scope="col">Logit</th></tr></thead>
      <tbody>
        {#each rows as [tok, logit]}
          <tr><td>{tok}</td><td>{logit}</td></tr>
        {/each}
      </tbody>
    </table>
  </li>
  <li class="ie-flow__model">
    <span class="ie-flow__step">2. Predictions</span>
    <span class="ie-flow__note">After normalization, the most likely tokens are:</span>
    <ul>
      <li>Abs: 80%</li>
      <li>Act: 12%</li>
      <li>All others share the rest</li>
    </ul>
  </li>
  <li>
    <span class="ie-flow__step">3. Next token</span>
    <span class="ie-flow__note">A weighted random draw selects <code>Abs</code>.</span>
  </li>
</ol>
