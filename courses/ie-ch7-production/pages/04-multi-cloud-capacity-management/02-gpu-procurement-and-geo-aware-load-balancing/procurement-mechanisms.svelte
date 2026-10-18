<script module>
  export const pageConfig = { title: 'Procurement Mechanisms' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Procurement Mechanisms</h1>

<p>Cloud GPUs are bought through three mechanisms.</p>
<div class="ie-table-wrap" role="region" aria-label="Procurement Mechanisms table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Mechanism</th><th scope="col">Terms</th><th scope="col">Cost</th></tr>
  </thead>
  <tbody>
    <tr><td>Reserved</td><td>Blocks of hundreds or thousands of GPUs held for months or years</td><td>Discounted</td></tr>
    <tr><td>On-demand</td><td>Individual instances available as needed, up to a quota</td><td>Relatively high per hour</td></tr>
    <tr><td>Spot</td><td>On-demand instances that the provider can pre-empt after an agreed notice period, often minutes</td><td>Discounted</td></tr>
  </tbody>
</table>
</div>

<h2>Blending Sources</h2>
<p>
  Large-scale inference generally blends all three. Low-cost reserved <Term id="instance">instances</Term> cover the baseline load that is always
  present. A mix of on-demand and spot instances handles traffic peaks. These GPUs are spread across several clusters
  worldwide so that capacity sits near end users.
</p>

<Signal kind="worked" title="Sizing a blended plan">
  <p>A service needs 200 GPUs at all hours and up to 320 GPUs at its daily peak.</p>
  <ol>
    <li>Baseline that never goes away: 200 GPUs. Reserve them at the discounted rate.</li>
    <li>Peak above the baseline: 320 − 200 = 120 GPUs.</li>
    <li>Cover the 120 peak GPUs with on-demand and spot capacity, and release them when the peak passes.</li>
  </ol>
  <p>
    Spot capacity can be reclaimed on short notice, so the team keeps enough on-demand capacity in the peak mix to
    absorb a reclaim while <Term id="autoscaling">autoscaling</Term> finds replacements.
  </p>
</Signal>
