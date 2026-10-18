<script module>
  export const pageConfig = { title: 'Knowledge Check: Asynchronous Inference and Streaming' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Asynchronous Inference and Streaming</h1>
<p>These practice questions are ungraded. Each one gives feedback when you answer.</p>

<p class="ie-objective">Practices objective 9: diagnose the source of a latency problem</p>
<MultipleChoice
  id="kc_as_jobs"
  question="A team embeds 50 million documents with synchronous requests, and about 3 percent of requests fail after a few minutes even though the GPUs are healthy. No user waits on the results. Which change addresses the failures?"
  options={[
    'Hold a WebSocket connection open for each document.',
    'Stream each synchronous response over HTTP.',
    'Submit asynchronous jobs that return to a webhook.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. WebSockets serve real-time streams. Holding connections open for work no one watches wastes capacity and does not change the time limit.',
    'Incorrect. Streaming improves perceived latency, but a synchronous request still fails when it outlasts its timeout of a few minutes.',
    'Correct. The failures come from the synchronous timeout, not the GPUs. Asynchronous jobs are acknowledged at once, may run for hours, and deliver results to a webhook.',
  ]}
/>

<p class="ie-objective">Practices objective 9: diagnose the source of a latency problem</p>
<MultipleChoice
  id="kc_as_protocol"
  question="A browser-based voice assistant sends microphone audio in a new HTTP request every 200 milliseconds and waits for each response before sending the next chunk. Users hear long pauses, although server-side inference is fast. Which protocol change fits the workload?"
  options={[
    'gRPC with a schema for each audio chunk',
    'HTTP/2 with server-sent events',
    'A WebSocket held open for the call',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. gRPC streams in both directions, and many speech services use it between servers, but a browser cannot open a bidirectional gRPC stream. A WebSocket works directly from the browser.',
    'Incorrect. Server-sent events stream the response only. The client still cannot send new audio over the same exchange.',
    'Correct. The pauses come from the request-and-wait pattern. A WebSocket lets the client stream audio and the server stream replies at the same time over one open connection.',
  ]}
/>

<p class="ie-objective">Practices objective 9: diagnose the source of a latency problem</p>
<MultipleChoice
  id="kc_as_limit"
  question="During a product launch, new callers to a WebSocket voice service wait several seconds before their call connects, while connected callers hear no delay. Every server shows its configured client limit in use. Which component should change?"
  options={[
    'The autoscaler, so replicas are added as client slots fill',
    'The client, so it opens a fresh TLS session for each chunk',
    'The protocol, so callers switch to HTTP request and response',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Each server holds a fixed number of clients. New connections wait until a slot frees or another replica comes online, so the autoscaler must add replicas as slots fill.',
    'Incorrect. A fresh session per chunk adds handshake time for every caller. The wait here happens before connecting, because no slot is free.',
    'Incorrect. Request and response cannot carry live audio in both directions. The bottleneck is the number of client slots, not the protocol.',
  ]}
/>
