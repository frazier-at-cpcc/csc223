<script module>
  export const pageConfig = { title: 'Level 1: Autoscaling' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Level 1: Autoscaling</h1>

<p>
  At first, infrastructure problems center on autoscaling. <dfn><strong>Autoscaling</strong></dfn> adds and removes
  replicas automatically based on traffic or utilization.
</p>

<h2>Timing and Speed</h2>

<p>Autoscaling at this level solves two problems.</p>

<ol>
  <li>Timing: the system decides when to add or remove a replica.</li>
  <li>
    Speed: a new replica starts serving traffic quickly enough to absorb a spike. The delay before a new replica can serve
    is its <Term id="cold-start">cold start</Term>, which includes loading the weights onto its GPUs.
  </li>
</ol>

<h2>What Autoscaling Protects</h2>

<p>
  Scaling up too late leaves users waiting while requests sit in a queue. Scaling down too late wastes spend on idle GPUs.
  Autoscaling matches capacity to demand. It protects <Term id="latency">latency</Term> targets and keeps idle GPU spend low.
</p>

<p>Chapter 7 covers autoscaling settings and how to shorten cold starts.</p>
