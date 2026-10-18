<script module>
  export const pageConfig = { title: 'Knowledge Check: Attention Optimization' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Attention Optimization</h1>

<p>
  These questions are ungraded and practice objective 9, differentiating lossless attention implementations from
  algorithms that change complexity. Retry them as often as you like.
</p>

<Sorting
  id="kc_opt_1"
  question="Sort each technique by whether it changes what attention computes."
  items={['FlashAttention', 'PagedAttention', 'KV caching during decode', 'Sliding window attention', 'Linear attention', 'Compressed attention']}
  targets={['Lossless implementation: same output', 'New algorithm: different output']}
  correct={[0, 0, 0, 1, 1, 1]}
  correctFeedback="FlashAttention, PagedAttention, and the KV cache reorganize the same computation. Sliding window, linear, and compressed attention compute something different to lower the cost."
  incorrectFeedback="Ask whether the technique changes the attention result. Kernel fusion, paged memory, and cached keys and values produce identical outputs. Restricting the window, approximating softmax, or compressing context changes the result."
/>

<MultipleChoice
  id="kc_opt_2"
  question="An engine runs out of contiguous GPU memory for long KV caches, even though enough total memory is free. Which technique addresses this problem directly?"
  options={['FlashAttention', 'PagedAttention', 'Sliding window attention']}
  correct={1}
  optionFeedback={[
    'Incorrect. FlashAttention reduces memory traffic inside the attention kernel. It does not change how the KV cache is laid out in memory.',
    'Correct. PagedAttention stores the KV cache in fixed-size pages found through a lookup table, so fragmented memory can hold it.',
    'Incorrect. Sliding window attention limits how many tokens attention considers, which changes results. It does not address fragmentation.',
  ]}
/>

<MultipleChoice
  id="kc_opt_3"
  question="A model was trained with full attention. To cut the cost of 100,000-token prompts, an engineer proposes enabling a 4,096-token sliding window at inference time only. What is the main risk?"
  options={[
    'Output quality drops, because the model loses context it was trained to use.',
    'Prefill becomes memory bound, because the window raises arithmetic intensity.',
    'The output stays identical, so the change carries no risk.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. A sliding window changes what attention computes. A model trained to use distant tokens degrades when they disappear, which is why such models are trained with the window they serve with.',
    'Incorrect. A window reduces attention work. It does not make prefill memory bound, and the bottleneck is not the main risk here.',
    'Incorrect. Only implementation improvements such as FlashAttention leave the output identical. A sliding window is a new algorithm.',
  ]}
/>
