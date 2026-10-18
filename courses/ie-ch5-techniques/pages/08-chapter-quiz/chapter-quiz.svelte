<script module>
  export const pageConfig = {
    title: 'Chapter 5 Quiz',
    quiz: { graded: true, maxAttempts: 3, feedbackMode: 'never' },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Chapter 5 Quiz</h1>
<p>
  This graded quiz has thirteen questions covering every chapter objective. Two questions ask for a number. You
  have three attempts, and your best attempt counts. A score of 70 percent or higher passes.
</p>

<MultipleChoice
  id="q1"
  question="A support chatbot runs a 24-billion-parameter model on three replicas and serves 40 million tokens per day of multi-turn conversations. Batch sizes stay low. Which proposal should the team defer?"
  options={[
    'Cache-aware routing across the three replicas',
    'Disaggregation into separate prefill and decode engines',
    'Prefix caching of each conversation history',
    'Speculative decoding with a trained EAGLE speculator head',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Three replicas give the router a choice, and multi-turn histories make the prefix worth reaching.',
    'Correct. A 24-billion-parameter model at 40 million tokens per day falls below both the size and the volume at which separate engines pay off.',
    'Incorrect. Each turn repeats the earlier history, so prefix caching cuts time to first token at any volume.',
    'Incorrect. Low batch sizes leave idle compute in decode, which is the condition speculation needs.',
  ]}
/>

<MultipleChoice
  id="q2"
  question="A team serves a quality-sensitive model on a fleet of H100 GPUs. It wants an 8-bit format for both weights and activations that preserves outliers well and runs at full Tensor Core speed on this fleet. Which format should it choose?"
  options={['FP8', 'INT8 with one scale per tensor', 'MXFP8', 'NVFP4']}
  correct={0}
  optionFeedback={[
    'Correct. FP8 is an 8-bit floating-point format with a wide dynamic range, and Hopper GPUs such as the H100 run it on their Tensor Cores.',
    'Incorrect. INT8 spaces its values evenly, so a single tensor-wide scale loses small values around outliers.',
    'Incorrect. MXFP8 needs the block-scaling hardware that Blackwell introduced. The H100 is a Hopper GPU.',
    'Incorrect. NVFP4 is a 4-bit format, and it also requires Blackwell hardware.',
  ]}
/>

<MultipleChoice
  id="q3"
  question="A team quantizes a weight tensor to a 4-bit format on B200 GPUs. Evals trace a quality loss to small weights that round to zero in blocks that also hold one large weight. The team is choosing between MXFP4 and NVFP4. Which choice reduces the loss, and why?"
  options={[
    'MXFP4, because its power-of-two block scales are exact',
    'MXFP4, because blocks of 32 spread each scale more widely',
    'NVFP4, because blocks of 16 isolate each large weight',
    'NVFP4, because it stores each weight value in more bits',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Power-of-two scales are cheap to apply but coarser than FP8 scales, and blocks of 32 leave more small weights under each large one.',
    'Incorrect. A larger block places more small weights under each large one, so more of them round to zero.',
    'Correct. Both formats store 4 bits per value. NVFP4 blocks of 16 with FP8 scales leave fewer small weights under each large one, so fewer of them round to zero.',
    'Incorrect. Both formats store each value in 4 bits. NVFP4 differs in its smaller blocks and its FP8 block scales.',
  ]}
/>

<MultipleChoice
  id="q4"
  question="A legal-research product plans to quantize its weights, activations, KV cache, and softmax to NVFP4, then approve the result if perplexity on a general web corpus barely changes. Which revision lowers the quality risk most?"
  options={[
    'Add a perplexity check on legal text to the approval checks',
    'Keep softmax at original precision and add a custom legal eval',
    'Switch from NVFP4 to MXFP4 and keep the perplexity check',
    'Quantize attention to FP8 and approve the result on MMLU',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Domain perplexity is a better check than general perplexity, but softmax, the most sensitive operation, would still be quantized to 4 bits.',
    'Correct. Softmax is the most sensitive operation, and a custom eval built from legal queries is the check that best predicts what users will notice.',
    'Incorrect. MXFP4 has coarser blocks than NVFP4, and a general-corpus perplexity check still misses domain quality.',
    'Incorrect. Attention is the riskiest component to quantize, and MMLU does not reflect legal-research usage.',
  ]}
/>

<MultipleChoice
  id="q5"
  question="A summarization service receives long documents and returns short summaries. Profiling shows that most of each request's latency comes before the first token. The team has already quantized the weights to FP8. Which next step lowers that latency?"
  options={[
    'Quantize the activations to FP8 as well',
    'Quantize the weights further, to INT4',
    'Store the KV cache in FP8 instead',
    'Give the KV cache a larger memory fraction',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Prefill is compute bound. With activations also in FP8, its matrix multiplications run on faster FP8 Tensor Core math.',
    'Incorrect. Smaller weights cut decode reads again, but prefill math still runs at the activation precision.',
    'Incorrect. A smaller KV cache speeds memory-bound decode reads, not compute-bound prefill.',
    'Incorrect. More cache memory helps reuse and concurrency. It does not make the prefill computation faster.',
  ]}
/>

<NumericQuestion
  id="q6"
  question="A speculator for a translation service proposes three draft tokens per step, and each draft is accepted with probability 0.75. How many tokens does one target forward pass produce on average? Round to two decimal places."
  answer={2.73}
  tolerance={0.02}
  unit="tokens per pass"
  correctFeedback="Correct. E = 1 + 0.75 + 0.5625 + 0.421875 = 2.73 tokens per pass."
  incorrectFeedback="E = (1 − 0.75⁴) ÷ (1 − 0.75) = (1 − 0.3164) ÷ 0.25 = 2.73. The term-by-term sum 1 + 0.75 + 0.5625 + 0.4219 gives the same result."
/>

<MultipleChoice
  id="q7"
  question="A contract-review tool returns each clause with a few words changed, so most of its output copies the input word for word. The team has the data and skills to train models. Which speculation approach should it choose?"
  options={[
    'A smaller draft model from the same family',
    'A trained EAGLE speculator',
    'Medusa heads fine-tuned onto the target',
    'N-gram lookup from the input text',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. A separate draft model carries the most overhead and does not exploit the copied input.',
    'Incorrect. EAGLE is the general-purpose default, but n-gram drafts copied from the input are longer and more often accepted when output repeats input.',
    'Incorrect. Medusa is limited in draft count and acceptance rate, and few production systems use it.',
    'Correct. When output repeats input, n-gram drafts come straight from the input, run longer than ten tokens, and are accepted at a high rate.',
  ]}
/>

<MultipleChoice
  id="q8"
  question="A retrieval service sends a 6,000-token block of instructions and examples that every request shares, followed by the retrieved passages and the question. A per-request trace ID is printed inside the instructions, about 1,500 tokens in. Cache hits cover only the first 1,500 tokens of each request. Which change raises the cached share most?"
  options={[
    'Enable cache-aware routing across the replicas',
    'Move the trace ID to the end of the prompt',
    'Offload KV cache blocks to CPU host memory',
    'Quantize the KV cache to FP8 on every replica',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Routing finds the replica with the prefix, but every replica\'s prefix still ends at the trace ID.',
    'Correct. The trace ID differs on every request, so the shared prefix ends there. Moving it after the shared block extends the cached prefix to about 6,000 tokens.',
    'Incorrect. Offloading keeps more prefixes, but the reusable prefix is still only 1,500 tokens long.',
    'Incorrect. A smaller cache holds more prefixes, but it does not lengthen the shared one.',
  ]}
/>

<MultipleChoice
  id="q9"
  question="An agent platform runs twelve replicas behind a router that picks the least busy replica. Each agent session sends about thirty sequential turns with growing context. Time to first token rises with each turn, VRAM is not full, and cache hit rates are low. Which change lowers time to first token?"
  options={[
    'Enable chunked prefill on every replica',
    'Offload KV cache blocks to networked storage on each replica',
    'Route each session to the replica that holds its prefix',
    'Store the KV cache in FP8 on every replica',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Chunked prefill spreads long prefill work out, but the replica still recomputes the whole session history.',
    'Incorrect. VRAM is not full, so capacity is not the problem. Requests miss because they land on replicas without their prefix.',
    'Correct. Cache-aware routing sends each turn to the replica that already holds the session history, which turns most of prefill into a cache hit.',
    'Incorrect. A smaller cache helps capacity, which is not the problem here. The turns still reach replicas without their prefix.',
  ]}
/>

<NumericQuestion
  id="q10"
  question="A team serves a 600-billion-parameter model in FP8 on H200 GPUs at a planning factor of 1.8. Instances offer 1, 2, 4, or 8 GPUs, with 141, 282, 564, or 1,128 GB of VRAM. What is the minimum number of GPUs?"
  answer={8}
  unit="GPUs"
  correctFeedback="Correct. 1 × 600 × 1.8 = 1,080 GB, which exceeds 564 GB, so the deployment needs the 1,128 GB instance with eight GPUs."
  incorrectFeedback="Required VRAM is 1 byte × 600 × 1.8 = 1,080 GB. Four H200s give 564 GB, so round up to 1,128 GB, which is eight GPUs."
/>

<MultipleChoice
  id="q11"
  question="A dense model runs in TP16 across two nodes of eight GPUs connected by InfiniBand. Profiling shows each decode step waiting on InfiniBand traffic after every layer. Which change cuts decode latency most?"
  options={[
    'Quantize the KV cache to FP8',
    'Raise the batch size on both nodes',
    'Replace the InfiniBand adapters with RDMA Ethernet adapters',
    'Restructure as TP8PP2 across the two nodes',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. A smaller cache frees memory, but the per-layer all-reduce still crosses InfiniBand.',
    'Incorrect. Larger batches raise throughput, but each step still waits on the cross-node all-reduce.',
    'Incorrect. RDMA Ethernet adapters run at similar speeds and still sit far below NVLink, so the per-layer traffic stays slow.',
    'Correct. TP8PP2 keeps every all-reduce on NVLink inside a node, and only the activations between the two stages cross InfiniBand.',
  ]}
/>

<MultipleChoice
  id="q12"
  question="Which of these workloads justifies disaggregated serving?"
  options={[
    'A 30-billion-parameter model serving 3 billion tokens per day of long RAG prompts',
    'A 250-billion-parameter model serving 2 billion tokens per day of short, cached chat turns',
    'A 300-billion-parameter model serving 2 billion tokens per day of 20,000-token contracts',
    'A 600-billion-parameter model serving 40 million tokens per day of long reports',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. The volume and input length qualify, but a 30-billion-parameter model is too small to justify separate engines.',
    'Incorrect. Short, cached turns run efficiently on decode engines, so extra replicas serve better.',
    'Correct. The workload meets all three conditions: high volume, a large model, and prefill-heavy traffic.',
    'Incorrect. Forty million tokens per day falls below the volume at which disaggregation pays off.',
  ]}
/>

<MultipleChoice
  id="q13"
  question="A 4P4D deployment of a 400-billion-parameter model reaches peak load. Decode engines start evicting sequences and tokens per second falls. The prefill engines also run near full capacity, and the prefill queue holds steady. Which remedy fits?"
  options={[
    'Lower the input length that decode engines may prefill locally',
    'Quantize the KV cache to FP8 and offload cold blocks',
    'Reconfigure to 3P5D to add decode engines',
    'Reconfigure to 5P3D to add prefill engines',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Sending more prefill work to the full prefill engines grows the queue, and it frees no decode memory.',
    'Correct. Decode memory is the bottleneck. An FP8 cache and cold blocks offloaded to host memory free VRAM without taking engines from the busy prefill side.',
    'Incorrect. Taking an engine from prefill adds decode memory, but prefill already runs near full, so the queue would grow.',
    'Incorrect. Removing a decode engine shrinks decode memory further, which worsens the bottleneck.',
  ]}
/>
