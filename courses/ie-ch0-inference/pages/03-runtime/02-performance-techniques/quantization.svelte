<script module>
  export const pageConfig = { title: 'Quantization' };
</script>

<h1>Quantization</h1>

<p>
  <dfn><strong>Quantization</strong></dfn> lowers the precision of select pieces of the model. Lower precision gives the
  model access to more compute and reduces its memory burden.
</p>

<h2>What changes</h2>

<p>
  Model weights are numbers stored in a floating-point format such as FP16. Quantization stores selected numbers in a
  smaller format such as FP8 or FP4. Each number then takes fewer bits.
</p>

<ul>
  <li>Fewer bits per weight means the model occupies less GPU memory.</li>
  <li>Less data moves between memory and the compute units on each step.</li>
  <li>Modern GPUs perform more operations per second at lower precision.</li>
</ul>

<h2>Select pieces</h2>

<p>
  Quantization targets select parts of the model, such as weights, activations, or the KV cache. It does not lower the
  precision of everything. Chapter 5 covers quantization in depth.
</p>
