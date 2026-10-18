<script module>
  export const pageConfig = { title: 'Why Autoscale' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import AutoscalingChart from '../../../components/AutoscalingChart.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Why Autoscale</h1>

<p>
  Chapter 0 introduced <Term id="autoscaling">autoscaling</Term> as adding and removing replicas as traffic changes. This lesson turns
  that idea into settings an engineer configures. The goal is to keep enough replicas available to serve every
  incoming request within the latency target, without paying for idle GPUs.
</p>
<p>
  Two kinds of latency target appear in production. A <Term id="sla">service level agreement (SLA)</Term> is a
  contractual promise to a customer, usually with penalties when it is missed. A
  <Term id="slo">service level objective (SLO)</Term> is an internal target that the team sets for itself, usually
  stricter than the SLA so that the contract is met with margin. Autoscaling is tuned against the SLO.
</p>

<h2>Fixed Capacity</h2>
<p>
  Production traffic rises and falls over the course of a day. A deployment with a fixed number of GPUs is sized for
  one traffic level, so it is wrong most of the time.
</p>
<ul>
  <li>During a lull, the fixed GPUs sit partly idle. That idle capacity is wasted spend.</li>
  <li>During a spike, demand exceeds the fixed capacity. Requests wait, and the system misses its latency targets.</li>
</ul>
<Figure
  number="7.3"
  caption="Without autoscaling, inference systems waste resources during traffic lulls and miss latency targets during traffic spikes."
  description="A traffic curve starts low, climbs to a broad peak in the middle of the period, and falls back to a low level. A flat dashed line shows a fixed GPU count. Before and after the peak, the GPU line sits above traffic, and both of those regions are labeled wasted spend. During the peak, traffic rises above the GPU line, and that region is labeled missed targets. The curve is schematic, not measured data."
>
  <AutoscalingChart />
</Figure>

<h2>Capacity That Tracks Demand</h2>
<p>
  An autoscaling system adds replicas as traffic climbs and removes them as traffic falls. Provisioned capacity stays
  close to demand through the whole cycle.
</p>
<Figure
  number="7.4"
  caption="A strong autoscaling system for inference matches resources to demand."
  description="The same traffic curve as Figure 7.3. The dashed GPU count line now moves in small steps that stay close to the traffic curve as it rises through the peak and falls afterward. Little capacity sits idle, and traffic rarely rises above capacity. The curve is schematic, not measured data."
>
  <AutoscalingChart autoscaled />
</Figure>
