<script>
  // Signaling callout for the four recurring teaching moves. The icon is decorative;
  // the visible label carries the meaning.
  let { kind, chapter, title, children } = $props();

  const KINDS = {
    worked: { label: 'Worked example', path: 'M4 4h16v16H4z M8 9h8 M8 13h8 M8 17h5' },
    recall: { label: 'Recall', path: 'M3 12a9 9 0 1 0 3-6.7 M3 4v5h5 M12 7v5l3 2' },
    try: { label: 'Try it', path: 'M7 4l12 8-12 8z' },
    mistake: { label: 'Common mistake', path: 'M12 3l10 18H2z M12 10v5 M12 18v.01' },
    summary: { label: 'Chapter synthesis', path: 'M4 6h16 M4 12h16 M4 18h10' },
  };
  const k = KINDS[kind];
  const label = kind === 'recall' && chapter !== undefined ? `Recall from Chapter ${chapter}` : k.label;
</script>

<aside class="signal signal-{kind}" aria-label={title ? `${label}: ${title}` : label}>
  <p class="signal-label">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path d={k.path} fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span>{label}{#if title}: {title}{/if}</span>
  </p>
  <div class="signal-body">{@render children?.()}</div>
</aside>

<style>
  .signal {
    margin: var(--tessera-spacing-lg) 0;
    padding: var(--tessera-spacing-md) var(--tessera-spacing-lg);
    border: 1px solid var(--tessera-border);
    border-left: 4px solid var(--signal-color);
    border-radius: 6px;
    background: var(--tessera-bg-secondary);
  }
  .signal-worked { --signal-color: var(--tessera-primary); }
  .signal-recall { --signal-color: #7c3aed; }
  .signal-try { --signal-color: var(--tessera-success); }
  .signal-mistake { --signal-color: var(--tessera-warning); }
  .signal-summary { --signal-color: var(--tessera-primary-dark); }
  .signal-label {
    display: flex;
    align-items: center;
    gap: var(--tessera-spacing-sm);
    margin: 0 0 var(--tessera-spacing-sm);
    font-weight: 700;
    color: var(--tessera-text);
  }
  .signal-label svg { color: var(--signal-color); flex: none; }
  .signal-body :global(> :first-child) { margin-top: 0; }
  .signal-body :global(> :last-child) { margin-bottom: 0; }
</style>
