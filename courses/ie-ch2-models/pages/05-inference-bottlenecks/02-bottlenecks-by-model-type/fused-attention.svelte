<script module>
  export const pageConfig = { title: 'Fused Attention over a Full Prompt' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Fused Attention over a Full Prompt</h1>

<p>
  The previous page found that unfused attention over a 4,096-token prompt, with d = 128, performs 8,640,266,240
  operations and moves 138,412,032 bytes, an intensity of about 62 operations per byte. This page explains that
  result and recounts it for a fused kernel.
</p>

<Signal kind="worked" title="Intensity of fused attention, N = 4,096 and d = 128">
  <h2>Step 6: Compare with the hardware and find the cause</h2>

  <p>
    The intensity of 62 is below the H100's ops:byte ratio of 295, so this unfused kernel is memory bound. The
    cause is the 8N² term. Lines 1 and 2 of Figure 2.14 write the N × N matrices S and P to HBM, and lines 2 and 3 read them
    back. Those round trips dominate the traffic.
  </p>

  <p>
    <Term id="flashattention">FlashAttention</Term>, covered in the next section, keeps S and P in on-chip memory. Only Q, K, and V are read and
    only O is written, so the traffic falls to 8Nd bytes while the operations stay the same.
  </p>

  <pre><code>bytes with S and P kept on chip = 8 × 4,096 × 128 = 4,194,304
intensity = 8,640,266,240 / 4,194,304 = 2,060 operations per byte</code></pre>

  <p>
    At 2,060 operations per byte, full-prompt attention is far above the ridge point and compute bound. This is
    why prefill attention runs compute bound in practice.
  </p>
</Signal>

<Signal kind="mistake" title="Using this example to prove decode is memory bound">
  <p>
    This example processes every query of the sequence at once, so it describes prefill, not decode. Its low
    intensity comes from writing S and P to memory, a flaw of the unfused kernel that FlashAttention removes. Decode
    is memory bound for a different reason: each step reads all the weights and the whole KV cache to process a
    single token, as the Arithmetic Intensity of Decode worked example calculated.
  </p>
</Signal>
