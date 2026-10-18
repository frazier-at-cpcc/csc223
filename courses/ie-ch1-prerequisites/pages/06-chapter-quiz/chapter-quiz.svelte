<script module>
  export const pageConfig = {
    title: 'Chapter 1 Quiz',
    quiz: { graded: true, maxAttempts: 3 },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Chapter 1 Quiz</h1>

<p>
  This graded quiz has 12 questions that cover every objective in the chapter.
  A score of 70 percent or higher passes.
  Feedback for each answer appears after you submit.
</p>

<MultipleChoice
  id="q1"
  question="A team has chosen its model, defined the input and output format, set a two-second response target, and capped inference spending per user each month. Which requirement does the team still need to define?"
  options={['Application interface', 'Latency budget', 'Unit economics', 'Usage patterns']}
  correct={3}
  optionFeedback={[
    'Incorrect. The input and output format is the application interface, and the team has defined it.',
    'Incorrect. The two-second response target is the latency budget, and the team has defined it.',
    'Incorrect. The monthly spending cap per user is the unit economics, and the team has defined it.',
    'Correct. The team has not described how many users are active at once or when activity peaks.',
  ]}
/>

<MultipleChoice
  id="q2"
  question="A startup sends all of its traffic to a pay-per-token API. Every time the API vendor has an outage, the startup's app goes down. Which drawback of shared inference does this situation show?"
  options={[
    'Cold start time while the model loads onto GPUs',
    'Engineering effort to provision and operate GPUs',
    'Linear growth in cost as usage grows',
    'Provider uptime that caps product uptime',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Shared endpoints keep the model always available, so they avoid cold starts. Cold starts are a dedicated-deployment concern.',
    'Incorrect. GPU operations work belongs to dedicated deployments. Shared inference needs only an API key.',
    'Incorrect. Linear cost growth is a real drawback of shared inference, but it does not cause outages.',
    'Correct. With shared inference, the product can be no more available than the provider it depends on.',
  ]}
/>

<MultipleChoice
  id="q3"
  question="Which situation gives the clearest business case for moving from shared inference to a dedicated deployment?"
  options={[
    'A pre-launch prototype that tests whether customers want an AI feature',
    'A product that serves a fine-tuned model with strict latency requirements',
    'A product with low, unpredictable traffic that uses an off-the-shelf model',
    'A team that wants to lower the minimum it spends on inference each month',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Before product-market fit, pay-per-token APIs are the better choice.',
    'Correct. A custom model with specific latency needs is the specialization case for dedicated deployments.',
    'Incorrect. Low, unpredictable traffic favors consumption pricing, and no public endpoint limits an off-the-shelf model.',
    'Incorrect. Dedicated deployments raise the floor of monthly spend, because rented GPUs cost money even when idle.',
  ]}
/>

<MultipleChoice
  id="q4"
  question="Which workload belongs on a deployment optimized for throughput rather than latency?"
  options={[
    'Code tab completion inside an IDE',
    'Nightly embedding of all documents added to a company wiki',
    'Real-time speech translation during a video call',
    'Streaming responses in a customer support chat',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Tab completion is online. A developer waits for each completion at typing speed.',
    'Correct. A scheduled bulk job has no user waiting on each request, so it is an offline workload that favors throughput.',
    'Incorrect. Live translation is online and needs low end-to-end latency for natural conversation.',
    'Incorrect. Support chat is online. A customer waits for each streamed reply.',
  ]}
/>

<MultipleChoice
  id="q5"
  question="A team builds a consumer photo-editing app. A single influencer post could double its traffic overnight. Which set of priorities fits this app?"
  options={[
    'Data sovereignty first, with cost and latency as secondary concerns',
    'Low latency and high uptime first, with marginal cost as a secondary concern',
    'Marginal cost and flexibility first, with decent latency and availability',
    'Throughput first, with photo edits processed in overnight batches',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Compliance can constrain any app, but it is not what separates consumer priorities from B2B priorities.',
    'Incorrect. Latency and uptime lead for B2B products in a revenue path, which have more stable usage.',
    'Correct. Consumer apps are cost-sensitive and see unpredictable, viral spikes, so cost and flexibility lead.',
    'Incorrect. An interactive photo editor is an online workload. A user waits for each edit, so overnight batches do not fit.',
  ]}
/>

<MultipleChoice
  id="q6"
  question="An engineer has two weeks to cut the inference cost of a new summarization feature. The feature runs on a 400-billion-parameter model. Which first step offers the largest potential gain?"
  options={[
    'Benchmark three inference engines on the current model',
    'Evaluate whether a smaller model passes the product evals',
    'Tune the speculation algorithm for the current model',
    'Upgrade the deployment to a newer generation of GPUs',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Engine choice matters, but it matters less than model choice for speed and cost.',
    'Correct. Model selection is the most important performance decision. A smaller model that passes the evals is faster and cheaper on any stack.',
    'Incorrect. Speculation tuning yields smaller gains than running a smaller model.',
    'Incorrect. New hardware speeds up the same large model at a higher hourly cost, which does not address the main lever.',
  ]}
/>

<MultipleChoice
  id="q7"
  question="A new model posts a record score on a popular public coding benchmark. Why should an inference team still run its own evals before adopting the model?"
  options={[
    'Benchmark scores report serving latency rather than model intelligence',
    'Benchmarks can be gamed and do not test the product\'s own tasks',
    'Evals are a licensing requirement before deployment on dedicated GPUs',
    'Evals report the total throughput the model reaches in production',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Intelligence benchmarks such as SWE-bench measure model capability, not serving latency.',
    'Correct. Under Goodhart\'s Law, targeted benchmarks lose meaning, and only evals measure performance on the product\'s own tasks.',
    'Incorrect. No license requires evals. Teams run evals to confirm the model is useful and to set a quality baseline.',
    'Incorrect. Throughput is a performance measurement. Evals measure model intelligence on product tasks.',
  ]}
/>

<MultipleChoice
  id="q8"
  question="Distillation and fine-tuning on synthetic data can both use a large model to train a smaller one. Which training signal is unique to distillation?"
  options={[
    'A larger parameter count after training',
    'A new model architecture designed for the task',
    'The final answers the larger model gives for each input',
    'The probability distributions the larger model assigns to outputs',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Distillation produces a smaller student model. It does not add parameters.',
    'Incorrect. Distills often reuse popular existing architectures, as the DeepSeek-R1 distills did with Llama 3 and Qwen 2.5.',
    'Incorrect. Final answers are input-output pairs, which is exactly what fine-tuning on synthetic data provides.',
    'Correct. Distillation trains the student on the teacher\'s full probability distributions, not only its final answers.',
  ]}
/>

<MultipleChoice
  id="q9"
  question="A streaming chat deployment has an inter-token latency of 20 milliseconds. What perceived TPS does each user observe after the first token?"
  options={['20 tokens per second', '50 tokens per second', '200 tokens per second', '2,000 tokens per second']}
  correct={1}
  optionFeedback={[
    'Incorrect. This answer reuses the ITL value as the TPS. ITL and TPS are inverses of each other.',
    'Correct. 1,000 milliseconds divided by 20 milliseconds per token equals 50 tokens per second.',
    'Incorrect. This answer divides 1,000 by 5 instead of by 20. Recheck the division.',
    'Incorrect. This answer multiplies instead of dividing. Perceived TPS equals 1,000 divided by the ITL in milliseconds.',
  ]}
/>

<MultipleChoice
  id="q10"
  question="An inference service streams 30 tokens per second to each of 100 concurrent users. What is the total TPS of the service?"
  options={['30 tokens per second', '100 tokens per second', '130 tokens per second', '3,000 tokens per second']}
  correct={3}
  optionFeedback={[
    'Incorrect. 30 tokens per second is the perceived TPS for one user, a latency metric.',
    'Incorrect. 100 is the number of concurrent users, not a token rate.',
    'Incorrect. This answer adds the two numbers. Total TPS multiplies per-user TPS by the number of users.',
    'Correct. 100 users multiplied by 30 tokens per second equals 3,000 tokens per second of throughput.',
  ]}
/>

<MultipleChoice
  id="q11"
  question="A monitoring dashboard reports a P90 TTFT of 800 milliseconds. What does this value mean?"
  options={[
    'Ninety percent of requests wait longer than 800 milliseconds for the first token',
    'One request in every 10 waits longer than 800 milliseconds for the first token',
    'One request in every 90 waits longer than 800 milliseconds for the first token',
    'The average request waits 800 milliseconds for the first token',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. This reverses the percentile. Ninety percent of requests are at or below 800 milliseconds.',
    'Correct. P90 marks the value that 90 percent of requests meet, so 1 in 10 requests is slower.',
    'Incorrect. The 90 is a percentage, not a request count. P90 leaves 10 percent, or 1 in 10, above the value.',
    'Incorrect. The average is the mean. In a right-skewed distribution the mean usually sits well below P90.',
  ]}
/>

<MultipleChoice
  id="q12"
  question="A chat reply takes 150 milliseconds of inference time on the GPU, but users measure 1.8 seconds of end-to-end latency. Where should the team look first?"
  options={[
    'A smaller or distilled model',
    'Network paths and request queues',
    'Speculative decoding configuration',
    'The tokenizer vocabulary',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Inference is already fast. A smaller model could save at most 150 of the 1,800 milliseconds.',
    'Correct. When inference time is fast but end-to-end latency is slow, the delay sits in infrastructure.',
    'Incorrect. Speculative decoding speeds up inference, which accounts for less than 10 percent of the wait here.',
    'Incorrect. The tokenizer affects work inside inference, which is already fast in this case.',
  ]}
/>
