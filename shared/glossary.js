// Single source of truth for term definitions across all eight chapter courses.
// Key: kebab-case id used by <Term id="...">. chapter: where the term is taught in depth.
// Entries without a chapter are assumed background that no chapter teaches.
// Aliases at the bottom point to the same object, so the text exists once.
export const glossary = {
  // ---------------------------------------------------------------------------
  // Assumed background: no chapter teaches these terms
  // ---------------------------------------------------------------------------
  api: {
    term: 'Application programming interface (API)',
    def: 'A defined set of requests that one program can send to another and the responses it returns. Inference engines and hosted model providers expose an API that clients call to run a model.',
  },
  http: {
    term: 'Hypertext Transfer Protocol (HTTP)',
    def: 'The request-response protocol of the web, in which a client sends a request and the server returns one response. HTTP/1.1 keep-alive and HTTP/2 reuse one connection for many requests instead of opening a new connection for each.',
  },
  tensor: {
    term: 'Tensor',
    def: 'A multi-dimensional array of numbers. Weights, activations, and the KV cache are all stored as tensors on the GPU.',
  },
  'object-storage': {
    term: 'Object storage',
    def: 'A cloud storage service that holds files as objects in named buckets and serves them over HTTP. Amazon S3 is the best-known example, and model weights are commonly stored there.',
  },
  'hugging-face': {
    term: 'Hugging Face',
    def: 'A public hub that hosts open model weights, configuration files, and datasets. Most open models are downloaded from it by name.',
  },
  'rate-limit': {
    term: 'Rate limit',
    def: 'A cap that a provider places on how many requests or tokens a client may send in a period of time. Shared inference services enforce rate limits to protect capacity.',
  },
  'system-prompt': {
    term: 'System prompt',
    def: 'Instructions placed at the start of every conversation that set the behavior of a model. Many requests share the same system prompt, which makes it a strong candidate for prefix caching.',
  },
  'normalization-layer': {
    term: 'Normalization layer',
    def: 'A sublayer that rescales the values in a hidden state to a consistent range, which keeps deep networks numerically stable. Modern LLMs usually apply RMSNorm before the attention and feed-forward sublayers.',
  },
  rope: {
    term: 'Rotary positional embeddings (RoPE)',
    def: 'A positional encoding that rotates each query and key vector by an angle determined by the token position. Attention scores then depend on the distance between tokens, and most current LLMs use RoPE.',
  },
  'kv-head': {
    term: 'KV head',
    def: 'A set of key and value projections in an attention layer. Grouped-query attention lets several query heads share one KV head, which shrinks the KV cache.',
  },
  calibration: {
    term: 'Calibration',
    def: 'Running a small, representative dataset through a model to measure the range of its values before quantization. The measured ranges set the scale factors for the low-precision format.',
  },
  pruning: {
    term: 'Pruning',
    def: 'Removing weights, neurons, or whole layers that contribute little to the output, which makes a model smaller and faster at some cost to quality.',
  },
  'thread-block': {
    term: 'Thread block',
    def: 'A group of GPU threads that run on the same Streaming Multiprocessor and can share fast on-chip memory. A CUDA kernel launches a grid of thread blocks.',
  },
  'vector-database': {
    term: 'Vector database',
    def: 'A database that stores embedding vectors and returns the stored vectors most similar to a query vector. Retrieval-augmented generation uses a vector database to find relevant documents.',
    chapter: 6,
  },
  'bin-packing': {
    term: 'Bin packing',
    def: 'Placing workloads onto a fixed set of machines so that as little capacity as possible sits unused. Multi-cloud capacity management treats GPUs across clouds as one pool for bin packing.',
  },
  'benchmark-suite': {
    term: 'Benchmark suite',
    def: 'A fixed, public set of questions or tasks used to score models against each other. MMLU tests broad knowledge and SWE-bench tests software engineering.',
  },

  // ---------------------------------------------------------------------------
  // Chapter 0: Inference
  // ---------------------------------------------------------------------------
  inference: {
    term: 'Inference',
    def: 'Running a trained model on new inputs to produce outputs, especially when serving a model in production.',
    chapter: 0,
  },
  training: {
    term: 'Training',
    def: 'Learning model weights from data through repeated adjustment. Training is compute-intensive, runs on large GPU clusters, and produces the weights that inference uses.',
    chapter: 0,
  },
  'inference-engineering': {
    term: 'Inference engineering',
    def: 'The discipline of serving AI models in production with the latency, throughput, quality, reliability, and cost that a product requires.',
    chapter: 0,
  },
  'generative-ai': {
    term: 'Generative AI',
    def: 'A class of models that create new content, such as text, images, audio, video, or code, by learning the patterns in their training data.',
    chapter: 0,
  },
  'machine-learning': {
    term: 'Machine learning (ML)',
    def: 'Building models that learn patterns from data. Classic machine learning predicts a label or value, while generative AI produces new content.',
    chapter: 0,
  },
  'inference-stack': {
    term: 'Inference stack',
    def: 'The full set of software and infrastructure that turns a model into a production service, organized into the runtime, infrastructure, and tooling layers.',
    chapter: 0,
  },
  'runtime-layer': {
    term: 'Runtime layer',
    def: 'The part of the inference stack that runs a model on one or more GPUs as fast as possible. It includes kernels, frameworks, inference engines, and model performance techniques.',
    chapter: 0,
  },
  'infrastructure-layer': {
    term: 'Infrastructure layer',
    def: 'The part of the inference stack that provides and scales the hardware a model runs on, across clusters, regions, and cloud providers.',
    chapter: 0,
  },
  'tooling-layer': {
    term: 'Tooling layer',
    def: 'The part of the inference stack that engineers use to deploy, observe, and manage models. It sets the developer experience of the platform.',
    chapter: 0,
  },
  'developer-experience': {
    term: 'Developer experience',
    def: 'How well a platform supports the engineers who build, deploy, and operate models on it. Tools range from black boxes with few controls to basic constructs that expose every setting.',
    chapter: 0,
  },

  // ---------------------------------------------------------------------------
  // Chapter 1: Prerequisites
  // ---------------------------------------------------------------------------
  latency: {
    term: 'Latency',
    def: 'The time a user waits for a response. Inference latency is measured with metrics such as time to first token and inter-token latency.',
    chapter: 1,
  },
  throughput: {
    term: 'Throughput',
    def: 'The total work a system completes per unit of time, such as total tokens or requests per second across all users.',
    chapter: 1,
  },
  'latency-budget': {
    term: 'Latency budget',
    def: 'The maximum time an application can spend producing a response before the user experience suffers. The budget is divided among network, queueing, and inference time.',
    chapter: 1,
  },
  'unit-economics': {
    term: 'Unit economics',
    def: 'The cost to serve one unit of product use, such as one request or one million tokens, compared with the revenue that unit earns.',
    chapter: 1,
  },
  'shared-inference': {
    term: 'Shared inference',
    def: 'Calling a model hosted by a provider that serves many customers on the same hardware, usually billed per token.',
    chapter: 1,
  },
  'dedicated-deployment': {
    term: 'Dedicated deployment',
    def: 'Running a model on GPUs reserved for one customer, which gives full control over configuration, latency, and capacity.',
    chapter: 1,
  },
  'open-model': {
    term: 'Open model',
    def: 'A model whose weights are published for download, usually under a license, such as Llama, DeepSeek, Qwen, or Whisper.',
    chapter: 1,
  },
  'closed-model': {
    term: 'Closed model',
    def: 'A proprietary model whose weights are not available, so it can only be used through the provider API.',
    chapter: 1,
  },
  'foundation-model': {
    term: 'Foundation model',
    def: 'A large model trained on broad data that serves as the base for many tasks, used directly through prompting or adapted by fine-tuning.',
    chapter: 1,
  },
  agent: {
    term: 'Agent',
    def: 'An AI application that takes actions by calling tools, not only by returning information. One agent task usually requires many inference calls, often across several models.',
    chapter: 1,
  },
  rag: {
    term: 'Retrieval-augmented generation (RAG)',
    def: 'An application pattern that retrieves relevant documents and adds them to the prompt so the model can answer from information outside its training data.',
    chapter: 1,
  },
  'online-inference': {
    term: 'Online inference',
    def: 'Serving requests in real time while a user waits, optimized for tight latency budgets.',
    chapter: 1,
  },
  'offline-inference': {
    term: 'Offline inference',
    def: 'Processing large jobs asynchronously with no user waiting, optimized for throughput and cost rather than per-request latency.',
    chapter: 1,
  },
  'data-sovereignty': {
    term: 'Data sovereignty',
    def: 'Legal requirements that control the countries or regions in which model inputs and outputs may be processed and stored.',
    chapter: 1,
  },
  evals: {
    term: 'Evals',
    def: 'Task-specific tests built from the real use cases of a product, used to measure whether a model or an optimization meets its quality bar.',
    chapter: 1,
  },
  'intelligence-benchmark': {
    term: 'Intelligence benchmark',
    def: 'A standard test of how well a model answers questions or completes tasks, used to compare models in general rather than for one product.',
    chapter: 1,
  },
  'goodharts-law': {
    term: "Goodhart's Law",
    def: 'The principle that a measure stops being a good measure once it becomes a target. Models tuned to a benchmark can score well without improving at the real task.',
    chapter: 1,
  },
  elo: {
    term: 'Elo rating',
    def: 'A score computed from head-to-head comparisons in which people pick the better of two model outputs. It ranks models by relative preference.',
    chapter: 1,
  },
  'fine-tuning': {
    term: 'Fine-tuning',
    def: 'Continuing to train a pretrained model on a narrower dataset so it performs better in one domain or task. Fine-tuning can let a smaller model meet the quality bar of a larger one.',
    chapter: 1,
  },
  distillation: {
    term: 'Distillation',
    def: 'Training a smaller student model to imitate a larger teacher. For language models, the student learns either the teacher\'s full probability distributions, which is knowledge distillation, or text the teacher generated, which is fine-tuning on teacher-generated data. Step distillation, the image-generation sense, trains a model to produce a usable image in far fewer denoising steps than its teacher.',
    chapter: 1,
  },
  'knowledge-distillation': {
    term: 'Knowledge distillation',
    def: 'Training a smaller student model to match the full output probability distributions of a larger teacher model, not only its final answers. The student keeps much of the teacher behavior with fewer parameters.',
    chapter: 1,
  },
  'synthetic-data-fine-tuning': {
    term: 'Fine-tuning on synthetic data',
    def: 'Fine-tuning a smaller model on text that a larger model generated. Releases such as the DeepSeek-R1 distills use this method, which trains on sampled outputs rather than on probability distributions.',
    chapter: 1,
  },
  'time-to-first-token': {
    term: 'Time to first token (TTFT)',
    def: 'The time from sending a request until the first output token arrives. Prefill dominates it, so long inputs raise TTFT.',
    chapter: 1,
  },
  'tokens-per-second': {
    term: 'Tokens per second (TPS)',
    def: 'The rate at which tokens are generated. Perceived TPS describes one user stream, and total TPS describes the whole system.',
    chapter: 1,
  },
  'perceived-tps': {
    term: 'Perceived TPS',
    def: 'The rate at which one user sees tokens arrive during streaming. It is the inverse of inter-token latency.',
    chapter: 1,
  },
  'total-tps': {
    term: 'Total TPS',
    def: 'The combined token output of a system across all concurrent requests per second, a throughput metric.',
    chapter: 1,
  },
  'inter-token-latency': {
    term: 'Inter-token latency (ITL)',
    def: 'The time between consecutive output tokens during decode. An ITL of 2 ms equals a perceived rate of 500 tokens per second.',
    chapter: 1,
  },
  'latency-percentile': {
    term: 'Latency percentile',
    def: 'The latency below which a given share of requests fall. P50 is the median, and P90, P95, and P99 describe the slowest tail of requests that users notice.',
    chapter: 1,
  },
  'end-to-end-latency': {
    term: 'End-to-end latency',
    def: 'The full time a user waits, including network travel, queueing, preprocessing, and inference, not only the time the model spends computing.',
    chapter: 1,
  },
  concurrency: {
    term: 'Concurrency',
    def: 'The number of requests a system or replica processes at the same time.',
    chapter: 1,
  },

  // ---------------------------------------------------------------------------
  // Chapter 2: Models
  // ---------------------------------------------------------------------------
  transformer: {
    term: 'Transformer',
    def: 'The neural network architecture behind most generative AI models. It stacks blocks of attention and feed-forward layers.',
    chapter: 2,
  },
  weights: {
    term: 'Weights',
    def: 'The learned numbers that define a model. Inference loads them into GPU memory and multiplies them against activations on every forward pass.',
    chapter: 2,
  },
  parameter: {
    term: 'Parameter',
    def: 'One learned number in a model, a weight or a bias. Weight size in bytes equals the parameter count times the bytes per parameter, so 70 billion parameters at 2 bytes each need 140 GB.',
    chapter: 2,
  },
  layer: {
    term: 'Layer',
    def: 'One stage of a neural network that transforms its input and passes the result on. Networks have an input layer, hidden layers, and an output layer.',
    chapter: 2,
  },
  activations: {
    term: 'Activations',
    def: 'The intermediate values that flow between layers during a forward pass. Unlike weights, activations change with every input.',
    chapter: 2,
  },
  'hidden-state': {
    term: 'Hidden state',
    def: 'The vector a model holds for each token between layers. It carries the internal representation of that token in context.',
    chapter: 2,
  },
  encoder: {
    term: 'Encoder',
    def: 'A network that converts raw input into an internal representation. Encoder-decoder models such as Whisper pair one with a decoder.',
    chapter: 2,
  },
  decoder: {
    term: 'Decoder',
    def: 'A network that produces output from an internal representation. Decoder-only transformers generate text one token at a time and are the basis of current LLMs.',
    chapter: 2,
  },
  matmul: {
    term: 'Matrix multiplication (matmul)',
    def: 'The operation that multiplies two matrices. Matrix multiplication accounts for most of the computation in a transformer.',
    chapter: 2,
  },
  'activation-function': {
    term: 'Activation function',
    def: 'A nonlinear function, such as ReLU or SiLU, applied between linear layers. Without it, a stack of linear layers would collapse into a single matrix multiplication.',
    chapter: 2,
  },
  token: {
    term: 'Token',
    def: 'The unit of text a language model reads and writes, an integer that stands for a short string of characters. English text averages about four tokens for every three words.',
    chapter: 2,
  },
  tokenizer: {
    term: 'Tokenizer',
    def: 'The component that converts text into tokens and tokens back into text. Each model family has its own tokenizer, and a more efficient tokenizer needs fewer tokens for the same text.',
    chapter: 2,
  },
  vocabulary: {
    term: 'Vocabulary',
    def: 'The full set of tokens a model can read and produce, usually more than 100,000 entries.',
    chapter: 2,
  },
  'context-window': {
    term: 'Context window',
    def: 'The maximum number of tokens a model can handle in one request, counting input, reasoning, and output tokens together.',
    chapter: 2,
  },
  'reasoning-model': {
    term: 'Reasoning model',
    def: 'An LLM trained to generate a sequence of reasoning tokens before its final answer. The extra tokens improve accuracy on hard problems and raise latency and cost.',
    chapter: 2,
  },
  'chat-template': {
    term: 'Chat template',
    def: 'The model-specific format that turns a list of chat messages, with their roles and separators, into one token sequence.',
    chapter: 2,
  },
  'forward-pass': {
    term: 'Forward pass',
    def: 'One run of input through every layer of a model to produce output. Prefill uses one forward pass for the whole input, and decode uses one forward pass per generated token.',
    chapter: 2,
  },
  prefill: {
    term: 'Prefill',
    def: 'The first phase of LLM inference, which processes every input token in parallel and builds the KV cache. Prefill is compute-bound and sets time to first token.',
    chapter: 2,
  },
  decode: {
    term: 'Decode',
    def: 'The second phase of LLM inference, which generates output tokens one forward pass at a time. Decode is memory-bound because each step reads all the weights to produce one token per request.',
    chapter: 2,
  },
  'autoregressive-generation': {
    term: 'Autoregressive generation',
    def: 'Producing output one token at a time, with each new token conditioned on every token before it.',
    chapter: 2,
  },
  logits: {
    term: 'Logits',
    def: 'The raw scores a model outputs for every token in its vocabulary at each step. Softmax turns them into probabilities before sampling.',
    chapter: 2,
  },
  sampling: {
    term: 'Sampling',
    def: 'Choosing the next token from the probability distribution over the vocabulary. Strategies include greedy selection, temperature, top-k, and top-p.',
    chapter: 2,
  },
  temperature: {
    term: 'Temperature',
    def: 'A sampling setting that sharpens or flattens the token probability distribution. Low values make output more predictable, and high values make it more varied.',
    chapter: 2,
  },
  'structured-output': {
    term: 'Structured output',
    def: 'Model output guaranteed to follow a schema, such as a JSON format. The engine enforces the schema during sampling instead of relying on the prompt.',
    chapter: 2,
  },
  'logit-biasing': {
    term: 'Logit biasing',
    def: 'Adjusting or masking logits before sampling to steer or restrict which tokens a model can produce. Structured output relies on it.',
    chapter: 2,
  },
  'causal-language-model': {
    term: 'Causal language model (CLM)',
    def: 'A decoder-only transformer that predicts the next token from the tokens before it. All generative LLMs in this series are causal language models.',
    chapter: 2,
  },
  'masked-language-model': {
    term: 'Masked language model',
    def: 'An encoder-only transformer, such as BERT, trained to fill in hidden tokens using context on both sides. It suits understanding tasks rather than generation.',
    chapter: 2,
  },
  llm: {
    term: 'Large language model (LLM)',
    def: 'A generative model that takes text as input and produces new text, such as GPT, Claude, Llama, and DeepSeek.',
    chapter: 2,
  },
  lora: {
    term: 'Low-rank adaptation (LoRA)',
    def: 'A lightweight fine-tuning method that trains a small set of extra weights instead of changing the full model. A server can swap many LoRAs on top of one base model.',
    chapter: 2,
  },
  'transformer-block': {
    term: 'Transformer block',
    def: 'The repeated unit of a transformer, made of an attention sublayer, a feed-forward sublayer, and normalization. Large models stack dozens of blocks.',
    chapter: 2,
  },
  attention: {
    term: 'Attention',
    def: 'The transformer mechanism that lets each token draw information from other tokens. It compares query vectors with key vectors, applies softmax, and takes a weighted sum of value vectors.',
    chapter: 2,
  },
  'query-key-value': {
    term: 'Query, key, and value (Q, K, V)',
    def: 'The three vectors that attention projects from each token. A query is compared against keys to score relevance, and the scores weight a sum of the values.',
    chapter: 2,
  },
  softmax: {
    term: 'Softmax',
    def: 'A function that turns a list of scores into probabilities that add up to one. Attention applies it to query-key scores, and sampling applies it to logits.',
    chapter: 2,
  },
  'multi-head-attention': {
    term: 'Multi-head attention',
    def: 'Running several attention heads in parallel within one layer, each with its own projections, so the layer can track different relationships at once.',
    chapter: 2,
  },
  'self-attention': {
    term: 'Self-attention',
    def: 'Attention in which queries, keys, and values all come from the same sequence.',
    chapter: 2,
  },
  'cross-attention': {
    term: 'Cross-attention',
    def: 'Attention in which queries come from one sequence and keys and values come from another, such as image latents attending to text.',
    chapter: 2,
  },
  'kv-cache': {
    term: 'KV cache',
    def: 'Stored key and value tensors for every token already processed, so each decode step computes attention only for the new token instead of recomputing the whole sequence.',
    chapter: 2,
  },
  sparsity: {
    term: 'Sparsity',
    def: 'Using only part of a model for each token. Mixture of Experts models are sparse, while dense models use every weight on every token.',
    chapter: 2,
  },
  'mixture-of-experts': {
    term: 'Mixture of Experts (MoE)',
    def: 'An architecture whose feed-forward layers are split into many experts. A router activates only a few experts for each token, so the model computes with a fraction of its total parameters.',
    chapter: 2,
  },
  'active-parameters': {
    term: 'Active parameters',
    def: 'The parameters used to process one token. In a Mixture of Experts model, active parameters are far fewer than total parameters, yet all weights must still fit in memory.',
    chapter: 2,
  },
  'text-encoder': {
    term: 'Text encoder',
    def: 'The model in an image or video pipeline that turns the prompt into embeddings that guide denoising. Older pipelines use CLIP, and newer ones often use a full LLM.',
    chapter: 2,
  },
  'denoising-model': {
    term: 'Denoising model',
    def: 'The core of a diffusion pipeline, which repeatedly removes predicted noise from a latent until it becomes an image or video.',
    chapter: 2,
  },
  diffusion: {
    term: 'Diffusion',
    def: 'A generation method that starts from random noise and refines it over many denoising steps into an image, video, or audio clip.',
    chapter: 2,
  },
  vae: {
    term: 'Variational autoencoder (VAE)',
    def: 'The component that decodes a finished latent into full-resolution pixels. During training it also encodes images into latent space.',
    chapter: 2,
  },
  'latent-space': {
    term: 'Latent space',
    def: 'A compressed representation in which denoising happens, much smaller than the final image. Working in latent space makes generation far cheaper than working in pixel space.',
    chapter: 2,
  },
  'classifier-free-guidance': {
    term: 'Classifier-free guidance',
    def: 'A technique that runs each denoising step with and without the prompt and pushes the result toward the prompted version. A higher guidance scale follows the prompt more closely and doubles the compute per step.',
    chapter: 2,
  },
  'diffusion-transformer': {
    term: 'Diffusion transformer (DiT)',
    def: 'A denoising model built from transformer blocks that operate on patches of the latent. It replaces the convolutional U-Net that earlier models such as SDXL use.',
    chapter: 2,
  },
  sdxl: {
    term: 'Stable Diffusion XL (SDXL)',
    def: 'An earlier latent diffusion pipeline with a U-Net denoiser, CLIP text encoders, and an optional refiner model. Its structure remains a useful reference for newer pipelines.',
    chapter: 2,
  },
  'few-step-model': {
    term: 'Few-step image model',
    def: 'An image model that produces a usable image in about eight or fewer denoising steps. It is much faster than a full model and gives up some quality.',
    chapter: 2,
  },
  'step-distillation': {
    term: 'Step distillation',
    def: 'The image-generation sense of distillation, in which a model is trained to match the output of a many-step teacher in only a few denoising steps. Adversarial and progressive distillation are two forms.',
    chapter: 2,
  },
  'compute-bound': {
    term: 'Compute-bound',
    def: 'Limited by how fast the processor can perform arithmetic rather than by memory bandwidth. Prefill and image generation are usually compute-bound.',
    chapter: 2,
  },
  'memory-bound': {
    term: 'Memory-bound',
    def: 'Limited by how fast data can move from memory rather than by arithmetic speed. Decode at small batch sizes is memory-bound.',
    chapter: 2,
  },
  'memory-bandwidth': {
    term: 'Memory bandwidth',
    def: 'The rate at which data moves between memory and the compute units, measured in bytes per second. VRAM bandwidth sets the speed limit for decode.',
    chapter: 2,
  },
  'ops-byte-ratio': {
    term: 'Ops:byte ratio',
    def: 'The peak operations a GPU can perform per byte it reads from memory at a given precision. A workload whose arithmetic intensity is below this ratio is memory-bound.',
    chapter: 2,
  },
  'arithmetic-intensity': {
    term: 'Arithmetic intensity',
    def: 'The number of operations a workload performs per byte of data it moves. Comparing it with the ops:byte ratio of a GPU shows whether the workload is compute-bound or memory-bound.',
    chapter: 2,
  },
  'roofline-model': {
    term: 'Roofline model',
    def: 'A chart that plots achievable performance against arithmetic intensity, with a sloped bandwidth ceiling and a flat compute ceiling. The ridge point where they meet marks the ops:byte ratio.',
    chapter: 2,
  },
  flashattention: {
    term: 'FlashAttention',
    def: 'A family of attention kernels that compute attention in on-chip memory tiles and avoid writing the full score matrix to VRAM. FlashAttention 3 targets Hopper and FlashAttention 4 targets Blackwell.',
    chapter: 2,
  },
  pagedattention: {
    term: 'PagedAttention',
    def: 'A method that stores the KV cache in fixed-size pages instead of one contiguous block per request, which reduces wasted memory and lets more requests share a GPU.',
    chapter: 2,
  },
  'sliding-window-attention': {
    term: 'Sliding window attention',
    def: 'Attention in which each token looks only at a fixed number of recent tokens, which caps the cost and the KV cache size for long sequences.',
    chapter: 2,
  },
  'multi-latent-attention': {
    term: 'Multi-head latent attention (MLA)',
    def: 'An attention design, used in DeepSeek models, that compresses keys and values into a small latent vector, which greatly shrinks the KV cache.',
    chapter: 2,
  },
  'state-space-model': {
    term: 'State-space model',
    def: 'A sequence model, such as Mamba, that carries a fixed-size state from token to token instead of attending to every earlier token. Its cost grows linearly with sequence length.',
    chapter: 2,
  },

  // ---------------------------------------------------------------------------
  // Chapter 3: Hardware
  // ---------------------------------------------------------------------------
  gpu: {
    term: 'Graphics processing unit (GPU)',
    def: 'A highly parallel processor originally built for graphics and now the main hardware for training and running generative AI models.',
    chapter: 3,
  },
  cpu: {
    term: 'Central processing unit (CPU)',
    def: 'A general-purpose processor optimized for sequential work. In inference systems it handles orchestration, networking, and preprocessing, and the GPU runs the model.',
    chapter: 3,
  },
  asic: {
    term: 'Application-specific integrated circuit (ASIC)',
    def: 'A chip designed for one kind of workload. AI ASICs such as Google TPUs trade the flexibility of a GPU for efficiency on model computation.',
    chapter: 3,
  },
  thread: {
    term: 'Thread',
    def: 'The smallest unit of execution on a GPU. A kernel launches thousands of threads that run the same code on different data.',
    chapter: 3,
  },
  'streaming-multiprocessor': {
    term: 'Streaming Multiprocessor (SM)',
    def: 'The basic compute building block of an NVIDIA GPU, containing CUDA Cores, Tensor Cores, special function units, and on-chip memory. A GPU has more than one hundred SMs.',
    chapter: 3,
  },
  'tensor-core': {
    term: 'Tensor Core',
    def: 'A specialized unit in an SM that performs small matrix multiply-accumulate operations at low precision. Tensor Cores supply most of the compute for inference.',
    chapter: 3,
  },
  flops: {
    term: 'FLOPS',
    def: 'Floating-point operations per second, the standard measure of compute. GPU specification sheets list teraFLOPS or petaFLOPS for each precision.',
    chapter: 3,
  },
  'structured-sparsity': {
    term: 'Structured sparsity (2:4)',
    def: 'A pattern in which two of every four values are zero, which lets Tensor Cores skip half the multiplications. Specification sheets often quote sparse FLOPS, but most inference runs dense.',
    chapter: 3,
  },
  vram: {
    term: 'VRAM',
    def: 'The memory on a GPU that holds weights, activations, and the KV cache. Its capacity limits model size and context, and its bandwidth limits decode speed.',
    chapter: 3,
  },
  hbm: {
    term: 'High-bandwidth memory (HBM)',
    def: 'Stacked DRAM placed beside the GPU die that provides datacenter GPUs with their VRAM. HBM3e and HBM4 deliver several terabytes per second.',
    chapter: 3,
  },
  'out-of-memory': {
    term: 'Out-of-memory error (OOM)',
    def: 'A failure that occurs when a GPU lacks enough VRAM for weights, activations, or the KV cache.',
    chapter: 3,
  },
  'kv-cache-headroom': {
    term: 'KV cache headroom',
    def: 'The VRAM left for the KV cache after the weights are loaded. Planning reserves headroom of at least half the weight size, and long contexts or high concurrency need more.',
    chapter: 3,
  },
  'memory-planning-factor': {
    term: 'Memory planning factor',
    def: 'The multiplier applied to weight memory to estimate required VRAM, so required VRAM is at least the factor times the weight size. The minimum factor is 1.5, and long contexts or high concurrency call for a larger one, such as 1.8.',
    chapter: 3,
  },
  hopper: {
    term: 'Hopper',
    def: 'The NVIDIA datacenter GPU generation from 2022, including the H100 and H200. It introduced FP8 Tensor Cores but does not support microscaling formats.',
    chapter: 3,
  },
  blackwell: {
    term: 'Blackwell',
    def: 'The NVIDIA GPU generation that followed Hopper in 2024, including the B200 and B300. It is the first NVIDIA generation with hardware support for FP4 and the MX microscaling formats.',
    chapter: 3,
  },
  rubin: {
    term: 'Rubin',
    def: 'The NVIDIA GPU generation after Blackwell, which introduces HBM4 memory and pairs with the Vera CPU. Rubin CPX is a variant built for compute-bound prefill.',
    chapter: 3,
  },
  h100: {
    term: 'H100',
    def: 'An NVIDIA Hopper datacenter GPU with 80 GB of HBM3 and about 3.35 TB/s of memory bandwidth in its SXM form.',
    chapter: 3,
  },
  b200: {
    term: 'B200',
    def: 'An NVIDIA Blackwell datacenter GPU with about 180 GB of HBM3e and about 8 TB/s of memory bandwidth.',
    chapter: 3,
  },
  'grace-cpu': {
    term: 'Grace CPU',
    def: 'An Arm-based NVIDIA CPU with a high-bandwidth link to Hopper or Blackwell GPUs. The Vera CPU succeeds it alongside Rubin.',
    chapter: 3,
  },
  instance: {
    term: 'Instance',
    def: 'A provisioned machine, usually virtual, that bundles GPUs with CPU, RAM, storage, and networking.',
    chapter: 3,
  },
  sxm: {
    term: 'SXM',
    def: 'A socketed GPU form factor that supports higher power and NVLink connections. SXM GPUs are the standard for large-scale inference.',
    chapter: 3,
  },
  pcie: {
    term: 'PCIe (PCI Express)',
    def: 'The standard bus that connects a GPU to the host CPU and memory. It is much slower than NVLink between GPUs. A PCIe GPU is the form factor that plugs into this slot, and it usually draws less power and offers fewer interconnect options than the SXM version.',
    chapter: 3,
  },
  node: {
    term: 'Node',
    def: 'One server chassis, typically with eight GPUs connected by NVLink and NVSwitch. Multi-node systems link nodes over a network fabric such as InfiniBand.',
    chapter: 3,
  },
  nvlink: {
    term: 'NVLink',
    def: 'The high-bandwidth NVIDIA link between GPUs, about 900 GB/s per GPU on Hopper and 1.8 TB/s on Blackwell.',
    chapter: 3,
  },
  nvswitch: {
    term: 'NVSwitch',
    def: 'A switch chip that connects every GPU in an NVLink domain to every other GPU at full NVLink bandwidth.',
    chapter: 3,
  },
  infiniband: {
    term: 'InfiniBand',
    def: 'A low-latency network fabric for connecting nodes, with native RDMA support. Current adapters run at 400 to 800 Gb/s, comparable to high-end Ethernet and well below NVLink.',
    chapter: 3,
  },
  rdma: {
    term: 'Remote direct memory access (RDMA)',
    def: 'Moving data directly between the memory of two machines without involving their CPUs, which cuts network latency. InfiniBand provides it natively, and RoCE provides it over Ethernet.',
    chapter: 3,
  },
  nvl72: {
    term: 'NVL72',
    def: 'A rack-scale Blackwell system that joins 72 GPUs and 36 Grace CPUs in a single NVLink domain, built to serve very large models.',
    chapter: 3,
  },
  mig: {
    term: 'Multi-Instance GPU (MIG)',
    def: 'A feature that partitions one large NVIDIA GPU into as many as seven isolated instances, each with its own slice of memory and compute.',
    chapter: 3,
  },
  hyperscaler: {
    term: 'Hyperscaler',
    def: 'A large general-purpose cloud provider such as AWS, Google Cloud, or Microsoft Azure.',
    chapter: 3,
  },
  neocloud: {
    term: 'Neocloud',
    def: 'A cloud provider that specializes in GPU capacity, such as CoreWeave or Nebius.',
    chapter: 3,
  },
  'local-inference': {
    term: 'Local inference',
    def: 'Running a model on the end-user device, such as a laptop or phone, rather than in a datacenter. It is also called edge or on-device inference.',
    chapter: 3,
  },

  // ---------------------------------------------------------------------------
  // Chapter 4: Software
  // ---------------------------------------------------------------------------
  cuda: {
    term: 'CUDA',
    def: 'The NVIDIA platform and programming model for writing and running code on GPUs.',
    chapter: 4,
  },
  kernel: {
    term: 'Kernel',
    def: 'A function that runs on the GPU across many threads in parallel. Each step of a forward pass, such as a matrix multiplication or attention, runs as one or more kernels.',
    chapter: 4,
  },
  'cuda-graph': {
    term: 'CUDA graph',
    def: 'A recorded sequence of kernels and memory operations that the GPU can replay with one launch, which removes per-kernel launch overhead.',
    chapter: 4,
  },
  'cuda-driver': {
    term: 'CUDA driver',
    def: 'The low-level software on the host that lets programs control the GPU. It is installed on the host machine, not inside a container image.',
    chapter: 4,
  },
  gemm: {
    term: 'General matrix multiplication (GEMM)',
    def: 'The BLAS operation that multiplies two matrices and adds the result to a third. It is the central operation of inference.',
    chapter: 4,
  },
  cutlass: {
    term: 'CUTLASS',
    def: 'An NVIDIA C++ template library of building blocks for writing high-performance GEMM and related kernels tuned to each GPU architecture.',
    chapter: 4,
  },
  'kernel-fusion': {
    term: 'Kernel fusion',
    def: 'Combining several kernels into one so that intermediate results stay on chip instead of making round trips through VRAM.',
    chapter: 4,
  },
  pytorch: {
    term: 'PyTorch',
    def: 'The most widely used deep learning framework, which defines models in Python and runs them on GPUs.',
    chapter: 4,
  },
  'torch-compile': {
    term: 'torch.compile',
    def: 'An optional PyTorch step that captures a model as a graph and generates fused kernels for a specific GPU. Engines may use it, but inference does not require it.',
    chapter: 4,
  },
  onnx: {
    term: 'Open Neural Network Exchange (ONNX)',
    def: 'A portable file format that stores a model as an execution graph, so it can run on runtimes other than the framework that trained it.',
    chapter: 4,
  },
  tensorrt: {
    term: 'TensorRT',
    def: 'An NVIDIA inference compiler and runtime that builds a model into an engine optimized for one GPU, with fused kernels and quantization.',
    chapter: 4,
  },
  'inference-engine': {
    term: 'Inference engine',
    def: 'A high-performance runtime, such as vLLM, SGLang, or TensorRT-LLM, that serves models with batching, caching, quantization, and speculation built in.',
    chapter: 4,
  },
  vllm: {
    term: 'vLLM',
    def: 'A widely used open-source inference engine with broad model and hardware support and strong defaults.',
    chapter: 4,
  },
  sglang: {
    term: 'SGLang',
    def: 'An open-source inference engine with a fast runtime and strong Mixture of Experts support.',
    chapter: 4,
  },
  'tensorrt-llm': {
    term: 'TensorRT-LLM',
    def: 'The NVIDIA inference engine for LLMs, with fused kernels, quantization, and speculative decoding on NVIDIA GPUs.',
    chapter: 4,
  },
  'nvidia-dynamo': {
    term: 'NVIDIA Dynamo',
    def: 'An open-source distributed serving framework that coordinates inference engines across GPUs and nodes, adding KV cache reuse, disaggregation, and routing.',
    chapter: 4,
  },
  'performance-benchmark': {
    term: 'Performance benchmark',
    def: 'A measurement of the latency and throughput of a model deployment under a defined workload.',
    chapter: 4,
  },
  'input-sequence-length': {
    term: 'Input sequence length (ISL)',
    def: 'The number of tokens in the input of a request.',
    chapter: 4,
  },
  'output-sequence-length': {
    term: 'Output sequence length (OSL)',
    def: 'The number of tokens a model generates for a request.',
    chapter: 4,
  },
  'load-testing': {
    term: 'Load testing',
    def: 'Sending sustained, realistic traffic to a deployment to find its throughput limit and observe queueing and autoscaling.',
    chapter: 4,
  },
  baseline: {
    term: 'Baseline',
    def: 'A recorded measurement of performance and quality before any optimization, so later gains or regressions can be attributed accurately.',
    chapter: 4,
  },
  profiling: {
    term: 'Profiling',
    def: 'Measuring where time and memory go inside a workload, operation by operation or kernel by kernel, to find what to optimize.',
    chapter: 4,
  },

  // ---------------------------------------------------------------------------
  // Chapter 5: Techniques
  // ---------------------------------------------------------------------------
  quantization: {
    term: 'Quantization',
    def: 'Storing and computing weights, activations, or the KV cache in a lower-precision number format, which reduces memory use and speeds up inference at some risk to quality.',
    chapter: 5,
  },
  'post-training-quantization': {
    term: 'Post-training quantization (PTQ)',
    def: 'Quantizing a model after training is finished, usually with a calibration dataset.',
    chapter: 5,
  },
  'quantization-aware-training': {
    term: 'Quantization-aware training (QAT)',
    def: 'Training with quantization simulated in the forward pass so the weights learn to tolerate low precision.',
    chapter: 5,
  },
  precision: {
    term: 'Precision',
    def: 'The number of bits a number format uses. Lower precision moves less data and runs faster on Tensor Cores but represents values less exactly.',
    chapter: 5,
  },
  'floating-point-format': {
    term: 'Floating-point format',
    def: 'A number format made of a sign bit, exponent bits, and mantissa bits. The exponent gives it a wide dynamic range.',
    chapter: 5,
  },
  bf16: {
    term: 'BF16',
    def: 'A 16-bit floating-point format with the same exponent range as FP32 and fewer mantissa bits. Its wide range makes it common for training and native weights.',
    chapter: 5,
  },
  fp8: {
    term: 'FP8',
    def: 'An 8-bit floating-point format, first supported on Tensor Cores by Hopper. It halves memory and roughly doubles compute relative to FP16.',
    chapter: 5,
  },
  fp4: {
    term: 'FP4',
    def: 'A 4-bit floating-point format, first supported on Tensor Cores by Blackwell. It needs fine-grained scale factors to keep quality.',
    chapter: 5,
  },
  'scale-factor': {
    term: 'Scale factor',
    def: 'A multiplier stored with quantized values that maps them back to their original range.',
    chapter: 5,
  },
  'dynamic-range': {
    term: 'Dynamic range',
    def: 'The span between the smallest and largest absolute values a number format can represent.',
    chapter: 5,
  },
  outlier: {
    term: 'Outlier',
    def: 'In quantization, a value much larger in magnitude than its neighbors. One outlier forces a coarse scale on its group, so formats with small blocks handle outliers better.',
    chapter: 5,
  },
  'microscaling-format': {
    term: 'Microscaling (MX) format',
    def: 'A low-precision format in which each small block of values, typically 32, shares its own scale factor. Blackwell is the first NVIDIA generation that supports MX formats in hardware, and Hopper does not.',
    chapter: 5,
  },
  mxfp8: {
    term: 'MXFP8',
    def: 'The 8-bit Microscaling floating-point format, in which each block of 32 values shares a power-of-two scale. It requires Blackwell or a later GPU.',
    chapter: 5,
  },
  nvfp4: {
    term: 'NVFP4',
    def: 'The NVIDIA 4-bit floating-point format, which uses blocks of 16 values with an FP8 scale each plus one scale for the whole tensor. It requires Blackwell or a later GPU.',
    chapter: 5,
  },
  'weights-only-quantization': {
    term: 'Weights-only quantization',
    def: 'Quantizing only the weights of linear layers and keeping activations, attention, and the KV cache at higher precision. It preserves quality best and gives the smallest speedup.',
    chapter: 5,
  },
  'kv-cache-quantization': {
    term: 'KV cache quantization',
    def: 'Storing the KV cache in a lower-precision format so more tokens and requests fit in VRAM.',
    chapter: 5,
  },
  perplexity: {
    term: 'Perplexity',
    def: 'A measure of how well a model predicts a reference text, where lower is better. A rise in perplexity after quantization signals lost quality.',
    chapter: 5,
  },
  'speculative-decoding': {
    term: 'Speculative decoding',
    def: 'A technique in which a cheap speculator proposes several draft tokens and the target model checks all of them in one parallel forward pass. Every accepted draft token is a decode step saved.',
    chapter: 5,
  },
  'target-model': {
    term: 'Target model',
    def: 'The full model whose output speculative decoding must match. It verifies all draft tokens in one forward pass and accepts them by a rule that leaves its output distribution unchanged.',
    chapter: 5,
  },
  'draft-model': {
    term: 'Draft model',
    def: 'A small model that shares a tokenizer with the target model and generates draft tokens for it.',
    chapter: 5,
  },
  'acceptance-rate': {
    term: 'Acceptance rate',
    def: 'The probability that the target model accepts a draft token, given that the draft tokens before it were accepted. It is higher than the observed share of all drafts accepted, because every draft after the first rejection is discarded whether or not it was correct. A higher acceptance rate gives a larger speedup from speculation.',
    chapter: 5,
  },
  eagle: {
    term: 'EAGLE',
    def: 'A speculation method that trains a small draft head on the hidden states of the target model, which yields high acceptance rates.',
    chapter: 5,
  },
  'ngram-speculation': {
    term: 'N-gram speculation',
    def: 'Speculation that proposes drafts by copying token sequences already seen in the prompt or output, with no draft model. It works well when output repeats input, as in code editing.',
    chapter: 5,
  },
  'prefix-caching': {
    term: 'Prefix caching',
    def: 'Reusing the KV cache of a shared prompt prefix across requests so prefill skips those tokens. It sharply lowers time to first token for chat, agents, and code completion.',
    chapter: 5,
  },
  'gpu-memory-fraction': {
    term: 'GPU memory fraction',
    def: 'An engine setting, such as free_gpu_memory_fraction, that tells the engine how much of the free VRAM to give the KV cache after loading weights. It configures the engine and is not a planning rule for sizing GPUs.',
    chapter: 5,
  },
  'kv-cache-offloading': {
    term: 'KV cache offloading',
    def: 'Moving KV cache blocks from VRAM to CPU memory, local disk, or remote storage so they can be reused later instead of recomputed.',
    chapter: 5,
  },
  'cache-aware-routing': {
    term: 'Cache-aware routing',
    def: 'Sending each request to the replica most likely to hold its prefix in the KV cache, which raises cache hit rates and lowers time to first token.',
    chapter: 5,
  },
  'chunked-prefill': {
    term: 'Chunked prefill',
    def: 'Splitting a long prefill into chunks and interleaving them with decode steps of other requests, so one long input does not stall everyone else.',
    chapter: 5,
  },
  'model-parallelism': {
    term: 'Model parallelism',
    def: 'Splitting one model across several GPUs. The main forms are tensor, pipeline, expert, and context parallelism.',
    chapter: 5,
  },
  'tensor-parallelism': {
    term: 'Tensor parallelism (TP)',
    def: 'Splitting the weight matrices of every layer across GPUs so they compute each layer together. It gives the lowest latency but needs fast all-reduce traffic, so it stays within an NVLink domain.',
    chapter: 5,
  },
  'pipeline-parallelism': {
    term: 'Pipeline parallelism (PP)',
    def: 'Splitting the layers of a model into sequential stages on different GPUs. It needs little communication, which suits slower links between nodes, but stages can sit idle in pipeline bubbles and per-request latency rises.',
    chapter: 5,
  },
  'expert-parallelism': {
    term: 'Expert parallelism (EP)',
    def: 'Placing different experts of a Mixture of Experts model on different GPUs, so each GPU holds whole experts. It raises throughput for MoE models.',
    chapter: 5,
  },
  'all-reduce': {
    term: 'All-reduce',
    def: 'A collective operation that sums values across GPUs and gives every GPU the result. Tensor parallelism performs one after each split layer.',
    chapter: 5,
  },
  'multi-node-inference': {
    term: 'Multi-node inference',
    def: 'Serving one model across more than one node when a single node lacks enough VRAM. It usually combines tensor parallelism within nodes with pipeline or expert parallelism across them.',
    chapter: 5,
  },
  disaggregation: {
    term: 'Disaggregation',
    def: 'Running prefill and decode on separate GPUs or engines that scale independently, so each phase gets hardware suited to its bottleneck.',
    chapter: 5,
  },

  // ---------------------------------------------------------------------------
  // Chapter 6: Modalities
  // ---------------------------------------------------------------------------
  modality: {
    term: 'Modality',
    def: 'A kind of data a model takes in or produces, such as text, images, audio, or video.',
    chapter: 6,
  },
  vlm: {
    term: 'Vision language model (VLM)',
    def: 'A model that accepts images or video along with text and produces text.',
    chapter: 6,
  },
  'visual-token': {
    term: 'Visual token',
    def: 'A token that represents a patch of an image. A single image can add on the order of a thousand tokens to prefill.',
    chapter: 6,
  },
  'omni-modal-model': {
    term: 'Omni-modal model',
    def: 'A model that accepts and produces several modalities, such as text, images, and audio.',
    chapter: 6,
  },
  'embedding-model': {
    term: 'Embedding model',
    def: 'A model that converts text or images into fixed-length vectors whose distances reflect similarity in meaning, used for search, retrieval, and recommendation.',
    chapter: 6,
  },
  embedding: {
    term: 'Embedding',
    def: 'A vector that represents the meaning of an input. Vectors from different embedding models are not comparable with each other.',
    chapter: 6,
  },
  'matryoshka-representation': {
    term: 'Matryoshka representation',
    def: 'An embedding trained so its leading dimensions carry the most meaning, which lets users truncate vectors to trade quality for storage and speed.',
    chapter: 6,
  },
  'cosine-similarity': {
    term: 'Cosine similarity',
    def: 'A measure of how closely two vectors point in the same direction, from -1 to 1. Embedding search ranks results by it.',
    chapter: 6,
  },
  asr: {
    term: 'Automatic speech recognition (ASR)',
    def: 'Transcribing spoken audio into text.',
    chapter: 6,
  },
  whisper: {
    term: 'Whisper',
    def: 'An open encoder-decoder ASR model from OpenAI. Its decoder dominates runtime and benefits from LLM-style optimizations.',
    chapter: 6,
  },
  vad: {
    term: 'Voice activity detection (VAD)',
    def: 'A small model that finds the stretches of audio that contain speech, so ASR processes only those chunks.',
    chapter: 6,
  },
  'real-time-factor': {
    term: 'Real-time factor (RTF)',
    def: 'How much faster than playback speed a model processes audio. Transcribing one hour of audio in six seconds is an RTF of 600.',
    chapter: 6,
  },
  diarization: {
    term: 'Diarization',
    def: 'Labeling which speaker is talking during each part of an audio recording.',
    chapter: 6,
  },
  tts: {
    term: 'Text-to-speech (TTS)',
    def: 'Generating spoken audio from text. Many modern TTS models generate audio tokens with an LLM-style backbone and convert them to sound with an audio decoder. Others use flow-matching or diffusion designs.',
    chapter: 6,
  },
  'neural-audio-codec': {
    term: 'Neural audio codec',
    def: 'A learned encoder that compresses audio into tokens, paired with a decoder that turns tokens back into a waveform. SNAC is one example.',
    chapter: 6,
  },
  'time-to-first-byte': {
    term: 'Time to first byte (TTFB)',
    def: 'The time from sending a request until the first byte of output arrives. For speech synthesis it measures how soon audio starts playing.',
    chapter: 6,
  },
  'speech-to-speech': {
    term: 'Speech-to-speech model',
    def: 'A single model that takes spoken audio in and produces spoken audio out, in place of a cascade of ASR, an LLM, and TTS.',
    chapter: 6,
  },
  'context-parallelism': {
    term: 'Context parallelism (CP)',
    def: 'Splitting a long sequence across GPUs that each hold the full weights, so each GPU computes attention for part of the context. Video models depend on it.',
    chapter: 6,
  },
  'ring-attention': {
    term: 'Ring attention',
    def: 'A context parallelism method in which GPUs pass key and value blocks around a ring, so each GPU attends to the whole sequence without all-to-all traffic.',
    chapter: 6,
  },

  // ---------------------------------------------------------------------------
  // Chapter 7: Production
  // ---------------------------------------------------------------------------
  container: {
    term: 'Container',
    def: 'A running, isolated process created from an image, packaged with its own libraries and files but sharing the host kernel.',
    chapter: 7,
  },
  'container-image': {
    term: 'Container image',
    def: 'A read-only package of an application and its dependencies, built in layers. An inference image holds the CUDA libraries, Python packages, and engine, while the GPU driver stays on the host.',
    chapter: 7,
  },
  'version-pinning': {
    term: 'Version pinning',
    def: 'Fixing every dependency to an exact version so builds repeat. Full reproducibility also requires a lock file for transitive dependencies and an image digest for the base image.',
    chapter: 7,
  },
  nim: {
    term: 'NVIDIA NIM',
    def: 'A prebuilt NVIDIA container that packages a specific model with an optimized engine.',
    chapter: 7,
  },
  kubernetes: {
    term: 'Kubernetes',
    def: 'An open-source system that schedules and manages containers across a cluster of machines.',
    chapter: 7,
  },
  replica: {
    term: 'Replica',
    def: 'One running copy of a model deployment. Autoscaling adds and removes replicas to match traffic.',
    chapter: 7,
  },
  autoscaling: {
    term: 'Autoscaling',
    def: 'Adding and removing replicas automatically as traffic changes, so the system meets its latency targets without paying for idle GPUs.',
    chapter: 7,
  },
  'autoscaling-window': {
    term: 'Autoscaling window',
    def: 'The period over which traffic is averaged before a scaling decision. A long window keeps replica counts steady, and a short one reacts faster to spikes.',
    chapter: 7,
  },
  'concurrency-target': {
    term: 'Concurrency target',
    def: 'The number of simultaneous requests each replica should handle. The autoscaler adds replicas when traffic exceeds this target.',
    chapter: 7,
  },
  batching: {
    term: 'Batching',
    def: 'Processing several requests together in one forward pass so the cost of reading the weights is shared, which raises throughput.',
    chapter: 7,
  },
  'batch-size': {
    term: 'Batch size',
    def: 'The number of requests processed together. Larger batches raise throughput and slow each individual request.',
    chapter: 7,
  },
  'static-batching': {
    term: 'Static batching',
    def: 'Waiting until a batch is full before running it, and running it to completion before starting the next.',
    chapter: 7,
  },
  'dynamic-batching': {
    term: 'Dynamic batching',
    def: 'Starting a batch when it fills or when a short timer expires, whichever comes first. It suits fixed-size work such as embedding and audio decoding, while LLMs use continuous batching.',
    chapter: 7,
  },
  'continuous-batching': {
    term: 'Continuous batching',
    def: 'Adding and removing requests from a running batch at every decode step, so finished requests free their slot at once. It is also called in-flight batching.',
    chapter: 7,
  },
  'cold-start': {
    term: 'Cold start',
    def: 'The time to bring a new replica from nothing to its first response, including GPU provisioning, image loading, model loading, and engine startup.',
    chapter: 7,
  },
  'scale-to-zero': {
    term: 'Scale to zero',
    def: 'Shutting down every replica when there is no traffic and starting one when a request arrives. It saves cost but exposes users to cold starts.',
    chapter: 7,
  },
  router: {
    term: 'Request router',
    def: 'The component that chooses which replica receives each request by what the request needs, such as a cached prompt prefix, a loaded LoRA, or its sequence length. A load balancer, by contrast, spreads requests by load.',
    chapter: 7,
  },
  'load-balancer': {
    term: 'Load balancer',
    def: 'A component that spreads incoming requests across replicas to keep any one from being overloaded.',
    chapter: 7,
  },
  queue: {
    term: 'Request queue',
    def: 'A buffer that holds requests when all replicas are busy, for example while autoscaling brings new replicas online.',
    chapter: 7,
  },
  'compound-ai-system': {
    term: 'Compound AI system',
    def: 'A workload that chains several models or components, such as VAD, ASR, an LLM, and TTS. Each component can scale independently.',
    chapter: 7,
  },
  'multi-cloud-capacity-management': {
    term: 'Multi-cloud capacity management',
    def: 'Treating GPUs across many clouds and regions as one pool, with a global scheduler that places each workload where capacity exists.',
    chapter: 7,
  },
  'control-plane': {
    term: 'Control plane',
    def: 'The global orchestrator that decides where models are deployed and how resources are allocated.',
    chapter: 7,
  },
  'workload-plane': {
    term: 'Workload plane',
    def: 'An individual cluster that runs models and serves requests under the direction of the control plane.',
    chapter: 7,
  },
  'capacity-type': {
    term: 'Reserved, on-demand, and spot capacity',
    def: 'The three ways to buy cloud GPUs. Reserved capacity is committed in advance at the lowest price, on-demand capacity is rented as needed, and spot capacity is cheap but can be reclaimed.',
    chapter: 7,
  },
  'active-active': {
    term: 'Active-active',
    def: 'A high-availability setup in which several regions or clusters serve live traffic at once, so traffic continues on the others if one fails.',
    chapter: 7,
  },
  'active-passive': {
    term: 'Active-passive',
    def: 'A failover setup that keeps a standby cluster ready but idle and shifts traffic to it when the active cluster fails.',
    chapter: 7,
  },
  'shadow-traffic': {
    term: 'Shadow traffic',
    def: 'Copying real production requests to a candidate deployment and discarding its responses, so it can be tested without affecting users.',
    chapter: 7,
  },
  'blue-green-deployment': {
    term: 'Blue-green deployment',
    def: 'Running two production environments and switching traffic from the old one to the new one at once, which allows instant rollback.',
    chapter: 7,
  },
  'canary-deployment': {
    term: 'Canary deployment',
    def: 'Sending a small share of live traffic to a new deployment and raising the share gradually while it stays healthy.',
    chapter: 7,
  },
  'total-cost-of-ownership': {
    term: 'Total cost of ownership (TCO)',
    def: 'The full cost of running a system, including hardware, engineering time, operations, and idle capacity, not only the GPU price.',
    chapter: 7,
  },
  sla: {
    term: 'Service level agreement (SLA)',
    def: 'A contractual promise to a customer about latency, throughput, uptime, or another performance measure, usually with penalties if it is missed.',
    chapter: 7,
  },
  slo: {
    term: 'Service level objective (SLO)',
    def: 'An internal performance target that a team sets for its own system, usually stricter than the SLA so the contract is met with margin.',
    chapter: 7,
  },
  'session-reuse': {
    term: 'Session reuse',
    def: 'Keeping a client connection open across requests so later requests skip connection setup and the TLS handshake.',
    chapter: 7,
  },
  'asynchronous-inference': {
    term: 'Asynchronous inference',
    def: 'Submitting a request as a job and collecting the result later, often through a webhook, instead of holding a connection open until it completes.',
    chapter: 7,
  },
  websocket: {
    term: 'WebSocket',
    def: 'A protocol that upgrades an HTTP connection into a persistent channel in which client and server can each send messages at any time. It suits real-time audio streaming.',
    chapter: 7,
  },
  grpc: {
    term: 'gRPC',
    def: 'A remote procedure call framework built on HTTP/2 that uses strict schemas and supports streaming in both directions.',
    chapter: 7,
  },
  'real-time-threshold': {
    term: 'Real-time threshold',
    def: 'The audio-token rate that produces one second of audio per second, about 80 to 100 tokens per second depending on the model. A TTS stream that decodes below it runs out of audio.',
    chapter: 6,
  },
  'downsampling': {
    term: 'Downsampling',
    def: 'Converting an image or video into visual tokens at a lower resolution or frame rate. It shortens the sequence at the cost of fine detail.',
    chapter: 6,
  },
  'audio-decoder': {
    term: 'Audio decoder',
    def: 'The component that converts the audio tokens a TTS model emits into a waveform, for example the decoder of the SNAC neural audio codec.',
    chapter: 6,
  },
  'total-response-time': {
    term: 'Total response time',
    def: 'The time from sending a request until the last output token arrives. For a streamed reply of N tokens it equals TTFT + (N - 1) × ITL.',
    chapter: 1,
  },
  'inference-time': {
    term: 'Inference time',
    def: 'The time the GPU spends generating tokens for a request, excluding network and queue time.',
    chapter: 1,
  },
};

// Alias ids: alternate forms that pages may use. Each points to the same object as its target.
const aliases = {
  ttft: 'time-to-first-token',
  tps: 'tokens-per-second',
  itl: 'inter-token-latency',
  ttfb: 'time-to-first-byte',
  isl: 'input-sequence-length',
  osl: 'output-sequence-length',
  moe: 'mixture-of-experts',
  tp: 'tensor-parallelism',
  pp: 'pipeline-parallelism',
  ep: 'expert-parallelism',
  cp: 'context-parallelism',
  'in-flight-batching': 'continuous-batching',
  speculation: 'speculative-decoding',
  'mx-format': 'microscaling-format',
  'large-language-model': 'llm',
  'graphics-processing-unit': 'gpu',
  'service-level-agreement': 'sla',
  'service-level-objective': 'slo',
  'retrieval-augmented-generation': 'rag',
  'cuda-kernel': 'kernel',
  'device-memory': 'vram',
  'out-of-memory-error': 'out-of-memory',
  oom: 'out-of-memory',
  dit: 'diffusion-transformer',
  qkv: 'query-key-value',
};
for (const [alias, id] of Object.entries(aliases)) glossary[alias] = glossary[id];
