<script module>
  export const pageConfig = { title: 'Rubin and Feynman' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Term from '$shared/Term.svelte';
</script>

<h1>Rubin and Feynman</h1>

<p>
  The <strong>Rubin</strong> architecture is named for astronomer Vera Rubin. It succeeds <Term id="blackwell">Blackwell</Term> as NVIDIA's
  next-generation <Term id="gpu">GPU</Term> architecture. As of October 2026, NVIDIA has scheduled the first Rubin systems for the
  second half of 2026.
</p>

<Callout type="warning">
  <p>
    Reserve judgment on a new architecture until you can run real-world
    <Term id="performance-benchmark">benchmarks</Term> on your own workload. A new architecture, followed by
    industry-wide software support, takes about a year to reach full adoption.
  </p>
</Callout>

<h2>Announced Rubin features</h2>
<dl>
  <dt><strong>HBM4 memory</strong></dt>
  <dd>
    Rubin uses HBM4, which succeeds the HBM3 and HBM3e memory of the last few generations. Memory-bound tasks
    such as LLM <Term id="decode">decode</Term> benefit from this higher-throughput <Term id="vram">VRAM</Term>.
  </dd>
  <dt><strong>Rubin CPX</strong></dt>
  <dd>
    A separate chip built for <Term id="compute-bound">compute-bound</Term> tasks such as LLM <Term id="prefill">prefill</Term>. NVIDIA positions
    the CPX for context processing, the prefill of very long inputs. NVIDIA announced it in September 2025 as part
    of its rack-scale systems for high-volume inference.
  </dd>
</dl>
<p>
  The two additions target the two bottlenecks from the GPU Architecture section. HBM4 raises the bandwidth
  ceiling that limits decode. The CPX adds compute for prefill, so a system can assign each phase to the chip
  that suits it.
</p>

<h2>Feynman</h2>
<p>
  As of October 2026, NVIDIA plans to release the Feynman architecture in 2028. Few details are public. Feynman
  is expected to support larger, more powerful chips with a faster memory architecture.
</p>
