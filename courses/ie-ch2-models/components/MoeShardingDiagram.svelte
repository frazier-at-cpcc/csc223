<script>
  const gpus = [0, 1, 2, 3, 4, 5, 6, 7];
</script>

<p>One decoder layer of Qwen3-235B-A22B, spread across eight GPUs. All 94 layers follow the same layout.</p>
<table class="ie-table">
  <caption>What each GPU holds for one decoder layer</caption>
  <thead>
    <tr>
      <th scope="col">GPU</th>
      <th scope="col">Attention (Q, K, V, O weights and heads)</th>
      <th scope="col">Router</th>
      <th scope="col">Experts</th>
    </tr>
  </thead>
  <tbody>
    {#each gpus as g}
      <tr>
        <th scope="row">GPU{g}</th>
        <td>Slice {g + 1} of 8</td>
        <td>Full copy</td>
        <td>{g * 16} to {g * 16 + 15}</td>
      </tr>
    {/each}
  </tbody>
</table>
<ul>
  <li>Attention is sharded. Linear weights are split across GPUs with tensor parallelism, and attention is split by KV head.</li>
  <li>The router is replicated. Every GPU runs the full router, so expert routing is not shared.</li>
  <li>The experts are sharded by Expert Parallelism. Each GPU holds 16 of the 128 experts, and the router sends each token to 8 experts.</li>
</ul>
