<script module>
  export const pageConfig = { title: 'Skewed Latency Distributions' };
</script>

<script>
  import LatencyDistributionFigure from '../../../components/LatencyDistributionFigure.svelte';
</script>

<h1>Skewed Latency Distributions</h1>

<p>When comparing latency metrics, the percentile being measured matters as much as the metric itself.</p>

<h2>Why the average misleads</h2>

<p>
  A naive approach reports the average, or mean, TTFT or TPS.
  The mean hides important detail.
  LLM total response times usually form a <strong>right-skewed distribution</strong>.
  Most response times cluster around a peak, and a long tail of outliers takes much longer.
</p>

<LatencyDistributionFigure />

<p>
  The slow outliers in the tail pull the mean upward.
  As a result, the mean is generally higher than the median, which is the 50th percentile, or P50.
</p>

<h2>Why outliers matter</h2>

<p>
  Outliers shape user experience and trust in a product.
  A product does not feel fast if one request in every ten takes several seconds, even when most requests are quick.
</p>
