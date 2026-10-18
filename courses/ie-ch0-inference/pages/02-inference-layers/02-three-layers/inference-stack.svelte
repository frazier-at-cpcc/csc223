<script module>
  export const pageConfig = { title: 'The Complete Inference Stack' };
</script>

<script>
  import InferenceStack from '../../../components/InferenceStack.svelte';
</script>

<h1>The Complete Inference Stack</h1>

<p>
  Figure 0.1 places the runtime layer above the infrastructure layer. The tooling layer does not appear in the figure. It
  sits on top of both and decides how engineers reach them.
</p>

<h2>Reading the figure</h2>

<InferenceStack />

<ul>
  <li>
    The runtime layer pairs six model performance techniques with a software stack. Inference engines run on PyTorch,
    and PyTorch runs on CUDA.
  </li>
  <li>
    The infrastructure layer builds upward from hardware resources. GPUs, storage, and networking support multi-cloud
    capacity management, autoscaling, routing, and load balancing.
  </li>
</ul>

<p>Later sections of this course return to each block in the figure.</p>
