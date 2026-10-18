<script module>
  export const pageConfig = { title: 'Knowledge Check: Principles' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Principles</h1>
<p>These questions are ungraded. Each one practices objective 1: how constraints, traffic volume, and interactions decide which techniques to apply.</p>

<MultipleChoice
  id="kc_principles_1"
  question="A two-person team serves an internal model on one replica that receives a few hundred requests per day. A vendor proposes dynamic disaggregation and cache-aware routing. What should the team conclude?"
  options={[
    'Adopt both, because every optimization lowers cost per token',
    'Adopt cache-aware routing first, because it needs no extra GPUs',
    'Adopt dynamic disaggregation first, because it is lossless',
    'Defer both, because neither pays off at this traffic volume',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Optimizations that need many GPUs raise cost when traffic cannot keep those GPUs busy.',
    'Incorrect. Cache-aware routing chooses among replicas. With one replica, every request already reaches the only cache.',
    'Incorrect. Being lossless does not make a technique worthwhile. Disaggregation needs high volume to fill separate engines.',
    'Correct. Both techniques assume many GPUs serving heavy traffic. At a few hundred requests per day they add cost and complexity without a matching gain.',
  ]}
/>

<Sorting
  id="kc_principles_2"
  question="Sort each technique by whether it can change the model's output."
  items={['Quantization', 'Speculative decoding with standard verification', 'Prefix caching', 'Tensor parallelism', 'Disaggregation']}
  targets={['Can change output quality', 'Lossless']}
  correct={[0, 1, 1, 1, 1]}
  correctFeedback="Correct. Only quantization changes the numbers the model computes with. The other four change where or when the model computes."
  incorrectFeedback="Quantization lowers numerical precision, so it can change outputs. Speculation verifies every draft, prefix caching reuses identical keys and values, and parallelism and disaggregation move the same computation to different GPUs."
/>
