<script module>
  export const pageConfig = { title: 'TTFT and TPS' };
</script>

<script>
  import TokenStreamFigure from '../../../components/TokenStreamFigure.svelte';
</script>

<h1>TTFT and TPS</h1>

<p>
  The two most common performance metrics for large language models (LLMs) are time to first token and tokens per second.
  Chapter 6 covers metrics for other modalities.
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>The two core LLM latency metrics</caption>
    <thead>
      <tr>
        <th scope="col">Property</th>
        <th scope="col">Time to first token (TTFT)</th>
        <th scope="col">Tokens per second (TPS)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Question it answers</th>
        <td>With streaming output, how long does the user wait to see the first output token?</td>
        <td>After the first token, how many tokens does the user receive each second?</td>
      </tr>
      <tr>
        <th scope="row">Inference phase</th>
        <td>Prefill, which is compute-bound</td>
        <td>Decode, which is bound by memory bandwidth</td>
      </tr>
      <tr>
        <th scope="row">Better latency means</th>
        <td>Lower TTFT</td>
        <td>Higher TPS</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  <strong>Prefill</strong> is the phase in which the model processes the input sequence.
  <strong>Decode</strong> is the phase in which the model generates output one token per forward pass.
  Later chapters explain both phases in depth.
</p>

<TokenStreamFigure />

<h2>When TTFT and TPS do not apply</h2>

<p>
  TTFT and TPS suit user-facing systems, such as chatbots, that stream output to a person.
  Some requests produce output that is useless until it is complete, such as a tool call made by an agent.
  For those requests, measure latency as <strong>total response time</strong>, the time from request to complete response.
</p>
