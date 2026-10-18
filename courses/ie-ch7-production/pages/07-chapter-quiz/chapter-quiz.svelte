<script module>
  export const pageConfig = {
    title: 'Chapter 7 Quiz',
    quiz: { graded: true, maxAttempts: 3 },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Chapter 7 Quiz</h1>

<p>
  This graded quiz has 12 questions, one for each chapter objective. A score of 70 percent or higher passes the
  chapter. You have three attempts, and your best attempt counts.
</p>

<MultipleChoice
  id="q1"
  question="A team pins every dependency in its inference image to one exact version. Once the image is working, what does pinning guarantee?"
  options={[
    'Later builds resolve the same versions, so upstream releases cannot break the image.',
    'The image runs on any GPU architecture without a rebuild.',
    'The image stays small because the build tool removes unused packages.',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. A pinned dependency tree resolves identically on every build, which protects the image from breaking changes.',
    'Incorrect. Images target a specific GPU architecture. Pinning controls package versions, not hardware compatibility.',
    'Incorrect. Pinning fixes versions. Keeping an image small requires leaving out unnecessary dependencies.',
  ]}
/>

<MultipleChoice
  id="q2"
  question="Traffic to a chat service arrives in bursts a few minutes apart. Between bursts the autoscaler removes replicas, and each new burst meets too few replicas and high latency. Which parameter should the team increase?"
  options={['Concurrency target', 'Max replicas', 'Scale down delay']}
  correct={2}
  optionFeedback={[
    'Incorrect. A higher concurrency target packs more requests onto each replica, which raises latency during each burst.',
    'Incorrect. The ceiling is not the problem. Replicas are removed too early, before the next burst arrives.',
    'Correct. A longer scale down delay keeps replicas online between bursts and prevents premature scale-downs.',
  ]}
/>

<MultipleChoice
  id="q3"
  question="An LLM service receives requests at random times and must keep per-user latency low while the GPU stays busy. Which batching approach fits best?"
  options={['Continuous batching', 'Dynamic batching', 'Static batching']}
  correct={0}
  optionFeedback={[
    'Correct. Continuous batching swaps requests in at the token level as slots free up, so no request waits for a batch to form.',
    'Incorrect. Dynamic batching caps the wait with a cutoff, but early requests still wait for that cutoff.',
    'Incorrect. Static batching waits for a full batch, which imposes long waits on early requests.',
  ]}
/>

<MultipleChoice
  id="q4"
  question="Every new replica of a TensorRT-LLM deployment spends minutes on a compilation step before it serves traffic. Which change shortens this stage of the cold start?"
  options={[
    'Bake the model weights into the container image.',
    'Cache the built engine and load it on identically configured instances.',
    'Quantize the model weights to shrink the download.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Baking in weights affects model loading, not engine compilation. Large weights are better loaded separately.',
    'Correct. A cached engine skips compilation, as long as the GPU type, CUDA version, and dependencies match the build environment.',
    'Incorrect. Quantization speeds up weight loading, but the engine still compiles on startup.',
  ]}
/>

<MultipleChoice
  id="q5"
  question="Most requests to a coding assistant begin with the same long system prompt. Which component sends each request to a replica that has already processed that shared prompt?"
  options={['Cache-aware router', 'Global load balancer', 'Priority queue']}
  correct={0}
  optionFeedback={[
    'Correct. A cache-aware router works at the request level and picks a replica that already holds the matching prefix.',
    'Incorrect. A load balancer evens out load across acceptable destinations. It does not pick the ideal replica for one request.',
    'Incorrect. A priority queue orders waiting requests. It does not choose which replica serves them.',
  ]}
/>

<MultipleChoice
  id="q6"
  question="A latency-sensitive chatbot gets light, unscheduled traffic. The team runs it on dedicated GPUs and relies on scale to zero to keep costs low. What does the chapter recommend?"
  options={[
    'Add a priority queue so that paid users skip the cold start.',
    'Keep scale to zero and accept a cold start on random first requests.',
    'Use pay-per-token APIs until the application reaches greater scale.',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. A priority queue reorders waiting requests, but every request still waits for the first replica to start.',
    'Incorrect. Random users would pay the full cold start, which a latency-sensitive application cannot afford.',
    'Correct. Relying on scale to zero in this case signals that the application is not yet ready for dedicated infrastructure.',
  ]}
/>

<MultipleChoice
  id="q7"
  question="Large-scale inference deployments blend reserved, on-demand, and spot GPUs. Which division of roles does the chapter describe?"
  options={[
    'On-demand GPUs carry the baseline, and reserved GPUs absorb traffic peaks.',
    'Reserved GPUs carry the baseline, and on-demand and spot GPUs absorb peaks.',
    'Spot GPUs carry the baseline, and reserved and on-demand GPUs absorb peaks.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. On-demand GPUs carry a relatively high hourly cost, and reserved blocks are committed for months, which fits steady load rather than peaks.',
    'Correct. Discounted reserved capacity covers the constant baseline, and flexible on-demand and spot capacity handles peaks.',
    'Incorrect. Spot GPUs can be pre-empted on short notice, which makes them a poor foundation for the constant baseline.',
  ]}
/>

<MultipleChoice
  id="q8"
  question="A regulation requires that German user data be processed only on servers in Germany and that US user data be processed only in the United States. Users in both countries need low latency. Which design meets these requirements?"
  options={[
    'A single US cluster that encrypts German user data at rest',
    'Active-passive failover from a US region to a German region',
    'One cluster in each country, with each user served in their own country',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Encryption protects data, but processing German data in the United States violates the residency rule.',
    'Incorrect. During normal operation the active US region would process German data, which violates the residency rule.',
    'Correct. Running the model in both regions keeps each country’s data at home with minimal added latency.',
  ]}
/>

<MultipleChoice
  id="q9"
  question="A production deployment runs on 100 GPUs, and spare GPU capacity is scarce. The team must release an update without downtime. Which strategy fits?"
  options={[
    'Blue-green deployment with a full second environment',
    'Canary deployment with a gradual traffic shift',
    'Shadow traffic copied to the updated service',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. Blue-green needs another 100 GPUs before traffic can cut over, which scarce capacity cannot supply.',
    'Correct. A canary shifts traffic in stages, and autoscaling scales the old deployment down as its share falls.',
    'Incorrect. Shadow traffic is a testing strategy. It measures the update but never moves users onto it.',
  ]}
/>

<MultipleChoice
  id="q10"
  question="A workload uses 2,000 million input tokens and 400 million output tokens per week. An API charges $1.00 per million input tokens and $8.00 per million output tokens. What is the weekly API cost?"
  options={['$2,000', '$3,200', '$5,200', '$16,400']}
  correct={2}
  optionFeedback={[
    'Incorrect. This figure counts only the input cost and leaves out the output cost.',
    'Incorrect. This figure counts only the output cost and leaves out the input cost.',
    'Correct. Input costs 2,000 × $1.00 = $2,000, output costs 400 × $8.00 = $3,200, and the total is $5,200.',
    'Incorrect. This figure swaps the input and output prices.',
  ]}
/>

<MultipleChoice
  id="q11"
  question="P99 latency for an LLM deployment doubles one afternoon. Total volume and replica count stay flat, and queue depth stays near zero. Which metric most likely explains the spike?"
  options={['CPU utilization', 'Request and response sizes', 'Response codes']}
  correct={1}
  optionFeedback={[
    'Incorrect. Utilization shows how busy the hardware is. It does not explain why the same request count became slower.',
    'Correct. With volume and capacity unchanged, longer input sequences at the same request count are the likely cause.',
    'Incorrect. Response codes reveal errors. They do not explain slower successful requests.',
  ]}
/>

<MultipleChoice
  id="q12"
  question="Two internal services exchange structured messages that follow a fixed schema, and both directions stream continuously. Which protocol fits?"
  options={['gRPC', 'HTTP request and response', 'WebSocket']}
  correct={0}
  optionFeedback={[
    'Correct. gRPC provides bidirectional streaming for structured, schema-defined service-to-service communication.',
    'Incorrect. HTTP sends one request and one response and then closes, so it cannot carry a continuous stream.',
    'Incorrect. WebSockets stream in both directions but enforce no schema. They suit unstructured data such as audio.',
  ]}
/>
