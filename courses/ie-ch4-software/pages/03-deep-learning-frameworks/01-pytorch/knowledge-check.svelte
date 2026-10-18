<script module>
  export const pageConfig = { title: 'Knowledge Check: PyTorch' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: PyTorch</h1>

<p>
  These questions are ungraded. All three practice objective 5: choose the model
  format, runtime, or PyTorch tool that fits a stated need. Here the tool is
  <code>torch.compile</code>.
</p>

<Sorting
  id="kc_pytorch_sort"
  question="Sort each workload by how much torch.compile is likely to help it."
  items={[
    'A new research architecture that no inference engine supports yet',
    'A model whose forward pass is a long chain of small elementwise operations',
    'A popular LLM whose attention runs in FlashAttention plugin kernels',
    'An LLM whose matrix multiplications run in DeepGEMM plugin kernels',
  ]}
  targets={['Likely to help substantially', 'Likely to help little']}
  correct={[0, 0, 1, 1]}
  correctFeedback="Compilation shines on unsupported architectures and long chains of lightweight kernels. It cannot fuse plugin kernels, so LLMs built on them gain little."
  incorrectFeedback="Ask what compilation can touch. It fuses and selects ordinary PyTorch operations. It cannot fuse plugin kernels such as FlashAttention or DeepGEMM."
/>

<MultipleChoice
  id="kc_pytorch_gain"
  question="A team compiles an LLM that relies on FlashAttention and DeepGEMM plugin kernels. The compiled model runs only slightly faster. What explains the small gain?"
  options={[
    'torch.compile cannot see inside external libraries.',
    'torch.compile requires an ONNX export first.',
    'torch.compile targets CPUs instead of GPUs.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Plugin kernels such as FlashAttention and DeepGEMM are outside the reach of torch.compile, and most LLM time is spent in such kernels.',
    'torch.compile works on PyTorch code directly. ONNX export is a separate path.',
    'torch.compile targets a specific GPU, not the CPU.',
  ]}
/>

<MultipleChoice
  id="kc_pytorch_eager"
  question="A team has a trained PyTorch model and a deadline tomorrow. torch.compile fails on one of the model's Python functions. What can the team do to serve the model on time?"
  options={[
    'Export the weights to ONNX before serving',
    'Rewrite the model in CUDA C++ before serving',
    'Run the model in eager mode for now',
  ]}
  correct={2}
  optionFeedback={[
    'Export to ONNX is a separate path with its own limits on unsupported operations. It is not required to serve a PyTorch model.',
    'Rewriting the model in CUDA is a large project. PyTorch already runs the model on the GPU.',
    'Correct. Compilation is optional. Eager PyTorch runs inference without it, and the team can fix the failing function and compile later for extra speed.',
  ]}
/>
