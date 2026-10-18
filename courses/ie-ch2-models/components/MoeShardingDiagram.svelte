<script>
  // One layer of Qwen3-235B-A22B on eight GPUs: 128 experts, 16 per GPU, 64 query heads, 4 KV heads.
  const selected = new Set([3, 17, 40, 41, 77, 90, 101, 126]);
  const gpus = [0, 1, 2, 3, 4, 5, 6, 7].map((g) => ({
    g,
    experts: Array.from({ length: 16 }, (_, i) => g * 16 + i),
    kv: Math.floor(g / 2),
  }));
</script>

<ul class="moe-gpus">
  {#each gpus as { g, experts, kv } (g)}
    {@const picked = experts.filter((e) => selected.has(e)).length}
    <li class="moe-gpu">
      <p class="moe-name">GPU {g}</p>
      <p class="moe-row">Attention: query heads {g * 8} to {g * 8 + 7}, KV head {kv}</p>
      <p class="moe-row">Router: full copy</p>
      <p class="moe-row">Experts {g * 16} to {g * 16 + 15}, {picked} selected:</p>
      <ul class="moe-experts">
        {#each experts as e (e)}
          {#if selected.has(e)}
            <li class="moe-sel"><span aria-hidden="true">✓</span>{e}<span class="ie-vh"> (selected)</span></li>
          {:else}
            <li>{e}</li>
          {/if}
        {/each}
      </ul>
    </li>
  {/each}
</ul>
<p class="moe-key">A check mark and a heavy outline mark the 8 experts the router selects for one example token.</p>
