<script module>
  export const pageConfig = { title: 'Knowledge Check: Kernels for Inference' };
</script>

<script>
  import { Matching, MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Kernels for Inference</h1>

<p>
  These questions are ungraded. The first practices objective 2, distinguishing
  kernel libraries by role. The other two practice objective 3, determining what
  a change of GPU architecture requires of a manually selected kernel.
</p>

<Matching
  id="kc_kernels_match"
  question="Match each kernel library to what it gives an engineer."
  pairs={[
    { left: 'cuBLAS', right: 'Pre-built linear algebra kernels, including a general GEMM' },
    { left: 'cuDNN', right: 'Primitives for building neural networks' },
    { left: 'CUTLASS', right: 'C++ templates for writing architecture-tuned GEMM kernels' },
    { left: 'CuTe', right: 'The tiled-tensor layout layer that CUTLASS 3 is built on' },
    { left: 'FlashInfer', right: 'Finished attention and sampling kernels for LLM inference' },
  ]}
  correctFeedback="cuBLAS and cuDNN supply general building blocks, CUTLASS and CuTe help engineers write new kernels, and FlashInfer supplies finished LLM kernels."
  incorrectFeedback="Separate finished kernels from tools for writing kernels. cuBLAS, cuDNN, and FlashInfer ship finished kernels. CUTLASS, with CuTe inside it, is for writing new ones."
/>

<Sorting
  id="kc_kernels_port"
  question="A team runs a DeepGEMM plugin kernel on H100s and is moving to B200s. Sort each proposed action by whether it meets the plugin's compatibility obligation."
  items={[
    'Check whether the DeepGEMM release supports Blackwell',
    'Fall back to the cuBLAS GEMM for that operation',
    'Port the plugin kernel to the Blackwell architecture',
    'Recompile the model with torch.compile and keep the plugin as is',
    'Raise the batch size to fill the larger B200 memory',
    'Keep the plugin unchanged, since a newer GPU runs it faster',
  ]}
  targets={['Meets the obligation', 'Does not meet it']}
  correct={[0, 0, 0, 1, 1, 1]}
  correctFeedback="The three valid actions confirm support, fall back to a general kernel, or port the kernel. The other three leave the H100-tuned kernel in place."
  incorrectFeedback="A valid action changes or verifies the kernel itself. A recompiled model, a batch size, or a newer GPU does not change the hardware assumptions coded into the kernel."
/>

<MultipleChoice
  id="kc_kernels_upgrade"
  question="A handwritten attention kernel was tuned for the on-chip memory size of an H100. After an upgrade to B200s, the kernel runs correctly but slower than the team expected. What explains the result?"
  options={[
    'Its hard-coded sizes leave B200 resources unused.',
    'The B200 cannot run kernels compiled for Hopper.',
    'The kernel stores its weights in an outdated file format.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The kernel encodes H100 values, so it fails to use the larger memory and newer features of the B200. The fix is a kernel tuned for Blackwell.',
    'The stem says the kernel runs, so this cannot explain the result. Portable kernels usually run on a newer generation. Kernels built on Hopper-only instructions do not.',
    'Kernels compute on data in memory. Weight file formats are a separate concern.',
  ]}
/>
