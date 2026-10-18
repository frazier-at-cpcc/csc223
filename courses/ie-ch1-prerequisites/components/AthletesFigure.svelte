<script>
  import BookFigure from './BookFigure.svelte';

  const specialists = [
    { trait: 'Size', athlete: 'Sumo wrestler', note: 'maximizes size' },
    { trait: 'Speed', athlete: 'Olympic sprinter', note: 'maximizes speed' },
    { trait: 'Strength', athlete: 'Champion powerlifter', note: 'maximizes strength' },
  ];
</script>

<BookFigure
  number="1.1"
  caption="Inference services, like elite athletes, are specialized for the demands of their workloads."
  alt="A football player who balances size, speed, and strength, compared with three specialists who each maximize one trait."
  description="On the left, a football player is big, fast, and strong, and is balanced for the demands of one position across a full season. Three branches lead from the player to three specialists. The size branch leads to a sumo wrestler, who maximizes size. The speed branch leads to an Olympic sprinter, who maximizes speed. The strength branch leads to a champion powerlifter, who maximizes strength. The football player exceeds none of the specialists on any single trait, yet is the best fit for football."
>
  <div class="athletes">
    <div class="generalist">
      <p class="name">Football player</p>
      <p>Big, fast, and strong</p>
      <p>Balanced for one position across a full season</p>
    </div>
    <ul class="branches">
      {#each specialists as s}
        <li>
          <span class="trait">{s.trait}</span>
          <span class="arrow" aria-hidden="true">&rarr;</span>
          <span class="specialist"><span class="name">{s.athlete}</span> {s.note}</span>
        </li>
      {/each}
    </ul>
  </div>
</BookFigure>

<style>
  .athletes {
    display: flex;
    flex-wrap: wrap;
    gap: var(--tessera-spacing-md);
    align-items: center;
  }
  .generalist {
    flex: 1 1 12rem;
    padding: var(--tessera-spacing-md);
    border: 2px solid var(--tessera-primary);
    border-radius: 6px;
    background: var(--tessera-bg);
  }
  .generalist p {
    margin: 0.25rem 0;
  }
  .name {
    font-weight: 700;
  }
  .branches {
    flex: 2 1 18rem;
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--tessera-spacing-sm);
  }
  .branches li {
    display: grid;
    grid-template-columns: 6rem 2rem 1fr;
    align-items: center;
  }
  .trait {
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--tessera-border);
    border-radius: 4px;
    background: var(--tessera-bg);
    text-align: center;
  }
  .arrow {
    text-align: center;
    font-size: 1.25rem;
  }
  .specialist {
    padding: 0.25rem 0.5rem;
    border: 1px dashed var(--tessera-primary);
    border-radius: 4px;
    background: var(--tessera-bg);
  }
</style>
