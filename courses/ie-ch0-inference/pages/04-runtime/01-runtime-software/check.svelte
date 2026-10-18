<script module>
  export const pageConfig = { title: 'Knowledge Check: Runtime Scope and Software' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Runtime Scope and Software</h1>

<p>
  This check is ungraded. Each item gives feedback when you answer it. Both items practice Objective 4: classify an
  inference task by the layer of the inference stack that owns it.
</p>

<h2>Parts of the Runtime Software Stack</h2>

<Matching
  id="kc_rt_stack"
  question="Match each part of the runtime software stack to its role."
  pairs={[
    { left: 'CUDA', right: 'NVIDIA platform for programming and running code on GPUs' },
    { left: 'PyTorch', right: 'Framework that defines models and runs them on GPUs' },
    { left: 'Inference engine', right: 'Runtime that serves requests with batching and caching built in' },
    { left: 'Kernel', right: 'Function that runs in parallel across many GPU threads' },
  ]}
  correctFeedback="Correct. Engines build on PyTorch, PyTorch builds on CUDA, and every step runs as kernels on the GPU."
  incorrectFeedback="CUDA is the platform at the bottom. PyTorch defines and runs models. An inference engine such as vLLM serves requests. A kernel is one parallel GPU function."
/>

<h2>Staying Inside the Runtime Boundary</h2>

<MultipleChoice
  id="kc_rt_classify"
  question="A team has four proposals for a chat service. Which proposal stays inside the runtime layer?"
  options={[
    'Add replicas in a second region when traffic grows',
    'Build a portal that lets engineers deploy with one click',
    'Move models to idle GPUs in another cloud provider',
    'Replace the attention kernel with a faster one',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Adding replicas across regions crosses the instance boundary, so it is infrastructure work.',
    'Incorrect. A deployment portal shapes how engineers reach the platform, which is tooling work.',
    'Incorrect. Placing models in another cloud is infrastructure work that spans many instances.',
    'Correct. A kernel change improves how one replica uses the GPUs of its instance, which is runtime work.',
  ]}
/>
