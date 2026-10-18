<script module>
  export const pageConfig = { title: 'Parallelism' };
</script>

<h1>Parallelism</h1>

<p>
  <dfn><strong>Parallelism</strong></dfn> efficiently uses more than one GPU to accelerate large models without
  introducing new bottlenecks.
</p>

<h2>When one GPU is not enough</h2>

<p>
  Some models are too large to fit in the memory of a single GPU. Others fit but run too slowly on one GPU to meet a
  latency target. Parallelism splits the work of one model across several GPUs.
</p>

<p>
  The split creates a new cost. GPUs must exchange intermediate results, and that communication takes time. A good
  parallelism strategy gains more from the extra GPUs than it loses to communication.
</p>

<p>Chapter 5 covers model parallelism strategies, such as tensor, expert, and pipeline parallelism.</p>
