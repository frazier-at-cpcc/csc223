<script module>
  export const pageConfig = { title: 'Streaming Protocols' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Figure from '../../../components/Figure.svelte';
  import ConnectionDiagram from '../../../components/ConnectionDiagram.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Streaming Protocols</h1>

<p>
  Streaming makes applications feel instant. For language models, streaming text output over <Term id="http">HTTP</Term> is
  sufficient. Live voice and video are different. Both the input stream and the output stream must carry much more
  data, continuously, in both directions.
</p>

<h2>HTTP Request and Response</h2>
<p>
  A basic HTTP exchange carries one request and one response. The server can stream that response in pieces, which is
  how server-sent events deliver LLM tokens as they are generated. The client cannot stream new input over the same
  exchange, because its request is already complete. The connection itself does not have to close. HTTP/1.1 keep-alive
  and HTTP/2 reuse one connection for many exchanges.
</p>
<Figure
  number="7.17"
  caption="One-time HTTP requests and responses are a good fit for use cases like text chat, but not for continuous streaming in both directions."
  description="A client sends a single request to a server. The server sends back a single response, which can arrive in streamed chunks. The exchange then completes. The client's next request travels over the same reused connection."
>
  <ConnectionDiagram kind="http" />
</Figure>

<Signal kind="mistake" title="Believing HTTP closes after every response">
  <p>
    An HTTP exchange ends after its response, but the connection usually stays open for the next exchange. HTTP's
    limit for live audio is not a closing connection. It is that each exchange flows one way at a time: the client
    finishes its request before the server answers.
  </p>
</Signal>

<h2>Bidirectional Streaming</h2>
<p>The two most common protocols for bidirectional streaming between client and server are WebSockets and gRPC.</p>
<div class="ie-table-wrap" role="region" aria-label="Bidirectional Streaming table" use:scrollable>
<table class="ie-table">
  <thead>
    <tr><th scope="col">Protocol</th><th scope="col">Data</th><th scope="col">Best fit</th></tr>
  </thead>
  <tbody>
    <tr><td>WebSocket</td><td>Unstructured, with no schema enforcement</td><td>Real-time streams such as audio chunks</td></tr>
    <tr><td>gRPC</td><td>Structured, following a predefined schema</td><td>Well-defined service-to-service communication</td></tr>
  </tbody>
</table>
</div>

<h3>WebSockets</h3>
<p>
  A <strong>WebSocket</strong> is a lightweight, bidirectional streaming transport. It starts as an HTTP request that
  asks the server to upgrade the connection. After the handshake, client and server can each send messages at any
  time. It suits unstructured, real-time data such as audio. The receiving server parses the data and processes it
  downstream.
</p>
<p>
  A WebSocket server supports a fixed number of clients that the developer configures. When that limit is reached, new
  connections wait until a slot frees up or another <Term id="replica">replica</Term> scales up.
</p>
<Figure
  number="7.18"
  caption="WebSockets establish a continuous connection for unstructured data like audio streams."
  description="A client sends an HTTP upgrade request to a server. The server accepts the handshake. A continuous WebSocket connection then carries messages in both directions at any time."
>
  <ConnectionDiagram kind="websocket" />
</Figure>

<h3>gRPC</h3>
<p>
  <strong>gRPC</strong> is a structured, schema-first framework built on HTTP/2 that supports streaming in both
  directions. Every message must follow a predefined schema and is serialized, which means encoded into a compact
  binary format before it travels. The server does not have to parse free-form input. The book describes the extra
  validation layer as making gRPC slightly slower than WebSockets. In practice the difference depends on the workload,
  because gRPC's binary encoding can also reduce the bytes sent.
</p>
<Figure
  number="7.19"
  caption="gRPC establishes a continuous connection for well-defined service-to-service communication."
  description="A client opens a stream to a server over HTTP/2. Schema-defined messages travel from client to server while schema-defined replies travel back, interleaved on the same open stream."
>
  <ConnectionDiagram kind="grpc" />
</Figure>
