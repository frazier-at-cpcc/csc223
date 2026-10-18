<script module>
  export const pageConfig = { title: 'Prefill and Decode' };
</script>

<h1>Prefill and Decode</h1>

<p>
  After step zero applies the chat template and tokenizes the input, inference proceeds in two primary
  phases.
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>The two phases of LLM inference</caption>
    <thead>
      <tr><th scope="col">Phase</th><th scope="col">What it does</th><th scope="col">What it produces</th></tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Prefill</th>
        <td>Processes the entire input sequence and calculates attention for each input token.</td>
        <td>A KV cache that stores those attention values</td>
      </tr>
      <tr>
        <th scope="row">Decode</th>
        <td>Runs forward passes through the model to generate tokens autoregressively.</td>
        <td>One output token per forward pass</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  <strong>Prefill</strong> is the phase that processes the input sequence and builds the KV cache.
  <strong>Decode</strong> is the phase that emits one token per forward pass. A
  <strong>forward pass</strong> is one complete trip of data through every layer of the model.
</p>

<h2>Walking through one request</h2>

<ol>
  <li>The engine applies the chat template and tokenizes the request.</li>
  <li>Prefill processes all of the input tokens and stores their attention values in the KV cache.</li>
  <li>Decode runs a forward pass, which produces the first output token.</li>
  <li>Decode appends that token to the sequence and runs another forward pass, which reuses and extends the KV cache.</li>
  <li>The loop repeats until a stopping condition is met.</li>
</ol>

<p>
  Building the KV cache during prefill and generating output tokens during decode take the overwhelming
  majority of the time and resources in inference. Both steps run large neural networks. Later sections
  of this chapter show that the two phases stress the GPU in different ways.
</p>
