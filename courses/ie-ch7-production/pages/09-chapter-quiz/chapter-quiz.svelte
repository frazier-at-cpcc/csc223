<script module>
  export const pageConfig = {
    title: 'Chapter 7 Quiz',
    quiz: { graded: true, maxAttempts: 3, feedbackMode: 'never' },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Chapter 7 Quiz</h1>
<p>
  This graded quiz has 13 questions that cover all nine chapter objectives. A score of 70 percent or higher passes the
  chapter. You have three attempts, and your best attempt counts. The quiz does not show which answers were correct.
  For numeric questions, enter a number without units or commas.
</p>

<MultipleChoice
  id="q1"
  question="A team's Dockerfile starts from an engine's published base image, referenced as vllm/vllm-openai:latest. A requirements file and a committed lock file pin every Python package. Six months later, a rebuild with unchanged files produces different model outputs. Which explanation accounts for the change?"
  options={[
    'The GPU driver packaged in the image was replaced by a newer driver.',
    'Runtime files written by the old container were not carried into the new one.',
    'The base image reference now resolves to a newer image.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. The GPU driver lives on the host, not in the image, so a rebuild cannot change it.',
    'Incorrect. Runtime writes live in the ephemeral container layer and never shape a build. A rebuild starts from the image layers alone.',
    'Correct. A tag such as latest is a movable label. The lock file froze the Python packages, but the base image under them changed. A digest reference would have fixed it.',
  ]}
/>

<MultipleChoice
  id="q2"
  question="A game studio's dialogue service receives traffic in 1-minute bursts when each match round starts, with rounds 4 minutes apart and almost no traffic between them. The autoscaling window is 1 minute, the scale down delay is 1 minute, and a cold start takes 2 minutes. Each round begins with too few replicas and slow responses. Which change fixes the problem at the lowest cost?"
  options={[
    'Raise the scale down delay to about 5 minutes.',
    'Shorten the autoscaling window to 15 seconds.',
    'Raise max replicas to twice the peak of each round.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. With a 1-minute delay, replicas leave during the 3-minute gap and the next round waits for a 2-minute cold start. A delay longer than the gap keeps them warm between rounds, and they still leave once rounds stop.',
    'Incorrect. A shorter window registers the burst faster, but each new replica still needs 2 minutes to start, longer than the 1-minute burst.',
    'Incorrect. The replica count never reaches its ceiling. Replicas leave between rounds, and each round waits for a new cold start.',
  ]}
/>

<MultipleChoice
  id="q3"
  question="A dashboard shows 6 replicas, each holding 30 in-flight requests against a concurrency target of 32, so the autoscaler reports spare room. Each replica's engine runs a batch size of 24. P95 time to first token has tripled, and no scale-up has occurred. Which change fixes the problem?"
  options={[
    'Raise max replicas from 8 to 12.',
    'Lower the concurrency target to 24.',
    'Spread requests more evenly across the 6 replicas.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. The autoscaler never asked for more than 6 replicas, so the ceiling is not what blocks it.',
    'Correct. Each engine serves 24 requests, so the other 6 on each replica wait inside it. With the target at 24, the autoscaler sees 180 requests against 144 slots and adds replicas.',
    'Incorrect. Each replica already holds 30 requests, so the load is even. A different spread still leaves every engine 6 requests over its batch size, and the autoscaler never requests a seventh replica.',
  ]}
/>

<MultipleChoice
  id="q4"
  question="New replicas of an 8B chat model take 11 minutes to start. A trace shows 9 minutes waiting for the cloud provider to deliver a GPU node, then 40 seconds of image loading, 50 seconds of weight loading, and 30 seconds of engine startup. Which change shortens the cold start the most?"
  options={[
    'Quantize the weights from FP16 to FP8.',
    'Cache the compiled engine for the target GPU type.',
    'Keep a warm pool of nodes for new replicas.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Smaller weights would trim part of the 50 seconds of weight loading, not the 9 minutes spent waiting for a node.',
    'Incorrect. Engine startup takes only 30 seconds here. Caching it cannot recover the 9-minute procurement wait.',
    'Correct. GPU procurement dominates this cold start. A pool of warm nodes, or a contract term for node start time, removes most of the 9 minutes.',
  ]}
/>

<MultipleChoice
  id="q5"
  question="During sudden surges, clients of an LLM service receive immediate 503 errors for about 3 minutes, until newly started replicas come online. The router and load balancer are healthy, and the errors stop once the new replicas are ready. Which missing component explains the errors?"
  options={[
    'A queue that holds requests until replicas have room',
    'A router that sends each request to the replica holding its prefix',
    'A load balancer that weights replicas by request size',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. When every replica is full, something must hold the excess while autoscaling adds capacity. Without a queue, the service rejects that traffic.',
    'Incorrect. Choosing the replica that holds a prefix cannot help when every replica is already full.',
    'Incorrect. Weighting by request size balances load more evenly, but it adds no capacity and holds no requests while new replicas start.',
  ]}
/>

<MultipleChoice
  id="q6"
  question="Workload 1 is an internal tool that drafts weekly reports for 40 staff every Monday morning, and staff accept a wait of a few minutes. Workload 2 transcribes support calls with Whisper on GPU slices, then summarizes each call with a 70B LLM on full nodes, and call volume varies fivefold during the day. Which scaling design fits each workload?"
  options={[
    'Scale to zero for both workloads',
    'Scale to zero for workload 1 and independent component scaling for workload 2',
    'Independent component scaling for workload 1 and scale to zero for workload 2',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. The call pipeline runs all day with shifting volume. Scale to zero would add cold starts without saving much, and the two stages would still scale as one.',
    'Correct. The report tool sits idle most of the week, and its users tolerate a cold start. The call pipeline has stages with different hardware and load, so each stage should scale on its own.',
    'Incorrect. The report tool runs one model, so it has no stages to scale separately. The call pipeline serves traffic all day, so scale to zero saves little.',
  ]}
/>

<MultipleChoice
  id="q7"
  question="A legal-research assistant serves law firms in Australia and Japan. Each country's client documents may be processed only inside that country, and users in both countries need low latency. Which design meets both requirements?"
  options={[
    'One cluster in Singapore, between the two countries, serving both',
    'Active-passive failover from an Australian region to a Japanese one',
    'A cluster in each country, each serving only its own users',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Singapore is in neither country, so processing documents there breaks both residency rules.',
    'Incorrect. During normal operation the active Australian region would process Japanese documents, which breaks Japan’s rule.',
    'Correct. Running the model in both countries keeps each country’s documents at home, and each user reaches a nearby cluster.',
  ]}
/>

<MultipleChoice
  id="q8"
  question="A service runs 300 reserved GPUs for its baseline. Its 2-hour evening peak needs 120 more GPUs. Spot capacity in its region is often reclaimed in blocks of up to 60 GPUs, and the service can lose at most 40 GPUs at once while autoscaling finds replacements. Which mix covers the peak at the lowest cost?"
  options={[
    'Cover 40 with spot capacity and 80 with on-demand capacity.',
    'Cover all 120 GPUs with spot capacity at the lowest hourly price.',
    'Cover all 120 GPUs with on-demand capacity at the full price.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. A reclaim can take at most the 40 spot GPUs, which the service tolerates, and on-demand capacity cannot be reclaimed. This is the cheapest mix that keeps the worst reclaim within the limit.',
    'Incorrect. One reclaim of 60 spot GPUs would exceed the 40 GPUs the service can lose at once.',
    'Incorrect. On-demand capacity is safe, but pricing all 120 GPUs at the full rate pays more than the reclaim limit requires.',
  ]}
/>

<MultipleChoice
  id="q9"
  question="A team retrained its production model. Before any user sees the new model's answers, it must confirm that the model meets the latency SLO on real production prompts. It must then move all traffic with no downtime, with only 15 percent spare GPU capacity. Which plan fits?"
  options={[
    'A load test, followed by a blue-green cutover',
    'Shadow traffic on a sample, followed by a canary rollout',
    'Manual testing, followed by an immediate full cutover',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. A load test uses generated traffic rather than real prompts, and blue-green needs a full second environment, far more than 15 percent spare capacity.',
    'Correct. Shadow traffic measures the new model on real prompts while discarding its answers, and a sampled copy keeps the GPU cost low. A canary then shifts traffic in stages as autoscaling moves capacity across.',
    'Incorrect. A few scripted requests do not show behavior on real prompts, and an immediate cutover exposes every user at once.',
  ]}
/>

<NumericQuestion
  id="q10"
  question="A dedicated deployment must produce 1,500 million output tokens per month. One replica uses 4 GPUs and produces 600 output tokens per second at the latency target. Utilization is planned at 80 percent, min replicas is 1, a month has 730 hours, GPUs cost $2.40 per GPU-hour, and engineering costs $4,000 per month. What is the monthly total cost of ownership, in dollars?"
  answer={12333.33}
  tolerancePct={1}
  unit="dollars"
/>

<MultipleChoice
  id="q11"
  question="A workload uses 3,000 million input tokens and 600 million output tokens per month. An API charges $0.50 per million input tokens and $4.00 per million output tokens. A dedicated option would use 1-GPU replicas producing 300 output tokens per second, planned at 75 percent utilization, with min replicas of 1, $2.50 per GPU-hour, a 730-hour month, and $2,500 per month of engineering. Which option is cheaper per month, and by about how much?"
  options={[
    'The API, by about $450',
    'The dedicated deployment, by about $2,050',
    'The API, by about $9,700',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. The API costs 3,000 × $0.50 + 600 × $4.00 = $3,900. The dedicated deployment needs 600,000,000 ÷ (300 × 3,600 × 0.75) = 741 GPU-hours, above the 730-hour floor, so it costs 741 × $2.50 + $2,500 = $4,352.',
    'Incorrect. This result compares the API with GPU cost alone and leaves out the $2,500 of engineering in the total cost of ownership.',
    'Incorrect. This result sizes GPU time by input and output tokens together. The estimate sizes it by output tokens, with prefill already inside the measured throughput.',
  ]}
/>

<MultipleChoice
  id="q12"
  question="After a prompt change asks the model for more detailed answers, P99 end-to-end latency for a chat service doubles. Time to first token is unchanged. Volume, replica count, and queue depth are flat, and response sizes show average output length rising from 250 to 520 tokens. Which explanation fits the metrics?"
  options={[
    'Capacity fell short, and the autoscaler has not added enough replicas.',
    'The network path between users and the cluster became longer.',
    'Responses grew longer, so each request spends more time in decode.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. A capacity shortfall would show a growing queue and a rising time to first token. Both are flat.',
    'Incorrect. A longer network path would raise time to first token as well, and nothing changed on the network side.',
    'Correct. Unchanged time to first token rules out prefill, queueing, and the network. Twice as many output tokens means about twice as many decode steps per request.',
  ]}
/>

<MultipleChoice
  id="q13"
  question="Users in São Paulo report slow answers from an assistant hosted in Virginia. P95 model-server time is 350 milliseconds and queue depth is near zero, but P95 end-to-end latency is 850 milliseconds. Client logs show a new TLS 1.3 connection for every request, and the round trip between the cities is about 120 milliseconds. Where does most of the 500-millisecond gap originate?"
  options={[
    'In the model server, which needs a faster inference engine',
    'Outside the server, in handshakes and distance',
    'In the queue, which needs more replicas',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. The model server accounts for only 350 of the 850 milliseconds, and the gap is measured outside it.',
    'Correct. Each new connection spends 2 × 120 = 240 milliseconds on handshakes, and the request and response add at least another round trip. Session reuse and a nearer region attack the gap. A faster engine cannot.',
    'Incorrect. Queue depth is near zero, so requests reach a replica at once.',
  ]}
/>
