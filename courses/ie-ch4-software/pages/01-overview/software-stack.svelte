<script module>
  export const pageConfig = { title: 'The Inference Software Stack' };
</script>

<script>
  import SoftwareStack from '../../components/SoftwareStack.svelte';
</script>

<h1>The Inference Software Stack</h1>

<p>
  The chapter presents inference software in order of increasing abstraction.
  Each level hides the details of the level beneath it and adds conveniences of
  its own.
</p>

<SoftwareStack />

<h2>The four levels</h2>

<ul>
  <li>
    <strong>CUDA</strong> gives direct, explicit control over computation and
    memory on NVIDIA GPUs.
  </li>
  <li>
    <strong>Deep learning frameworks</strong> such as PyTorch wrap CUDA in
    Python abstractions for training, exporting, and running neural networks.
  </li>
  <li>
    <strong>Inference engines</strong> such as vLLM, SGLang, and TensorRT-LLM
    provide highly configurable, PyTorch-backed inference for common model
    architectures.
  </li>
  <li>
    <strong>NVIDIA Dynamo</strong> sits on top of inference engines and
    coordinates large-scale deployments across many GPUs.
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
  orchestration layer above it. The rest of this course moves up the stack one
  level at a time and closes with how to measure the results.
</p>
