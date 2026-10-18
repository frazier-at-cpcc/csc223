<script>
  // Figures 7.17 to 7.19: message flow for HTTP, WebSocket, and gRPC connections.
  let { kind = 'http' } = $props();
  const uid = $props.id();

  // dir: 'right' is client to server, 'left' is server to client, 'both' is bidirectional,
  // 'none' is a status line with no message.
  const data = {
    http: {
      title: 'HTTP exchange',
      messages: [
        { label: 'Request', dir: 'right' },
        { label: 'Response, streamed in chunks', dir: 'left' },
        { label: 'Exchange complete', dir: 'none' },
        { label: 'Next request on the reused connection', dir: 'right' },
      ],
      alt: 'HTTP exchange between a client and a server. The client sends one request, and the server returns one response, which can arrive in streamed chunks. The exchange then completes. The client sends its next request over the same reused connection.',
    },
    websocket: {
      title: 'WebSocket connection',
      messages: [
        { label: 'HTTP upgrade request', dir: 'right' },
        { label: 'Handshake accepted', dir: 'left' },
        { label: 'Messages flow both ways at any time', dir: 'both' },
      ],
      alt: 'WebSocket connection between a client and a server. The client sends an HTTP upgrade request, the server accepts the handshake, and a persistent connection then carries messages in both directions at any time.',
    },
    grpc: {
      title: 'gRPC bidirectional stream',
      messages: [
        { label: 'Open stream (HTTP/2)', dir: 'right' },
        { label: 'Message 1 (schema)', dir: 'right' },
        { label: 'Reply 1 (schema)', dir: 'left' },
        { label: 'Message 2 (schema)', dir: 'right' },
        { label: 'Reply 2 (schema)', dir: 'left' },
      ],
      alt: 'gRPC bidirectional stream between a client and a server. The client opens a stream over HTTP/2. Several schema-defined messages then travel from client to server while schema-defined replies travel back, interleaved on the same open stream.',
    },
  };
  const d = $derived(data[kind]);
  const h = $derived(64 + d.messages.length * 34 + 16);
</script>

<svg viewBox="0 0 540 {h}" role="img" aria-label={d.alt}>
  <text class="ie-svg-text" x="270" y="22" text-anchor="middle" font-size="15" font-weight="600">{d.title}</text>
  <rect x="20" y="40" width="110" height={h - 56} rx="4" fill="var(--ie-accent-soft)" stroke="var(--ie-accent)" stroke-width="2" />
  <text class="ie-svg-text" x="75" y={40 + (h - 56) / 2 + 5} text-anchor="middle" font-size="14" font-weight="600">Client</text>
  <rect x="410" y="40" width="110" height={h - 56} rx="4" fill="var(--ie-accent-soft)" stroke="var(--ie-accent)" stroke-width="2" />
  <text class="ie-svg-text" x="465" y={40 + (h - 56) / 2 + 5} text-anchor="middle" font-size="14" font-weight="600">Server</text>
  {#each d.messages as m, i}
    {@const y = 72 + i * 34}
    <line
      x1="140" y1={y} x2="400" y2={y}
      stroke={m.dir === 'none' ? 'var(--ie-muted)' : 'var(--ie-accent)'}
      stroke-width="2"
      stroke-dasharray={m.dir === 'none' ? '4 4' : 'none'}
      marker-end={m.dir === 'right' || m.dir === 'both' ? `url(#${uid}-end)` : null}
      marker-start={m.dir === 'left' || m.dir === 'both' ? `url(#${uid}-start)` : null}
    />
    <rect x="150" y={y - 22} width="240" height="18" fill="var(--ie-surface)" />
    <text class="ie-svg-text" x="270" y={y - 8} text-anchor="middle" font-size="12">{m.label}</text>
  {/each}
  <defs>
    <marker id="{uid}-end" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--ie-accent)" />
    </marker>
    <marker id="{uid}-start" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M10,0 L0,5 L10,10 z" fill="var(--ie-accent)" />
    </marker>
  </defs>
</svg>
