<script module>
  export const pageConfig = { title: 'Recall from Earlier Chapters' };
</script>

<script>
  import { Matching, MultipleChoice, Sorting } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Recall from Earlier Chapters</h1>

<p>
  This chapter builds on four ideas from earlier chapters. Answer each question
  from memory before you check it. The questions are ungraded.
</p>

<Signal kind="recall" chapter={0} title="The runtime software stack">
  <p>
    Chapter 0 named the levels of the runtime software stack and defined a
    kernel. This chapter opens each level and shows the decisions an engineer
    makes there.
  </p>
</Signal>

<Matching
  id="rc_ch0_terms"
  question="Match each term from Chapter 0 to its definition."
  pairs={[
    { left: 'CUDA', right: 'The NVIDIA platform and programming model for code that runs on GPUs' },
    { left: 'Kernel', right: 'A function that executes parallelized code on the GPU' },
    { left: 'Inference engine', right: 'A runtime with built-in batching, caching, quantization, and speculation' },
    { left: 'FlashAttention', right: 'A series of optimized attention kernels that minimize memory traffic' },
  ]}
  correctFeedback="Section 02 extends the kernel idea to libraries, kernel selection, and kernel fusion. Section 04 compares three inference engines."
  incorrectFeedback="Review the pairs. CUDA is the platform, a kernel is one parallel function, an inference engine serves models with optimizations built in, and FlashAttention is a family of attention kernels."
/>

<Signal kind="recall" chapter={2} title="Memory-bound kernels">
  <p>
    Chapter 2 compared a kernel's <Term id="arithmetic-intensity">arithmetic intensity</Term> with a GPU's
    <Term id="ops-byte-ratio">ops:byte ratio</Term>. A kernel below the ratio is
    <Term id="memory-bound">memory-bound</Term>, and LLM <Term id="decode">decode</Term> is the standard example.
  </p>
</Signal>

<MultipleChoice
  id="rc_ch2_bound"
  question="A kernel performs about one operation for every byte it moves on an H100, whose ops:byte ratio is about 295. Which change shortens the kernel's runtime?"
  options={[
    'Faster arithmetic on the same data',
    'Fewer bytes moved to and from memory',
    'More operations performed per launch',
  ]}
  correct={1}
  optionFeedback={[
    'The kernel waits on memory, not on arithmetic. Faster arithmetic leaves the wait unchanged.',
    'Correct. A memory-bound kernel runs as fast as memory can deliver its bytes, so moving fewer bytes shortens it. Kernel fusion, later in this chapter, removes bytes in exactly this way.',
    'Adding operations does not reduce the bytes the kernel must move, so the memory limit stays where it was.',
  ]}
/>

<Signal kind="recall" chapter={3} title="Memory bandwidth and GPU generations">
  <p>
    Chapter 3 gave the H100 a <Term id="memory-bandwidth">memory bandwidth</Term> of 3.35 TB/s and grouped
    GPUs into architectures. Time spent moving data equals the bytes moved divided
    by the bandwidth.
  </p>
</Signal>

<NumericQuestion
  id="rc_ch3_bw"
  question="An H100 reads 16 GB of FP16 weights once at 3.35 TB/s. How many milliseconds does the read take? Use 1 GB = 10^9 bytes and 1 TB = 10^12 bytes."
  answer={4.78}
  tolerancePct={2}
  unit="ms"
  correctFeedback="16 × 10^9 bytes ÷ 3.35 × 10^12 bytes per second = 0.00478 s, or about 4.78 ms. Every byte a kernel moves costs time at this rate."
  incorrectFeedback="Divide bytes by bandwidth: 16 × 10^9 ÷ (3.35 × 10^12) = 0.00478 s. Multiply by 1,000 to convert to milliseconds: about 4.78 ms."
/>

<Sorting
  id="rc_ch3_arch"
  question="Sort each GPU into its architecture."
  items={['A100', 'H100', 'H200', 'B200', 'B300']}
  targets={['Ampere', 'Hopper', 'Blackwell']}
  correct={[0, 1, 1, 2, 2]}
  correctFeedback="Kernel engineers tune code to one architecture at a time, so the H100 and H200 share Hopper kernels and the B200 and B300 share Blackwell kernels."
  incorrectFeedback="Recall the Chapter 3 table: the A100 is Ampere, the H100 and H200 are Hopper, and the B200 and B300 are Blackwell."
/>
