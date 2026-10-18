<script module>
  export const pageConfig = { title: 'NVIDIA Architecture Timeline' };
</script>

<script>
  import ArchitectureTimeline from '../../../components/ArchitectureTimeline.svelte';
</script>

<h1>NVIDIA Architecture Timeline</h1>

<p>Since 1998, NVIDIA has named its GPU architectures after prominent scientists.</p>

<ArchitectureTimeline />

<h2>Generations in use today</h2>
<p>
  GPU architectures go back decades, but inference engineers generally work with the three to five most recent
  generations. Newer architectures perform better. Their efficiency also often makes them more cost-effective
  for large-scale traffic, even for cost-sensitive workloads.
</p>
<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Where each architecture appears in practice</caption>
    <thead>
      <tr><th scope="col">Architecture</th><th scope="col">Example GPUs</th><th scope="col">Typical use today</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Turing</th><td>T4</td><td>Low-traffic or legacy systems</td></tr>
      <tr><th scope="row">Ampere</th><td>A10, A100</td><td>Low-traffic or legacy systems</td></tr>
      <tr><th scope="row">Ada Lovelace</th><td>L4, L40</td><td>Low-cost inference on small models</td></tr>
      <tr><th scope="row">Hopper</th><td>H100, H200</td><td>Mainstream production inference</td></tr>
      <tr><th scope="row">Blackwell</th><td>B200, B300</td><td>Highest-performance production inference</td></tr>
      <tr><th scope="row">Rubin</th><td>Not yet released</td><td>Expected in 2026</td></tr>
      <tr><th scope="row">Feynman</th><td>Not yet released</td><td>Expected in 2028</td></tr>
    </tbody>
  </table>
</div>
<p>
  Hopper and Blackwell offer low-precision Tensor Cores, high-bandwidth memory, and inference-focused features.
  The next lesson examines each current architecture in turn.
</p>
