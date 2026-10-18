<script>
  // Figure 7.5: a Kubernetes control plane schedules containers onto several worker nodes.
  const workers = [0, 1, 2, 3];
</script>

<svg viewBox="0 0 520 240" role="img" aria-label="One control plane box on the left connects by lines to four worker node boxes stacked on the right.">
  <rect x="30" y="90" width="170" height="60" rx="4" fill="var(--ie-accent-soft)" stroke="var(--ie-accent)" stroke-width="2" />
  <text class="ie-svg-text" x="115" y="125" text-anchor="middle" font-size="15" font-weight="600">Control plane</text>
  {#each workers as w}
    {@const y = 20 + w * 55}
    <path d="M200,120 C260,120 260,{y + 20} 330,{y + 20}" fill="none" stroke="var(--ie-line)" stroke-width="2" />
    <rect x="330" {y} width="160" height="40" rx="4" fill="var(--ie-surface)" stroke="var(--ie-accent)" stroke-width="2" />
    <text class="ie-svg-text" x="410" y={y + 25} text-anchor="middle" font-size="14">Worker node {w + 1}</text>
  {/each}
</svg>
