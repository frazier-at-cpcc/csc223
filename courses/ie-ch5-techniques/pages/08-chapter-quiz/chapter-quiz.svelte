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
  question="A team enabled speculative decoding when its chatbot carried light traffic. Traffic has since grown tenfold, batch sizes now run large, and per-user speed has fallen below the speed without speculation. What explains the change?"
  options={[
    'Large batches consumed the compute that verification needs',
    'More users lowered the acceptance rate of each draft',
    'More requests raised the time to first token for every user',
    'The prefix cache filled and evicted the draft tokens',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Speculation borrows idle compute from memory-bound decode. Large batches use that compute, so verifying extra positions now costs real time and the speedup turns into a slowdown.',
    'Incorrect. Acceptance depends on temperature and subject matter, not on how many users share the engine.',
    'Incorrect. Speculation acts only during decode, and the complaint concerns per-user streaming speed.',
    'Incorrect. Draft tokens are not stored in the prefix cache, and cache evictions affect prefill, not decode speed.',
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
  question="An activation tensor holds values mostly between −2 and 2, plus a few isolated values near 400 scattered across many channels. The team will quantize it to a 4-bit floating-point format. Which scaling choice preserves the small values best?"
  options={[
    'One scale for the whole tensor',
    'One scale for each feature-vector channel',
    'One scale for each block of 32 values',
    'One scale for each block of 16 values',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. A tensor-wide scale must stretch to cover 400, so values near 1 round to zero.',
    'Incorrect. The outliers sit in many channels, so many channel scales still stretch to cover 400.',
    'Incorrect. Blocks of 32 confine each outlier to its own block, but blocks of 16 confine it more tightly.',
    'Correct. The smallest blocks confine each outlier to the fewest neighboring values, so every other block keeps a fine scale for its small values.',
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
  question="A summarization service receives long documents and returns short summaries. After FP8 weights-only quantization, tokens per second rose but time to first token barely changed. Which next step would lower time to first token?"
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
  question="A coding assistant builds each prompt from the user's open file, which changes with every keystroke, then a 6,000-token repository guide shared by every user, then the instruction. Prefix cache hits are near zero. Which change raises them most?"
  options={[
    'Move the repository guide to the start of the prompt',
    'Move the instruction to the start of the prompt',
    'Raise the KV cache memory fraction on each of the replicas',
    'Split the open file with chunked prefill',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The shared guide then forms a 6,000-token prefix for every request, and the changing file comes after it.',
    'Incorrect. The instruction varies between requests, so placing it first still ends the shared prefix at once.',
    'Incorrect. More memory cannot help when no two requests share a prefix.',
    'Incorrect. Chunked prefill schedules long inputs. It does not create a shared prefix.',
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
  question="A Mixture of Experts model must span two nodes of eight GPUs connected by InfiniBand. The product is an interactive agent, and per-user latency matters more than total throughput. Which strategy fits?"
  options={[
    'Expert Parallelism across all sixteen GPUs in both nodes',
    'Pipeline Parallelism in sixteen stages, one stage per GPU',
    'Tensor Parallelism across all sixteen GPUs in both nodes',
    'Tensor Parallelism per node, Pipeline Parallelism across nodes',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Expert Parallelism across nodes gives the highest system throughput, but the goal here is per-user latency.',
    'Incorrect. Sixteen sequential stages raise per-request latency and leave stages idle.',
    'Incorrect. Tensor Parallelism needs an all-reduce after every layer, which is too slow over InfiniBand.',
    'Correct. TP inside each node gives low latency over NVLink, and PP crosses InfiniBand only once between the two stages.',
  ]}
/>

<MultipleChoice
  id="q12"
  question="Which of these workloads justifies disaggregated serving?"
  options={[
    'A 30-billion-parameter model serving 3 billion tokens per day of long RAG prompts',
    'A 250-billion-parameter model serving 2 billion tokens per day of short, cached chat turns',
    'A 300-billion-parameter model serving 2 billion tokens per day of 20,000-token contracts',
    'A 600-billion-parameter model serving 20 million tokens per day of long reports',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. The volume and input length qualify, but a 30-billion-parameter model is too small to justify separate engines.',
    'Incorrect. Short, cached turns run efficiently on decode engines, so extra replicas serve better.',
    'Correct. The workload meets all three conditions: high volume, a large model, and prefill-heavy traffic.',
    'Incorrect. Twenty million tokens per day falls below the volume at which disaggregation pays off.',
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
