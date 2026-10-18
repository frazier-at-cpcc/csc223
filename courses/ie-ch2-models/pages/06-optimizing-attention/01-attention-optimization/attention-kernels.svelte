<script module>
  export const pageConfig = { title: 'FlashAttention and PagedAttention' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>FlashAttention and PagedAttention</h1>

<p>Two well-known implementations improve attention without changing its result.</p>

<h2>FlashAttention</h2>

<p>
  <strong>FlashAttention</strong> is a series of papers and optimized attention kernels. The basic
  algorithm fits in a handful of lines of code. FlashAttention uses tens of thousands of lines to implement
  attention in hand-fused <Term id="kernel">kernels</Term> for specific <Term id="gpu">GPUs</Term>. As of early 2026, FlashAttention 3
  targets Hopper GPUs such as the <Term id="h100">H100</Term>, and FlashAttention 4 targets Blackwell GPUs such as
  the <Term id="b200">B200</Term>.
</p>

<ul>
  <li>It eliminates excess reads and writes to memory, such as the round trips of S and P in the standard algorithm. The worked example in Section 5 showed that this raises full-prompt attention from 62 to about 2,060 operations per byte.</li>
  <li>It lays out the attention algorithm to fit the GPU's capabilities precisely.</li>
  <li>It is especially useful for <Term id="compute-bound">compute-bound</Term> operations such as LLM <Term id="prefill">prefill</Term> and video generation.</li>
</ul>

<h2>PagedAttention</h2>

<p>
  KV caches grow large quickly. They fill GPU memory and take time to read. <strong>PagedAttention</strong>
  partitions the KV cache into fixed-size blocks, called pages, and finds them through a lookup table.
  The KV cache can then occupy fragmented memory across the GPU instead of requiring a single contiguous
  block.
</p>

<h2>What these implementations do not change</h2>

<p>
  FlashAttention and PagedAttention are valuable, but attention remains a quadratic algorithm with both of
  them. Changing the underlying time and space complexity requires a different algorithm, which the next
  page covers.
</p>
