<script module>
  export const pageConfig = { title: 'Rack-Scale Systems and Relative Bandwidth' };
</script>

<h1>Rack-Scale Systems and Relative Bandwidth</h1>

<h2>NVLink beyond eight GPUs</h2>
<p>
  NVIDIA also offers a high-end alternative to InfiniBand that extends NVLink past a single node. The
  <strong>NVL72</strong> GB200 system combines 72 Blackwell GPUs and 36 Grace CPUs in a full rack. It delivers
  massive throughput for serving the largest models under heavy traffic.
</p>
<p>
  The NVIDIA Vera Rubin NVL144 CPX is the next generation of this system. It pairs Vera CPUs and Rubin GPUs with the
  new Rubin CPX chip.
</p>

<h2>Keep relative bandwidth in mind</h2>
<p>
  Multi-GPU and multi-node systems form a topology with fast and slow links. An interconnect that is an order of
  magnitude faster can carry far more data before it becomes the bottleneck.
</p>
<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Interconnect bandwidths from this chapter</caption>
    <thead>
      <tr><th scope="col">Link</th><th scope="col">Connects</th><th scope="col">Peak bandwidth</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">NVLink (Blackwell)</th><td>GPU to GPU within a node</td><td>1,800 GB/s</td></tr>
      <tr><th scope="row">NVLink (Hopper)</th><td>GPU to GPU within a node</td><td>900 GB/s</td></tr>
      <tr><th scope="row">NVLink Chip to Chip</th><td>Grace CPU to GPU</td><td>900 GB/s, bidirectional</td></tr>
      <tr><th scope="row">InfiniBand</th><td>Node to node</td><td>400 Gb/s per NIC</td></tr>
      <tr><th scope="row">Ethernet</th><td>Node to node</td><td>100 Gb/s per NIC</td></tr>
    </tbody>
  </table>
</div>
<p>
  Note the units. NVLink is quoted in gigabytes per second (GB/s) and InfiniBand in gigabits per second (Gb/s). One
  byte is eight bits, so 400 Gb/s equals 50 GB/s per NIC.
</p>
<p>
  The parallelism and disaggregation techniques in sections 5.4 and 5.5 navigate this topology. They place the
  heaviest communication on the fastest links.
</p>
