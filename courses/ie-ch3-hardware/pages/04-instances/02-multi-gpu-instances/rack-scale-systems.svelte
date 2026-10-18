<script module>
  export const pageConfig = { title: 'Rack-Scale Systems and Relative Bandwidth' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
</script>

<h1>Rack-Scale Systems and Relative Bandwidth</h1>

<h2>NVLink beyond eight GPUs</h2>
<p>
  NVIDIA also offers a high-end alternative to a node-to-node network: it extends NVLink past a single node. The
  <strong>NVL72</strong> GB200 system combines 72 Blackwell GPUs and 36 Grace CPUs in one rack, all in a single
  NVLink domain. It delivers massive <Term id="throughput">throughput</Term> for serving the largest models under heavy traffic.
</p>
<p>
  NVIDIA announced the Vera <Term id="rubin">Rubin</Term> NVL144 CPX in 2025 as the next generation of this system. It pairs Vera CPUs and
  Rubin GPUs with the Rubin CPX chip for <Term id="prefill">prefill</Term>.
</p>

<h2>Comparing links on the same basis</h2>
<p>
  Multi-GPU and multi-node systems form a topology with fast and slow links. Spec sheets quote these links on
  different bases. NVLink figures count both directions per GPU, while NIC figures count one direction per NIC
  and use bits rather than bytes. The last column below converts every link to gigabytes per second in each
  direction.
</p>
<div class="ie-table-wrap" role="region" aria-label="Interconnect bandwidths from this chapter, as of October 2026" use:scrollable>
  <table class="ie-table">
    <caption>Interconnect bandwidths from this chapter, as of October 2026</caption>
    <thead>
      <tr>
        <th scope="col">Link</th>
        <th scope="col">Connects</th>
        <th scope="col">Quoted figure</th>
        <th scope="col">Basis of the quoted figure</th>
        <th scope="col">Each direction</th>
      </tr>
    </thead>
    <tbody>
      <tr><th scope="row">NVLink (Blackwell)</th><td>GPU to GPU within a node</td><td>1,800 GB/s</td><td>Per GPU, both directions</td><td>900 GB/s</td></tr>
      <tr><th scope="row">NVLink (Hopper)</th><td>GPU to GPU within a node</td><td>900 GB/s</td><td>Per GPU, both directions</td><td>450 GB/s</td></tr>
      <tr><th scope="row">NVLink Chip to Chip</th><td>Grace CPU to GPU</td><td>900 GB/s</td><td>Per superchip link, both directions</td><td>450 GB/s</td></tr>
      <tr><th scope="row">PCIe Gen5 x16</th><td>CPU to GPU in a standard server</td><td>128 GB/s</td><td>Per GPU, both directions</td><td>64 GB/s</td></tr>
      <tr><th scope="row">InfiniBand or RoCE NIC, 800 Gb/s</th><td>Node to node</td><td>800 Gb/s</td><td>Per NIC, each direction</td><td>100 GB/s</td></tr>
      <tr><th scope="row">InfiniBand or RoCE NIC, 400 Gb/s</th><td>Node to node</td><td>400 Gb/s</td><td>Per NIC, each direction</td><td>50 GB/s</td></tr>
    </tbody>
  </table>
</div>
<p>
  Note the units. NVLink is quoted in gigabytes per second (GB/s) and NICs in gigabits per second (Gb/s). One
  byte is eight bits, so divide a Gb/s figure by 8 to get GB/s: 800 Gb/s equals 100 GB/s. Nodes usually carry one
  NIC per GPU, so each GPU has its own share of the network.
</p>

<h2>Placing traffic on the fastest links</h2>
<p>
  An interconnect that is an order of magnitude faster can carry far more data before it becomes the bottleneck.
  The parallelism techniques in Chapter 5's Model Parallelism section, and the
  <Term id="disaggregation">disaggregation</Term> techniques in its Disaggregation section, navigate this
  topology. They place the heaviest communication on the fastest links. For example, a deployment that spans
  two nodes keeps tensor parallelism, which communicates in every layer, inside each NVLink domain. It splits the
  layers across nodes with <Term id="pipeline-parallelism">pipeline parallelism</Term>, which passes far less
  data over the slower network.
</p>
