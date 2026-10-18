<script module>
  export const pageConfig = { title: 'Recall from Earlier Chapters' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import { Matching, MultipleChoice } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Recall from Earlier Chapters</h1>

<p>
  This chapter builds on six ideas from Chapters 0 and 1. Answer these four ungraded questions from memory
  before you continue. Each answer explains where this chapter extends the idea.
</p>

<Signal kind="recall" chapter={0} title="The vocabulary of one request">
  <p>
    Chapter 0 introduced the token, the forward pass, the two phases of LLM inference, and the weight memory
    a model needs. Chapter 1 tied each phase to a latency metric.
  </p>
</Signal>

<Matching
  id="rc_vocab"
  question="Match each term to its description."
  pairs={[
    { left: 'Token', right: 'An integer that stands for a short string of text' },
    { left: 'Forward pass', right: 'One run of input through every layer of the model' },
    { left: 'Time to first token', right: 'A latency set mainly by prefill, which processes the whole prompt' },
    { left: 'Inter-token latency', right: 'A latency set by decode, which runs one forward pass per output token' },
  ]}
  correctFeedback="This chapter shows what each forward pass computes during prefill and during decode, and why the two phases stress the GPU differently."
  incorrectFeedback="Review Chapter 0 Core Concepts and Chapter 1 on TTFT and TPS. Prefill reads the whole prompt in one forward pass and sets TTFT. Decode runs one forward pass per output token and sets inter-token latency."
/>

<NumericQuestion
  id="rc_weights"
  question="A model has 8 billion parameters stored in FP16, which uses 2 bytes per parameter. How many gigabytes of memory do its weights need?"
  answer={16}
  unit="GB"
  correctFeedback="Weight memory equals parameters times bytes per parameter: 8 × 10^9 × 2 bytes = 16 GB. This chapter applies the same rule to Mixture of Experts models, where every parameter must be in memory even though only some are active."
  incorrectFeedback="Weight memory equals parameters times bytes per parameter. 8 × 10^9 parameters × 2 bytes = 16 × 10^9 bytes, which is 16 GB."
/>

<Signal kind="recall" chapter={1} title="Distillation and total response time">
  <p>
    Chapter 1 defined knowledge distillation and showed how <Term id="time-to-first-token">TTFT</Term> and <Term id="inter-token-latency">inter-token latency</Term> combine into total
    response time.
  </p>
</Signal>

<MultipleChoice
  id="rc_distill"
  question="A lab trains a 7-billion-parameter student model to match the full output probability distributions of a 70-billion-parameter teacher. Which technique is the lab using?"
  options={['Fine-tuning on synthetic data', 'Knowledge distillation', 'Low-rank adaptation (LoRA)']}
  correct={1}
  optionFeedback={[
    'Incorrect. Fine-tuning on synthetic data trains on text the teacher generated, not on its full probability distributions.',
    'Correct. Knowledge distillation trains the student on the teacher’s probability distributions. Section 4 of this chapter meets a second sense of the word, step distillation, which trains an image model to need fewer denoising steps.',
    'Incorrect. LoRA trains a small set of extra weights on top of one model. It does not transfer behavior from a larger teacher.',
  ]}
/>

<NumericQuestion
  id="rc_e2e"
  question="A response has a TTFT of 200 ms and an inter-token latency of 25 ms. It contains 101 output tokens. What is its total response time in milliseconds?"
  answer={2700}
  unit="ms"
  correctFeedback="Total response time = TTFT + (tokens − 1) × ITL = 200 + 100 × 25 = 2,700 ms. The first token comes from prefill, and each of the other 100 tokens costs one decode step."
  incorrectFeedback="Total response time = TTFT + (tokens − 1) × ITL. The first token arrives at TTFT, and each of the remaining 100 tokens adds one inter-token gap: 200 + 100 × 25 = 2,700 ms."
/>
