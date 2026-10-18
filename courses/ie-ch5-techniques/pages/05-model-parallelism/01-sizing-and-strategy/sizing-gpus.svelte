<script module>
  export const pageConfig = { title: 'Estimating GPU Count' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
</script>

<h1>Estimating GPU Count</h1>

<p>
  Every frontier LLM is too large to fit on one GPU for batch inference. GPUs have grown, and models have grown
  faster. That trend shows no sign of reversing.
</p>

<h2>Weights are only the start</h2>
<p>
  In FP8, each billion parameters of weights takes roughly one gigabyte of VRAM. DeepSeek-V3.1 has 671 billion
  parameters, so its weights alone would cause an out-of-memory (OOM) error on a single B200.
</p>
<p>
  Fitting the weights is not enough. Four B200 GPUs provide 720 GB of VRAM, which could theoretically hold
  DeepSeek's weights. No room would remain for a KV cache, which often takes 80 percent or more of the VRAM left
  after weights. Four B200s could not serve DeepSeek at any reasonable sequence length or batch size. A full node of
  eight B200 GPUs is needed for real production traffic.
</p>

<h2>The sizing estimate</h2>
<p>
  Estimate the minimum VRAM by multiplying bytes per parameter, parameter count, and an expected KV cache allocation
  factor. Then round up to the next available instance size.
</p>

<Figure
  number="5.11"
  caption="After calculating how much VRAM inference requires, round up to the next available instance size to find the minimum GPU count."
>
  <pre class="ie-code"><code># Deciding GPU allocation for DeepSeek
bits_precision = 8  # FP8 quantization
params = 671  # parameters in billions
kv_cache_allocation = 1.8

vram_required = (bits_precision / 8) * params * kv_cache_allocation
# DeepSeek requires about 1200 GB of VRAM with this config

b200_vram_available = [180, 360, 720, 1440]

round_up(vram_required, b200_vram_available)
# Serving DeepSeek in FP8 requires 1440 GB of VRAM (8xB200 GPUs)</code></pre>
</Figure>

<h2>Worked example</h2>
<p>Apply the same estimate to a 235-billion-parameter model served in FP8.</p>
<ol>
  <li>Bytes per parameter: 8 bits ÷ 8 = 1 byte.</li>
  <li>VRAM required: 1 × 235 × 1.8 = 423 GB.</li>
  <li>Round up to the next instance size: 423 GB exceeds 360 GB, so the minimum is 720 GB, or four B200 GPUs.</li>
</ol>
<p>
  Many deployments, even for midsize models such as GPT-OSS, use more GPUs than the minimum. Extra GPUs allow larger
  KV caches and better per-user latency.
</p>
