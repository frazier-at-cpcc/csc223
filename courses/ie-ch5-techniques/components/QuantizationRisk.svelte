<script>
  import Figure from './Figure.svelte';

  const rows = [
    { name: 'Weights (linear layers)', risk: 'Low', pct: 20 },
    { name: 'Activations', risk: 'Low', pct: 35 },
    { name: 'KV cache', risk: 'Moderate', pct: 65 },
    { name: 'Attention', risk: 'High', pct: 95 },
  ];
</script>

<Figure
  number="5.2"
  caption="Quantization risk is low for weights and activations, moderate for the KV cache, and high for attention."
  description="A ranked list of four model components from least to most risky to quantize: weights in the linear layers carry low risk, activations carry low risk, the KV cache carries moderate risk, and attention carries high risk."
>
  <ol class="ie-flow">
    {#each rows as r (r.name)}
      <li class="ie-box">
        <div class="ie-row" style="justify-content: space-between;">
          <span>{r.name}</span><strong>{r.risk} risk</strong>
        </div>
        <div class="ie-meter" aria-hidden="true"><span style="width: {r.pct}%"></span></div>
      </li>
    {/each}
  </ol>
</Figure>
