<script module>
  export const pageConfig = {
    title: 'Chapter 0 Quiz',
    quiz: { graded: true, maxAttempts: 3 },
  };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Chapter 0 Quiz</h1>

<p>
  This graded quiz has 11 questions and covers every objective in the chapter. A score of 70 percent passes. You have
  three attempts, and the best attempt counts.
</p>

<MultipleChoice
  id="q1"
  question="A company downloads the weights of an open model and runs them on GPUs to answer customer requests through an API. Which phase of the generative AI model lifecycle does this work belong to?"
  options={['Distillation', 'Fine-tuning', 'Inference', 'Training']}
  correct={2}
  optionFeedback={[
    'Incorrect. Distillation trains a smaller student model to emulate a larger one. It produces new weights instead of serving existing ones.',
    'Incorrect. Fine-tuning adjusts weights with more data, which is a form of training. This company serves the weights unchanged.',
    'Correct. Inference is serving generative AI models in production, which is what this company does.',
    'Incorrect. Training learns model weights from data. The weights here already exist.',
  ]}
/>

<MultipleChoice
  id="q2"
  question="An engineer plans to serve a large language model the way the team once served XGBoost models: copy the weights onto rented GPUs and expose an endpoint. According to the chapter, what does this plan lack for large-scale production use?"
  options={[
    'A larger CPU fleet that runs alongside the GPUs',
    'A retraining step that relearns the weights on production data',
    'A switch from GPUs back to lightweight CPUs',
    'Coordinated runtime, infrastructure, and tooling layers',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. Lightweight CPUs suited classic ML models. More CPUs do not make generative AI inference fast or reliable.',
    'Incorrect. Retraining changes the weights. The gap the chapter describes is in how the weights are served.',
    'Incorrect. Lightweight CPUs and a simple stack worked for classic ML models. Generative AI models need GPUs.',
    'Correct. Weights plus GPUs are not enough. Generative AI inference needs runtime, infrastructure, and tooling working together.',
  ]}
/>

<MultipleChoice
  id="q3"
  question="Traffic to a model doubles, and one model server can no longer keep up even after its kernels are tuned. The team needs more replicas in more regions without creating silos. Which layer of an inference platform owns this problem?"
  options={['Infrastructure', 'Runtime', 'Tooling']}
  correct={0}
  optionFeedback={[
    'Correct. Infrastructure scales across clusters, regions, and clouds without creating silos.',
    'Incorrect. The runtime layer optimizes a single model on a single instance. The team has already exhausted that.',
    'Incorrect. Tooling sets the abstraction engineers work at. It does not add replicas or capacity.',
  ]}
/>

<MultipleChoice
  id="q4"
  question="A model server handles one request at a time. GPU utilization stays low, and total tokens per second falls short of demand. Which model performance technique targets this bottleneck?"
  options={['Batching', 'Caching', 'Quantization', 'Speculation']}
  correct={0}
  optionFeedback={[
    'Correct. Batching interleaves many requests token by token, which fills idle GPU capacity and increases throughput.',
    'Incorrect. Caching skips repeated work on shared prefixes. It does not let the server run requests in parallel.',
    'Incorrect. Quantization lowers precision to gain compute and save memory. The server would still handle one request at a time.',
    'Incorrect. Speculation speeds up decode for each request. The server would still leave capacity idle between requests.',
  ]}
/>

<MultipleChoice
  id="q5"
  question="Every request to a coding assistant begins with the same 3,000-token system prompt. Which model performance technique lets the server skip recomputing attention results for that shared text?"
  options={['Batching', 'Caching', 'Disaggregation', 'Quantization']}
  correct={1}
  optionFeedback={[
    'Incorrect. Batching runs requests in parallel. Each request still recomputes the shared prompt.',
    'Correct. Caching reuses the KV cache, the stored attention results, between requests that share a prefix.',
    'Incorrect. Disaggregation moves prefill and decode onto separate workers. Prefill still recomputes the shared prompt.',
    'Incorrect. Quantization lowers precision. The shared prompt is still processed again for every request.',
  ]}
/>

