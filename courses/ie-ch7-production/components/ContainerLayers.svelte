<script>
  // Figure 7.1: a container is a stack of read-only image layers under one writable layer.
  const layers = [
    { name: 'Container layer', access: 'Read-write', writable: true },
    { name: 'Image layer', access: 'Read only' },
    { name: 'Image layer', access: 'Read only' },
    { name: 'Image layer', access: 'Read only' },
    { name: 'Base image', access: 'Read only' },
  ];
</script>

<svg viewBox="0 0 560 300" role="img" aria-label="Stack of five container layers. A base image sits at the bottom, three read-only image layers sit above it, and a read-write container layer sits on top.">
  {#each layers as layer, i}
    {@const y = 20 + i * 54}
    <rect
      x="30" {y} width="300" height="40" rx="4"
      fill={layer.writable ? '#ffffff' : 'var(--ie-accent-soft)'}
      stroke="var(--ie-accent)"
      stroke-width="2"
      stroke-dasharray={layer.writable ? '6 4' : 'none'}
    />
    <text class="ie-svg-text" x="180" y={y + 25} text-anchor="middle" font-size="15" font-weight="600">{layer.name}</text>
    <line x1="330" y1={y + 20} x2="370" y2={y + 20} stroke="var(--ie-line)" stroke-width="2" />
    <rect x="370" {y} width="150" height="40" rx="4" fill="#ffffff" stroke="var(--ie-muted)" stroke-width="1.5" />
    <text class="ie-svg-text" x="445" y={y + 25} text-anchor="middle" font-size="14">{layer.access}</text>
  {/each}
</svg>
