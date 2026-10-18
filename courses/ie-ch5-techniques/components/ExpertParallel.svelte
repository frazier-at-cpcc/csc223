<script>
  import Figure from './Figure.svelte';

  const gpus = [0, 1, 2, 3];
</script>

<Figure
  number="5.14"
  caption="Expert Parallelism runs each expert within a single GPU, with each GPU hosting multiple experts."
  description="Sixteen experts are spread across four B200 GPUs. GPU 0 hosts experts E0 to E3, GPU 1 hosts E4 to E7, GPU 2 hosts E8 to E11, and GPU 3 hosts E12 to E15. Each expert is whole and lives on exactly one GPU."
>
  <div class="ie-cols">
    {#each gpus as g (g)}
      <div class="ie-gpu">
        <div class="ie-gpu-label">B200 GPU {g}</div>
        <div class="ie-row" style="justify-content: center; margin-top: 0.25rem;">
          {#each [0, 1, 2, 3] as k (k)}
            <span class="ie-box" style="padding: 0.2rem 0.4rem;">E{g * 4 + k}</span>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</Figure>
