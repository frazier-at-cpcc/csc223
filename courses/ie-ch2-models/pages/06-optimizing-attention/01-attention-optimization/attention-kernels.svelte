<script module>
  export const pageConfig = { title: 'FlashAttention and PagedAttention' };
</script>

<h1>FlashAttention and PagedAttention</h1>

<p>Two well-known implementations improve attention without changing its result.</p>

<h2>FlashAttention</h2>

<p>
  <strong>FlashAttention</strong> is a series of papers and optimized attention kernels. The basic
  algorithm fits in a handful of lines of code. FlashAttention uses tens of thousands of lines to
  implement attention in hand-fused kernels for specific GPUs. FlashAttention for the H100 uses different
  code from FlashAttention for the B200.
</p>

<ul>
  <li>It eliminates excess reads and writes to memory, such as the round trips of S and P in the standard algorithm.</li>
  <li>It lays out the attention algorithm to fit the GPU's capabilities precisely.</li>
  <li>It is especially useful for compute-bound operations such as LLM prefill and video generation.</li>
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
