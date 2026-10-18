<script module>
  export const pageConfig = { title: 'Knowledge Check: Multi-Node Inference' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Multi-Node Inference</h1>
<p>This question is ungraded.</p>

<MultipleChoice
  id="kc_multinode_1"
  question="A dense model requires two nodes of eight GPUs connected by InfiniBand. Which parallelism configuration should the team use?"
  options={['EP16', 'PP16', 'TP16', 'TP8PP2']}
  correct={3}
  optionFeedback={[
    'Incorrect. Expert Parallelism applies to MoE models, and a dense model has no experts to distribute.',
    'Incorrect. Pipelining across all sixteen GPUs gives poor latency and utilization.',
    'Incorrect. Tensor Parallelism across InfiniBand requires too much per-layer communication.',
    'Correct. TP keeps its frequent all-reduce on fast NVLink inside each node, and PP crosses InfiniBand only between stages.',
  ]}
/>
