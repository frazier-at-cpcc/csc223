<script module>
  export const pageConfig = { title: 'The Inference Software Stack' };
</script>

<script>
  import SoftwareStack from '../../components/SoftwareStack.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>The Inference Software Stack</h1>

<p>
  Chapter 0 named three levels of the runtime software stack: <Term id="cuda" />,
  <Term id="pytorch" />, and the <Term id="inference-engine">inference engine</Term>. This chapter adds a
  fourth level on top and examines each level in turn. Each level hides the
  details of the level beneath it and adds conveniences of its own.
</p>

<SoftwareStack />

<h2>The four levels</h2>

<ul>
  <li>
    CUDA gives direct, explicit control over computation and memory on NVIDIA
    GPUs. Engineers write, select, and fuse <Term id="kernel">kernels</Term> at this level.
  </li>
  <li>
    <strong>Deep learning frameworks</strong> are Python libraries, led by PyTorch,
    that wrap CUDA in abstractions for training, exporting, and running neural
    networks.
  </li>
  <li>
    Inference engines such as vLLM, SGLang, and TensorRT-LLM provide highly
    configurable, PyTorch-backed inference for common model architectures.
    Engineers work at this level through launch flags and configuration files.
  </li>
  <li>
    <Term id="nvidia-dynamo" /> sits on top of inference engines and coordinates
    large-scale deployments across many GPUs and nodes.
  </li>
</ul>

<h2>Where inference engineers work</h2>

<p>
  Most inference engineering today happens at the upper levels. Engineers
  configure and deploy inference engines and orchestrate inference across
  multiple GPUs. Few engineers write CUDA by hand.
</p>

<p>
  Every level still matters. An engineer who tunes an inference engine makes
  better choices with a clear model of the kernels underneath it and the
  orchestration layer above it. To classify a task, ask which artifact the
  engineer changes: kernel code, Python model code, engine configuration, or
  cluster-wide orchestration settings. The rest of this course moves up the
  stack one level at a time and closes with how to measure the results.
</p>
