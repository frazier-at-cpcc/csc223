<script module>
  export const pageConfig = { title: 'NVIDIA Architecture Timeline' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import ArchitectureTimeline from '../../../components/ArchitectureTimeline.svelte';
</script>

<h1>NVIDIA Architecture Timeline</h1>

<p>
  Since 1998, NVIDIA has named its GPU architectures after prominent scientists. The figure shows the
  architectures from 2017 onward, and the table below adds the GPUs and typical use of each.
</p>

<ArchitectureTimeline />

<h2>Generations in use today</h2>
<p>
  GPU architectures go back decades, but inference engineers generally work with the three to five most recent
  generations. Newer architectures perform better. Their efficiency also often makes them more cost-effective
  for large-scale traffic, even for cost-sensitive workloads.
</p>
<div class="ie-table-wrap" role="region" aria-label="Where each architecture appears in practice, as of October 2026" use:scrollable>
  <table class="ie-table">
    <caption>Where each architecture appears in practice, as of October 2026</caption>
    <thead>
      <tr><th scope="col">Architecture</th><th scope="col">Example GPUs</th><th scope="col">Typical use today</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Turing</th><td>T4</td><td>Low-traffic or legacy systems</td></tr>
      <tr><th scope="row">Ampere</th><td>A10, A100</td><td>Low-traffic or legacy systems</td></tr>
      <tr><th scope="row">Ada Lovelace</th><td>L4, L40</td><td>Low-cost inference on small models</td></tr>
      <tr><th scope="row">Hopper</th><td>H100, H200</td><td>Mainstream production inference</td></tr>
      <tr><th scope="row">Blackwell</th><td>B200, B300</td><td>Highest-performance production inference</td></tr>
      <tr><th scope="row">Rubin</th><td>Vera <Term id="rubin">Rubin</Term> rack-scale systems</td><td>First systems announced for the second half of 2026</td></tr>
      <tr><th scope="row">Feynman</th><td>Not yet announced in detail</td><td>Planned for 2028</td></tr>
    </tbody>
  </table>
</div>
<p>
  Hopper and Blackwell offer low-precision Tensor Cores, high-bandwidth memory, and inference-focused features.
  The next lesson examines each current architecture in turn.
</p>
