<script module>
  export const pageConfig = { title: 'Comparing the Three Engines' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Comparing the Three Engines</h1>

<p>
  At a high level, vLLM and SGLang are general tools. They are easier to adopt
  and offer day-zero support for more models. TensorRT-LLM has a steeper learning
  curve but usually achieves the best performance.
</p>

<table class="data">
  <caption>Inference engine comparison, as summarized in the book</caption>
  <thead>
    <tr>
      <th scope="col">Engine</th>
      <th scope="col">vLLM</th>
      <th scope="col">SGLang</th>
      <th scope="col">TensorRT-LLM</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Performance</th>
      <td>Good</td>
      <td>Good</td>
      <td>Best</td>
    </tr>
    <tr>
      <th scope="row">Ease of use</th>
      <td>Easy</td>
      <td>Easy</td>
      <td>Hard</td>
    </tr>
    <tr>
      <th scope="row">Model support</th>
      <td>Most</td>
      <td>Most</td>
      <td>Some</td>
    </tr>
    <tr>
      <th scope="row">Hardware</th>
      <td>GPU, TPU</td>
      <td>NVIDIA, AMD</td>
      <td>NVIDIA only</td>
    </tr>
    <tr>
      <th scope="row">License</th>
      <td>Apache 2.0</td>
      <td>Apache 2.0</td>
      <td>Apache 2.0</td>
    </tr>
  </tbody>
</table>

<h2>A principle behind the table</h2>

<p>
  A core principle of inference engineering holds that more constraints allow
  better performance. A broad engine must work across many models and many
  types of hardware. A narrow engine can specialize for one vendor's hardware and
  extract more from it. The performance row of the table reflects this tradeoff.
</p>

<Callout type="info">
  <p>
    The author's company, Baseten, uses all three engines and relies on
    TensorRT-LLM most often. The book recommends that inference engineers learn
    all three and choose one for each deployment based on its needs.
  </p>
</Callout>
