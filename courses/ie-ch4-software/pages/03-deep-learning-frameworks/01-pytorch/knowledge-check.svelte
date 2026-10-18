<script module>
  export const pageConfig = { title: 'Knowledge Check: PyTorch' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: PyTorch</h1>

<p>These questions are ungraded. Use the feedback to confirm your understanding.</p>

<MultipleChoice
  id="kc_pytorch_1"
  question="Which PyTorch module computes gradients automatically for any differentiable function?"
  options={['autograd', 'nn.Sequential', 'torch.compile', 'torch.profiler']}
  correct={0}
  optionFeedback={[
    'Correct. Autograd computes gradients from the computation graph, which is what makes PyTorch effective for training.',
    'nn.Sequential chains layers together. It does not compute gradients.',
    'torch.compile prepares a model for fast inference on a specific GPU. It does not supply gradients.',
    'The profiler measures time and memory per operation. It does not compute gradients.',
  ]}
/>

<MultipleChoice
  id="kc_pytorch_2"
  question="A team compiles an LLM that relies on FlashAttention and DeepGEMM plugin kernels. The compiled model runs only slightly faster. What explains the small gain?"
  options={[
    'torch.compile cannot fuse kernels from external libraries.',
    'torch.compile requires an ONNX export first.',
    'torch.compile strips out custom kernels.',
    'torch.compile targets CPUs instead of GPUs.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Plugin kernels such as FlashAttention and DeepGEMM are outside the reach of torch.compile, and most LLM kernels are custom.',
    'torch.compile works on PyTorch code directly. ONNX export is a separate path.',
    'torch.compile leaves plugin kernels in place. It cannot fuse them, but it does not remove them.',
    'torch.compile targets a specific GPU, not the CPU.',
  ]}
/>
