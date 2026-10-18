<script module>
  export const pageConfig = { title: 'Skewed Latency Distributions' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import LatencyDistributionFigure from '../../../components/LatencyDistributionFigure.svelte';
</script>

<h1>Skewed Latency Distributions</h1>

<p>When comparing latency metrics, the percentile being measured matters as much as the metric itself.</p>

<h2>Why the average misleads</h2>

<p>
  A naive approach reports the average, or mean, <Term id="ttft">TTFT</Term> or <Term id="tps">TPS</Term>.
  The mean hides important detail.
  LLM total response times usually form a <dfn><strong>right-skewed distribution</strong></dfn>.
  Most response times cluster around a peak, and a long tail of outliers takes much longer.
</p>

<LatencyDistributionFigure />

<p>
  The slow outliers in the tail pull the mean upward.
  As a result, the mean is generally higher than the <dfn><strong>median</strong></dfn>, the middle value, which is the 50th percentile, or P50.
  In Figure 1.5, the median is 1.0 second, the mean is about 1.2 seconds, and the slowest 1 percent of requests take longer than about 4 seconds.
</p>

<h2>Why outliers matter</h2>

<p>
  Outliers shape user experience and trust in a product.
  A product does not feel fast if one request in every ten takes several seconds, even when most requests are quick.
</p>

<Signal kind="mistake" title="Reading the wrong tail for TPS">
  <p>
    For TTFT and total response time, lower is better, so the slow tail sits at the high end of the distribution.
    For TPS, higher is better, so the slow tail sits at the low end.
    Report TPS by the speed that most streams exceed, such as the TPS that 90 percent of streams beat.
    A high mean TPS can hide a tenth of users who watch text crawl.
  </p>
</Signal>