<MultipleChoice
  id="q6"
  question="A team wants the phase that processes input prompts and the phase that generates output tokens to run on separate workers that scale independently. Which model performance technique does the team need?"
  options={['Caching', 'Disaggregation', 'Parallelism', 'Speculation']}
  correct={1}
  optionFeedback={[
    'Incorrect. Caching reuses attention results between requests. Both phases still share the same workers.',
    'Correct. Disaggregation separates prefill and decode onto independently scaling workers.',
    'Incorrect. Parallelism spreads one model across several GPUs. It does not split the two inference phases apart.',
    'Incorrect. Speculation drafts and verifies tokens during decode. It does not move prefill to separate workers.',
  ]}
/>

<MultipleChoice
  id="q7"
  question="During decode for the prompt 'The quick brown', a drafting step proposes five tokens: 'fox', 'jumps', 'over', 'a', and 'lazy'. Verification accepts 'fox', 'jumps', and 'over' and rejects 'a'. The model then supplies its own token at the rejected position. How many tokens does the output gain from this single forward pass?"
  options={['One', 'Three', 'Four', 'Five']}
  correct={2}
  optionFeedback={[
    'Incorrect. One token per forward pass is the rate of standard decoding without speculation.',
    'Incorrect. Three counts only the accepted drafts. The model also adds its own token at the rejected position.',
    'Correct. The output gains the three accepted drafts plus the model\'s own token. The draft "lazy" follows a rejection, so it is discarded.',
    'Incorrect. Five keeps the draft "lazy". Every draft after the first rejection is discarded.',
  ]}
/>

<MultipleChoice
  id="q8"
  question="After spreading workloads across three regions and two cloud providers to obtain enough GPUs, a team finds that models in one cluster starve for resources while another cluster has unused capacity. Which approach does the chapter identify as the final level of infrastructure scale for this problem?"
  options={[
    'Consolidate the workloads in one region',
    'Install a faster inference engine on the starved cluster',
    'Lower the autoscaling threshold inside each cluster',
    'Treat all clusters as one unified pool of compute',
  ]}
  correct={3}
  optionFeedback={[
    'Incorrect. One region cannot supply enough GPUs. That shortage is why the team spread out in the first place.',
    'Incorrect. A faster engine is a runtime fix for one cluster. The idle capacity elsewhere stays out of reach.',
    'Incorrect. Autoscaling inside each cluster still keeps every cluster in its own silo.',
    'Correct. The final level of scale is a global system that treats all available resources as a single unified pool.',
  ]}
/>

<MultipleChoice
  id="q9"
  question="In a multi-cloud inference system, which component deploys models and allocates resources across clusters in every cloud?"
  options={['Global control plane', 'Inference engine', 'Load balancer', 'Workload plane']}
  correct={0}
  optionFeedback={[
    'Correct. The global control plane is the orchestrator that deploys models and allocates resources across every workload plane.',
    'Incorrect. An inference engine optimizes one model on one instance. It has no view across clouds.',
    'Incorrect. A load balancer spreads requests among replicas. It does not decide where models are deployed.',
    'Incorrect. A workload plane is one cluster that runs inference. The control plane directs many of them.',
  ]}
/>

<MultipleChoice
  id="q10"
  question="A company needs a platform for a mission-critical model. Its engineers must tune runtime and scaling behavior, and they must also ship new models every week. Which developer experience fits these requirements?"
  options={[
    'A black box that accepts weights and returns an API',
    'Basic constructs for compute, network, and disk',
    'Managed workflows that still expose engine and autoscaling settings',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. A black box is productive but hides the runtime and scaling controls these engineers must tune.',
    'Incorrect. Basic constructs give full control but leave every layer for the engineers to build, which slows weekly releases.',
    'Correct. The middle ground gives enough control for mission-critical inference and enough abstraction to work productively.',
  ]}
/>

<MultipleChoice
  id="q11"
  question="Before choosing a model, an engineer must define the use case and set its latency and cost budget. Which chapter of Inference Engineering covers this work?"
  options={['Chapter 1, Prerequisites', 'Chapter 3, Hardware', 'Chapter 5, Techniques', 'Chapter 7, Production']}
  correct={0}
  optionFeedback={[
    'Correct. Chapter 1 covers use case definition, latency and cost budgeting, and model selection and evaluation.',
    'Incorrect. Chapter 3 covers GPU specifications, compute, memory, and accelerators.',
    'Incorrect. Chapter 5 covers optimization techniques such as quantization and speculative decoding.',
    'Incorrect. Chapter 7 covers operating production infrastructure and building applications on it.',
  ]}
/>
