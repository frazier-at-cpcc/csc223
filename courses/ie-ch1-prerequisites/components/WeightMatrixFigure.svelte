<script>
  import BookFigure from './BookFigure.svelte';

  // mode: 'fine-tune' (Figure 1.2) or 'distill' (Figure 1.3). Values follow the book figures.
  let { mode = 'fine-tune' } = $props();

  const before = [
    [1, 9, 2, 3],
    [5, 0, 7, 6],
    [8, 3, 4, 2],
    [2, 6, 0, 9],
  ];
  const tuned = [
    [6, 9, 2, 4],
    [5, 0, 3, 6],
    [8, 9, 4, 3],
    [2, 6, 1, 9],
  ];
  const distilled = [
    [7, 1, 8],
    [4, 5, 3],
    [9, 2, 6],
  ];

  const fine = $derived(mode === 'fine-tune');
  const after = $derived(fine ? tuned : distilled);
  const changed = (r, c) => fine && before[r][c] !== after[r][c];

  const fig = $derived(fine
    ? {
        number: '1.2',
        caption:
          'Fine-tuning changes the values of the model weights while keeping the same overall architecture.',
        alt: 'A four-by-four weight matrix becomes a four-by-four matrix of the same shape with six values changed.',
        description:
          'Two grids of numbers represent model weights. The left grid has four rows and four columns. An arrow points to a right grid that also has four rows and four columns, so the shape of the model is unchanged. Six values differ between the grids and are outlined and bold in the right grid: the first row changes from 1, 9, 2, 3 to 6, 9, 2, 4; the second row from 5, 0, 7, 6 to 5, 0, 3, 6; the third row from 8, 3, 4, 2 to 8, 9, 4, 3; and the fourth row from 2, 6, 0, 9 to 2, 6, 1, 9.',
      }
    : {
        number: '1.3',
        caption:
          'Distillation preserves the behavior of a large model in a smaller, more efficient model.',
        alt: 'A four-by-four weight matrix becomes a smaller three-by-three matrix with entirely new values.',
        description:
          'Two grids of numbers represent model weights. The left grid, the large teacher model, has four rows and four columns. An arrow points to a right grid, the small student model, which has only three rows and three columns. Every value in the student grid is new: 7, 1, 8 in the first row; 4, 5, 3 in the second; and 9, 2, 6 in the third. The student is a different, smaller set of weights trained to imitate the teacher.',
      });
</script>

<BookFigure {...fig}>
  <div class="matrices">
    <div class="matrix-block">
      <p class="label">{fine ? 'Pre-trained weights' : 'Teacher model (large)'}</p>
      <div class="matrix" style="--cols: 4">
        {#each before as row}
          {#each row as v}<span class="cell">{v}</span>{/each}
        {/each}
      </div>
    </div>
    <span class="arrow" aria-hidden="true">&rarr;</span>
    <div class="matrix-block">
      <p class="label">{fine ? 'Fine-tuned weights (same shape)' : 'Student model (small)'}</p>
      <div class="matrix" style="--cols: {after[0].length}">
        {#each after as row, r}
          {#each row as v, c}<span class="cell" class:changed={changed(r, c)}>{v}</span>{/each}
        {/each}
      </div>
    </div>
  </div>
  {#if fine}
    <p class="legend">Outlined, bold values changed during fine-tuning.</p>
  {/if}
</BookFigure>

<style>
  .matrices {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--tessera-spacing-lg);
  }
  .matrix-block {
    text-align: center;
  }
  .label {
    margin: 0 0 var(--tessera-spacing-sm);
    font-weight: 600;
  }
  .matrix {
    display: inline-grid;
    grid-template-columns: repeat(var(--cols), 2.5rem);
    gap: 0.25rem;
    padding: 0.5rem 0.75rem;
    border-left: 3px solid var(--tessera-text);
    border-right: 3px solid var(--tessera-text);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 1.25rem;
  }
  .cell {
    padding: 0.25rem 0;
    border: 2px solid transparent;
  }
  .cell.changed {
    font-weight: 800;
    border: 2px dashed var(--tessera-primary-dark);
    color: var(--tessera-primary-dark);
  }
  .arrow {
    font-size: 2rem;
  }
  .legend {
    margin: var(--tessera-spacing-sm) 0 0;
    text-align: center;
    font-size: 0.9rem;
  }
</style>
