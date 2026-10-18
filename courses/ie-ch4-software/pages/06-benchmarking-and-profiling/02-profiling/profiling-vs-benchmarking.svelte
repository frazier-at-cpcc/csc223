<script module>
  export const pageConfig = { title: 'Profiling Versus Benchmarking' };
</script>

<script>
  import KernelProfile from '../../../components/KernelProfile.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Profiling Versus Benchmarking</h1>

<p>
  <strong>Profiling</strong> measures where time and memory go inside a workload,
  operation by operation or kernel by kernel. It goes one level deeper than
  benchmarking. A <Term id="performance-benchmark">performance benchmark</Term> reports a single figure, such as
  a <Term id="latency-percentile">P90</Term> time to first token of 350 milliseconds. A
  profiling tool shows where each of those milliseconds went inside the inference
  process.
</p>

<ul>
  <li>Benchmarking shows how the system performs.</li>
  <li>Profiling shows why the system performs that way.</li>
</ul>

<KernelProfile />

<p>
  In the profile above, the activation function stands out. It is an elementwise
  operation, so it should take a few milliseconds. The next page follows this
  finding from diagnosis to fix.
</p>

<h2>Who needs to profile</h2>

<p>
  Most inference engineers do not profile as part of their daily work. With an
  already high-performance engine such as TensorRT-LLM, the workflow is a cycle
  of configuration and benchmarking. Profiling would add little.
</p>

<p>Profiling belongs in the toolkit of engineers who:</p>

<ul>
  <li>Contribute to an <Term id="inference-engine">inference engine</Term> such as vLLM or SGLang.</li>
  <li>Write their own inference service in PyTorch.</li>
  <li>Work at the frontier of a new modality, such as video generation.</li>
</ul>
