<script module>
  export const pageConfig = { title: 'Knowledge Check: Naming and Generations' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Naming and Generations</h1>
<p>These practice questions are ungraded. Each option explains why it is right or wrong.</p>

<MultipleChoice
  id="kc1"
  question="An engineer compares the H100 and the H200. What does their shared letter H indicate?"
  options={[
    'Both GPUs have the same memory capacity',
    'Both GPUs use the same architecture generation',
    'Both GPUs were released in the same month',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. The H100 has 80 GB of VRAM and the H200 has 141 GB. The letter says nothing about capacity.',
    'Correct. The letter identifies the architecture generation. Both GPUs use the Hopper architecture.',
    'Incorrect. The letter identifies the architecture. GPUs within one generation can ship at different times.',
  ]}
/>

<MultipleChoice
  id="kc2"
  question="A team serves steady, high-volume LLM traffic and must choose between Ampere A100 GPUs and a newer generation. Why do inference engineers favor the newer generation even for cost-sensitive work?"
  options={[
    'Newer architectures are cheaper to rent per hour',
    'Newer architectures do more work per dollar at scale',
    'Older architectures cannot run transformer models',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Newer GPUs usually cost more per hour. The savings come from doing more work per GPU.',
    'Correct. Modern architectures deliver enough extra performance per GPU that they are often more cost-effective for large-scale traffic.',
    'Incorrect. Ampere and Turing GPUs still run transformer models in low-traffic and legacy systems. They are less efficient, not incapable.',
  ]}
/>
