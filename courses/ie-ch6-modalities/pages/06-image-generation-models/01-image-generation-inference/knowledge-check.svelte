<script module>
  export const pageConfig = { title: 'Knowledge Check: Image Generation' };
</script>

<script>
  import { Matching } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Image Generation</h1>

<p>
  This check is ungraded. The two numeric items practice objective 8, calculating forward passes with
  guidance truncation. The matching item practices objective 9, justifying an optimization plan for
  image generation.
</p>

<NumericQuestion
  id="kc_guidance_passes"
  question="A 30-step image generation run uses classifier-free guidance and turns guidance off for the last 10 steps. How many forward passes through the denoising model does the run make?"
  answer={50}
  unit="forward passes"
  correctFeedback="20 guided steps × 2 = 40 passes, plus 10 unguided steps × 1 = 10 passes, gives 50 forward passes."
  incorrectFeedback="Split the run into guided and unguided steps. 30 − 10 = 20 guided steps × 2 passes = 40. 10 unguided steps × 1 pass = 10. Total: 40 + 10 = 50 forward passes."
/>

<NumericQuestion
  id="kc_guidance_percent"
  question="A 60-step run turns guidance off for the last 15 steps. What percentage of forward passes does this save compared with keeping guidance on for all 60 steps?"
  answer={12.5}
  tolerance={0.1}
  unit="percent"
  correctFeedback="Full guidance makes 60 × 2 = 120 passes. Truncation makes 45 × 2 + 15 × 1 = 105 passes. The savings are 15 ÷ 120 = 12.5 percent."
  incorrectFeedback="Full guidance: 60 × 2 = 120 passes. With truncation: 45 × 2 + 15 = 105 passes. Saved: 120 − 105 = 15 passes, and 15 ÷ 120 = 12.5 percent. Dividing by 60 steps instead of 120 passes gives 25 percent, which double-counts the savings."
/>

<Matching
  id="kc_image_kernels"
  question="Match each image generation situation to the choice the lesson recommends."
  pairs={[
    { left: 'A popular model must run fast this week with little engineering time', right: 'A prebuilt engine such as SGLang Diffusion or TensorRT' },
    { left: 'A team needs top performance through deep customization', right: 'PyTorch with hand-selected and fused kernels' },
    { left: 'Normalization layers write small results to memory between steps', right: 'Kernel fusion' },
    { left: 'Linear layers limit a compute-bound denoiser', right: 'FP8 GEMM kernels on Tensor Cores' },
    { left: 'A cached compiled engine built on H100 must run on new B200 nodes', right: 'Recompile on a B200 and cache that engine' },
  ]}
  correctFeedback="Each choice follows from the compute-bound profile or from how compilation targets one GPU model."
  incorrectFeedback="Prebuilt engines give speed now, and PyTorch gives control. Fusion removes memory round trips for small kernels. FP8 GEMMs double Tensor Core FLOPS for linear layers. A compiled engine targets the GPU that compiled it, so recompile on the B200."
/>
