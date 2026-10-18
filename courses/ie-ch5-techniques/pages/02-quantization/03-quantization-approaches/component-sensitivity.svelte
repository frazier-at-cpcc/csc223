<script module>
  export const pageConfig = { title: 'Component Sensitivity' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import QuantizationRisk from '../../../components/QuantizationRisk.svelte';
</script>

<h1>Component Sensitivity</h1>

<p>
  Model components differ in how much quantization affects them. Quantizing a more sensitive component carries a
  higher risk of degrading quality. From least to most sensitive, the components rank as follows.
</p>
<ol>
  <li><strong>Weights.</strong> The weights of the linear layers are the least sensitive.</li>
  <li>
    <strong>Activations.</strong> The intermediate outputs of activation functions are somewhat sensitive. The
    activation functions themselves are rarely quantized, because they are a tiny fraction of the model.
  </li>
  <li><strong>KV cache.</strong> The cached keys and values from attention are moderately sensitive.</li>
  <li><strong>Attention.</strong> The attention layers are highly sensitive, especially operations such as softmax.</li>
</ol>

<QuantizationRisk />

<h2>Selective quantization within a component</h2>
<p>
  Linear layers and activations are the safest components to quantize. Even so, the earliest and latest layers,
  such as the input and output layers, are more sensitive and often stay at their original precision.
</p>

<h2>Why the KV cache and attention need care</h2>
<p>
  Quantizing weights and activations speeds up inference directly. Quantizing the KV cache adds a further benefit:
  the engine can hold more cache in memory and read it faster, which strengthens prefix caching and
  disaggregation.
</p>
<p>
  Each token's KV cache entries are read by every later token. A precision error introduced into the cache
  therefore compounds from token to token. Attention faces the same problem in a stronger form. Attention is very
  sensitive to dynamic range, and each attention calculation depends on the results of the previous ones. Over
  thousands of tokens, the errors accumulate quickly. All but the most aggressive schemes keep functions such as
  softmax at their original precision.
</p>

<Callout type="tip">
  <p>
    A moderate approach uses a high-dynamic-range format such as FP8, ideally a microscaling format such as MXFP8.
    It quantizes selected linear layers, activations, and often the KV cache, and it leaves the attention
    components at their original precision.
  </p>
</Callout>
