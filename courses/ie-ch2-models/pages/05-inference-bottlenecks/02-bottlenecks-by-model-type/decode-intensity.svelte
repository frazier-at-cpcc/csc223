<script module>
  export const pageConfig = { title: 'Worked Example: Arithmetic Intensity of Decode' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Worked Example: Arithmetic Intensity of Decode</h1>

<p>
  A decode step processes one new token per request. This page calculates the arithmetic intensity of the two
  main operations in that step, in FP16 at 2 bytes per value, and compares each with the
  <Term id="h100">H100</Term> ops:byte ratio of about 295.
</p>

<Signal kind="worked" title="A linear layer during decode">
  <p>
    A linear layer holds a d × d weight matrix. During decode with a batch of b requests, it multiplies a b × d
    matrix of activations by those weights. Each weight is used once per request, as one multiply and one add.
  </p>
  <pre><code>Operations = 2 × b × d²          (b requests × d² weights × 2 FLOPs)
Bytes      ≈ 2 × d²              (every FP16 weight read once)
Intensity  ≈ (2 × b × d²) / (2 × d²) = b operations per byte

Example: d = 8,192 and b = 1
Operations = 2 × 1 × 8,192² = 134,217,728
Bytes      = 2 × 8,192²     = 134,217,728
Intensity  = 1 operation per byte</code></pre>
  <p>
    The activations add only 2 × b × d bytes, which is negligible while b is far smaller than d. At batch size 1,
    the intensity of 1 is far below 295, so the layer is memory bound. Every request in a batch shares one read of
    the weights, so the intensity equals the batch size. The linear layers stay memory bound on an H100 until the
    batch reaches about 295 requests. The next calculation shows that decode attention does not improve with
    batching. This calculation proves the batching claim from Lesson 1.
  </p>
</Signal>

<Signal kind="worked" title="Attention during decode">
  <p>
    During decode, attention handles one query vector q of size 1 × d against the cached keys K and values V of N
    earlier tokens, each N × d. Take N = 4,096 tokens and a head dimension of d = 128.
  </p>
  <pre><code>Operations:
  scores  s = qKᵀ          2 × N × d = 1,048,576
  softmax p = softmax(s)   3 × N     =    12,288
  output  o = pV           2 × N × d = 1,048,576
  total                              = 2,109,440

Bytes:
  read q                   2 × d     =       256
  read K                   2 × N × d = 1,048,576
  read V                   2 × N × d = 1,048,576
  write o                  2 × d     =       256
  total                              = 2,097,664

Intensity = 2,109,440 / 2,097,664 ≈ 1 operation per byte</code></pre>
  <p>
    Decode attention reads every cached key and value once and does about one operation with each byte. Batching
    does not raise this intensity, because each request reads its own <Term id="kv-cache">KV cache</Term>. Both operations of a decode step
    sit far below the ridge point, so decode is memory bound.
  </p>
  <p>
    This calculation gives each query head its own key and value head. Most current LLMs use grouped-query
    attention, in which several query heads share one KV head, so decode attention reaches an intensity near the
    group size, often 4 to 16. That is still far below the ridge.
  </p>
</Signal>

<NumericQuestion
  id="di_faded"
  question="Complete the last step. A decode step runs a batch of 16 requests through a 4,096 × 4,096 FP16 weight matrix. Operations = 2 × 16 × 4,096² = 536,870,912. Bytes ≈ 2 × 4,096² = 33,554,432. What is the arithmetic intensity, in operations per byte?"
  answer={16}
  unit="operations per byte"
  correctFeedback="536,870,912 / 33,554,432 = 16 operations per byte, which equals the batch size. It is still far below the H100 ridge of about 295."
  incorrectFeedback="Divide operations by bytes: 536,870,912 / 33,554,432 = 16. The d² terms cancel, so a linear layer's FP16 decode intensity equals the batch size."
/>
