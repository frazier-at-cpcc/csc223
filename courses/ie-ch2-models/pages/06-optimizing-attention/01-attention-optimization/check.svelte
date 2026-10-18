<script module>
  export const pageConfig = { title: 'Knowledge Check: Attention Optimization' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Attention Optimization</h1>

<p>These questions are ungraded. Retry them as often as you like.</p>

<MultipleChoice
  id="kc_opt_1"
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
  id="kc_opt_2"
  question="A model uses sliding window attention with w = 16,000 on a sequence of 64,000 tokens. Compared with full attention, what fraction of the attention work does it perform?"
  options={['One sixteenth', 'One quarter', 'One half']}
  correct={1}
  optionFeedback={[
    'Incorrect. One sixteenth squares the ratio. The savings ratio is w / N, which is 1/4.',
    'Correct. Nw / N² = w / N = 16,000 / 64,000 = 1/4.',
    'Incorrect. The ratio of sliding window work to full attention work is w / N = 16,000 / 64,000, which is one quarter.',
  ]}
/>
