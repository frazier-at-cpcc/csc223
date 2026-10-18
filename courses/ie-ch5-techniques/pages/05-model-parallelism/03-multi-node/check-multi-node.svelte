<script module>
  export const pageConfig = { title: 'Knowledge Check: Multi-Node Inference' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Multi-Node Inference</h1>
<p>These questions are ungraded. Both practice objective 8: choosing a parallelism strategy.</p>

<MultipleChoice
  id="kc_multinode_1"
  question="A dense model requires two nodes of eight GPUs connected by InfiniBand. Which parallelism configuration should the team use?"
  options={['EP16', 'PP16', 'TP16', 'TP8PP2']}
  correct={3}
  optionFeedback={[
    'Incorrect. Expert Parallelism applies to MoE models, and a dense model has no experts to distribute.',
    'Incorrect. Sixteen pipeline stages run one after another, which gives poor latency and utilization.',
    'Incorrect. Tensor Parallelism across InfiniBand requires too much per-layer communication over the slower link.',
    'Correct. TP keeps its frequent all-reduce on fast NVLink inside each node, and PP crosses InfiniBand only between the two stages.',
  ]}
/>

<Sorting
  id="kc_multinode_2"
  question="A dense model runs in TP8PP2 across two nodes. Sort each kind of traffic by the link it travels over."
  items={[
    'The all-reduce after each layer in the first stage',
    'The all-reduce after each layer in the second stage',
    'Activations handed from the last layer of stage one to the first layer of stage two',
  ]}
  targets={['NVLink inside a node', 'InfiniBand between nodes']}
  correct={[0, 0, 1]}
  correctFeedback="Correct. Each stage lives inside one node, so its frequent all-reduce stays on NVLink. Only the handoff between stages crosses InfiniBand."
  incorrectFeedback="TP8PP2 places each eight-GPU stage inside one node. The all-reduce traffic of each stage therefore stays on NVLink, and only the activations passed between the stages cross InfiniBand."
/>
