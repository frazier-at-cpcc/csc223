<script module>
  export const pageConfig = { title: 'Multi-Node Inference and Network Fabrics' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import { Callout } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import MultiNodeTopology from '../../../components/MultiNodeTopology.svelte';
</script>

<h1>Multi-Node Inference and Network Fabrics</h1>

<p>
  Some workloads need more than eight GPUs. Running inference across nodes requires a network fabric between
  them. Each GPU in a node usually has its own <strong>network interface controller (NIC)</strong>, the card that
  connects it to that fabric, so an eight-GPU node carries eight NICs.
</p>

<h2>Two fabrics for node-to-node traffic</h2>
<dl>
  <dt><strong>InfiniBand</strong></dt>
  <dd>
    A network fabric built for high-performance computing. NVIDIA agreed to acquire Mellanox, the main maker of
    InfiniBand equipment, in 2019 and completed the purchase in 2020.
  </dd>
  <dt><strong>RDMA over Converged Ethernet (RoCE)</strong></dt>
  <dd>
    Ethernet configured to carry the same direct memory transfers that InfiniBand provides. NVIDIA's Spectrum-X
    Ethernet platform is one example, and many of the largest AI clusters use RoCE.
  </dd>
</dl>

<h2>Speed is not the difference</h2>
<p>
  As of October 2026, current NICs run at 400 to 800 gigabits per second (Gb/s) on both fabrics. The NVIDIA
  ConnectX-7 adapter runs at 400 Gb/s, and the ConnectX-8 adapter runs at 800 Gb/s, over either InfiniBand or
  Ethernet. Neither fabric is faster as a rule.
</p>
<p>The fabrics differ in how they move data and how much delay they add.</p>
<ul>
  <li>
    <strong>Remote direct memory access (RDMA)</strong> moves data straight from the memory of one machine into the
    memory of another without involving either <Term id="cpu">CPU</Term>. With GPUDirect RDMA, the NIC reads and writes GPU memory
    directly. InfiniBand provides RDMA natively. Ethernet provides it through RoCE.
  </li>
  <li>
    <strong>Latency.</strong> InfiniBand is lossless by design and has very low, predictable latency. RoCE reaches
    similar latency when operators configure the Ethernet network so that it does not drop packets under load.
  </li>
  <li>
    <strong>Operations.</strong> Ethernet uses the tools, switches, and skills that most datacenters already have.
    InfiniBand requires its own switches and management software.
  </li>
</ul>

<MultiNodeTopology />

<h2>The cross-node link is the slow link</h2>
<p>
  Whichever fabric a cluster uses, the network between nodes is about an order of magnitude slower than NVLink
  inside a node. An 800 Gb/s NIC moves 100 GB/s in each direction. A Blackwell GPU's NVLink moves about 900 GB/s
  in each direction. Traffic that crosses nodes therefore saturates the network first.
</p>

<Signal kind="mistake" title="Ranking InfiniBand above Ethernet">
  <p>
    Older material describes InfiniBand as the fastest node-to-node interconnect and caps Ethernet at 100 Gb/s.
    That ranking is out of date. Both fabrics reach 800 Gb/s per NIC, and the choice between them turns on
    latency, RDMA support, and operations.
  </p>
</Signal>

<Callout type="important">
  <p>
    Cloud providers differ in their fabrics. Some use InfiniBand, some use RoCE Ethernet, some build their own
    networks, and some offer a fast fabric only on certain GPU types. Before provisioning, confirm which fabric
    the <Term id="instance">instance</Term> provides, how many NICs each node has, and what bandwidth each NIC delivers.
  </p>
</Callout>
