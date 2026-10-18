<script module>
  export const pageConfig = { title: 'Cold Start Stages' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import SegmentedBar from '../../../components/SegmentedBar.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Cold Start Stages</h1>

<p>
  A <strong>cold start</strong> is the time it takes to bring a new <Term id="replica">replica</Term> of a model from nothing to its first
  successful response. Chapter 1 used the term for scaling up from zero replicas. This chapter applies it to every new
  replica, because the autoscaler pays the same startup cost whenever it adds capacity.
</p>
<p>
  The performance of the whole <Term id="autoscaling">autoscaling</Term> system depends on cold start speed. A system that cannot add replicas
  quickly cannot scale down with confidence, so it keeps extra replicas running and over-provisions.
</p>

<h2>Four Stages</h2>
<p>Four factors determine cold start time. Each one needs its own optimization.</p>
<ol>
  <li><strong>GPU procurement:</strong> adding the necessary GPUs to the cluster and allocating them to the model.</li>
  <li><strong>Image loading:</strong> loading the container image onto the newly procured <Term id="instance">instance</Term>.</li>
  <li><strong>Model loading:</strong> loading the model <Term id="weights">weights</Term> into the container.</li>
  <li><strong>Engine startup:</strong> starting the inference engine, including any compilation.</li>
</ol>
<Figure
  number="7.9"
  caption="Each step in the cold start process adds to the overall timeline."
  description="A horizontal bar labeled cold start time is divided into four consecutive segments: GPU procurement, image loading, model weight loading, and engine startup. Model weight loading is the widest segment, image loading is the second widest, and GPU procurement and engine startup are the narrowest. Widths show relative duration in the book's illustration, not measured times."
>
  <SegmentedBar
    title="Cold start time"
    segments={[
      { label: 'GPU procurement', size: 1 },
      { label: 'Image loading', size: 2 },
      { label: 'Model weight loading', size: 4 },
      { label: 'Engine startup', size: 1 },
    ]}
  />
</Figure>

<h2>Load Time from Size and Bandwidth</h2>
<p>
  Image loading and model loading both move bytes, so each stage takes roughly its size divided by the bandwidth of
  its source. That rule shows where time goes before any measurement.
</p>
<Signal kind="worked" title="Two sources for the same weights">
  <p>
    A 70-billion-parameter model in FP16 has 70 × 2 = 140 GB of weights. Compare two sources, using illustrative
    bandwidths.
  </p>
  <ol>
    <li>From a remote model hub that delivers 0.5 GB/s: 140 ÷ 0.5 = 280 seconds, or about 4.7 minutes.</li>
    <li>From a cache in the same datacenter that delivers 5 GB/s: 140 ÷ 5 = 28 seconds.</li>
    <li>Difference: 280 − 28 = 252 seconds saved on every new replica.</li>
  </ol>
  <p>In this example, the weight source decides most of the cold start, which matches the widest segment of Figure 7.9.</p>
</Signal>

<h2>Who Controls Each Stage</h2>
<p>
  GPU procurement speed is mostly a function of the cloud provider, unless the team keeps a pool of warm <Term id="node">nodes</Term> that it
  shifts between models. Node start time is one of the negotiable terms in a GPU contract. Engineers have much more
  influence over the other three stages: loading images, loading weights, and starting the engine.
</p>
