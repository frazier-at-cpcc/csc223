<script module>
  export const pageConfig = { title: 'Arithmetic Intensity and the Roofline Model' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import Figure from '../../../components/Figure.svelte';
  import RooflineChart from '../../../components/RooflineChart.svelte';
</script>

<h1>Arithmetic Intensity and the Roofline Model</h1>

<h2>Arithmetic intensity</h2>

<p>
  <strong>Arithmetic intensity</strong>, also called operational intensity, is the ratio between the work
  an algorithm performs and the memory traffic it generates.
</p>

<Figure number="2.12" caption="The equation for arithmetic intensity.">
  <pre><code>intensity = work / memory_traffic</code></pre>
</Figure>

<p>
  The ops:byte ratio describes hardware on a per-second scale. Arithmetic intensity describes software,
  measured across one execution of a function or algorithm, with the same convention that a multiply-add counts
  as two operations. Comparing the two reveals the bottleneck.
</p>

<h2>The roofline model</h2>

<p>
  A <strong>roofline model</strong> charts performance against arithmetic intensity. It has two ceilings:
  a diagonal bandwidth ceiling and a horizontal compute ceiling. The two ceilings meet at the ridge point,
  which sits at the GPU's ops:byte ratio.
</p>

<Figure
  number="2.13"
  caption="A roofline chart shows the switch from a memory bottleneck to a compute bottleneck based on arithmetic intensity."
  description="The horizontal axis is arithmetic intensity and the vertical axis is performance. A diagonal line rises from the origin. It represents the bandwidth ceiling. At the ridge point it meets a horizontal line, the compute ceiling, which continues to the right. A dashed vertical line marks the ridge point, which equals the GPU's ops:byte ratio. The region to the left of the ridge is labeled memory bound. The region to the right is labeled compute bound."
>
  <RooflineChart />
</Figure>

<p>Plotting an algorithm against the roofline shows which resource limits it:</p>

<ul>
  <li><strong>Compute bound:</strong> the arithmetic intensity is higher than the GPU's ops:byte ratio. The algorithm hits the horizontal compute ceiling.</li>
  <li><strong>Memory bound:</strong> the arithmetic intensity is lower than the GPU's ops:byte ratio. The algorithm hits the diagonal bandwidth ceiling.</li>
</ul>

<p>
  To find a bottleneck, examine the arithmetic intensity of the most expensive calculations in a system. In
  LLM inference, the two most expensive calculations are the linear layers and <Term id="attention">attention</Term>. The next lesson
  calculates both.
</p>
