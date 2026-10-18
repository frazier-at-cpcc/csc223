<script module>
  export const pageConfig = { title: 'Recall from Earlier Chapters' };
</script>

<script>
  import Term from '$shared/Term.svelte';
  import { Matching, MultipleChoice, Sorting } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Recall from Earlier Chapters</h1>

<Signal kind="recall" title="Concepts this chapter builds on">
  <p>
    Production work reuses ideas from every earlier chapter. Chapter 0 introduced replicas, <Term id="continuous-batching">continuous batching</Term>, and the
    split between a <Term id="control-plane">control plane</Term> and <Term id="workload-plane">workload planes</Term>. Chapter 1 defined <Term id="latency-percentile">latency percentiles</Term>, <Term id="end-to-end-latency">end-to-end latency</Term>, and
    service targets. Chapter 2 showed that prefill is <Term id="compute-bound">compute-bound</Term> and decode is <Term id="memory-bound">memory-bound</Term>. Chapter 5 taught
    <Term id="cache-aware-routing">cache-aware routing</Term>.
  </p>
  <p>
    Answer the four questions below from memory before you continue. This chapter extends each idea instead of
    teaching it again. One extension starts here: Chapter 1 described a cold start as scaling a replica up from zero.
    This chapter uses the broader sense, the time to bring any new replica from nothing to its first response.
  </p>
</Signal>

<p class="ie-objective">From Chapters 0, 1, and 5</p>
<Matching
  id="rc_terms"
  question="Match each term from an earlier chapter to its definition."
  pairs={[
    { left: 'Replica', right: 'One running copy of a model deployment' },
    { left: 'Continuous batching', right: 'Swapping requests into a running batch at every decode step' },
    { left: 'Latency percentile', right: 'The latency that a stated share of requests stays under' },
    { left: 'Cache-aware routing', right: 'Sending a request to the replica that already holds its prefix' },
  ]}
  correctFeedback="Correct. Each of these terms returns in this chapter: replicas are what the autoscaler adds and removes, continuous batching sets how many requests a replica holds, percentiles state latency targets, and cache-aware routing is one kind of request router."
  incorrectFeedback="Review the pairs. A replica is one running copy of a deployment. Continuous batching swaps requests in at every decode step. A percentile is the latency that a stated share of requests stays under. Cache-aware routing sends a request to the replica that already holds its prefix."
/>

<p class="ie-objective">From Chapter 1</p>
<NumericQuestion
  id="rc_outside_gpu"
  question="A request has an end-to-end latency of 1,000 milliseconds. The model server spends 250 milliseconds on inference. What percentage of the user's wait happens outside the GPU?"
  answer={75}
  tolerance={0.5}
  unit="percent"
  correctFeedback="The time outside the GPU is 1,000 − 250 = 750 milliseconds, and 750 ÷ 1,000 = 75 percent. Network and queue time dominate this request, which is the kind of problem this chapter addresses."
  incorrectFeedback="Subtract inference time from end-to-end latency: 1,000 − 250 = 750 milliseconds outside the GPU. Divide by the end-to-end latency: 750 ÷ 1,000 = 0.75, or 75 percent."
/>

<p class="ie-objective">From Chapter 2</p>
<MultipleChoice
  id="rc_prefill"
  question="A single request arrives with 200,000 uncached input tokens. Which phase does this request mostly load, and which resource limits that phase?"
  options={[
    'Decode, which is limited by compute',
    'Decode, which is limited by memory bandwidth',
    'Prefill, which is limited by compute',
  ]}
  correct={2}
  optionFeedback={[
    'Incorrect. Decode emits one token per forward pass and is limited by memory bandwidth. The input tokens are processed in prefill.',
    'Incorrect. Decode is memory-bound, but it generates output tokens. The 200,000 input tokens are processed in prefill.',
    'Correct. Prefill processes every input token in parallel with large matrix multiplications, so it is compute-bound. One long uncached prompt can saturate a GPU, which matters when an autoscaler counts requests.',
  ]}
/>

<p class="ie-objective">From Chapter 1</p>
<Sorting
  id="rc_sla_slo"
  question="Sort each statement as a service level agreement (SLA) or a service level objective (SLO)."
  items={[
    'A contract promises customers 99.9 percent monthly uptime, with service credits if it is missed.',
    'The team aims to keep P95 time to first token under 400 milliseconds on its own dashboard.',
    'An enterprise contract refunds fees when P99 latency exceeds 2 seconds.',
    'The on-call engineer is paged when P99 end-to-end latency passes 900 milliseconds.',
  ]}
  targets={['SLA: a contractual promise', 'SLO: an internal target']}
  correct={[0, 1, 0, 1]}
  correctFeedback="Correct. An SLA is a contractual promise to a customer, usually with penalties. An SLO is an internal target, usually stricter, so the contract is met with margin. This chapter uses SLO for internal latency targets."
  incorrectFeedback="Look for a contract. The uptime promise with credits and the refund clause are SLAs. The dashboard target and the paging threshold are internal SLOs, which a team sets tighter than its SLAs."
/>
