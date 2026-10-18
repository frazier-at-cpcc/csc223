<script module>
  export const pageConfig = { title: 'How Precision Errors Compound' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>How Precision Errors Compound</h1>

<p>
  Quantization can introduce precision errors into the calculations that power inference. A small rounding error
  in one value grows as that value passes through repeated operations.
</p>

<h2>Worked example: powers of pi</h2>
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
<p>
  Rounding pi to 3 introduces an error of about 0.14. After squaring, the error grows to about 0.87. After cubing,
  it reaches about 4.0. Each operation multiplies the earlier error.
</p>

<Callout type="important">
  <p>
    An LLM performs billions of such operations for every token. Most of the work in quantization goes into
    preventing precision errors and minimizing their effect on the final output.
  </p>
</Callout>
