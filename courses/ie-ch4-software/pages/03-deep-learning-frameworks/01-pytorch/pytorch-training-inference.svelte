<script module>
  export const pageConfig = { title: 'PyTorch for Training and Inference' };
</script>

<script>
  import CodeFigure from '../../../components/CodeFigure.svelte';
  import Term from '$shared/Term.svelte';

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

  const infer = `model = NeuralNetwork().to("cuda")
model.eval()                  # switch layers to inference behavior
with torch.no_grad():         # skip gradient bookkeeping
    logits = model(batch)     # one forward pass, run eagerly`;
</script>

<h1>PyTorch for Training and Inference</h1>

<p>
  <strong>PyTorch</strong> is a Python package for describing operations on
  <Term id="tensor">tensors</Term>. It is the industry standard technology underneath
  both <Term id="training">training</Term> and <Term id="inference">inference</Term> for generative AI models.
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
  applies three linear <Term id="layer">layers</Term> with ReLU
  <Term id="activation-function">activation functions</Term> between them. These are
  the same building blocks described in Chapter 2. The final layer outputs 10
  values, called <Term id="logits">logits</Term>.
</p>

<h2>Autograd makes training possible</h2>

<p>
  The PyTorch <code>autograd</code> module automatically computes gradients for
  any differentiable function. A gradient tells training how to adjust each
  weight to reduce the error. An engineer defines the computation graph, and
  PyTorch supplies the gradients needed to train it. Inference does not update
  weights, so it turns this bookkeeping off.
</p>

<h2>PyTorch is also an inference tool</h2>

<p>
  PyTorch stands out because it serves inference as well as training. The listing
  below runs the network above on a batch of inputs. It needs no compilation step:
  PyTorch runs each operation as the Python code reaches it, which is called
  <strong>eager execution</strong>.
</p>

<CodeFigure
  code={infer}
  language="python"
  caption="Running inference with the network above in eager mode."
/>

<p>
  PyTorch balances built-in functions and automatic performance optimizations
  with manual control where the engineer needs it. The next page covers the
  optional compilation step that can make this code faster.
</p>
