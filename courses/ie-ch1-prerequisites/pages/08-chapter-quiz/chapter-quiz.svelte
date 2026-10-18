<script module>
  export const pageConfig = {
    title: 'Chapter 1 Quiz',
    quiz: { graded: true, maxAttempts: 3, feedbackMode: 'never' },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Chapter 1 Quiz</h1>

<p>
  This graded quiz has 14 questions that cover every objective in the chapter.
  A score of 70 percent or higher passes, and you may take the quiz up to three times.
  The quiz reports your score but not which answers were correct, so review the chapter pages between attempts.
  Enter numeric answers as plain numbers, without units.
</p>

<MultipleChoice
  id="q1"
  question="A product brief states: 'We will run one fine-tuned 3-billion-parameter model. Requests arrive as JSON from our mobile app, and replies stream back as text. Each request may cost at most $0.002 to serve. About 2,000 users are active at the evening peak.' Which requirement does the brief leave undefined?"
  options={['Application interface', 'Latency budget', 'Model requirements', 'Unit economics']}
  correct={1}
  optionFeedback={[
    'Incorrect. JSON in from the mobile app and streamed text out define the application interface.',
    'Correct. The brief never says how fast the product must respond to a user action.',
    'Incorrect. One fine-tuned 3-billion-parameter model defines the model requirements.',
    'Incorrect. A cap of $0.002 per request defines the unit economics.',
  ]}
/>

<MultipleChoice
  id="q2"
  question="A document-search product sends 40 million requests a month to a per-token API. Each request averages 600 input tokens at $0.40 per million and 100 output tokens at $1.60 per million. A load test shows that two always-on GPUs at $2 per hour would serve the traffic, and engineering estimates $2,500 a month of added operations work. What does the cost comparison support?"
  options={[
    'Stay on the API, which costs less each month than dedicated GPUs',
    'Stay on the API, because engineering costs cancel the GPU savings',
    'Move to dedicated, which costs about $5,400 a month against $16,000',
    'Move to dedicated, because dedicated GPUs lower the monthly floor',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. The API costs 40,000,000 × (600 × $0.40 + 100 × $1.60) ÷ 1,000,000 = $16,000. Dedicated costs 2 × 730 × $2 + $2,500 = $5,420.',
    'Incorrect. The $2,500 of engineering is already inside the $5,420 dedicated total, which is still far below $16,000.',
    'Correct. Dedicated GPU time is 2 × 730 hours × $2 = $2,920, plus $2,500 of engineering, for $5,420 against a $16,000 API bill. Scale justifies the switch.',
    'Incorrect. A dedicated deployment raises the monthly floor, because rented GPUs bill whether or not traffic arrives.',
  ]}
/>

<MultipleChoice
  id="q3"
  question="A two-person startup is comparing three open models in its writing assistant and changes models every few weeks. Its per-token API bill is $1,200 a month, and its traffic is small and uneven. The cheapest dedicated setup it could run would cost $2,200 a month in always-on GPU time before any engineering work. What should the team do?"
  options={[
    'Move to GPUs bought on-premises, to avoid paying hourly rent',
    'Stay on the API, because shared endpoints give lower latency than dedicated GPUs',
    'Move to dedicated, to gain control over latency and rate limits',
    'Stay on the API until its model choice and traffic settle',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Buying hardware locks in cost before the team knows its model or its traffic, which is the opposite of what this stage needs.',
    'Incorrect. Staying is right, but not for this reason. Shared endpoints do not guarantee lower latency, and the team has no latency target yet. The unsettled model and traffic are the reason to stay.',
    'Incorrect. The team has stated no latency or rate-limit need, and dedicated GPUs would nearly double its bill.',
    'Correct. The requirements are still unclear, and dedicated GPUs would cost more than the API before any engineering work. No clear business need exists yet.',
  ]}
/>

<MultipleChoice
  id="q4"
  question="Which workload can run on a deployment tuned for throughput at the expense of per-request latency?"
  options={[
    'Summarizing 40,000 closed support tickets for a quarterly report',
    'Captioning a product photo while a seller fills in a listing form',
    'Translating each chat message in bulk as support agents type them',
    'Summarizing a long contract while a lawyer waits on the review screen',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. No person waits on any single ticket summary, so the work is offline and favors throughput.',
    'Incorrect. The seller waits for the caption while filling in the form, so the work is online.',
    'Incorrect. The word bulk does not make a workload offline. Agents wait on each translation as they type, so the work is online.',
    'Incorrect. The lawyer waits on the screen for the summary, so the work is online.',
  ]}
/>

<MultipleChoice
  id="q5"
  question="Two teams serve the same open model. Team A runs a free photo-filter app that went viral last month. Team B runs a fraud-screening API that online stores call under contract before they approve each payment. Which pairing of first priorities fits the two teams?"
  options={[
    'Team A: latency and uptime. Team B: marginal cost and flexibility.',
    'Team A: marginal cost and flexibility. Team B: latency and uptime.',
    'Team A: marginal cost and flexibility. Team B: marginal cost and flexibility.',
    'Team A: latency and uptime. Team B: latency and uptime.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. This reverses the two markets. A free viral app is cost-sensitive, and a contracted API in the payment path must stay fast and available.',
    'Correct. The consumer app faces viral spikes and tight costs. The B2B API sits in its customers\' revenue path, so latency and uptime lead.',
    'Incorrect. Cost and flexibility fit Team A, but a fraud check that blocks each payment is mission-critical for Team B.',
    'Incorrect. Latency and uptime fit Team B, but a free viral app must control its marginal cost first.',
  ]}
/>

<MultipleChoice
  id="q6"
  question="A telehealth company must process patient conversations only inside Canada. Its current shared API serves the model from GPUs in the United States. A second provider serves the same open model from GPUs in Toronto. Which plan meets the requirement?"
  options={[
    'Keep the current API and route all traffic through a proxy server in Montreal',
    'Keep the current API and delete all logs after 30 days',
    "Move traffic to the second provider's GPUs in Toronto",
    'Route each request to whichever region answers fastest',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. A proxy in Canada changes where traffic passes, not where the GPUs process it. The conversations would still be processed in the United States.',
    'Incorrect. Deleting logs limits storage time, but the conversations would still be processed in the United States.',
    'Correct. Only GPUs located in Canada satisfy a rule about where the data is processed.',
    'Incorrect. A latency rule could send requests to the United States, which the requirement forbids.',
  ]}
/>

<MultipleChoice
  id="q7"
  question="An engineer must halve the serving cost of a contract-review feature this quarter. The feature calls a 405-billion-parameter model. Which first step has the largest potential payoff?"
  options={[
    'Test a much smaller model against the product evals',
    'Enable speculative decoding on the current model',
    'Move the current model to a newer generation of GPUs',
    'Replace the model with whichever smaller model has the best public benchmark score',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. Model choice is the largest lever. A smaller model that passes the evals is faster and cheaper on any hardware and any engine.',
    'Incorrect. Speculative decoding speeds up the current model, but it cannot match the savings of running a far smaller model.',
    'Incorrect. Newer GPUs speed up the same large model at a higher hourly price, which leaves the main lever untouched.',
    'Incorrect. A smaller model is the right lever, but a public benchmark does not test this feature. Only the product evals show whether the smaller model can review contracts.',
  ]}
/>

<MultipleChoice
  id="q8"
  question="A team applies an optimization that doubles decode speed and may lower output quality. The team has no eval set built from its product's real tasks. What risk does the team take?"
  options={[
    'It cannot measure the speedup without an eval set',
    'It cannot tell whether quality dropped on its own tasks',
    'It must wait for a public benchmark score before shipping',
    'It cannot run the optimization without a quality baseline',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Speed is measured with latency metrics. Evals measure quality.',
    'Correct. Without product evals there is no baseline, so a quality loss on the product\'s own tasks would go unnoticed.',
    'Incorrect. A public benchmark does not test the product\'s tasks, and no rule requires one before shipping.',
    'Incorrect. The optimization runs without a baseline. The baseline is what reveals whether it hurt quality.',
  ]}
/>

<MultipleChoice
  id="q9"
  question="A lab runs its own 80-billion-parameter model and records the model's probability for every vocabulary token at each output position. The lab wants a 4-billion-parameter model that copies the large model's behavior as closely as possible. Which method fits, and what does training change in the small model?"
  options={[
    'Knowledge distillation, which sets new weights in the small model',
    "Knowledge distillation, which enlarges the small model's architecture",
    "Fine-tuning on the large model's text, which sets new weights in the small model",
    "Step distillation, which cuts the small model's denoising steps",
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The recorded probabilities are the signal for knowledge distillation, and training sets new weight values in the existing small architecture.',
    'Incorrect. Knowledge distillation fits, but the student keeps its small architecture. Its weight values change.',
    'Incorrect. Generated text carries only the chosen tokens. With the full probabilities available, knowledge distillation copies the teacher more closely.',
    'Incorrect. Step distillation reduces denoising steps in image models. It does not apply to a language model.',
  ]}
/>

<NumericQuestion
  id="q10"
  question="A monitoring trace shows one token every 16 milliseconds in a user's stream. What perceived TPS does that user observe, in tokens per second?"
  answer={62.5}
  tolerance={0.1}
  unit="tokens per second"
  correctFeedback="Correct. 1,000 ÷ 16 = 62.5 tokens per second."
  incorrectFeedback="Perceived TPS = 1,000 ÷ ITL in milliseconds = 1,000 ÷ 16 = 62.5 tokens per second."
/>

<NumericQuestion
  id="q11"
  question="A service reports a total TPS of 8,190 tokens per second across 126 concurrent streams that run at equal speed. What perceived TPS does each user see, in tokens per second?"
  answer={65}
  tolerance={0.1}
  unit="tokens per second"
  correctFeedback="Correct. 8,190 ÷ 126 = 65 tokens per second."
  incorrectFeedback="Perceived TPS = total TPS ÷ concurrent streams = 8,190 ÷ 126 = 65 tokens per second."
/>

<NumericQuestion
  id="q12"
  question="An agent's tool call returns 161 tokens. Its TTFT is 350 milliseconds, and the stream runs at a perceived TPS of 80. How many milliseconds does the agent wait for the complete output?"
  answer={2350}
  tolerance={0.5}
  unit="milliseconds"
  correctFeedback="Correct. ITL = 1,000 ÷ 80 = 12.5 ms, and 350 + 160 × 12.5 = 2,350 ms."
  incorrectFeedback="ITL = 1,000 ÷ 80 = 12.5 ms. Total response time = TTFT + (N − 1) × ITL = 350 + 160 × 12.5 = 350 + 2,000 = 2,350 ms."
/>

<MultipleChoice
  id="q13"
  question="A chat product's target is a P99 TTFT under 1 second. Yesterday's dashboard shows a mean TTFT of 420 ms, a P50 TTFT of 310 ms, and a P99 TTFT of 3,900 ms. A teammate proposes to report the target as met. What is the correct reading?"
  options={[
    'Met, because the mean TTFT is well under 1 second',
    'Met, because the median TTFT is well under 1 second',
    'Missed, because 99 percent of requests wait about 3.9 seconds',
    'Missed, because the slowest 1 percent wait over 3.9 seconds',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. The target names P99, and the mean hides the slow tail of a right-skewed distribution.',
    'Incorrect. The median describes the typical request. The target names P99, the slowest 1 percent.',
    'Incorrect. This reverses the percentile. Ninety-nine percent of requests are at or below 3.9 seconds.',
    'Correct. P99 is 3.9 seconds, so the slowest 1 percent of requests wait longer than that, far beyond the 1-second target. The work belongs in the tail.',
  ]}
/>

<MultipleChoice
  id="q14"
  question="A voice assistant's replies take 850 ms of inference time on the GPU, and users experience 3,100 ms end to end. Logs show that requests spend 1,900 ms in a queue during peak hours. Where should the team direct its next effort?"
  options={[
    'Network routing, because the network adds the most time',
    'A smaller model, because inference is the largest share',
    'Queue time, because it is most of the wait at peak',
    'No change, because inference time is under one second',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Network time is 3,100 − 850 − 1,900 = 350 ms, the smallest share.',
    'Incorrect. Inference is 850 of 3,100 ms, about 27 percent. A smaller model could save at most that share.',
    'Correct. Queueing is 1,900 of 3,100 ms, about 61 percent of the wait. More capacity at peak gives the largest gain.',
    'Incorrect. Users experience 3.1 seconds, not 0.85 seconds. End-to-end latency is what they perceive.',
  ]}
/>
