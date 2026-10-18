<script module>
  export const pageConfig = {
    title: 'Chapter 0 Quiz',
    quiz: { graded: true, maxAttempts: 3, feedbackMode: 'never' },
  };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Chapter 0 Quiz</h1>

<p>
  This graded quiz has 12 questions and covers every objective in the chapter. A score of 70 percent passes. You have three
  attempts, and the best attempt counts. The quiz reports your score but not which answers were correct.
</p>

<NumericQuestion
  id="q1"
  question="A document question-answering service receives a request with a 2,000-token prompt and streams back a 500-token answer. How many entries does the KV cache hold for this request at the moment the final output token is produced?"
  answer={2499}
  unit="entries"
  correctFeedback="Correct. Prefill writes 2,000 entries, and 499 decode passes each append one."
  incorrectFeedback="Prefill writes 2,000 prompt entries and produces token 1. Decode passes produce tokens 2 to 500, and each appends the entry of the token it processed, which adds 499. The cache holds 2,000 + 500 − 1 = 2,499 entries."
/>

<MultipleChoice
  id="q2"
  question="A legal team's service accepts contracts of about 30,000 tokens and returns 80-token summaries. Users wait about 8 seconds before any text appears, and then the full summary arrives in under a second. Which phase of the request accounts for most of the wait?"
  options={['Decode', 'Network transfer of the contract', 'Prefill', 'Tokenization of the contract']}
  correct={2}
  optionFeedback={[
    'Incorrect. Decode produces the 79 tokens after the first, and the summary finishes in under a second once text appears.',
    'Incorrect. A 30,000-token contract is a few hundred kilobytes of text, which crosses a network in a fraction of a second.',
    'Correct. Prefill processes all 30,000 prompt tokens before the first output token exists, so it sets the wait before any text appears.',
    'Incorrect. Splitting text into tokens is fast work on the CPU. The GPU work on those tokens is what takes seconds.',
  ]}
/>

<NumericQuestion
  id="q3"
  question="A team plans to serve a 22-billion-parameter model with its weights stored in BF16. How many gigabytes of GPU memory do the weights alone occupy?"
  answer={44}
  unit="GB"
  correctFeedback="Correct. BF16 uses 2 bytes per parameter, so 22 × 10^9 × 2 bytes = 44 GB."
  incorrectFeedback="BF16 uses 2 bytes per parameter. 22 × 10^9 parameters × 2 bytes = 44 × 10^9 bytes, which is 44 GB."
/>

<MultipleChoice
  id="q4"
  question="A team replaces an XGBoost pricing model with an LLM that writes product descriptions on one GPU. The XGBoost service answered every request in about the same time. The new service takes 3 seconds to write a 90-word description and 12 seconds to write a 360-word description. Which property of generative AI inference explains the difference?"
  options={[
    'Each output token requires its own forward pass',
    'GPUs run each forward pass more slowly than CPUs',
    'Longer descriptions load a larger copy of the weights',
    'The weights reload from disk for every request',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Four times the words means about four times the output tokens, and each token needs its own sequential forward pass.',
    'Incorrect. GPUs run forward passes far faster than CPUs. Speed per pass does not explain why time grows with length.',
    'Incorrect. A model has one set of weights. Every request uses the same weights whatever its length.',
    'Incorrect. A reload on every request would add the same delay to short and long descriptions alike.',
  ]}
/>

<Sorting
  id="q5"
  question="Sort each task into the layer of the inference stack that owns it."
  items={[
    'Enable FP8 for one model replica',
    'Turn on speculative decoding for a chat model',
    'Add a region in a second cloud provider',
    'Send each user to the nearest healthy cluster',
    'Choose which settings a deployment config file exposes',
    'Build a dashboard that shows engineers the health of each replica',
  ]}
  targets={['Runtime', 'Infrastructure', 'Tooling']}
  correct={[0, 0, 1, 1, 2, 2]}
  correctFeedback="Correct. Precision and speculation act inside one instance, regions and routing span instances, and config files and dashboards shape what engineers see."
  incorrectFeedback="FP8 and speculative decoding change one replica on its instance, which is runtime. A new region and nearest-cluster routing span instances, which is infrastructure. The config file and dashboard are how engineers reach the platform, which is tooling."
/>

<MultipleChoice
  id="q6"
  question="A tutoring app resends the full conversation with every turn. By the tenth turn, each request carries about 6,000 tokens of earlier conversation and 40 new tokens, and the wait before the first token has grown with every turn. Which technique most directly removes that growth?"
  options={['Caching', 'Disaggregation', 'Parallelism', 'Speculation']}
  correct={0}
  optionFeedback={[
    'Correct. The earlier conversation is a shared prefix. Reusing its keys and values lets prefill compute only the 40 new tokens.',
    'Incorrect. Separate prefill workers still recompute all 6,000 earlier tokens on every turn.',
    'Incorrect. More GPUs make each prefill faster, but prefill still recomputes a history that grows every turn.',
    'Incorrect. Speculation speeds up decode. The growing wait comes from prefill, before the first token exists.',
  ]}
