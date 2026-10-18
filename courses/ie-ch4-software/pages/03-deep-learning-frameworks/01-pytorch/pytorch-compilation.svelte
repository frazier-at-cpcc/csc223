<script module>
  export const pageConfig = { title: 'PyTorch Compilation' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>PyTorch Compilation</h1>

<p>
  Compilation is the step that prepares a trained model for inference.
  <strong>PyTorch compilation</strong> (<code>torch.compile</code>) captures the
  model's computation graph and targets a specific GPU. During compilation,
  PyTorch performs automatic kernel selection and kernel fusion to produce fast
  code for that GPU.
</p>

<h2>The limit of torch.compile</h2>

<p>
  <code>torch.compile</code> cannot fuse plugin kernels. DeepGEMM, FlashAttention,
  and custom kernels all fall outside its reach. Most kernels in LLM inference
  are custom, so compilation offers less benefit for LLMs than for other models.
</p>

<h2>Where compilation helps</h2>

<ul>
  <li>Optimizing less common model architectures that engines do not support.</li>
  <li>Compiling long sequences of lightweight kernels.</li>
</ul>

<Callout type="tip">
  <p>
    A model with a custom or rare architecture may fail to compile on the first
    attempt. The fix is often to rewrite functions in a more abstract form,
    especially functions that rely on Python-specific language features.
  </p>
</Callout>

<h2>The ecosystem above PyTorch</h2>

<p>
  PyTorch alone can power a high-performance inference service. A rich ecosystem
  on top of PyTorch makes it faster to implement, compile, and run optimized
  code for common model architectures. The next lesson covers the file formats,
  runtimes, and reference libraries in that ecosystem.
</p>
