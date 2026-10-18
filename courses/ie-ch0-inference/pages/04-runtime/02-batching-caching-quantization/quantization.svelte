<script module>
  export const pageConfig = { title: 'Quantization' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Quantization</h1>

<p>
  <dfn><strong>Quantization</strong></dfn> lowers the precision of select pieces of the model. Lower precision gives the
  model access to more compute and reduces its memory burden.
</p>

<h2>What Quantization Changes</h2>

<p>
  Open models are usually published with weights in a 16-bit format such as FP16 or BF16. Quantization stores selected
  numbers in a smaller format such as <Term id="fp8">FP8</Term> or <Term id="fp4">FP4</Term>. Each number then takes fewer
  bits.
</p>

<ul>
  <li>
    Fewer bytes per parameter means less weight memory. A 70-billion-parameter model drops from 140 GB in FP16 to 70 GB in
    FP8.
  </li>
  <li>Less data moves from <Term id="vram">VRAM</Term> to the compute units on each forward pass, which speeds up decode.</li>
  <li>
    GPUs with native support for a lower-precision format perform more operations per second in that format. As of October
    2026, NVIDIA GPUs support FP8 natively from the Hopper and Ada Lovelace generations onward, and FP4 from the Blackwell generation onward.
    Chapter 3 covers these generations.
  </li>
</ul>

<h2>What Quantization Targets</h2>

<p>
  Quantization targets select parts of the model, such as the weights, the <Term id="activations">activations</Term>, or the KV cache. It
  does not lower the precision of everything, because some parts lose too much quality at low precision.
</p>

<p>
  The bottleneck that quantization targets is memory: a model that does not fit, or decode that moves too many bytes.
  Chapter 5 covers quantization in depth, including how to protect output quality.
</p>
