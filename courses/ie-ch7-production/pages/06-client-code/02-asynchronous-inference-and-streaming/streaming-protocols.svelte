<script module>
  export const pageConfig = { title: 'Streaming Protocols' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import ConnectionDiagram from '../../../components/ConnectionDiagram.svelte';
</script>

<h1>Streaming Protocols</h1>

<p>
  Streaming makes applications feel instant. For language models, streaming text output over HTTP is sufficient. Live
  voice and video are different. Both the input stream and the output stream must carry much more data.
</p>

<h2>HTTP</h2>

<p>An HTTP exchange is one request and one response. The connection then closes.</p>

<Figure
  number="7.17"
  caption="One-time HTTP requests and responses are a good fit for use cases like text chat, but not for continuous streaming."
  description="A client sends a single request to a server. The server sends back a single response. The connection is then terminated."
>
  <ConnectionDiagram kind="http" />
</Figure>

<h2>Bidirectional streaming</h2>

<p>The two most common protocols for bidirectional streaming between client and server are WebSockets and gRPC.</p>

<table class="ie-table">
  <thead>
    <tr><th scope="col">Protocol</th><th scope="col">Data</th><th scope="col">Best fit</th></tr>
  </thead>
  <tbody>
    <tr><td>WebSocket</td><td>Unstructured, with no schema enforcement</td><td>Real-time streams such as audio chunks</td></tr>
    <tr><td>gRPC</td><td>Structured, following a predefined schema</td><td>Well-defined service-to-service communication</td></tr>
  </tbody>
</table>

<h3>WebSockets</h3>

<p>
  A <strong>WebSocket</strong> is a lightweight, bidirectional streaming transport. It suits unstructured, real-time
  data such as audio. The receiving server parses the data and processes it downstream.
</p>

<p>
  A WebSocket server supports a fixed number of clients that the developer configures. When that limit is reached, new
  connections wait until a slot frees up or another replica scales up.
</p>

<Figure
  number="7.18"
  caption="WebSockets establish a continuous connection for unstructured data like audio streams."
  description="A client sends a request to a server. The server answers with a handshake. A continuous WebSocket connection then carries data in both directions."
>
  <ConnectionDiagram kind="websocket" />
</Figure>

<h3>gRPC</h3>

<p>
  <strong>gRPC</strong> is a structured, schema-first bidirectional streaming protocol. Every request must follow a
  predefined schema, so the server does not have to parse free-form input. That extra validation layer makes gRPC
  slightly slower than WebSockets.
</p>

<Figure
  number="7.19"
  caption="gRPC establishes a continuous connection for well-defined service-to-service communication."
  description="A client sends serialized requests to a server, and the server returns serialized responses over a continuous connection. Both directions follow a predefined schema."
>
  <ConnectionDiagram kind="grpc" />
</Figure>
