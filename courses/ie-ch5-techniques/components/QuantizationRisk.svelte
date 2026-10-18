<script>
  import Figure from './Figure.svelte';

  // Ordinal ranking only. The book gives no measured risk values, so the figure shows rank, not magnitude.
  const rows = [
    { name: 'Weights (linear layers)', risk: 'Low' },
    { name: 'Activations', risk: 'Low to moderate' },
    { name: 'KV cache', risk: 'Moderate' },
    { name: 'Attention', risk: 'High' },
  ];
</script>

<Figure
  number="5.2"
  caption="Quantization risk ranked from least to most sensitive component. The ranking is ordinal: it orders the components without measuring the size of the risk."
  description="An ordered list of four model components from least to most risky to quantize. First, weights in the linear layers carry low risk. Second, activations carry low to moderate risk. Third, the KV cache carries moderate risk. Fourth, attention carries high risk."
>
  <ol class="ie-flow">
    {#each rows as r, i (r.name)}
      <li class="ie-box">
        <div class="ie-row" style="justify-content: space-between;">
          <span>{i + 1}. {r.name}</span><strong>{r.risk} risk</strong>
        </div>
      </li>
      {#if i < rows.length - 1}<li class="ie-arrow" aria-hidden="true">↓ more sensitive</li>{/if}
    {/each}
  </ol>
</Figure>
