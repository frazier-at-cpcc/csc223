<script module>
  export const pageConfig = { title: 'When the GPU Is Too Big' };
</script>

<h1>When the GPU Is Too Big</h1>

<p>
  Multi-GPU instances solve models that are too large for one GPU. Inference engineers also face the opposite
  problem: a GPU that is too large for the model.
</p>
<p>
  Hopper and Blackwell require GPUs such as the H100 and B200, which have large compute and memory allocations. A
  model with a couple of billion parameters or fewer cannot use such a GPU effectively. Even at large batch sizes,
  valuable GPU resources sit idle.
</p>

<h2>Two options for small models</h2>
<ul>
  <li>Run the small model on an older, lower-performance GPU.</li>
  <li>Run the small model on a fraction of a newer, high-performance GPU.</li>
</ul>
<p>
  <strong>Multi-Instance GPU (MIG)</strong> enables the second option. MIG is a hardware-level capability in larger
  GPUs, including the A100, H100, H200, and B200. It splits one GPU into as many as seven pieces.
</p>
<p>
  Each fractional GPU also receives a share of the CPU, RAM, storage, and other resources it needs to form a
  complete instance.
</p>
