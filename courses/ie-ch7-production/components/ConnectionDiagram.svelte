<script>
  // Figures 7.17 to 7.19: message flow for HTTP, WebSocket, and gRPC connections.
  let { kind = 'http' } = $props();
  const uid = $props.id();

  // dir: 'right' is client to server, 'left' is server to client, 'both' is bidirectional.
  const data = {
    http: {
      title: 'HTTP connection',
      messages: [
        { label: 'Request', dir: 'right' },
        { label: 'Response', dir: 'left' },
        { label: 'Connection terminated', dir: 'none' },
      ],
      alt: 'HTTP connection between a client and a server. The client sends one request, the server returns one response, and the connection is then terminated.',
    },
    websocket: {
      title: 'WebSocket connection',
      messages: [
        { label: 'Request', dir: 'right' },
        { label: 'Handshake', dir: 'left' },
        { label: 'WebSocket stream, both directions', dir: 'both' },
      ],
      alt: 'WebSocket connection between a client and a server. The client sends a request, the server answers with a handshake, and a continuous connection then carries data in both directions.',
    },
    grpc: {
      title: 'gRPC connection',
      messages: [
        { label: 'Request (serialized)', dir: 'right' },
        { label: 'Response (serialized)', dir: 'left' },
      ],
      alt: 'gRPC connection between a client and a server. Serialized requests travel from client to server and serialized responses travel back over a continuous connection that follows a predefined schema.',
    },
  };
  const d = $derived(data[kind]);
</script>

<svg viewBox="0 0 540 190" role="img" aria-label={d.alt}>
  <text class="ie-svg-text" x="270" y="22" text-anchor="middle" font-size="15" font-weight="600">{d.title}</text>
  <rect x="20" y="50" width="110" height="110" rx="4" fill="var(--ie-accent-soft)" stroke="var(--ie-accent)" stroke-width="2" />
  <text class="ie-svg-text" x="75" y="110" text-anchor="middle" font-size="14" font-weight="600">Client</text>
  <rect x="410" y="50" width="110" height="110" rx="4" fill="var(--ie-accent-soft)" stroke="var(--ie-accent)" stroke-width="2" />
  <text class="ie-svg-text" x="465" y="110" text-anchor="middle" font-size="14" font-weight="600">Server</text>
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
    <rect x="190" y={y - 22} width="160" height="18" fill="#ffffff" />
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
