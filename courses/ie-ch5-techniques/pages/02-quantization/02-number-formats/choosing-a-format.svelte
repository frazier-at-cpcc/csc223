<script module>
  export const pageConfig = { title: 'Choosing a Format' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Choosing a Format</h1>

<h2>Local and edge inference</h2>
<p>
  This course focuses on datacenter inference, but quantization is also essential for running large models on
  local and edge hardware. GGUF, a binary format for storing models, is the most popular way to distribute highly
  quantized models on Hugging Face. Researchers and companies use it to fit very large models such as DeepSeek onto
  consumer hardware such as Apple computers.
</p>
<p>
  These distributions rely on <strong>dynamic quantization</strong>. Some layers or components stay at their
  original precision, while others are quantized to integers with as little as one bit. A dynamic format reports
  its average precision. The 1.58-bit quantization popularized by the fine-tuning lab Unsloth is one example.
</p>

<h2>Production inference</h2>
<p>
  Dynamic integer quantization is impressive engineering and works well for local inference. Production systems
  should use floating-point formats instead. Integer formats lack the dynamic range that quality-sensitive
  workloads require.
</p>

<Callout type="tip">
  <p>
    The 8-bit floating-point formats, FP8 and MXFP8, are generally the best balance of performance and quality.
    FP4 is promising, especially NVFP4 with its finer granularity. FP8 and MXFP8 offer the most flexibility,
    particularly for quantizing the KV cache.
  </p>
</Callout>
