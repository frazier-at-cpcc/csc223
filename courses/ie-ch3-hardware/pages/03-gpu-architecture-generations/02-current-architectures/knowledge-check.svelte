<script module>
  export const pageConfig = { title: 'Knowledge Check: Current Architectures' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Current Architectures</h1>
<p>These practice items are ungraded. Each one gives feedback that explains the answer.</p>

<p class="ie-obj">Objective 6: Differentiate NVIDIA GPU generations by inference features</p>
<Matching
  id="kc_features"
  question="Match each GPU to the inference feature or limitation that sets it apart."
  pairs={[
    { left: 'B200', right: 'FP4 Tensor Cores and hardware microscaling formats' },
    { left: 'H100', right: 'First NVIDIA datacenter GPU with FP8 Tensor Cores' },
    { left: 'H200', right: 'Same chip as its predecessor with 141 GB of faster HBM3e' },
    { left: 'L40S', right: 'FP8 support but no NVLink connection to other GPUs' },
  ]}
  correctFeedback="Correct. Hopper introduced FP8, the H200 adds memory to the same Hopper chip, Blackwell adds FP4 and microscaling, and Lovelace GPUs such as the L40S lack NVLink."
  incorrectFeedback="Use the letter first. H marks Hopper and FP8, and the H200 differs from the H100 only in memory. B marks Blackwell and FP4. L marks Lovelace, which supports FP8 but has no NVLink."
/>

<p class="ie-obj">Objective 6: Differentiate NVIDIA GPU generations by inference features</p>
<MultipleChoice
  id="kc_l40_parallel"
  question="A team plans to serve one 70-billion-parameter model on four L40S GPUs in a single server. Which approach suits this hardware, and why?"
  options={[
    'Pipeline parallelism, because the GPUs connect only over PCIe',
    'Tensor parallelism, because the GPUs share an NVLink domain',
    'Tensor parallelism, because the L40S lacks FP8 Tensor Cores',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Lovelace GPUs have no NVLink, so they talk over PCIe. Pipeline parallelism needs little communication between stages, which suits the slower link, at the cost of added latency.',
    'Incorrect. Lovelace GPUs do not support NVLink, so the four cards have no NVLink domain. Tensor parallelism over PCIe runs poorly.',
    'Incorrect. Lovelace GPUs, including the L40S, do support FP8. The deciding factor is the missing NVLink.',
  ]}
/>

<p class="ie-obj">Objective 6: Differentiate NVIDIA GPU generations by inference features</p>
<MultipleChoice
  id="kc_fa_kernel"
  question="Which attention kernel was written for Hopper GPUs to use their asynchronous data transfer features?"
  options={['FlashAttention 2', 'FlashAttention 3', 'FlashAttention 4']}
  correct={1}
  optionFeedback={[
    'Incorrect. FlashAttention 2 was tuned for the Ampere generation. It runs on Hopper but does not use the Hopper asynchronous features.',
    'Correct. FlashAttention 3 targets Hopper and uses its asynchronous features to improve attention performance and memory efficiency.',
    'Incorrect. FlashAttention 4 targets Blackwell and its extended features for moving data between tensor memory and global memory.',
  ]}
/>
