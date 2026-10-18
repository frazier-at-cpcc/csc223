<script module>
  export const pageConfig = { title: 'PyTorch for Training and Inference' };
</script>

<script>
  import CodeFigure from '../../../components/CodeFigure.svelte';

  const network = `class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(28*28, 512),
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 10),
        )

    def forward(self, x):
        x = self.flatten(x)
        logits = self.linear_relu_stack(x)
        return logits`;
</script>

<h1>PyTorch for Training and Inference</h1>

<p>
  <strong>PyTorch</strong> is a Python package for describing tensor operations.
  It is the industry standard technology underneath both training and inference
  for generative AI models.
</p>

<p>
  PyTorch lets engineers write high-performance inference code in Python for
  both CPUs and GPUs. When Python is not fast enough for one operation, an
  engineer can plug in a specific CUDA kernel. The book's author, a career Python
  programmer, describes this combination as the main reason to use PyTorch: Python
  for most of the work, and CUDA only where it is needed.
</p>

<h2>A basic neural network</h2>

<p>
  PyTorch can train any kind of neural network. The listing below, adapted from
  the PyTorch documentation, defines a small network.
</p>

<CodeFigure
  code={network}
  language="python"
  caption="Figure 4.3. A basic neural network in PyTorch, adapted from the PyTorch documentation."
/>

<p>
  The network flattens a 28 by 28 input into a vector of 784 values. It then
  applies three linear layers with ReLU activation functions between them. The
  linear layers and ReLU activations are the same building blocks described in
  Chapter 2. The final layer outputs 10 values, called logits.
</p>

<h2>Autograd makes training possible</h2>

<p>
  The PyTorch <code>autograd</code> module automatically computes gradients for
  any differentiable function. An engineer defines the computation graph, and
  PyTorch supplies the gradient needed to train it.
</p>

<h2>PyTorch is also an inference tool</h2>

<p>
  PyTorch stands out because it serves inference as well as training. It
  balances built-in functions and automatic performance optimizations with
  manual control where the engineer needs it.
</p>
