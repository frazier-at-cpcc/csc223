<script module>
  export const pageConfig = { title: 'Choosing a Format' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import { Callout } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>Choosing a Format</h1>

<h2>Local and edge inference</h2>
<p>
  This course focuses on datacenter inference, but quantization is also essential for running large models on
  <Term id="local-inference">local and edge hardware</Term>. GGUF, a binary format for storing models, is the most
  popular way to distribute highly quantized models on <Term id="hugging-face" />. Researchers and companies use it
  to fit very large models such as DeepSeek onto consumer hardware such as Apple computers.
</p>
<p>
  These distributions rely on <strong>dynamic quantization</strong>, which in this context means mixed precision
  layer by layer. Some layers or components stay at their original precision, while others are quantized to
  integers with as little as one bit. A dynamic format reports its average precision. The 1.58-bit quantization
  popularized by the fine-tuning lab Unsloth is one example.
</p>

<Callout type="info">
  <p>
    The term has a second meaning. In PyTorch and most machine learning literature, dynamic quantization means
    computing activation scale factors at runtime instead of ahead of time. The GGUF sense and the PyTorch sense are
    unrelated.
  </p>
</Callout>

<h2>Production inference</h2>
<p>
  For quality-sensitive datacenter serving on Hopper and Blackwell GPUs, the book recommends floating-point formats.
  Their higher dynamic range preserves outliers that integer formats of the same width can lose. Integer formats
  still appear in production. Weight-only INT4 and INT8 schemes are common, and some labs release models trained in
  INT4 with quantization-aware training.
</p>

<div class="ie-table-wrap" role="region" aria-label="Formats for datacenter inference, as of October 2026" use:scrollable>
  <table class="ie-table">
    <caption>Formats for datacenter inference, as of October 2026</caption>
    <thead>
      <tr><th scope="col">Format</th><th scope="col">Hardware</th><th scope="col">Granularity</th><th scope="col">Typical use</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">FP8</th><td>Hopper and later</td><td>Tensor or channel scales</td><td>Default 8-bit choice on Hopper fleets</td></tr>
      <tr><th scope="row">MXFP8</th><td>Blackwell and later</td><td>Blocks of 32</td><td>8-bit choice on Blackwell, including the <Term id="kv-cache">KV cache</Term></td></tr>
      <tr><th scope="row">NVFP4</th><td>Blackwell and later</td><td>Blocks of 16 plus a tensor scale</td><td>Aggressive 4-bit quantization where evals confirm quality</td></tr>
      <tr><th scope="row">INT4 or INT8, <Term id="weights">weights</Term> only</th><td>Most GPUs</td><td>Channel or group scales</td><td>Memory savings for <Term id="decode">decode</Term> when <Term id="activations">activations</Term> stay at higher precision</td></tr>
    </tbody>
  </table>
</div>

<Callout type="tip">
  <p>
    The 8-bit floating-point formats, FP8 and MXFP8, are generally the best balance of performance and quality.
    FP4 is promising, especially NVFP4 with its finer granularity. FP8 and MXFP8 offer the most flexibility,
    particularly for quantizing the KV cache. A format that needs Blackwell hardware is not an option on a Hopper
    fleet, so check the GPU generation before comparing quality.
  </p>
</Callout>
