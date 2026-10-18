<script module>
  export const pageConfig = { title: 'PyTorch Compilation' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import CodeFigure from '../../../components/CodeFigure.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';

  const compile = `model = torch.compile(model)   # optional: capture the graph, fuse kernels
with torch.no_grad():
    logits = model(batch)         # first call compiles, later calls reuse it`;
</script>

<h1>PyTorch Compilation</h1>

<p>
  <strong>PyTorch compilation</strong> (<code>torch.compile</code>) is an optional
  step that optimizes a trained model for a specific GPU. It captures the model's
  computation graph and then performs automatic <Term id="kernel">kernel</Term> selection and
  <Term id="kernel-fusion">kernel fusion</Term> to produce fast code for that GPU.
</p>

<CodeFigure
  code={compile}
  language="python"
  caption="Compiling the model from the previous page. One line wraps the model, and the first call triggers compilation."
/>

<Signal kind="mistake" title="Compilation is not required for inference">
  <p>
    Compilation is sometimes described as the step that prepares a trained model
    for inference. It is not. PyTorch runs inference in eager mode with no
    compilation at all, and <code>torch.compile</code> can also speed up training.
    Compilation is an optimization that an engineer chooses when it pays off.
  </p>
</Signal>

<h2>The limit of torch.compile</h2>

<p>
  <code>torch.compile</code> cannot fuse plugin kernels. DeepGEMM,
  <Term id="flashattention" />, and other custom kernels all fall outside its reach.
  Most of the time in <Term id="llm">LLM</Term> inference is spent in such custom kernels, so
  compilation offers less benefit for LLMs than for other models.
</p>

<h2>Where compilation helps</h2>

<ul>
  <li>Optimizing less common model architectures that engines do not support.</li>
  <li>Compiling long sequences of lightweight kernels, such as chains of elementwise operations.</li>
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
