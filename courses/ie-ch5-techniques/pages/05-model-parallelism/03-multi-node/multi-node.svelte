<script module>
  export const pageConfig = { title: 'Multi-Node Inference' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import MultiNode from '../../../components/MultiNode.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Multi-Node Inference</h1>

<p>
  <Term id="multi-node-inference">Multi-node inference</Term> serves one model across more than one
  <Term id="node">node</Term>. Some deployments need more than the eight GPUs in one node. Examples include a huge model served at high
  precision, inputs of millions of tokens, and inference that must run as fast as possible.
</p>
<p>
  Multi-node training has been standard for years. Multi-node inference introduces two new challenges.
</p>
<ul>
  <li>
    <strong>Infrastructure.</strong> Teams must reliably provision two or more interconnected GPU nodes and build
    abstractions across cloud providers. Chapter 7 covers this challenge.
  </li>
  <li><strong>Parallelism.</strong> Teams must communicate effectively over <Term id="infiniband" /> or RDMA Ethernet between nodes, which has far less bandwidth and more latency than NVLink inside a node.</li>
</ul>

<MultiNode />

<h2>Parallelism across InfiniBand</h2>
<p>
  Tensor Parallelism generally requires too much communication to span nodes. Two configurations work well over
  InfiniBand.
</p>
<ol>
  <li>
    <strong>Dense models:</strong> use <Term id="tensor-parallelism">Tensor Parallelism</Term> within each node and
    <Term id="pipeline-parallelism">Pipeline Parallelism</Term> between nodes. TP8PP2 denotes TP across eight GPUs in
    each of two pipeline stages. The frequent <Term id="all-reduce">all-reduce</Term> stays on <Term id="nvlink">NVLink</Term>, and only the <Term id="activations">activations</Term> passed from the
    first stage to the second cross the slower link.
  </li>
  <li>
    <strong>MoE models:</strong> <Term id="expert-parallelism">Expert Parallelism</Term> across both nodes, such as
    EP16, is also an option, because its communication overhead is lower than that of TP.
  </li>
</ol>
<p>
  For an MoE model, TP8PP2 generally offers lower latency per user, and EP16 yields higher overall system
  <Term id="throughput">throughput</Term>.
</p>

<Callout type="important">
  <p>
    Use multi-node inference only when the model and <Term id="kv-cache">KV cache</Term> require it. Otherwise, the extra nodes usually serve
    better as additional <Term id="replica">replicas</Term> for horizontal scaling or as capacity for disaggregated serving.
  </p>
</Callout>
