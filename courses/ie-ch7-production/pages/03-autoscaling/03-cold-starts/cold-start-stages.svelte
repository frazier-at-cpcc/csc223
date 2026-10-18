<script module>
  export const pageConfig = { title: 'Cold Start Stages' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import SegmentedBar from '../../../components/SegmentedBar.svelte';
</script>

<h1>Cold Start Stages</h1>

<p>
  A <strong>cold start</strong> is the time it takes to spin up a new replica of a model, from the scaling decision to
  its first successful response. The performance of the whole autoscaling system depends on cold start speed. A
  system that cannot add replicas quickly cannot scale down with confidence, so it over-provisions.
</p>

<h2>Four stages</h2>

<p>Four factors determine cold start time. Each one needs its own optimization.</p>

<ol>
  <li><strong>GPU procurement:</strong> adding the necessary GPUs to the cluster and allocating them to the model.</li>
  <li><strong>Image loading:</strong> loading the container image onto the newly procured instance.</li>
  <li><strong>Model loading:</strong> loading the model weights into the container.</li>
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

<h2>Who controls each stage</h2>

<p>
  GPU procurement speed is mostly a function of the cloud provider, unless the team keeps a pool of warm nodes that it
  shifts between models. Node start time is one of the negotiable terms in a GPU contract. Engineers have much more
  influence over the other three stages: loading images, loading weights, and starting the engine.
</p>
