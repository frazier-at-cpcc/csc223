<script module>
  export const pageConfig = { title: 'Knowledge Check: Client Latency' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Client Latency</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 9: diagnose the source of a latency problem</p>
<Sorting
  id="kc_cl_where"
  question="Sort each source of delay by where it occurs."
  items={[
    'A TLS handshake on every request',
    'A round trip to a cluster on another continent',
    'Waiting in the request queue before reaching a replica',
    'Prefill of a long prompt',
    'Decoding 400 output tokens',
  ]}
  targets={['Outside the model server', 'Inside the model server']}
  correct={[0, 0, 0, 1, 1]}
  correctFeedback="Correct. The handshake, the network round trip, and queue time all happen before the model server starts work. Only prefill and decode run on the GPU."
  incorrectFeedback="Ask whether a GPU is working on the request. During a handshake, a network trip, or a wait in the queue, no GPU has started. Prefill and decode are the model server's work."
/>

<p class="ie-objective">Practices objective 9: diagnose the source of a latency problem</p>
<MultipleChoice
  id="kc_cl_reuse"
  question="A custom client for a speech model opens a new TLS connection for every request. Server-side inference meets its target, but end-to-end latency misses the SLO. Which client change helps most?"
  options={[
    'Raise the client’s request timeout limit.',
    'Send each new request to a different replica.',
    'Reuse the existing session for later calls.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. A longer timeout lets slow requests finish but does not remove any latency.',
    'Incorrect. Spreading requests across replicas is a server-side routing choice, and each new connection still pays the handshake.',
    'Correct. Session reuse skips the repeated handshake, which can cost a tenth or more of a tight latency budget on every request.',
  ]}
/>
