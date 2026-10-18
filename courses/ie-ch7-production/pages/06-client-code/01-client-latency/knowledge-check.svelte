<script module>
  export const pageConfig = { title: 'Knowledge Check: Client Latency' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Client Latency</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_cl_1"
  question="A custom client for a speech model opens a new TLS connection for every request. Server-side inference is fast, but end-to-end latency misses the SLA. Which client change helps most?"
  options={[
    'Increase the request timeout on the client.',
    'Reuse the existing session for later requests.',
    'Send each request to a different replica.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. A longer timeout lets slow requests finish but does not remove any latency.',
    'Correct. Session reuse skips the repeated handshake, which can cost 10 percent or more of a tight latency budget.',
    'Incorrect. Spreading requests across replicas is a server-side routing choice and does not remove the handshake.',
  ]}
/>

<MultipleChoice
  id="kc_cl_2"
  question="Which portion of end-to-end latency reflects work done on the GPU?"
  options={['Model server time', 'Network time', 'Queue time']}
  correct={0}
  optionFeedback={[
    'Correct. Only the model server segment is on-server inference.',
    'Incorrect. Network time covers travel between client and server on both legs of the request.',
    'Incorrect. Queue time is spent waiting for a replica, before any GPU work begins.',
  ]}
/>
