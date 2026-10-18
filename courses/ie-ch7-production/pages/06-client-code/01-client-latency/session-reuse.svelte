<script module>
  export const pageConfig = { title: 'Session Reuse' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Session Reuse</h1>

<p>
  Before a client can send its first request, it must establish a session with the server. On a new connection, a
  TCP handshake takes one network round trip. The <strong>TLS handshake</strong>, the exchange that sets up an
  encrypted connection, then takes one more round trip with TLS 1.3, or two with the older TLS 1.2. Session setup
  therefore costs a multiple of the round-trip time. Near an edge location it takes a few milliseconds. Across a
  continent it takes tens of milliseconds or more.
</p>

<Signal kind="worked" title="Handshake cost against a latency budget">
  <p>A high-performance system has a P95 end-to-end latency SLO of 300 milliseconds. The client sits 15 milliseconds of round trip from the server and uses TLS 1.3.</p>
  <ol>
    <li>Round trips before the first request: 1 for TCP + 1 for TLS 1.3 = 2.</li>
    <li>Session setup time: 2 × 15 = 30 milliseconds.</li>
    <li>Share of the budget: 30 ÷ 300 = 10 percent.</li>
  </ol>
  <p>A tenth of the <Term id="latency-budget">latency budget</Term> is gone before inference starts, on every request that opens a new session.</p>
</Signal>

<Signal kind="mistake" title="Treating the handshake as a fixed cost">
  <p>
    The 30 milliseconds above belongs to that path, not to TLS itself. The same handshake costs about 6 milliseconds
    at a 3-millisecond round trip and about 140 milliseconds at a 70-millisecond round trip. Estimate the cost from the
    round-trip time of the actual path.
  </p>
</Signal>

<h2>Reusing Existing Sessions</h2>
<p>
  Later requests from the same client should reuse the existing session and skip the handshake. HTTP/1.1 keep-alive
  and HTTP/2 both hold a connection open across many requests for this reason. <Term id="session-reuse">Session reuse</Term> is a long-established
  practice, and the OpenAI SDK provides it automatically. Teams that build their own client for a non-standard
  modality must implement session reuse and similar best practices themselves.
</p>

<p class="ie-objective">Practices objective 9: diagnose the source of a latency problem</p>
<NumericQuestion
  id="pr_handshake"
  question="A custom client opens a new TLS 1.3 connection for every request over a path with a 40-millisecond round trip. The P95 end-to-end SLO is 300 milliseconds. What percentage of the SLO does session setup consume on each request?"
  answer={26.67}
  tolerance={0.5}
  unit="percent"
  correctFeedback="Correct. TCP and TLS 1.3 take 2 round trips, so setup costs 2 × 40 = 80 milliseconds, which is 80 ÷ 300 = 26.7 percent of the SLO. Session reuse removes it from every request after the first."
  incorrectFeedback="Count round trips first: 1 for TCP and 1 for TLS 1.3, so 2 × 40 = 80 milliseconds. Then divide by the SLO: 80 ÷ 300 = 0.267, or about 26.7 percent."
/>
