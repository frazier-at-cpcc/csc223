<script module>
  export const pageConfig = { title: 'Knowledge Check: Routing, Load Balancing, and Queueing' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Routing, Load Balancing, and Queueing</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_rq_1"
  question="A deployment serves one base model with hundreds of LoRA adapters. Each request names one adapter. Which approach keeps adapter loading off the critical path?"
  options={[
    'KV cache-aware routing',
    'LoRA-aware routing',
    'Round-robin load balancing',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. KV cache-aware routing matches cached prefixes, not fine-tuned adapter weights.',
    'Correct. LoRA-aware routing sends each request to a replica that already holds the requested adapter in memory.',
    'Incorrect. Round-robin spreads requests evenly without regard to which replica holds which adapter.',
  ]}
/>

<MultipleChoice
  id="kc_rq_2"
  question="Traffic exceeds the capacity of every running replica, and the autoscaler has started two new replicas. What should happen to the excess requests?"
  options={[
    'They wait in a queue, and new replicas draw from it as soon as they are active.',
    'They wait in a queue until one of the original replicas finishes a request.',
    'They are rejected so that clients can retry after the new replicas are ready.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. A queue holds the excess, and new replicas should pick up queued work as soon as they come online.',
    'Incorrect. Waiting only for the original replicas leaves the new capacity idle.',
    'Incorrect. Holding excess requests is the role of the queue. Rejection discards traffic that the system will soon be able to serve.',
  ]}
/>
