<script module>
  export const pageConfig = { title: 'Knowledge Check: Multi-Cloud Architecture' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Multi-Cloud Architecture</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 6: select multi-cloud measures</p>
<Matching
  id="kc_ma_benefits"
  question="Match each situation to the multi-cloud benefit that addresses it."
  pairs={[
    { left: 'One provider has no H100s left in any region the team uses', right: 'Capacity' },
    { left: 'A provider-wide outage must not stop the service', right: 'Redundancy' },
    { left: 'Users in Sydney wait on a round trip to Virginia', right: 'Latency' },
    { left: 'A hospital requires processing inside its own country', right: 'Compliance' },
  ]}
  correctFeedback="Correct. Pooling providers supplies capacity, splitting across providers supplies redundancy, placing inference near users cuts latency, and placing it in permitted locations meets compliance rules."
  incorrectFeedback="Match the constraint to the benefit. A shortage of GPUs is a capacity problem. Surviving a provider outage is redundancy. Distance to users is latency. A legal rule on where data is processed is compliance."
/>

<p class="ie-objective">Practices objective 6: select multi-cloud measures</p>
<MultipleChoice
  id="kc_ma_outage"
  question="The global control plane of a multi-cloud deployment goes offline for 20 minutes during steady traffic. What happens to inference requests during the outage?"
  options={[
    'Every workload plane stops, because it waits on control plane decisions.',
    'Workload planes keep serving and scaling, and new deployments pause.',
    'Traffic fails over to a passive standby copy of each workload plane.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Workload planes handle inference traffic and in-cluster scaling on their own. The split exists so that a control plane failure does not stop serving.',
    'Correct. The control plane makes deployment and global scaling decisions. Each workload plane keeps serving and autoscaling within its cluster, so only global changes wait.',
    'Incorrect. Active-passive failover is a posture for a failed workload plane or region. A control plane outage leaves the workload planes healthy.',
  ]}
/>
