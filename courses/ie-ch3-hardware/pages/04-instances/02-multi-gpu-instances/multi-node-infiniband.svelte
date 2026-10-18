<script module>
  export const pageConfig = { title: 'Multi-Node Inference and InfiniBand' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import MultiNodeTopology from '../../../components/MultiNodeTopology.svelte';
</script>

<h1>Multi-Node Inference and InfiniBand</h1>

<p>
  Some workloads need more than eight GPUs. Running inference across nodes requires a high-bandwidth interconnect
  between them.
</p>
<p>
  <strong>InfiniBand</strong> is the standard node-to-node interconnect for NVIDIA GPUs. It competes with networking
  technologies such as Ethernet. NVIDIA acquired Mellanox, the manufacturer of InfiniBand, in 2019.
</p>

<h2>Speeds compared</h2>
<ul>
  <li>InfiniBand reaches up to 400 Gb/s per Network Interface Controller (NIC).</li>
  <li>Ethernet reaches up to 100 Gb/s per NIC.</li>
  <li>NVLink inside a node is much faster than either.</li>
</ul>
<p>
  InfiniBand is the fastest node-to-node interconnect on the market. It is still much slower than NVLink.
</p>

<MultiNodeTopology />

<Callout type="important">
  <p>
    Not every cloud provider uses InfiniBand. Some build their own interconnects, and others offer InfiniBand on
    some GPUs but not all. Before provisioning, confirm which interconnect the instance provides and what bandwidth
    it delivers.
  </p>
</Callout>
