<script module>
  export const pageConfig = { title: 'Knowledge Check: Naming and Generations' };
</script>

<script>
  import { Matching, MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Naming and Generations</h1>
<p>These practice items are ungraded. Each one gives feedback that explains the answer.</p>

<p class="ie-obj">Objective 6: Differentiate GPU generations by name</p>
<Matching
  id="kc_letters"
  question="Match each NVIDIA datacenter GPU to its architecture generation."
  pairs={[
    { left: 'A100', right: 'Ampere' },
    { left: 'B300', right: 'Blackwell' },
    { left: 'H200', right: 'Hopper' },
    { left: 'L4', right: 'Ada Lovelace' },
    { left: 'T4', right: 'Turing' },
  ]}
  correctFeedback="Correct. The leading letter names the architecture: T for Turing, A for Ampere, L for Ada Lovelace, H for Hopper, and B for Blackwell."
  incorrectFeedback="Read only the letter. T is Turing, A is Ampere, L is Ada Lovelace, H is Hopper, and B is Blackwell. The number identifies the model within that generation."
/>

<p class="ie-obj">Objective 6: Differentiate GPU generations by name</p>
<MultipleChoice
  id="kc_same_letter"
  question="An engineer compares the H100 and the H200. What does their shared letter H tell the engineer?"
  options={[
    'Both GPUs have the same memory capacity',
    'Both GPUs support the same architecture features, such as FP8',
    'Both GPUs were released in the same quarter',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. The H100 has 80 GB of VRAM and the H200 has 141 GB. The letter says nothing about capacity.',
    'Correct. The letter identifies the Hopper architecture, so both GPUs share its features, including FP8 Tensor Cores.',
    'Incorrect. The letter identifies the architecture. GPUs within one generation can ship years apart.',
  ]}
/>

<p class="ie-obj">Objective 6: Differentiate GPU generations by name</p>
<MultipleChoice
  id="kc_newer_gen"
  question="A team serves steady, high-volume LLM traffic and must choose between Ampere A100 GPUs and a newer generation. Why do inference engineers often favor the newer generation even for cost-sensitive work?"
  options={[
    'Newer architectures are cheaper to rent per hour',
    'Newer architectures do more work per dollar at scale',
    'Older architectures cannot run transformer models',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Newer GPUs usually cost more per hour. The savings come from doing more work per GPU.',
    'Correct. Modern architectures deliver enough extra performance per GPU, through features such as FP8 and higher bandwidth, that they often cost less per token at scale.',
    'Incorrect. Ampere and Turing GPUs still run transformer models in low-traffic and legacy systems. They are less efficient, not incapable.',
  ]}
/>
