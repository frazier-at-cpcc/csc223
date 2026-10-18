<script module>
  export const pageConfig = {
    title: 'Chapter 2 Quiz',
    quiz: { graded: true, maxAttempts: 3 },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Chapter 2 Quiz</h1>

<p>
  This graded quiz has 12 questions covering every chapter objective. A score of 70 percent or higher
  passes. You have three attempts, and your best score counts.
</p>

<MultipleChoice
  id="q1"
  question="Whisper is an encoder-decoder model that transcribes audio into text. Which part of Whisper converts the audio input into an internal representation?"
  options={['The decoder', 'The encoder', 'The output layer', 'The tokenizer']}
  correct={1}
  optionFeedback={[
    'Incorrect. The decoder uses the internal representation to generate text tokens. It does not create the representation.',
    'Correct. An encoder takes an input such as audio and creates an internal representation that the decoder then uses.',
    'Incorrect. The output layer returns the network’s final prediction. It does not process the raw audio input.',
    'Incorrect. A tokenizer maps strings to token IDs without a neural network. It does not process audio into a representation.',
  ]}
/>

<MultipleChoice
  id="q2"
  question="An engineer removes every activation function from a network of 40 linear layers. What is the mathematical effect on the network?"
  options={[
    'The hidden states grow in dimensionality at every layer.',
    'The layers collapse into the equivalent of one linear layer.',
    'The network can no longer perform matrix multiplication.',
    'The network can output only non-negative values.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Dimensionality is set by the shape of each weights matrix, not by activation functions.',
    'Correct. Matmul is composable, so without a non-linear function between them the 40 weights matrices multiply into one.',
    'Incorrect. Linear layers are matrix multiplications. They keep working, but they collapse into one layer.',
    'Incorrect. Non-negative outputs are a property of ReLU itself. Removing ReLU removes that restriction rather than creating it.',
  ]}
/>

<MultipleChoice
  id="q3"
  question="A developer needs an LLM to select the highest-probability token at every decode step. Which sampling setting achieves this?"
  options={['Set temperature to 0', 'Set temperature to 1.5', 'Set top-k to 100', 'Set top-p to 1.0']}
  correct={0}
  optionFeedback={[
    'Correct. Temperature 0 makes selection deterministic, so the model always picks the most likely token. Top-k = 1 has the same effect.',
    'Incorrect. A higher temperature increases diversity, which makes less likely tokens more probable.',
    'Incorrect. Top-k = 100 keeps 100 candidate tokens and samples among them. Only top-k = 1 is deterministic.',
    'Incorrect. Top-p = 1.0 keeps the full probability mass, so every token remains a candidate.',
  ]}
/>

<MultipleChoice
  id="q4"
  question="A request sends a 3,000-token prompt and receives a 400-token response. Which phase processes the 3,000 prompt tokens and builds the KV cache?"
  options={['Decode', 'Normalization', 'Prefill', 'Tokenization']}
  correct={2}
  optionFeedback={[
    'Incorrect. Decode generates the 400 output tokens one forward pass at a time. It reads and extends the KV cache.',
    'Incorrect. Normalization is a sublayer inside each transformer block, not a phase of inference.',
    'Correct. Prefill processes the entire input sequence and stores its attention values in the KV cache.',
    'Incorrect. Tokenization is step zero. It converts the prompt into token IDs but does not run the model or build the KV cache.',
  ]}
/>

<MultipleChoice
  id="q5"
  question="A config.json file lists the architecture Qwen3MoeForCausalLM. What does the CausalLM part of the name indicate?"
  options={[
    'The model fills in masked tokens using context on both sides.',
    'The model is the third major version within its family.',
    'The model predicts the next token from the previous tokens.',
    'The model routes each token to a subset of experts.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Filling in blanks from both sides describes a masked language model, the opposite of a causal language model.',
    'Incorrect. The version comes from the 3 in the name, not from CausalLM.',
    'Correct. A causal language model predicts the next token in a sequence from the tokens before it.',
    'Incorrect. Expert routing is indicated by Moe in the name, not by CausalLM.',
  ]}
/>

<MultipleChoice
  id="q6"
  question="Attention compares each token with every previous token, which is quadratic in sequence length. Why does attention run in linear time during decode in practice?"
  options={[
    'The causal mask removes every token except the current token.',
    'The KV cache stores keys and values for previous tokens, so they are not recomputed.',
    'Multi-head attention splits the sequence evenly across the heads.',
    'The router activates only a few experts for each token.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. The causal mask hides later tokens, not earlier ones. The current token still attends to every previous token.',
    'Correct. With cached keys and values, each new token computes only its own comparisons with prior tokens, which grows linearly.',
    'Incorrect. Each head attends over the full sequence. Heads specialize in kinds of relationships, not in parts of the sequence.',
    'Incorrect. Expert routing applies to the linear layers of MoE models. It does not change the cost of attention.',
  ]}
/>

<MultipleChoice
  id="q7"
  question="Qwen3-235B-A22B activates 22 billion of its 235 billion parameters for each token. A team serves it on a production server with large batches of concurrent requests and no large-scale Expert Parallelism. What share of the parameters should the team expect to be active at a given time?"
  options={[
    'About 9 percent, because the router picks the same experts for every request',
    'About half, because the router alternates experts between layers',
    'Almost all, because different requests activate different experts',
    'Only the attention parameters, because experts are skipped in batched inference',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. 22 of 235 billion is the per-token figure. Different requests in a batch route to different experts.',
    'Incorrect. The router does not alternate experts by layer. It picks experts per token at each layer, and a batch spreads those picks widely.',
    'Correct. Across a large batch, the requests together activate almost every expert, so nearly all parameters are in use.',
    'Incorrect. Experts are never skipped. Every token passes through the experts the router selects at each layer.',
  ]}
/>

<MultipleChoice
  id="q8"
  question="An image generation request uses 40 denoising steps with classifier-free guidance. How many forward passes through the denoising model does the request require?"
  options={['20', '40', '80', '160']}
  correct={2}
  optionFeedback={[
    'Incorrect. Guidance doubles the passes per step. It does not halve them.',
    'Incorrect. Each step runs two forward passes, one conditioned on the prompt and one unconditioned.',
    'Correct. 40 steps × 2 forward passes per step = 80 forward passes.',
    'Incorrect. Each step runs two forward passes, not four. 40 × 2 = 80.',
  ]}
/>

<MultipleChoice
  id="q9"
  question="A product team builds a real-time generative camera filter. Response time matters more than image quality. Which model type fits this workload best?"
  options={[
    'A few-step distilled image model',
    'A standard diffusion model at 50 steps',
    'A video generation model at 50 steps',
    'An SDXL pipeline with base and refiner models',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Few-step models use eight or fewer steps and run 80 to 90 percent faster, which suits latency-sensitive work that tolerates lower quality.',
    'Incorrect. Fifty steps, with two forward passes each, favors quality over speed.',
    'Incorrect. Video models are the most compute-intensive option and take several seconds of inference per second of output.',
    'Incorrect. Running both a base and a refiner model adds denoising work and latency.',
  ]}
/>

<MultipleChoice
  id="q10"
  question="An accelerator performs 500 teraFLOPS of dense FP16 compute and has 2 TB/s of memory bandwidth. What is its FP16 ops:byte ratio?"
  options={['0.004', '250', '1,000', '250,000']}
  correct={1}
  optionFeedback={[
    'Incorrect. This divides bandwidth by compute. The ratio is operations per second divided by bytes per second.',
    'Correct. (500 × 10^12) / (2 × 10^12) = 250 operations per byte.',
    'Incorrect. This multiplies compute by bandwidth instead of dividing.',
    'Incorrect. This treats 2 TB/s as 2 GB/s. Both values use the tera prefix, so the prefixes cancel.',
  ]}
/>

<MultipleChoice
  id="q11"
  question="A batched kernel reaches an arithmetic intensity of 410 operations per byte on an H100, whose FP16 ops:byte ratio is about 295. How does the roofline model classify this kernel?"
  options={['Compute bound', 'Memory bound', 'Perfectly balanced']}
  correct={0}
  optionFeedback={[
    'Correct. The intensity is above the ridge point, so the kernel hits the horizontal compute ceiling.',
    'Incorrect. A kernel is memory bound when its intensity is below the ops:byte ratio. 410 is above 295.',
    'Incorrect. A perfectly balanced kernel matches the ops:byte ratio of 295. This kernel exceeds it.',
  ]}
/>

<MultipleChoice
  id="q12"
  question="A team wants faster LLM prefill on H100 GPUs and cannot accept any change in model output. Which attention optimization meets this constraint?"
  options={['Compressed attention', 'FlashAttention', 'Linear attention', 'Sliding window attention']}
  correct={1}
  optionFeedback={[
    'Incorrect. Compressed attention summarizes earlier context, which changes the result of attention.',
    'Correct. FlashAttention is an implementation improvement. It removes excess memory reads and writes without changing the output.',
    'Incorrect. Linear attention approximates the softmax equation, so its output differs from exact attention.',
    'Incorrect. Sliding window attention ignores tokens outside the window, which changes the result of attention.',
  ]}
/>
