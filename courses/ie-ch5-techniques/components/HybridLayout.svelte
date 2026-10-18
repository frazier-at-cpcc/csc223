<script>
  import Figure from './Figure.svelte';

  const gpus = [0, 1, 2, 3, 4, 5, 6, 7];
  const rows = [
    ['Attention heads', '8 query heads, 1 KV head', 'Attention is split by KV head'],
    ['QKV and output weights', '1/8 shard', 'Linear weights are sharded by Tensor Parallelism'],
    ['Expert router', 'Full copy', 'The router is replicated, not sharded'],
    ['Experts', '16 whole experts', 'Experts are distributed by Expert Parallelism'],
  ];
</script>

<Figure
  number="5.15"
  caption="This deployment uses Tensor Parallelism for attention and Expert Parallelism for the sparse MoE layer."
  description="One decoder layer of an MoE model with 64 query heads, 8 KV heads, and 128 experts, served on eight GPUs. Every GPU holds the same share: 8 query heads and 1 KV head of attention, one eighth of the QKV and output weights, a full copy of the expert router, and 16 whole experts."
>
  <div class="ie-table-wrap">
    <table class="ie-table">
      <caption>What each of eight GPUs holds for one decoder layer</caption>
      <thead>
        <tr>
          <th scope="col">Component</th>
          <th scope="col">Per GPU (GPU 0 to GPU {gpus.length - 1})</th>
          <th scope="col">Strategy</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as [c, per, why] (c)}
          <tr><th scope="row">{c}</th><td>{per}</td><td>{why}</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</Figure>
