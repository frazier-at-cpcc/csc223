<script>
  import Figure from './Figure.svelte';

  const prefix = 'Look at the';
  const symbols = { unverified: '?', accepted: '✓', rejected: '✗', discarded: '–', generated: '+' };
  const rows = [
    {
      label: 'Draft tokens',
      tokens: [
        ['tel', 'unverified'],
        ['le', 'unverified'],
        ['vis', 'unverified'],
        ['ion', 'unverified'],
      ],
    },
    {
      label: 'Verification',
      tokens: [
        ['tel', 'accepted'],
        ['le', 'accepted'],
        ['vis', 'rejected'],
        ['ion', 'discarded'],
      ],
    },
    {
      label: 'Final tokens',
      tokens: [
        ['tel', 'accepted'],
        ['le', 'accepted'],
        ['scope', 'generated'],
      ],
    },
  ];
</script>

<Figure number="0.2" caption="Runtime performance optimizations like speculation, diagrammed here, improve inference latency.">
  <ol class="spec">
    {#each rows as row (row.label)}
      <li class="row">
        <p class="row-label">{row.label}</p>
        <ul class="tokens" aria-label="{row.label} after the prompt '{prefix}'">
          <li class="prefix">{prefix}</li>
          {#each row.tokens as [text, status], i (i)}
            <li class="token {status}">
              <span class="text">{text}</span>
              <span class="status"><span aria-hidden="true">{symbols[status]}</span> {status}</span>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ol>
  {#snippet description()}
    <p>The figure shows one speculative decoding step for the prompt "Look at the" in three rows.</p>
    <ol>
      <li>Draft tokens: the drafting step proposes four unverified tokens, "tel", "le", "vis", and "ion".</li>
      <li>
        Verification: the model accepts "tel" and "le" and rejects "vis". The model discards "ion" because it follows a
        rejected token.
      </li>
      <li>
        Final tokens: the output keeps "tel" and "le" and adds the model's own generated token "scope". The step yields
        three tokens, "telescope", from a single forward pass.
      </li>
    </ol>
  {/snippet}
</Figure>

<style>
  .spec,
  .tokens {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .row {
    margin-bottom: var(--tessera-spacing-md);
  }
  .row-label {
    margin: 0 0 0.25rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.85rem;
    color: #14532d;
  }
  .tokens {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  .tokens li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 4.5rem;
    padding: 0.4rem 0.6rem;
    border: 2px solid #1f7a4d;
    background: #f1faf5;
    color: #14532d;
  }
  .prefix {
    font-size: 1.05rem;
  }
  .text {
    font-size: 1.05rem;
  }
  .status {
    font-size: 0.75rem;
    font-family: var(--tessera-font-family);
  }
  .token.unverified {
    border-style: dashed;
    background: #ffffff;
  }
  .token.rejected {
    border-color: #b91c1c;
    background: #fef2f2;
    color: #7f1d1d;
  }
  .token.discarded {
    border-style: dotted;
    background: #f3f4f6;
    color: #374151;
  }
  .token.discarded .text {
    text-decoration: line-through;
  }
  .token.generated {
    border-width: 3px;
    background: #dcfce7;
  }
</style>
