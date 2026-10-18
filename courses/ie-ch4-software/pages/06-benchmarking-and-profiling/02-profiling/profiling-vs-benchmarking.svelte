<script module>
  export const pageConfig = { title: 'Profiling Versus Benchmarking' };
</script>

<script>
  import KernelProfile from '../../../components/KernelProfile.svelte';
</script>

<h1>Profiling Versus Benchmarking</h1>

<p>
  Profiling goes one level deeper than benchmarking. A benchmark reports a single
  figure, such as a P90 time to first token of 350 milliseconds. A profiling tool
  shows where each of those milliseconds went inside the inference process.
</p>

<ul>
  <li>Benchmarking shows how the system performs.</li>
  <li>Profiling shows why the system performs that way.</li>
</ul>

<KernelProfile />

<h2>Who needs to profile</h2>

<p>
  Most inference engineers do not profile as part of their daily work. With an
  already high-performance engine such as TensorRT-LLM, the workflow is a cycle
  of configuration and benchmarking. Profiling would add little.
</p>

<p>Profiling belongs in the toolkit of engineers who:</p>

<ul>
  <li>Contribute to an inference engine such as vLLM or SGLang.</li>
  <li>Write their own inference service in PyTorch.</li>
  <li>Work at the frontier of a new modality, such as video generation.</li>
</ul>
