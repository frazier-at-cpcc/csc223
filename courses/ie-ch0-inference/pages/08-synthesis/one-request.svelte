<script module>
  export const pageConfig = { title: 'One Request Through the Three Layers' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';

  const steps = [
    {
      when: 'Before any request',
      what: 'An engineer deploys a 70-billion-parameter model in FP8 through a deployment config that exposes engine and autoscaling settings. The weights occupy 70 GB, so each replica runs on two 80 GB GPUs in one instance, which leaves room for the KV cache.',
      layer: 'Tooling and runtime',
      ideas: 'Developer experience (middle ground); weight memory; quantization; parallelism',
      chapters: '3, 4, 5',
    },
    {
      when: 'Before any request',
      what: 'The control plane has placed replicas on a workload plane in Asia, because many users are there.',
      layer: 'Infrastructure',
      ideas: 'Control plane; workload plane; end-to-end latency',
      chapters: '7',
    },
    {
      when: 'Request arrives',
      what: 'A user in Singapore sends a question. Routing sends it to the nearby workload plane and a replica with free capacity.',
      layer: 'Infrastructure',
      ideas: 'Routing and load balancing; replica',
      chapters: '7',
    },
    {
      when: 'Prefill',
      what: 'The prompt is a 1,800-token system prompt plus 45 new tokens. The system prompt is already in the KV cache, so prefill computes only the 45 new tokens and produces the first output token.',
      layer: 'Runtime',
      ideas: 'Token; prefill; KV cache; caching; time to first token',
      chapters: '2, 5',
    },
    {
      when: 'Decode',
      what: 'The request joins the running batch. Each decode pass reads the weights once for every request in the batch. A draft model proposes four tokens per step, and one verification pass keeps the accepted ones.',
      layer: 'Runtime',
      ideas: 'Decode; forward pass; batching; speculation; inter-token latency; throughput',
      chapters: '2, 5, 7',
    },
    {
      when: 'Traffic grows',
      what: 'At the start of the Asian business day, requests begin to queue. The autoscaler adds a replica, which serves after its cold start.',
      layer: 'Infrastructure',
      ideas: 'Autoscaling; latency target',
      chapters: '7',
    },
    {
      when: 'Region fails',
      what: 'Later, the Asian region suffers an outage. The control plane moves the deployment to a healthy workload plane in another region, and routing follows. Users stay served at a higher network latency.',
      layer: 'Infrastructure',
      ideas: 'Reliability; unified pool of compute',
      chapters: '7',
    },
  ];
</script>

<h1>One Request Through the Three Layers</h1>

<Signal kind="summary" title="One chat request, end to end">
  <p>
    This worked case follows a single request to a support assistant from deployment to a regional outage. Each step names
    the layer that acts, the ideas from this chapter that it uses, and the chapters that cover those ideas in depth.
  </p>

  <div class="wide-view">
    <table>
      <caption>A support assistant request traced through the core concepts and the three layers</caption>
      <thead>
        <tr>
          <th scope="col">Moment</th>
          <th scope="col">What happens</th>
          <th scope="col">Layer</th>
          <th scope="col">Ideas from this chapter</th>
          <th scope="col">Chapters</th>
        </tr>
      </thead>
      <tbody>
        {#each steps as s, i (i)}
          <tr>
            <th scope="row">{s.when}</th>
            <td>{s.what}</td>
            <td>{s.layer}</td>
            <td>{s.ideas}</td>
            <td>{s.chapters}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <ol class="narrow-view" aria-label="A support assistant request traced through the core concepts and the three layers">
    {#each steps as s, i (i)}
      <li>
        <p class="step-when">{s.when}</p>
        <p>{s.what}</p>
        <dl>
          <dt>Layer</dt>
          <dd>{s.layer}</dd>
          <dt>Ideas from this chapter</dt>
          <dd>{s.ideas}</dd>
          <dt>Chapters</dt>
          <dd>{s.chapters}</dd>
        </dl>
      </li>
    {/each}
  </ol>

  <h2>What the Case Shows</h2>

  <ul>
    <li>
      The runtime layer decides how fast one replica serves this request. Caching shortens prefill, and batching and
      speculation make decode efficient.
    </li>
    <li>
      The infrastructure layer decides where the request runs and whether enough replicas exist. Placement near the user,
      autoscaling, and failover all act across instances.
    </li>
    <li>
      The tooling layer decides how much of the first two layers the engineer can reach. Here the middle ground exposes
      precision and autoscaling without asking the engineer to run clusters.
    </li>
    <li>
      Every step uses the core concepts. Weight memory sets the GPU count, prefill sets the first-token wait, and decode
      passes set the stream speed.
    </li>
  </ul>

  <h2>What Comes Next</h2>

  <p>
    Chapter 1 steps back from the stack to the product it serves and turns a use case into latency, throughput, and cost
    targets. Those targets, and the model chosen to meet them, set the requirements that every later chapter optimizes
    against.
  </p>
</Signal>

<style>
  .narrow-view {
    display: none;
    margin: var(--tessera-spacing-md) 0;
    padding: 0;
    list-style: none;
  }
  .narrow-view li {
    margin-bottom: var(--tessera-spacing-sm);
    padding: var(--tessera-spacing-sm) var(--tessera-spacing-md);
    border: 1px solid var(--tessera-border);
    border-radius: 6px;
    background: var(--tessera-bg);
  }
  .narrow-view p {
    margin: 0 0 var(--tessera-spacing-sm);
  }
  .step-when {
    font-weight: 700;
  }
  .narrow-view dl {
    margin: 0;
    font-size: 0.9rem;
  }
  .narrow-view dt {
    font-weight: 600;
  }
  .narrow-view dd {
    margin: 0 0 0.35rem;
  }
  @media (max-width: 640px) {
    .wide-view {
      display: none;
    }
    .narrow-view {
      display: block;
    }
  }
</style>
