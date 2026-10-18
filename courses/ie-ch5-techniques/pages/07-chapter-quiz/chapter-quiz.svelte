<script module>
  export const pageConfig = {
    title: 'Chapter 5 Quiz',
    quiz: { graded: true, maxAttempts: 3 },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Chapter 5 Quiz</h1>
<p>This graded quiz has twelve questions covering every chapter objective. You have three attempts, and your best attempt counts. A score of 70 percent or higher passes.</p>

<MultipleChoice
  id="q1"
  question="A startup serves one model on a single replica that receives a few requests per minute at low batch sizes. Which technique from this chapter suits this deployment?"
  options={[
    'Cache-aware routing across replicas',
    'Dynamic disaggregation with xPyD reconfiguration',
    'Multi-node Expert Parallelism (EP16)',
    'Speculative decoding with an EAGLE speculator',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Cache-aware routing needs multiple replicas to choose between, and this deployment has one.',
    'Incorrect. Disaggregation pays off only at large traffic volumes on large models served across many GPUs.',
    'Incorrect. Multi-node parallelism is for models or KV caches too large for one node, at high traffic volume.',
    'Correct. Speculation exploits the spare compute that exists at low batch sizes and needs no extra GPUs.',
  ]}
/>

<MultipleChoice
  id="q2"
  question="Why do production inference systems prefer floating-point formats over integer formats that use the same number of bits?"
  options={[
    'Floating-point formats represent more distinct values with the same bits',
    'Floating-point formats represent outlier values better through their higher dynamic range',
    'Integer formats can only be produced by quantization-aware training',
    'Integer formats lack Tensor Core support on current GPUs',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. A given bit width encodes the same number of distinct values, such as 256 for 8 bits. Floating point spreads them across a wider range.',
    'Correct. The exponent bits widen the dynamic range, which preserves the outlier values that matter during inference.',
    'Incorrect. Post-training quantization produces integer models, including the dynamic GGUF formats used for local inference.',
    'Incorrect. GPUs have supported INT8 since Pascal and INT4 since Turing.',
  ]}
/>

<MultipleChoice
  id="q3"
  question="MXFP4 computes one scale factor for every block of 32 values. How does NVFP4 differ?"
  options={[
    'It computes one scale factor for each feature vector',
    'It computes one scale factor for the entire tensor',
    'It uses blocks of 16 values plus a secondary 32-bit global scale factor',
    'It uses blocks of 64 values with no global scale factor',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. One scale factor per feature vector is channel-level quantization, which is coarser than either format.',
    'Incorrect. One scale factor per tensor is the coarsest granularity, and it smooths over outliers.',
    'Correct. Smaller blocks and a second global scale factor give NVFP4 finer granularity to combat 4-bit quality loss.',
    'Incorrect. Larger blocks would reduce granularity, which is the opposite of the NVFP4 design goal.',
  ]}
/>

<MultipleChoice
  id="q4"
  question="Which model component carries the highest risk of quality loss when quantized?"
  options={[
    'Activations, because activation functions make up most of the model',
    'Attention, because it is sensitive to dynamic range and each calculation builds on the previous ones',
    'KV cache, because it is the largest consumer of memory during decode',
    'Linear-layer weights, because they hold most of the parameters',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Activation functions are a tiny fraction of the model, and activations are only somewhat sensitive.',
    'Correct. Attention errors accumulate across thousands of tokens, so most schemes keep operations such as softmax at original precision.',
    'Incorrect. The KV cache is moderately sensitive. Its size makes quantizing it valuable, not risky.',
    'Incorrect. Linear-layer weights are the least sensitive component to quantize.',
  ]}
/>

<MultipleChoice
  id="q5"
  question="A legal-research product quantizes its model to FP8. Which check best predicts whether the product's users will notice a quality change?"
  options={[
    'A custom eval suite built from the product\'s own legal queries',
    'A perplexity comparison on a general text corpus',
    'A throughput benchmark at peak batch size',
    'An MMLU comparison against the original weights',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. A domain-specific eval that matches real-world usage gives the most relevant quality signal.',
    'Incorrect. Perplexity is the simplest check, but a general corpus does not reflect legal-research usage.',
    'Incorrect. Throughput measures performance, not output quality.',
    'Incorrect. A public benchmark is broader than perplexity but less representative than an eval built from real usage.',
  ]}
/>

<MultipleChoice
  id="q6"
  question="A speculator proposes four draft tokens. The target model accepts the first two and rejects the third. How many tokens does this forward pass produce?"
  options={['2', '3', '4', '5']}
  correct={1}
  optionFeedback={[
    'Incorrect. The target model also generates one token of its own on every forward pass.',
    'Correct. Two accepted draft tokens plus one token generated by the target model gives N + 1 = 3.',
    'Incorrect. The fourth draft token is discarded because it follows a rejected token.',
    'Incorrect. Five tokens would require all four drafts to be accepted.',
  ]}
/>

<MultipleChoice
  id="q7"
  question="A code-revision tool returns each submitted file with small edits, so most output repeats the input. Which speculation algorithm should the team choose?"
  options={[
    'Draft-target with a smaller model from the same family',
    'EAGLE',
    'Medusa',
    'N-gram speculation',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Draft-target carries the most overhead of any method and does not exploit the repeated input.',
    'Incorrect. EAGLE is the general-purpose default, but n-gram speculation outperforms it when output closely matches input.',
    'Incorrect. Medusa is limited in draft count and acceptance rate and is rarely used in production.',
    'Correct. N-gram drafts come from the input itself, so acceptance is high and drafts can exceed ten tokens.',
  ]}
/>

<MultipleChoice
  id="q8"
  question="Two chatbot requests share a 3,000-token system prompt. Template A places the user's name before the system prompt. Template B places the name after it. How does prefix caching treat the two templates?"
  options={[
    'Both templates hit the cache equally, because the shared tokens are identical',
    'Neither template hits the cache, because each request contains a unique name',
    'Template A hits the cache on the system prompt and Template B does not',
    'Template B hits the cache on the system prompt and Template A does not',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Identical tokens count only when they come before the first non-repeated token.',
    'Incorrect. A unique name ends the prefix only where it appears. Placed last, it leaves the system prompt as a shared prefix.',
    'Incorrect. In Template A the unique name is the first token, so the prefix ends immediately.',
    'Correct. The prefix runs until the first non-repeated token, so putting the name last lets the system prompt be read from cache.',
  ]}
/>

<MultipleChoice
  id="q9"
  question="A chatbot runs on six replicas behind a router that sends each request to the least busy replica. Later turns of long conversations show high time to first token. Which change lowers time to first token for those turns?"
  options={[
    'Add chunked prefill to every replica',
    'Increase the batch size on every replica',
    'Route each conversation to the replica that holds its cached prefix',
    'Use speculative decoding on every replica',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Chunked prefill spreads long prefill work out, but the engine still recomputes the whole conversation.',
    'Incorrect. Larger batches raise throughput but do not avoid recomputing the conversation history.',
    'Correct. Cache-aware routing turns repeated conversation history into a prefix cache hit, which skips most of prefill.',
    'Incorrect. Speculative decoding improves tokens per second during decode and does not change time to first token.',
  ]}
/>

<MultipleChoice
  id="q10"
  question="A team serves a 405-billion-parameter model in FP8 on B200 GPUs with a KV cache allocation factor of 1.8. Instances provide 180, 360, 720, or 1,440 GB of VRAM. What is the minimum number of GPUs?"
  options={['2', '4', '8', '16']}
  correct={2}
  optionFeedback={[
    'Incorrect. Two B200s provide 360 GB, which does not hold even the 405 GB of FP8 weights.',
    'Incorrect. The requirement is 1 × 405 × 1.8 = 729 GB, which exceeds the 720 GB of four B200s.',
    'Correct. 729 GB rounds up to the 1,440 GB instance, which is eight B200 GPUs.',
    'Incorrect. Sixteen GPUs exceed the minimum. Rounding up stops at the first instance that holds 729 GB.',
  ]}
/>

<MultipleChoice
  id="q11"
  question="An MoE model must span two nodes of eight GPUs connected by InfiniBand. The goal is the highest overall system throughput. Which configuration fits?"
  options={['EP16', 'PP16', 'TP16', 'TP8PP2']}
  correct={0}
  optionFeedback={[
    'Correct. Expert Parallelism has low communication overhead across InfiniBand and yields the highest system throughput for MoE models.',
    'Incorrect. Pipelining across all sixteen GPUs gives poor latency and utilization.',
    'Incorrect. Tensor Parallelism requires too much per-layer communication to span InfiniBand.',
    'Incorrect. TP8PP2 generally gives lower latency per user, while EP16 gives higher overall throughput.',
  ]}
/>

<MultipleChoice
  id="q12"
  question="Which workload best justifies disaggregated serving?"
  options={[
    'An 8-billion-parameter model serving billions of tokens per day with long input sequences',
    'A 200-billion-parameter model serving billions of tokens per day of short chat turns that mostly hit the prefix cache',
    'A 400-billion-parameter model serving 5 million tokens per day of long documents',
    'A 1-trillion-parameter model behind a code editor, serving billions of mostly prefill tokens per day',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Disaggregation needs a model of at least one hundred billion parameters to justify the extra hardware.',
    'Incorrect. Short sequences and prefix cache hits run efficiently on decode engines, so extra replicas serve better.',
    'Incorrect. Disaggregation starts to pay off at one hundred million to one billion tokens per day.',
    'Correct. The workload meets all three conditions: high volume, a very large model, and prefill-heavy traffic.',
  ]}
/>
