<script>
  import BookFigure from './BookFigure.svelte';

  // Teacher's next-token distribution for the prompt "The capital of Australia is".
  const soft = [
    { token: 'Canberra', p: 82 },
    { token: 'Sydney', p: 11 },
    { token: 'Melbourne', p: 4 },
    { token: 'the', p: 2 },
    { token: 'a', p: 1 },
  ];
  const panels = [
    { title: 'Knowledge distillation trains on the full distribution', rows: soft },
    { title: 'Fine-tuning on teacher-generated text trains on one token', rows: soft.map((r, i) => ({ token: r.token, p: i === 0 ? 100 : 0 })) },
  ];
</script>

<BookFigure
  number="1.3"
  caption="The two training signals a large teacher model can provide. Knowledge distillation passes on the teacher's probability for every candidate token. Fine-tuning on teacher-generated text passes on only the token the teacher wrote."
  alt="Two bar charts for the prompt 'The capital of Australia is'. The left chart shows the teacher's probabilities: Canberra 82 percent, Sydney 11, Melbourne 4, the 2, a 1. The right chart shows a single bar of 100 percent for Canberra and zero for every other token."
  description="Both panels use the prompt 'The capital of Australia is' and the same five candidate next tokens. The left panel, labeled knowledge distillation, shows the teacher model's full probability distribution: Canberra 82 percent, Sydney 11 percent, Melbourne 4 percent, the 2 percent, and a 1 percent. The student learns all of these values, including that Sydney is a far more plausible mistake than the word 'a'. The right panel, labeled fine-tuning on teacher-generated text, shows only the token the teacher actually wrote, Canberra, at 100 percent and every other token at 0 percent. The student learns the answer but not how the teacher ranked the alternatives."
>
  <p class="prompt">Prompt: <q>The capital of Australia is</q></p>
  <div class="panels">
    {#each panels as panel}
      <div class="panel">
        <p class="panel-title">{panel.title}</p>
        <ul class="bars">
          {#each panel.rows as r}
            <li>
              <span class="tok">{r.token}</span>
              <span class="track"><span class="bar" style="width: {r.p}%"></span></span>
              <span class="val">{r.p}%</span>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</BookFigure>

<style>
  .prompt {
    margin: 0 0 var(--tessera-spacing-md);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  .panels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
    gap: var(--tessera-spacing-lg);
  }
  .panel-title {
    margin: 0 0 var(--tessera-spacing-sm);
    font-weight: 600;
  }
  .bars {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.35rem;
  }
  .bars li {
    display: grid;
    grid-template-columns: 5.5rem 1fr 3rem;
    align-items: center;
    gap: 0.5rem;
  }
  .tok {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  .track {
    height: 1rem;
    border: 1px solid var(--tessera-text-light);
    border-radius: 3px;
    background: var(--tessera-bg);
  }
  .bar {
    display: block;
    height: 100%;
    background: var(--tessera-primary);
  }
  .val {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
</style>
