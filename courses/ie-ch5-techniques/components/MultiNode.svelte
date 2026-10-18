<script>
  import Figure from './Figure.svelte';

  const nodes = ['First node', 'Second node'];
  const gpus = [0, 1, 2, 3, 4, 5, 6, 7];
</script>

<Figure
  number="5.16"
  caption="InfiniBand enables multi-node inference across more than eight GPUs through a high-bandwidth node-to-node interconnect."
  description="Two nodes, each with eight B200 GPUs. Inside each node, NVLink connects every GPU through NVSwitch chips at very high bandwidth. The two nodes connect to each other through InfiniBand, which is much slower than NVLink."
>
  {#each nodes as n, i (n)}
    <div class="ie-node">
      <p style="margin: 0 0 0.25rem;"><strong>{n}</strong>: eight GPUs linked by NVLink through NVSwitch</p>
      <div class="ie-row">
        {#each gpus as g (g)}
          <span class="ie-gpu">B200</span>
        {/each}
      </div>
    </div>
    {#if i === 0}
      <p class="ie-arrow" style="margin: 0.25rem 0;">
        <span aria-hidden="true">↕</span> <strong style="font-size: 0.95rem;">InfiniBand</strong>
        <span style="font-size: 0.85rem;">(slower than NVLink)</span>
      </p>
    {/if}
  {/each}
</Figure>
