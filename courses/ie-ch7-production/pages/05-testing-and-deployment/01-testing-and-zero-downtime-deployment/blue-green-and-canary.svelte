<script module>
  export const pageConfig = { title: 'Blue-Green and Canary Deployments' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import CanaryRollout from '../../../components/CanaryRollout.svelte';
</script>

<h1>Blue-Green and Canary Deployments</h1>

<p>Inference engineers use high-availability deployment strategies to release updates without downtime.</p>

<h2>Blue-Green Deployment</h2>
<p>
  A <strong>blue-green deployment</strong> runs two identical production environments. The original blue environment
  serves traffic while a new green environment runs the updated service. When green is ready, all traffic cuts over
  from blue to green. Blue stays ready for a quick rollback if issues appear.
</p>
<p>
  Blue-green suits large-scale inference poorly. The GPU capacity and cost problems that make large-scale testing
  difficult apply here too, because green must match blue's full size before traffic can cut over. If blue runs on 100
  GPUs, green needs another 100 GPUs for the release.
</p>

<h2>Canary Deployment</h2>
<p>
  A <strong>canary deployment</strong> starts a new deployment with a small share of live traffic to validate its
  stability and performance. Over time, the new deployment absorbs all production traffic. The name comes from the
  canaries that miners once carried to detect gas in coal mines. A canary deployment catches errors before they affect
  large numbers of users, and it needs far less extra GPU capacity than blue-green.
</p>
<Figure
  number="7.13"
  caption="Iteratively shifting traffic over to the new deployment prevents multiple issues during inference service updates."
  description="Live traffic splits between an old deployment and a new deployment. At first almost all traffic flows to the old deployment, and a small share flows to the new one. The share sent to the new deployment grows in stages until it carries all traffic. Select a stage to see the split. The stage percentages are illustrative."
>
  <CanaryRollout />
</Figure>