/>

<MultipleChoice
  id="q7"
  question="A research assistant mixes 20,000-token paper prompts with short chat prompts on the same workers. Monitoring shows that the inter-token latency of active chat streams spikes whenever a paper request starts. The team wants to add hardware for prompt processing alone. Which technique fits?"
  options={['Batching', 'Caching', 'Disaggregation', 'Quantization']}
  correct={2}
  optionFeedback={[
    'Incorrect. The workers already serve many requests together. Batching does not separate prompt processing from token generation.',
    'Incorrect. Each paper prompt is new text, so no shared prefix exists to reuse.',
    'Correct. Separate prefill workers absorb the paper prompts, so chat decode no longer waits on them, and each phase scales on its own.',
    'Incorrect. Lower precision speeds every pass a little but leaves prefill and decode competing on the same workers.',
  ]}
/>

<NumericQuestion
  id="q8"
  question="During decode, a draft model proposes five tokens after the text 'Please send the': 'report', 'to', 'the', 'whole', 'team'. In one verification pass, the target model's predictions at the six positions are 'report', 'to', 'the', 'whole', 'team', and 'today'. How many tokens does this pass add to the output?"
  answer={6}
  unit="tokens"
  correctFeedback="Correct. All five drafts match and are accepted, and the target adds the bonus token 'today'."
  incorrectFeedback="Every draft matches the target's prediction at its position, so all five are accepted. The target model then adds its own prediction at the sixth position, 'today', as a bonus token. The pass adds 5 + 1 = 6 tokens."
/>

<MultipleChoice
  id="q9"
  question="A company runs 600 GPUs across two cloud providers and three regions. Each cluster schedules only its own models. During a product launch, the launch model queues requests in one cluster while 90 GPUs sit idle in a cluster in the other cloud. Which change lets the idle GPUs serve the queued traffic?"
  options={[
    'Add a faster inference engine to the busy cluster',
    'Lower the autoscaling threshold in the busy cluster',
    'Move every workload into the larger of the two clouds',
    'Schedule the clusters from one global control plane',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. A faster engine is a runtime fix inside the busy cluster. The idle GPUs in the other cloud stay out of reach.',
    'Incorrect. Autoscaling inside one cluster can only add replicas from that cluster. The idle GPUs belong to a different silo.',
    'Incorrect. No single cloud supplied enough GPUs, which is why the company spread out in the first place.',
    'Correct. A global control plane treats every cluster as one pool and can place the launch model on the idle GPUs.',
  ]}
/>

<MultipleChoice
  id="q10"
  question="A chat service runs workload planes in Frankfurt, Virginia, and Singapore under one global control plane, and every region has spare GPUs. The Singapore region fails during the Asian business day. Which action by the control plane keeps Asian users served with the smallest increase in latency?"
  options={[
    'Hold Asian requests in a queue until Singapore recovers',
    'Move the Singapore models to the closest healthy region',
    'Restart the Singapore replicas on spare GPUs in Singapore',
    'Send all Asian traffic to Virginia, the largest region',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Holding requests turns a regional failure into downtime, which multi-cloud design exists to prevent.',
    'Correct. Redeploying to the nearest healthy region keeps users served, and the shorter distance adds the least network latency.',
    'Incorrect. The Singapore region is down, so its GPUs cannot run new replicas.',
    'Incorrect. Virginia is farther from Asian users than Frankfurt, so every request pays a longer round trip.',
  ]}
/>

<MultipleChoice
  id="q11"
  question="A hospital network's three-person ML team will launch a clinical note assistant with a strict latency target. The team must tune quantization and autoscaling settings, but it has no staff to run GPU clusters or on-call rotations. Which recommendation is most defensible?"
  options={[
    'Black box, because a three-person team cannot operate any inference settings',
    'Middle ground, because it exposes the needed settings without cluster operations',
    'Basic constructs, because a strict latency target requires control of every layer',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. A black box hides the quantization and autoscaling settings that this team must tune to meet its target.',
    'Correct. The team needs specific controls but cannot run infrastructure. The middle ground gives both.',
    'Incorrect. Basic constructs give full control but require the cluster operations this team cannot staff.',
  ]}
/>

<MultipleChoice
  id="q12"
  question="A team's model already runs efficiently on its GPUs. The team now needs to package the service, roll a new model version out to users safely, and stream tokens to a mobile app. Which chapter of the book addresses this work?"
  options={['Chapter 1, Prerequisites', 'Chapter 4, Software', 'Chapter 5, Techniques', 'Chapter 7, Production']}
  correct={3}
  optionFeedback={[
    'Incorrect. Chapter 1 sets requirements and chooses a model before inference work begins.',
    'Incorrect. Chapter 4 covers the runtime software stack and inference engines on the GPU.',
    'Incorrect. Chapter 5 covers runtime optimizations such as quantization and speculative decoding.',
    'Correct. Chapter 7 covers operating an inference service in production and the applications built on it.',
  ]}
/>
