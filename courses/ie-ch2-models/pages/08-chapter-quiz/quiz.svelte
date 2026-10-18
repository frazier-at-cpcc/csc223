<script module>
  export const pageConfig = {
    title: 'Chapter 2 Quiz',
    quiz: { graded: true, maxAttempts: 3, feedbackMode: 'never' },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Chapter 2 Quiz</h1>

<p>
  This graded quiz has 14 questions covering every chapter objective. Four questions ask for a number. A score of
  70 percent or higher passes. You have three attempts, and your best score counts. The quiz does not show which
  answers were correct, so review the knowledge checks before you retry.
</p>

<MultipleChoice
  id="q1"
  question="Each feed-forward sublayer of a model applies a linear layer, a SiLU activation, and a second linear layer. To save compute, an engineer proposes deleting the SiLU activation from every feed-forward sublayer while keeping both weight matrices in each sublayer. What happens to each feed-forward sublayer?"
  options={[
    'Its two weight matrices compose into the equivalent of one linear layer.',
    'It keeps its full capacity, because both weight matrices keep their values.',
    'It stops passing data forward, because SiLU carries values between layers.',
    'It outputs only non-negative values, because removing SiLU clips them.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Without a nonlinear function between them, the two matrix multiplications and biases compose into a single xW + b, so the second matrix adds no capacity.',
    'Incorrect. Keeping the trained values does not keep the capacity. Two linear maps in a row are always equivalent to one linear map.',
    'Incorrect. Linear layers pass data forward on their own. The activation function bends the function rather than carrying values.',
    'Incorrect. Clipping negative values is what ReLU does. Removing an activation removes nonlinearity rather than adding a clip.',
  ]}
/>

<NumericQuestion
  id="q2"
  question="A chat request has a 900-token prompt, and the model returns 60 output tokens. Counting one KV cache entry per token, how many entries does the cache hold at the moment the 60th output token is produced?"
  answer={959}
  unit="entries"
  correctFeedback="Prefill writes 900 entries and produces the first token. Each of the 59 decode passes appends the entry of the token it processes: 900 + 59 = 959."
  incorrectFeedback="Prefill writes 900 entries and yields token 1. Decode passes 1 through 59 each process one earlier output token and append its entry, so the cache holds 900 + 59 = 959 when token 60 appears."
/>

<MultipleChoice
  id="q3"
  question="After softmax, a model's five most likely next tokens have probabilities of 0.35, 0.30, 0.20, 0.10, and 0.05. The request sets top-p to 0.6. Which tokens can the sampler draw?"
  options={[
    'Only the 0.35 token',
    'The 0.35 and 0.30 tokens',
    'The 0.35, 0.30, and 0.20 tokens',
    'All five tokens',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. 0.35 alone falls short of 0.6, so top-p keeps adding tokens.',
    'Correct. 0.35 + 0.30 = 0.65 is the smallest set that reaches 0.6. Those two tokens are re-normalized and sampled.',
    'Incorrect. The first two tokens already reach 0.65. Top-p stops at the smallest set that reaches p.',
    'Incorrect. Keeping every token describes top-p = 1.0, not 0.6.',
  ]}
/>

<MultipleChoice
  id="q4"
  question="A config.json file lists the architecture Ernie4_5_MoeForCausalLM. Which description of the model does this name support?"
  options={[
    'A dense decoder-only model that uses every weight for each token',
    'An encoder-decoder model that converts one sequence into another',
    'A decoder-only model that routes each token to a subset of experts',
    'An encoder-only model that fills in masked tokens using context on both sides',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. The Moe part of the name marks a Mixture of Experts model, which is sparse rather than dense.',
    'Incorrect. CausalLM marks a decoder-only causal language model. Nothing in the name indicates a separate encoder.',
    'Correct. Moe marks a Mixture of Experts model, and CausalLM marks a decoder-only model that predicts the next token from the tokens before it.',
    'Incorrect. Filling in masked tokens describes a masked language model. CausalLM indicates the opposite design.',
  ]}
/>

<MultipleChoice
  id="q5"
  question="A configuration error disables an engine's KV cache. A request has a 2,000-token prompt and generates 500 tokens. How does the work of each decode step change?"
  options={[
    'Each step skips attention, because no keys or values are stored for it.',
    'Each step still processes one token, because the causal mask hides the rest.',
    'Each step reprocesses only the 2,000 prompt tokens, so its cost stays constant.',
    'Each step recomputes all earlier keys and values, so its cost grows every step.',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Attention still runs. Without stored keys and values, the engine must recompute them before attention can use them.',
    'Incorrect. The causal mask hides later tokens, not earlier ones. The new token still needs the keys and values of every earlier token.',
    'Incorrect. The generated tokens are part of the sequence too, so the recomputed work grows by one token each step.',
    'Correct. Without a cache, each step recomputes keys and values for the prompt and every generated token so far, so the per-step cost rises with the sequence length instead of staying at one token.',
  ]}
/>

<MultipleChoice
  id="q6"
  question="A team plans to serve a Mixture of Experts model with 300 billion total parameters and 18 billion active parameters, stored in FP8 at 1 byte per parameter. It budgets 18 GB of GPU memory for the weights, based on the active count. Which assessment of the plan is correct?"
  options={[
    'It falls short by about 282 GB, because all 300 billion parameters must stay resident.',
    'It is correct for single requests, because only the active experts load for each token.',
    'It is correct at any load, because the router loads experts from disk when it needs them.',
    'It falls short by about 18 GB, because FP8 stores each parameter in 2 bytes.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The router can choose any expert for the next token, so every parameter must be in GPU memory: 300 × 10^9 × 1 byte = 300 GB, which is 282 GB more than the plan.',
    'Incorrect. The 18 billion active parameters set the compute per token. Even one request needs all 300 GB of weights resident, because the next token may route to any expert.',
    'Incorrect. Loading experts from disk on demand would stall every forward pass. Production engines keep every expert in GPU memory.',
    'Incorrect. FP8 stores each parameter in 1 byte. The gap comes from the inactive experts, which still need memory.',
  ]}
/>

<MultipleChoice
  id="q7"
  question="A team moves a Mixture of Experts model with 64 experts per layer and 4 active per token from single-request local use to a server that batches 40 requests per decode step. Compared with one request, how do the compute per token and the weight bytes read per step change?"
  options={[
    'Compute per token rises to the total count, and weight bytes per step stay at the active count.',
    'Compute per token stays at the active count, and weight bytes per step approach the total count.',
    'Both rise to the total count, because every expert now runs for every token in the batch.',
    'Both stay at the active count, because each token still passes through only its own experts.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Each token still passes through only its selected experts, so its compute stays at the active count. The weight reads are what grow.',
    'Correct. Each token still uses only its selected experts, so arithmetic per token is unchanged. Across 40 requests, nearly every expert is selected by some token, so nearly all weights are read on each step.',
    'Incorrect. The router does not send every token to every expert. Only the union of experts across the batch grows.',
    'Incorrect. The tokens in a batch select different experts, so the set of weights read on each step grows toward the full model.',
  ]}
/>

<NumericQuestion
  id="q8"
  question="An image pipeline runs 36 base-model steps with guidance enabled and then 12 refiner steps with guidance disabled. How many denoiser forward passes does one image require?"
  answer={84}
  unit="passes"
  correctFeedback="Base: 36 × 2 = 72. Refiner: 12 × 1 = 12. Total: 84 forward passes."
  incorrectFeedback="Count each stage separately. Guidance doubles the base stage, 36 × 2 = 72. The unguided refiner runs one pass per step, 12 × 1 = 12. The total is 72 + 12 = 84."
/>

<MultipleChoice
  id="q9"
  question="A camera app must return a stylized photo within 1 second of capture. On the target GPU, a standard image model takes 5 seconds at 50 steps, and a step-distilled version of it runs 6 steps. Both models run with guidance enabled. Reviewers accept moderate quality loss. Which choice best meets these constraints?"
  options={[
    'The standard model at 50 steps on a GPU with twice the compute',
    'The standard model with its step count cut to 10',
    'The step-distilled model at 6 steps',
    'An LLM-style image model that generates 4,096 image tokens',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Doubling compute would bring the standard model to about 2.5 seconds, still well over the 1-second budget.',
    'Incorrect. Ten steps would fit the time budget, but a standard model trained for 30 to 50 steps degrades sharply at 10, far more than a model distilled for few steps.',
    'Correct. Scaling by steps gives about 5 × 6 / 50 = 0.6 seconds, inside the budget, and reviewers accept the moderate quality loss of a few-step model.',
    'Incorrect. An LLM-style model runs one forward pass per image token, thousands of sequential passes, which does not suit a 1-second budget.',
  ]}
/>

<MultipleChoice
  id="q10"
  question="A travel agency needs a six-second drone flyover of a coastline by tomorrow morning. A teammate proposes generating its 144 frames with a fast image model, conditioning each frame on the one before it, to save cost. Which judgment is correct?"
  options={[
    'Accept it, because a fast image model costs far less per frame than a video model.',
    'Accept it, but raise the step count to 50 so that each frame reaches full quality.',
    'Reject it, because video models need fewer GPUs than image models for the same clip.',
    'Reject it, because errors compound frame to frame, which a video model avoids.',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. A lower cost per frame does not help if the clip drifts. Framewise generation accumulates errors from frame to frame.',
    'Incorrect. More steps improve each frame on its own, but each frame still inherits the errors of the frame before it.',
    'Incorrect. Video models usually need more hardware, often a full eight-GPU node per request. Cost is not the reason to prefer them.',
    'Correct. Whole-video denoising lets every frame attend to every other frame, which prevents error accumulation. An overnight deadline tolerates the batch-size-one cost of running a video model on a full node.',
  ]}
/>

<NumericQuestion
  id="q11"
  question="A new accelerator lists 1,200 teraFLOPS of dense FP16 compute and 4,000 GB/s of memory bandwidth. What is its FP16 ops:byte ratio?"
  answer={300}
  tolerance={1}
  unit="operations per byte"
  correctFeedback="4,000 GB/s is 4 × 10^12 bytes per second, so (1,200 × 10^12) / (4 × 10^12) = 300 operations per byte."
  incorrectFeedback="Convert both values to the same prefix first. 4,000 GB/s equals 4 TB/s, so 1,200 / 4 = 300 operations per byte."
/>

<NumericQuestion
  id="q12"
  question="During decode, a batch of 24 requests passes through a linear layer whose 6,144 × 6,144 weights are stored in FP8, at 1 byte per weight. Ignoring the activation bytes, what is the layer's arithmetic intensity, in operations per byte?"
  answer={48}
  unit="operations per byte"
  correctFeedback="Operations = 2 × 24 × 6,144², and the FP8 weights take 6,144² bytes, so the intensity is 48."
  incorrectFeedback="Each request uses every weight once as a multiply and an add: 2 × 24 × d² operations. FP8 weights take 1 × d² bytes. The intensity is 48 × d² / d² = 48."
/>

<MultipleChoice
  id="q13"
  question="A profiler reports that one call of a kernel performs 3.2 × 10^12 floating-point operations and moves 20 GB of data. The kernel runs on a GPU that delivers 2,250 TFLOPS of dense FP16 compute and 8 TB/s of memory bandwidth. How should the team classify the kernel?"
  options={[
    'Memory bound, because its intensity of 0.16 operations per byte is below the ridge of about 281',
    'Memory bound, because its intensity of 160 operations per byte is below the ridge of about 281',
    'Compute bound, because its intensity of 1,600 operations per byte is above the ridge of about 281',
    'Compute bound, because its 3.2 × 10^12 operations exceed the GPU’s 2,250 TFLOPS of compute',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. The verdict is right, but the intensity is off by a factor of 1,000. 20 GB is 2 × 10^10 bytes, so the intensity is 160.',
    'Correct. Intensity = 3.2 × 10^12 / 2 × 10^10 = 160 operations per byte. The ridge is 2,250 / 8 ≈ 281. Because 160 is below the ridge, the kernel is memory bound.',
    'Incorrect. This treats 20 GB as 2 GB. The correct intensity is 160, which sits below the ridge.',
    'Incorrect. The classification compares operations per byte with the ridge point. A total operation count compared with a per-second rate does not classify a kernel.',
  ]}
/>

<MultipleChoice
  id="q14"
  question="To cut the cost of 64,000-token contexts, one proposal swaps in a FlashAttention kernel, and another retrains the model with an 8,000-token sliding window. Which statement correctly differentiates the two proposals?"
  options={[
    'FlashAttention keeps outputs exact and time quadratic. The window cuts time to O(Nw) and changes outputs.',
    'Both keep outputs exact, and both reduce the time complexity of attention to linear in N.',
    'FlashAttention cuts time to O(Nw) and changes outputs. The sliding window keeps outputs exact and time quadratic.',
    'Both change outputs, because every faster attention method approximates the softmax.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. FlashAttention is an implementation improvement that removes memory traffic without changing the result or the complexity. A sliding window is a new algorithm that attends to fewer tokens.',
    'Incorrect. Only FlashAttention keeps outputs exact, and it leaves attention quadratic. The sliding window changes what attention computes.',
    'Incorrect. This reverses the two techniques. The window changes complexity and outputs, while FlashAttention changes neither.',
    'Incorrect. FlashAttention computes exact attention, including the exact softmax. It reorganizes memory traffic rather than approximating.',
  ]}
/>
