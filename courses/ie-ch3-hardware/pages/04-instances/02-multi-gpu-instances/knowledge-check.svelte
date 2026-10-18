<script module>
  export const pageConfig = { title: 'Knowledge Check: Multi-GPU Instances' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Multi-GPU Instances</h1>
<p>These practice items are ungraded. Each one gives feedback that explains the answer.</p>

<p class="ie-obj">Objective 7: Determine which interconnect limits a data path</p>
<Sorting
  id="kc_link_places"
  question="Sort each link by the connection it carries."
  items={['NVLink', 'NVSwitch', 'InfiniBand NIC', 'RoCE Ethernet NIC', 'PCIe Gen5', 'NVLink Chip to Chip']}
  targets={['GPU to GPU inside a node', 'Node to node', 'CPU to GPU']}
  correct={[0, 0, 1, 1, 2, 2]}
  correctFeedback="Correct. NVLink and NVSwitch join GPUs inside a node, InfiniBand and RoCE NICs join nodes, and PCIe or Grace's NVLink Chip to Chip joins a CPU to its GPUs."
  incorrectFeedback="Place each link by its endpoints. NVLink and NVSwitch stay inside the node. Both InfiniBand and RoCE Ethernet are node-to-node fabrics. PCIe and NVLink Chip to Chip carry host-to-GPU traffic."
/>

<p class="ie-obj">Objective 7: Determine which interconnect limits a data path</p>
<NumericQuestion
  id="kc_gbps"
  question="An older cluster uses NICs rated at 200 Gb/s. How many gigabytes per second does one NIC move in each direction?"
  answer={25}
  unit="GB/s"
  correctFeedback="Correct. One byte is eight bits, so 200 Gb/s ÷ 8 = 25 GB/s, far below the hundreds of GB/s that NVLink provides."
  incorrectFeedback="Divide gigabits by 8 to get gigabytes: 200 Gb/s ÷ 8 = 25 GB/s in each direction."
/>

<p class="ie-obj">Objective 7: Determine which interconnect limits a data path</p>
<MultipleChoice
  id="kc_cross_node"
  question="A model is split across two B200 nodes, and each GPU has one 800 Gb/s NIC. Which link is most likely to become the communication bottleneck?"
  options={['The network link between the nodes', 'The NVLink links inside each node', 'The NVSwitch inside each node']}
  correct={0}
  optionFeedback={[
    'Correct. Each NIC moves 100 GB/s in each direction, while Blackwell NVLink moves about 900 GB/s in each direction. Cross-node traffic saturates the network first, whether it runs InfiniBand or RoCE Ethernet.',
    'Incorrect. NVLink on Blackwell moves about 900 GB/s in each direction, roughly nine times the network link.',
    'Incorrect. NVSwitch runs at NVLink speed inside the node. The slower link sits between the nodes.',
  ]}
/>
