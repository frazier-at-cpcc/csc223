<script module>
  export const pageConfig = { title: 'Rubin and Feynman' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Rubin and Feynman</h1>

<p>
  The <strong>Rubin</strong> architecture is named for astronomer Vera Rubin. It launches in 2026 as NVIDIA's
  next-generation GPU architecture.
</p>

<Callout type="warning">
  <p>
    Reserve judgment on a new architecture until you can run real-world benchmarks. A new architecture, followed
    by industry-wide software support, takes about a year to reach full adoption.
  </p>
</Callout>

<h2>What is known about Rubin</h2>
<dl>
  <dt><strong>HBM4 memory</strong></dt>
  <dd>
    Rubin uses HBM4, which succeeds the HBM3 and HBM3e memory of the last few generations. Memory-bound tasks
    such as LLM decode benefit from this higher-throughput VRAM.
  </dd>
  <dt><strong>Rubin CPX</strong></dt>
  <dd>
    Rubin introduces the CPX, a separate chip built for compute-bound tasks such as LLM prefill. The CPX will be
    part of NVIDIA's rack-scale systems for high-volume inference.
  </dd>
</dl>
<p>
  The two additions target the two bottlenecks from earlier in this chapter. HBM4 relieves the memory-bandwidth
  limit on decode. The CPX adds compute for prefill.
</p>

<h2>Feynman</h2>
<p>
  NVIDIA plans to release the Feynman architecture in 2028. Few details are public. Feynman is likely to support
  larger, more powerful chips with a faster memory architecture.
</p>
