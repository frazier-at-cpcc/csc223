<script module>
  export const pageConfig = { title: 'Session Reuse' };
</script>

<h1>Session Reuse</h1>

<p>
  Establishing a session between a client and a server takes a few dozen milliseconds. The exact time depends on the
  client's internet connection and the protocol. Part of that time is the <strong>TLS handshake</strong>, the exchange
  that sets up an encrypted connection.
</p>

<div class="ie-worked">
  <h2>Worked example</h2>
  <p>A high-performance system has a P95 end-to-end latency SLA of 300 milliseconds.</p>
  <ul>
    <li>A TLS handshake costs at least 30 milliseconds.</li>
    <li>Share of the budget: 30 ÷ 300 = 10 percent.</li>
  </ul>
  <p>At least a tenth of the latency budget is gone before inference starts.</p>
</div>

<h2>Reuse existing sessions</h2>

<p>
  Later requests from the same client should reuse the existing session and skip the handshake. Session reuse is a
  long-established practice. The OpenAI SDK provides it automatically. Teams that build their own client for a
  non-standard modality must implement session reuse and similar best practices themselves.
</p>
