<script module>
  export const pageConfig = { title: 'Knowledge Check: Asynchronous Inference and Streaming' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Asynchronous Inference and Streaming</h1>

<p>These practice questions are ungraded. Select an answer to see feedback.</p>

<MultipleChoice
  id="kc_as_1"
  question="A team must embed 50 million documents. Each request can take longer than the few-minute timeout of a synchronous call, and no user waits on the result. Which approach fits?"
  options={[
    'Asynchronous jobs that return results to a webhook',
    'Synchronous HTTP requests with streaming output',
    'WebSocket connections held open for each document',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Asynchronous jobs are acknowledged immediately, allow hours to finish, and deliver results to a webhook.',
    'Incorrect. Streaming improves perceived latency, but synchronous requests still fail after a timeout of a few minutes.',
    'Incorrect. WebSockets serve real-time streams. Holding open connections wastes capacity on work that no one watches live.',
  ]}
/>

<MultipleChoice
  id="kc_as_2"
  question="A WebSocket voice service reaches its configured client limit on every server. What happens to the next client that tries to connect?"
  options={[
    'It connects and shares a slot with an existing client.',
    'It falls back to a gRPC connection automatically.',
    'It waits until a slot frees up or another replica scales up.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Each slot holds one client. A full server cannot accept another connection.',
    'Incorrect. WebSocket and gRPC are separate protocols, and no automatic fallback exists between them.',
    'Correct. New connections cannot be established until a slot frees up or autoscaling adds a replica.',
  ]}
/>
