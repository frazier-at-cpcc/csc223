<script module>
  export const pageConfig = { title: 'Parallelism' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Parallelism</h1>

<p>
  <dfn><strong>Parallelism</strong></dfn> efficiently uses more than one GPU to accelerate large models without
  introducing new bottlenecks.
</p>

<h2>When One GPU Is Not Enough</h2>

<p>Parallelism addresses two bottlenecks.</p>

<ul>
  <li>The model is too large for the <Term id="vram">VRAM</Term> of a single GPU.</li>
  <li>The model fits on one GPU but runs too slowly there to meet its <Term id="latency">latency</Term> target.</li>
</ul>

<p>
  In both cases, parallelism splits the work of one model across several GPUs. Each GPU holds part of the weights and
  computes part of every forward pass.
</p>

<h2>The Cost of Splitting a Model</h2>

<p>
  The split creates a new cost. GPUs must exchange intermediate results during every forward pass, and that communication
  takes time. A good parallelism strategy gains more from the extra GPUs than it loses to communication. Fast links between
  the GPUs inside one instance keep that cost low.
</p>

<p>
  Parallelism differs from quantization. Quantization shrinks the bytes the weights occupy. Parallelism keeps the same
  bytes and spreads them across more GPUs.
</p>

<p>
  Chapter 5 covers the model parallelism strategies, such as tensor, expert, and pipeline parallelism, and Chapter 3 covers
  the links between GPUs.
</p>
