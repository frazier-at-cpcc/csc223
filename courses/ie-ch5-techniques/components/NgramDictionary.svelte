<script>
  import Figure from './Figure.svelte';

  const suffixes = ['AutoModelForSequenceClassification', 'AutoTokenizer', 'TrainingArguments'];
</script>

<Figure
  number="5.6"
  caption="An n-gram dictionary matches prefixes to likely suffixes. It is especially useful for constrained languages such as code."
  description="The prefix 'from transformers import' maps to three suffixes observed in the input: AutoModelForSequenceClassification, AutoTokenizer, and TrainingArguments. Any of these suffixes can serve as draft tokens when the model generates the prefix again."
>
  <div class="ie-row" style="justify-content: center;">
    <div class="ie-box is-strong"><code>from transformers import</code></div>
    <span class="ie-arrow" aria-hidden="true">→</span>
    <ul class="ie-flow" aria-label="Observed suffixes">
      {#each suffixes as s (s)}
        <li class="ie-box"><code>{s}</code></li>
      {/each}
    </ul>
  </div>
</Figure>
