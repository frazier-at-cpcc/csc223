<script module>
  export const pageConfig = { title: 'Knowledge Check: Compute' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Compute</h1>
<p>
  These practice items are ungraded. Each one gives feedback that explains the answer. The FLOPS calculations
  for objective 3 are on the Reading FLOPS on a Spec Sheet page.
</p>

<p class="ie-obj">Objective 1: Explain how GPU compute is divided</p>
<Matching
  id="kc_units"
  question="Match each part of a GPU to the work it does."
  pairs={[
    { left: 'CUDA Core', right: 'Arithmetic on individual scalar values' },
    { left: 'Special Function Unit', right: 'Exponentials, sine, cosine, and logarithms' },
    { left: 'Streaming Multiprocessor', right: 'The compute unit that groups cores with their own cache' },
    { left: 'Tensor Core', right: 'Matrix multiply and accumulate instructions' },
  ]}
  correctFeedback="Correct. An SM groups the three kinds of cores. Tensor Cores do the matrix math that dominates inference, SFUs handle special functions such as the exponential in softmax, and CUDA Cores handle scalar arithmetic."
  incorrectFeedback="Review the pairs. The SM is the container. Inside it, Tensor Cores run MMA instructions, SFUs compute functions such as exponentials, and CUDA Cores operate on single numbers."
/>

<p class="ie-obj">Objective 1: Explain how GPU compute is divided</p>
<MultipleChoice
  id="kc_softmax"
  question="A kernel engineer profiles the softmax step of attention and finds it waiting on exponential calculations. Which compute unit performs those calculations?"
  options={['CUDA Core', 'Special Function Unit', 'Tensor Core']}
  correct={1}
  optionFeedback={[
    'Incorrect. CUDA Cores perform general scalar arithmetic. Dedicated hardware accelerates functions such as the exponential.',
    'Correct. Special Function Units accelerate exponentials, sine, cosine, and logarithms, and softmax depends on the exponential.',
    'Incorrect. Tensor Cores execute matrix multiply and accumulate instructions. Softmax is an elementwise function, not a matrix multiplication.',
  ]}
/>

<p class="ie-obj">Objective 5: Select the specification that relieves a bottleneck</p>
<MultipleChoice
  id="kc_video_spec"
  question="Your team runs a video generation model and must choose between two GPUs. Which specification should drive the decision?"
  options={['Dense FLOPS at the serving precision', 'Host CPU core count', 'Memory bandwidth']}
  correct={0}
  optionFeedback={[
    'Correct. Video generation is compute-bound, so the accelerator with more dense FLOPS at the same precision runs it faster.',
    'Incorrect. Host CPU cores handle work outside the GPU. They do not set the speed of the video model itself.',
    'Incorrect. Memory bandwidth limits LLM decode at low to medium batch sizes. Video generation performs many operations per byte, so compute limits it.',
  ]}
/>
