<script module>
  export const pageConfig = { title: 'Knowledge Check: Multi-GPU Instances' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Multi-GPU Instances</h1>
<p>These practice questions are ungraded. Each option explains why it is right or wrong.</p>

<MultipleChoice
  id="kc1"
  question="Within a single eight-GPU node, which component lets every GPU communicate with every other GPU at NVLink speed?"
  options={['Ethernet', 'InfiniBand', 'NVSwitch']}
  correct={2}
  optionFeedback={[
    'Incorrect. Ethernet is a node-to-node networking technology and is slower than InfiniBand.',
    'Incorrect. InfiniBand connects separate nodes. It is much slower than NVLink.',
    'Correct. NVSwitch is the all-to-all layer on top of NVLink that coordinates communication among all GPUs in a node.',
  ]}
/>

<MultipleChoice
  id="kc2"
  question="A model is split across two B200 nodes. Which link is most likely to become the communication bottleneck?"
  options={['InfiniBand', 'NVLink', 'NVSwitch']}
  correct={0}
  optionFeedback={[
    'Correct. InfiniBand tops out at 400 Gb/s per NIC, far below NVLink, so cross-node traffic saturates it first.',
    'Incorrect. NVLink on Blackwell provides up to 1,800 GB/s, an order of magnitude more than InfiniBand.',
    'Incorrect. NVSwitch runs at NVLink speed inside the node. The slower link sits between the nodes.',
  ]}
/>
