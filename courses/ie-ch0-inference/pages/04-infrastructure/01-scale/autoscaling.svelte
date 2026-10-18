<script module>
  export const pageConfig = { title: 'Level 1: Autoscaling' };
</script>

<h1>Level 1: Autoscaling</h1>

<p>
  At first, infrastructure problems center on autoscaling. A <dfn><strong>replica</strong></dfn> is one running copy of a
  model server. <dfn><strong>Autoscaling</strong></dfn> adds and removes replicas automatically based on traffic or
  utilization.
</p>

<h2>Two problems</h2>

<p>Autoscaling at this level solves two problems.</p>

<ol>
  <li>Timing: the system decides when to add or remove a replica.</li>
  <li>Speed: a new replica starts serving traffic quickly enough to absorb a spike.</li>
</ol>

<p>
  Scaling up too late leaves users waiting while traffic queues. Scaling down too late wastes spend on idle GPUs.
  Autoscaling matches capacity to demand. It protects latency targets and keeps idle GPU spend low.
</p>
