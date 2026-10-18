<script module>
  export const pageConfig = { title: 'Knowledge Check: Embedding Inference' };
</script>

<script>
  import { MultipleChoice, Matching } from 'tessera-learn';
</script>

<h1>Knowledge Check: Embedding Inference</h1>

<p>
  This check is ungraded. Both items practice objective 4: select an embedding deployment design that
  fits a workload's traffic profile.
</p>

<Matching
  id="kc_embed_remedy"
  question="Match each problem in an embedding deployment to the design choice that addresses it."
  pairs={[
    { left: 'The GPU sits idle while a single thread tokenizes incoming text', right: 'A multi-worker tokenizer in front of the engine' },
    { left: 'A product launch sends more requests than the batches can hold', right: 'A queue that holds excess work until capacity frees up' },
    { left: 'Query volume has outgrown one GPU running the full model', right: 'More independent single-GPU replicas' },
    { left: 'The team must confirm that FP8 weights preserved quality', right: 'Cosine similarity of 99 percent or more against the original model' },
  ]}
  correctFeedback="Each piece of the design answers one bottleneck: tokenization, bursts, sustained volume, or quality after quantization."
  incorrectFeedback="Parallel tokenization keeps the GPU fed. A queue absorbs bursts. Replicas absorb sustained volume, because a small embedding model gains nothing from splitting across GPUs. Cosine similarity against the original confirms quantized quality."
/>

<MultipleChoice
  id="kc_embed_cosine"
  question="An FP8 version of an embedding model is compared with the original on the same 5,000 inputs. The mean cosine similarity of the paired output vectors is 96 percent. What should the team conclude?"
  options={[
    'Accept the FP8 model, because any result above 90 percent is close enough',
    'Accept the FP8 model, because cosine similarity ignores differences in vector length',
    'Reject the FP8 model for now, because the result is below the 99 percent bar',
  ]}
  correct={2}
  optionFeedback={[
    'The bar is 99 percent. A 96 percent result shows that the quantized model changed its outputs noticeably.',
    'Cosine similarity ignores length, but it measures direction, which is what search uses. A 96 percent result means the directions moved.',
    'Correct. The chapter sets at least 99 percent similarity as the bar for confidence in a quantized embedding model. The team can try a less aggressive quantization and test again.',
  ]}
/>
