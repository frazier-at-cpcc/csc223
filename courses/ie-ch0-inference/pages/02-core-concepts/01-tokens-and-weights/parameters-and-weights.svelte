<script module>
  export const pageConfig = { title: 'Parameters and Weights' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Parameters and Weights</h1>

<dl>
  <dt><dfn><strong>Parameter</strong></dfn></dt>
  <dd>One learned number in a model.</dd>
  <dt><dfn><strong>Weights</strong></dfn></dt>
  <dd>The full set of learned numbers that define a model. Training sets the weights, and inference reads them.</dd>
</dl>

<p>
  Model sizes are stated as parameter counts. An "8B" model has about 8 billion parameters, and a "70B" model has about 70
  billion. The model name often carries the count, as in Llama 3.1 8B.
</p>

<h2>Bytes per Parameter</h2>

<p>
  Each parameter is stored in a number format. The format's <Term id="precision">precision</Term> sets how many bytes each parameter
  occupies.
</p>

<table>
  <caption>Common number formats and the bytes each uses per parameter</caption>
  <thead>
    <tr>
      <th scope="col">Format</th>
      <th scope="col">Bits</th>
      <th scope="col">Bytes per parameter</th>
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row">FP32</th><td>32</td><td>4</td></tr>
    <tr><th scope="row">FP16 and <Term id="bf16">BF16</Term></th><td>16</td><td>2</td></tr>
    <tr><th scope="row"><Term id="fp8">FP8</Term></th><td>8</td><td>1</td></tr>
    <tr><th scope="row"><Term id="fp4">FP4</Term></th><td>4</td><td>0.5</td></tr>
  </tbody>
</table>

<p>Open models are usually published in BF16 or FP16. Lower-precision formats appear later in this chapter.</p>

<h2>Weight Memory</h2>

<p>The memory that the weights occupy follows from two numbers:</p>

<p class="formula">weight memory = parameter count × bytes per parameter</p>

<p>
  This series uses gigabytes (GB) of 10<sup>9</sup> bytes. With the parameter count in billions, the result is in GB
  directly: multiply the count in billions by the bytes per parameter.
</p>

<Signal kind="worked" title="Weight memory of an 8-billion-parameter model">
  <p>A team plans to serve an 8-billion-parameter model in FP16. How much memory do the weights occupy?</p>
  <ol>
    <li>Identify the parameter count: 8 billion, or 8 × 10<sup>9</sup>.</li>
    <li>Identify the bytes per parameter: FP16 uses 2 bytes.</li>
    <li>Multiply: 8 × 10<sup>9</sup> × 2 bytes = 16 × 10<sup>9</sup> bytes.</li>
    <li>Convert: 16 × 10<sup>9</sup> bytes is 16 GB.</li>
  </ol>
  <p>
    The weights alone occupy 16 GB. Stored in FP8, the same model needs 8 GB, because each parameter takes 1 byte instead of
    2.
  </p>
</Signal>

<p>
  Weight memory is the first number an inference engineer checks for any model. A later page in this section compares it
  with the memory a GPU provides. Chapter 3 extends the calculation to total GPU memory, and Chapter 5 covers the
  lower-precision formats.
</p>

<style>
  .formula {
    padding: var(--tessera-spacing-sm) var(--tessera-spacing-md);
    border: 1px solid var(--tessera-border);
    border-radius: 6px;
    background: var(--tessera-bg-secondary);
    font-weight: 600;
    text-align: center;
  }
</style>
