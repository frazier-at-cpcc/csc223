<script>
  import BookFigure from './BookFigure.svelte';

  const tokens = ['Great', ' question', '!', ' The', ' key', ' insight', ' is', '...'];
</script>

<BookFigure
  number="1.4"
  caption="TTFT is the time it takes to generate the first token, while TPS measures how quickly subsequent tokens are generated."
  alt="A timeline of a streamed response. A waiting period before the first token is labeled TTFT. The stream of tokens that follows is labeled TPS."
  description="A horizontal timeline runs from left to right. The left portion is an empty dashed segment during which the user sees nothing; a bracket beneath it is labeled TTFT, time to first token. The right portion shows the response arriving one token at a time: Great, question, exclamation mark, The, key, insight, is, followed by an ellipsis. A bracket beneath the tokens is labeled TPS, tokens per second, which describes how quickly the tokens after the first one arrive."
>
  <div class="stream">
    <div class="wait">
      <div class="track waiting"><span>waiting for the first token</span></div>
      <div class="bracket"></div>
      <p class="bracket-label">TTFT</p>
    </div>
    <div class="output">
      <div class="track tokens">
        {#each tokens as t}<span class="token">{t}</span>{/each}
      </div>
      <div class="bracket"></div>
      <p class="bracket-label">TPS</p>
    </div>
  </div>
</BookFigure>

<style>
  .stream {
    display: grid;
    grid-template-columns: 3fr 7fr;
    gap: 0.5rem;
    min-width: 32rem;
  }
  .track {
    min-height: 2.5rem;
    display: flex;
    align-items: center;
  }
  .waiting {
    border-bottom: 2px dashed var(--tessera-text-light);
    justify-content: center;
    font-style: italic;
    font-size: 0.85rem;
    color: var(--tessera-text);
  }
  .tokens {
    flex-wrap: wrap;
    gap: 0.2rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  .token {
    padding: 0.15rem 0.3rem;
    border: 1px solid var(--tessera-primary);
    border-radius: 3px;
    background: var(--tessera-bg);
    white-space: pre;
  }
  .bracket {
    margin-top: 0.35rem;
    height: 0.6rem;
    border: 2px solid var(--tessera-text);
    border-bottom: none;
  }
  .bracket-label {
    margin: 0.25rem 0 0;
    text-align: center;
    font-weight: 700;
  }
</style>
