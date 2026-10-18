<script>
  import Figure from './Figure.svelte';

  let { moe = false } = $props();
  const gpus = [0, 1, 2, 3];
  const experts = Array.from({ length: 16 }, (_, i) => `E${i}`);
</script>

{#if moe}
  <Figure
    number="5.13"
    caption="For Mixture of Experts models, each expert runs across multiple GPUs with Tensor Parallelism."
    description="Four B200 GPUs each hold one quarter of every expert, E0 through E15. Each expert's weights are split into four slices, one per GPU, so every GPU participates in every expert's computation."
  >
    <div class="ie-table-wrap">
      <table class="ie-table">
        <caption class="ie-sr-only">Slices of experts E0 to E15 held by each GPU under Tensor Parallelism</caption>
        <tbody>
          {#each gpus as g (g)}
            <tr>
              <th scope="row">B200 GPU {g}</th>
              {#each experts as e (e)}
                <td style="text-align: center; font-size: 0.75rem; padding: 0.25rem;">{e}<br />¼</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Figure>
{:else}
  <Figure
    number="5.12"
    caption="Tensor Parallelism splits weights across GPUs, sharing VRAM to run large models fast."
    description="One block of LLM weights is divided into four horizontal slices. Each of four B200 GPUs holds one slice of every layer. After each layer, the GPUs combine their partial results with an all-reduce before the next layer begins."
  >
    <div class="ie-box is-strong" style="margin-bottom: 0.5rem;">LLM weights: every layer split four ways</div>
    <ul class="ie-flow">
      {#each gpus as g (g)}
        <li class="ie-gpu"><span class="ie-gpu-label">B200 GPU {g}</span>: slice {g + 1} of 4 of every layer</li>
      {/each}
    </ul>
    <p class="ie-box" style="margin-top: 0.5rem;">All-reduce after each layer combines the four partial results</p>
  </Figure>
{/if}
