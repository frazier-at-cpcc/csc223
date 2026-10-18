<script module>
  export const pageConfig = { title: 'Knowledge Check: Routing, Load Balancing, and Queueing' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Routing, Load Balancing, and Queueing</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 4: differentiate routers, load balancers, and queues</p>
<Matching
  id="kc_rq_roles"
  question="Match each component to the question it answers for an incoming request."
  pairs={[
    { left: 'Router', right: 'Which replica already holds this request’s prefix or adapter?' },
    { left: 'Load balancer', right: 'How do I keep any one replica from being overloaded?' },
    { left: 'Queue', right: 'Where does a request wait when every replica is full?' },
    { left: 'Global load balancer', right: 'Which cluster or region should serve this user?' },
  ]}
  correctFeedback="Correct. A router picks the best destination for one request, a load balancer spreads requests across acceptable destinations, a queue holds requests that no destination can take yet, and a global load balancer makes the placement decision across clusters."
  incorrectFeedback="Separate choosing from spreading from waiting. A router chooses the ideal replica for one request. A load balancer spreads load across acceptable replicas. A queue holds requests when no replica has room. A global load balancer chooses among clusters or regions."
/>

<p class="ie-objective">Practices objective 4: differentiate routers, load balancers, and queues</p>
<MultipleChoice
  id="kc_rq_lora"
  question="A deployment serves one base model with hundreds of LoRA adapters, and each request names one adapter. Round-robin load balancing spreads requests evenly, yet many requests stall while a replica loads their adapter. Which component should the team add?"
  options={[
    'A larger first-in, first-out queue',
    'A LoRA-aware router',
    'A second round-robin load balancer',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. A queue holds requests when every replica is full. These requests are not waiting for capacity. They are reaching replicas that lack their adapter.',
    'Correct. A router makes a request-level choice. A LoRA-aware router sends each request to a replica that already holds the named adapter in memory.',
    'Incorrect. Another load balancer would still spread requests without regard to which replica holds which adapter.',
  ]}
/>

<p class="ie-objective">Practices objective 4: differentiate routers, load balancers, and queues</p>
<MultipleChoice
  id="kc_rq_drain"
  question="Traffic exceeds the capacity of every running replica, and the autoscaler has started two new replicas. What should happen to the excess requests?"
  options={[
    'They are rejected so that clients retry after the new replicas are ready.',
    'They wait in a queue until one of the original replicas frees a slot.',
    'They wait in a queue, and new replicas draw from it once active.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Holding excess requests is the role of the queue. Rejection discards traffic that the system will soon be able to serve.',
    'Incorrect. Waiting only for the original replicas leaves the new capacity idle when it comes online.',
    'Correct. A queue holds the excess, and each new replica should take queued work up to its concurrency limit as soon as it is active.',
  ]}
/>
