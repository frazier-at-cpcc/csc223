<script module>
  export const pageConfig = { title: 'Hardware Design Cycles' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Hardware Design Cycles</h1>

<p>
  Hardware iterates slowly. Years pass between finalizing an architecture design and shipping <Term id="gpu">GPUs</Term>. The design
  must first go through tapeout, the step at which the finished chip layout goes to the factory, and then
  through testing before volume manufacturing.
</p>
<p>
  The AI industry moves much faster. Even a next-generation GPU was designed when AI model capabilities looked
  very different from today. An architecture with staying power requires foresight into how use cases will
  evolve over the GPU's expected lifetime.
</p>

<h2>From training to inference</h2>
<p>
  For years, training AI models was the primary use of GPUs. Inference is now becoming the dominant use case.
  The latest architectures respond with inference-focused features, such as lower-precision <Term id="tensor-core">Tensor Cores</Term> and
  higher <Term id="memory-bandwidth">memory bandwidth</Term>.
</p>
<p>
  NVIDIA releases a new GPU architecture every one to two years. Each architecture powers the full product line,
  from the datacenter to personal computers. Each generation improves base compute and memory speeds and adds
  features for more efficient inference.
</p>
