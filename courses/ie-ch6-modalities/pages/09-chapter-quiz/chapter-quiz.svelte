<script module>
  export const pageConfig = {
    title: 'Chapter 6 Quiz',
    quiz: { graded: true, maxAttempts: 3, feedbackMode: 'never' },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Chapter 6 Quiz: Modalities</h1>

<p>
  This graded quiz has 14 questions that cover every chapter objective. You need 70 percent to pass,
  and you have three attempts. Your best attempt counts. The quiz reports your score but does not show
  which answers were correct, so review the lessons between attempts. For numeric items, enter a number
  without units or commas.
</p>

<!-- q1: objective 1 (Understand, classify) -->
<MultipleChoice
  id="q1"
  question="A marketing team types a one-sentence prompt into a tool and receives a six-second video clip. Which category and archetype describe the model behind the tool?"
  options={[
    'Video generation, built on autoregressive token generation',
    'Video generation, built on iterative denoising',
    'Vision language, built on autoregressive token generation',
    'Vision language, built on iterative denoising',
  ]}
  correct={1}
  optionFeedback={[
    'Text in and video out is video generation, but video models refine random noise over about 50 denoising steps rather than predicting tokens one at a time.',
    'Correct. Text in and video out is video generation, and video models work by iterative denoising over a latent space.',
    'A vision language model takes images or video in and produces text. This tool produces video.',
    'A vision language model produces text, not video, and it generates that text autoregressively.',
  ]}
/>

<!-- q2: objective 2 (Apply, estimate visual tokens) -->
<NumericQuestion
  id="q2"
  question="A VLM request carries a 120-token question and a 3-second clip at 30 frames per second. After downsampling, each frame takes about 500 tokens. How many input tokens does the request carry in total?"
  answer={45120}
  incorrectFeedback="Frames: 3 × 30 = 90. Visual tokens: 90 × 500 = 45,000. Total with the question: 45,000 + 120 = 45,120 tokens."
/>

<!-- q3: objective 3 (Apply, select VLM optimization) -->
<MultipleChoice
  id="q3"
  question="A radiology viewer lets a clinician open one high-resolution scan and ask a series of questions about it. Fine detail in the scan matters to the diagnosis. Every question waits several seconds for its first word, while decode speed is acceptable. Which optimization most directly removes the repeated wait?"
  options={[
    'Disaggregate prefill onto separate, independently scaled workers',
    'Downsample the scan to a low-resolution representation',
    'Enable prefix caching so later turns reuse the scan',
    'Quantize the KV cache to FP8 to cut memory traffic',
  ]}
  correct={2}
  optionFeedback={[
    'Disaggregation stops prefill from competing with decode, but each question would still prefill the whole scan again.',
    'Downsampling shortens prefill, but it discards the fine detail that the diagnosis depends on.',
    'Correct. The scan is the same in every turn, so its cached keys and values can be reused. Only the new question needs prefill.',
    'A smaller KV cache eases memory pressure. It does not keep the scan from being prefilled again on each turn.',
  ]}
/>

<!-- q4: objective 4 (Apply, embedding design by traffic profile) -->
<MultipleChoice
  id="q4"
  question="A developer-tools company is indexing 30,000 code repositories for a new semantic code-search feature, a bulk job that will run for a week. The same embedding deployment already serves an in-editor search that must answer within 150 ms. Since the bulk job started, in-editor searches time out. Both workloads carry heavy traffic. Which design fits?"
  options={[
    'Add Tensor Parallelism so the shared deployment finishes the bulk job sooner',
    'Keep one deployment and raise its batch size so the bulk job ends sooner',
    "Run the bulk job with prefix caching to shorten each file's prefill",
    'Move the bulk job to a queued backfill system apart from search',
  ]}
  correct={3}
  optionFeedback={[
    'Embedding models are too small to gain from Tensor Parallelism, and a shared deployment still makes searches wait behind the bulk job.',
    'Larger batches raise throughput for the bulk job but make each search wait longer for its batch.',
    'Embedding models read all tokens in one pass and generate nothing, so prefix caching is not relevant.',
    'Correct. The bulk job is a high-throughput backfill and the in-editor search is a low-latency lookup. Heavy traffic on both justifies two systems: a queued backfill with large batches, and separate low-latency replicas for search.',
  ]}
/>

<!-- q5: objective 4 (Apply, embedding scaling) -->
<MultipleChoice
  id="q5"
  question="A team serves a 600-million-parameter embedding model for search on one GPU, and traffic is about to grow tenfold. The team has four GPUs. Which plan fits the workload?"
  options={[
    'Run four independent single-GPU replicas of the model',
    'Run the model with Tensor Parallelism across all four GPUs',
    'Split the GPUs into separate prefill and decode pools',
    'Use speculative decoding to raise each GPU\'s output speed',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Embedding models are small, so high-traffic deployments scale horizontally, with each GPU as its own replica.',
    'A 600-million-parameter model fits on one GPU with room to spare, so splitting it adds communication without adding useful capacity.',
    'Embedding models have no decode phase, so disaggregation is not relevant.',
    'Speculation accelerates token generation, and embedding models generate no tokens.',
  ]}
/>

<!-- q6: objective 5 (Apply, calculate RTF) -->
<NumericQuestion
  id="q6"
  question="A court-records service transcribes a 2.5-hour hearing in 12 seconds. What is its real-time factor? Enter the number without the X."
  answer={750}
  incorrectFeedback="Convert the audio to seconds: 2.5 × 3,600 = 9,000 seconds. RTF = 9,000 ÷ 12 = 750X."
/>

<!-- q7: objective 6 (Analyze, compare ASR pipelines) -->
<MultipleChoice
  id="q7"
  question="A company runs two Whisper products: live captions for video calls and an overnight service that transcribes recorded lectures. An architect proposes one shared design: cut each input into chunks with VAD, send chunks to any free GPU in parallel, and stitch the text by timestamp. Which assessment of the proposal is accurate?"
  options={[
    'It suits both, because both products already use VAD to cut audio into chunks',
    'It suits neither, because Whisper cannot transcribe separate chunks in parallel',
    'It suits the lectures; live captions need in-order chunks on one GPU for prefix context',
    'It suits both, if each live chunk is re-run at a higher temperature to make up for the prefix',
  ]}
  correct={2}
  optionFeedback={[
    'Both pipelines use VAD, but they differ in how chunks are scheduled. Live audio arrives in order and is judged by per-chunk latency.',
    'The long-file pipeline transcribes chunks in parallel across GPUs or MIG slices, which is how it reaches a high real-time factor.',
    'Correct. A finished lecture can be transcribed in parallel and repaired with hallucination checks. Live audio arrives in order, so keeping a stream on one GPU gives each chunk the previous transcript as a prefix.',
    'A higher temperature repairs a looping chunk in a finished file. It does not restore the previous words that live captions lose when chunks land on different GPUs.',
  ]}
/>

<!-- q8: objective 9 (Evaluate, image generation plan) -->
<MultipleChoice
  id="q8"
  question="A team serves a popular diffusion transformer image model on new B200 nodes. It runs the model card's diffusers code, which uses a generic attention kernel and 16-bit linear layers. The team must cut latency without changing the model or the step count. Which plan best fits the workload?"
  options={[
    'Raise the batch size so that each weight load serves more images',
    'Use a Blackwell attention kernel and FP8 GEMMs, compiled on a B200',
    'Quantize the KV cache to FP8 so that each denoising step loads less data',
    'Add speculative decoding with a small draft model of the denoiser',
  ]}
  correct={1}
  optionFeedback={[
    'Shared weight loads help memory-bound LLM decode. A denoising step is compute bound, so a larger batch takes proportionally longer per request.',
    'Correct. A compute-bound step speeds up when its arithmetic runs faster. The attention kernel should match the GPU generation, FP8 GEMMs double Tensor Core FLOPS for the linear layers, and a compiled engine targets the GPU that compiled it.',
    'A denoiser keeps no autoregressive KV cache, and memory traffic is not the bottleneck. Compute is.',
    'Speculative decoding drafts tokens for an autoregressive decoder. A denoiser refines the whole image at every step, so there are no tokens to draft and verify.',
  ]}
/>

<!-- q9: objective 7 (Evaluate, TTS deployment) -->
<MultipleChoice
  id="q9"
  question="A voice agent's TTS model needs 82 audio tokens per second for real-time speech. Two configurations were load-tested at full batch on one GPU. Configuration P: 120 ms TTFB, 1.1 s to first sentence, 95 tokens per second per stream, 30 streams. Configuration Q: 90 ms TTFB, 1.4 s to first sentence, 70 tokens per second per stream, 42 streams. Which configuration should the team deploy?"
  options={[
    'Configuration P, because each stream stays above the real-time threshold',
    'Configuration Q, because its 90 ms TTFB starts audio sooner for every user',
    'Configuration Q, because it serves 12 more streams per GPU at lower cost',
    'Either one, because both deliver a first sentence in under 1.5 seconds',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. At 70 tokens per second, Q falls below the 82-token threshold, so playback outruns generation and listeners hear gaps. P also reaches the first sentence sooner. Its 42 streams make Q look cheaper, but none of them is real time.',
    'The first byte of audio carries no meaning, and Q is slower to the first sentence. Q also cannot keep up with playback.',
    'Streams below the real-time threshold are not usable streams. Q\'s 42 streams all stall during playback.',
    'The first sentence is only the start. Q generates audio slower than it plays, so its speech breaks up after the first sentence.',
  ]}
/>

<!-- q10: objective 7 (Apply, real-time stream capacity) -->
<NumericQuestion
  id="q10"
  question="A TTS model needs 82 audio tokens per second for real-time speech. At full batch, one GPU produces 5,200 audio tokens per second across all streams. How many real-time streams can the GPU sustain?"
  answer={63}
  incorrectFeedback="Divide aggregate throughput by the real-time threshold and round down: 5,200 ÷ 82 = 63.4, so 63 streams."
/>

<!-- q11: objective 8 (Apply, calculate forward passes) -->
<NumericQuestion
  id="q11"
  question="A 36-step image generation run uses classifier-free guidance and turns guidance off for the last 9 steps. How many forward passes through the denoising model does the run make?"
  answer={63}
  incorrectFeedback="Guided steps: 36 − 9 = 27, at 2 passes each = 54. Unguided steps: 9, at 1 pass each = 9. Total: 54 + 9 = 63 forward passes."
/>

<!-- q12: objective 9 (Evaluate, justify Context Parallelism) -->
<MultipleChoice
  id="q12"
  question="A team will serve a 14-billion-parameter video generation model on one node of eight B200 GPUs. An engineer proposes Tensor Parallelism across the eight GPUs. Which reason best supports Context Parallelism instead?"
  options={[
    'It assigns a different group of denoising steps to each GPU so the steps run at once',
    'It handles the large batch sizes that video models need better than Tensor Parallelism',
    'It keeps full weights on each GPU and splits the long sequence to spread attention work',
    "It shards the weights, which lowers each GPU's memory use more than Tensor Parallelism",
  ]}
  correct={2}
  optionFeedback={[
    'Denoising steps depend on each other in order, so they cannot run at once on different GPUs.',
    'Video models run at a batch size of one. All eight GPUs cooperate on a single video.',
    'Correct. The weights fit on each B200, so sharding them gains nothing, and Tensor Parallelism would add an activation exchange for the whole long sequence at every layer. Splitting the sequence spreads the attention compute across all eight GPUs, and the ring transfer overlaps with that compute.',
    'This describes Tensor Parallelism. Context Parallelism replicates the weights on every GPU.',
  ]}
/>

<!-- q13: objective 9 (Evaluate, justify caching and quantization) -->
<MultipleChoice
  id="q13"
  question="A team must cut video generation latency on Blackwell GPUs without visible quality loss. Tests show that quantizing the early denoising steps or the first and last transformer layers visibly changes the output. Which plan best fits the workload's compute-bound, attention-heavy profile?"
  options={[
    'Quantize attention in every step and layer with MXFP8, since microscaling protects outliers',
    'Quantize the linear-layer weights to FP8, since weights take most of the memory bandwidth',
    'Raise the batch size to four clips per node, since larger batches raise GPU utilization',
    'Quantize only later steps and hidden layers, since early steps set the outline',
  ]}
  correct={3}
  optionFeedback={[
    'Microscaling helps, but uniform quantization ignores which steps and layers are sensitive. Early steps and the first and last layers should stay at full precision.',
    'Weight quantization targets memory bandwidth, the bottleneck of LLM decode. In video models, attention takes most of the compute, so the linear layers offer little speedup.',
    'Video generation is compute bound, so a larger batch takes proportionally longer and does not lower latency.',
    'Correct. Attention takes most of the compute, so lower-precision attention speeds each step. Keeping the early steps and the first and last layers at full precision protects the parts the tests showed to be sensitive.',
  ]}
/>

<!-- q14: objective 9 (Analyze, attention share of compute) -->
<NumericQuestion
  id="q14"
  question="In a video model, attention takes 75 percent of each denoising step's compute, and the remaining 25 percent grows in proportion to sequence length. A team doubles the clip length at the same resolution, which doubles the latent sequence. By what factor does each step's compute grow?"
  answer={3.5}
  tolerance={0.01}
  incorrectFeedback="Attention grows with the square of the length: 0.75 × 2² = 3.0. The rest grows linearly: 0.25 × 2 = 0.5. New compute: 3.0 + 0.5 = 3.5 times the original."
/>
