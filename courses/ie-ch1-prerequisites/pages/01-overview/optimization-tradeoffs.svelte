<script module>
  export const pageConfig = { title: 'Optimization Means Tradeoffs' };
</script>

<script>
  import AthletesFigure from '../../components/AthletesFigure.svelte';
</script>

<h1>Optimization Means Tradeoffs</h1>

<p>
  <strong>Optimization</strong> means identifying the best solution out of a range of options.
  An engineer cannot optimize an inference system until the product defines what "best" means.
</p>
<p>
  Many performance improvements come from trading one property for another.
  The three properties that inference engineers trade most often are latency, throughput, and quality.
</p>

<ul>
  <li><strong>Latency</strong> is how long a user waits for a response.</li>
  <li><strong>Throughput</strong> is the total work the system completes per unit of time, such as total tokens per second.</li>
  <li><strong>Quality</strong> is how good the model output is for the task.</li>
</ul>

<p>
  In practice, optimization usually means finding the right balance among these properties.
  It rarely means maximizing one of them.
</p>

<h2>The athlete analogy</h2>

<p>
  Professional football players are big, fast, and strong.
  They are not as big as sumo wrestlers, as fast as Olympic sprinters, or as strong as champion powerlifters.
  Their bodies and skills match the demands of one position over a full season.
</p>

<AthletesFigure />

<p>
  An inference system works the same way.
  It is optimized for the demands of one model, one product, and one traffic pattern.
  Each constraint you define narrows the range of options, and a narrower range lets you reach a better result.
</p>
