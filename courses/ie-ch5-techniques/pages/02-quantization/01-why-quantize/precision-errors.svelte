<script module>
  export const pageConfig = { title: 'How Precision Errors Compound' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>How Precision Errors Compound</h1>

<p>
  Quantization can introduce precision errors into the calculations that power inference. A small rounding error
  in one value grows as that value passes through repeated operations.
</p>

<Signal kind="worked" title="Powers of pi at three precisions">
  <p>The table squares and cubes pi stored at three different precisions.</p>
  <table class="ie-table">
    <caption>Pi at three precisions, squared and cubed</caption>
    <thead>
      <tr><th scope="col">Pi precision</th><th scope="col">Pi squared</th><th scope="col">Pi cubed</th></tr>
    </thead>
    <tbody>
      <tr><td>3.14159</td><td>9.869588</td><td>31.006198</td></tr>
      <tr><td>3.14</td><td>9.8596</td><td>30.959144</td></tr>
      <tr><td>3</td><td>9</td><td>27</td></tr>
    </tbody>
  </table>
  <ol>
    <li>Rounding pi to 3 introduces an error of about 0.14.</li>
    <li>After squaring, the error grows to about 9.87 − 9 = 0.87.</li>
    <li>After cubing, the error reaches about 31.01 − 27 = 4.0.</li>
  </ol>
  <p>Each multiplication scales the earlier error, so the error grows faster than the value itself.</p>
</Signal>

<Callout type="important">
  <p>
    An LLM performs billions of such operations for every token. Most of the work in quantization goes into
    preventing precision errors and minimizing their effect on the final output.
  </p>
</Callout>
