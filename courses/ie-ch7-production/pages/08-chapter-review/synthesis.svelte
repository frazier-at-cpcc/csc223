<script module>
  export const pageConfig = { title: 'Synthesis: Production Levers and Replica Techniques' };
</script>

<script>
  import { scrollable } from '$shared/scrollable.js';
  import Term from '$shared/Term.svelte';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Synthesis: Production Levers and Replica Techniques</h1>

<Signal kind="summary" title="One symptom, two kinds of fix">
  <p>
    Every production symptom has a system-level lever from this chapter and, often, a replica-level technique from
    Chapters 2 through 5 that attacks the same cause from inside the replica. The table pairs them, with the metric
    that confirms the fix worked. Read each row as a diagnosis: start from the symptom, check the metric, and then
    choose the cheaper of the two fixes.
  </p>

  <div class="ie-table-wrap" role="region" aria-label="Production symptoms, the levers that address them, and the metrics that confirm a fix" use:scrollable>
    <table class="ie-table">
      <caption>Production symptoms, the levers that address them, and the metrics that confirm a fix</caption>
      <thead>
        <tr>
          <th scope="col">Symptom</th>
          <th scope="col">Production lever (Chapter 7)</th>
          <th scope="col">Replica-level technique</th>
          <th scope="col">Metric that confirms the fix</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Latency spikes at the start of every traffic rise</th>
          <td>Shorter <Term id="autoscaling-window">autoscaling window</Term>; higher min replicas; weight cache near the GPUs; cached engine</td>
          <td>Quantized weights load faster (Chapter 5); a general engine with a compile cache starts faster (Chapter 4)</td>
          <td>Replicas starting and queue depth fall during the rise</td>
        </tr>
        <tr>
          <th scope="row">Requests queue while the autoscaler shows spare room</th>
          <td><Term id="concurrency-target">Concurrency target</Term> set equal to the replica <Term id="batch-size">batch size</Term></td>
          <td>Batch size chosen by benchmark against the latency target (Chapter 4), within the sequences that memory holds (Chapter 3)</td>
          <td>Queue depth near zero while replica count rises with demand</td>
        </tr>
        <tr>
          <th scope="row">P99 time to first token rises at flat volume</th>
          <td>Observability that compares request size with volume; routing by sequence length</td>
          <td><Term id="prefix-caching">Prefix caching</Term> and <Term id="cache-aware-routing">cache-aware routing</Term> cut compute-bound prefill (Chapters 2 and 5)</td>
          <td>Input length and GPU utilization explain the change; P99 recovers</td>
        </tr>
        <tr>
          <th scope="row">Dedicated bill exceeds the API bill</th>
          <td>Fewer always-on replicas; <Term id="scale-to-zero">scale to zero</Term> where users can wait; blended reserved and spot capacity; wait for the crossover volume</td>
          <td>FP8 <Term id="quantization">quantization</Term> halves weight memory, which can halve GPUs per replica (Chapter 5); right-sized GPUs from the planning factor (Chapter 3)</td>
          <td>Billed GPU-hours fall toward needed GPU-hours</td>
        </tr>
        <tr>
          <th scope="row">Users far from the cluster wait longer than nearby users</th>
          <td>Geo-aware placement of workload planes; <Term id="session-reuse">session reuse</Term> in the client</td>
          <td>None. No replica technique shortens a fiber path.</td>
          <td>End-to-end latency falls while server latency stays flat (Chapter 1)</td>
        </tr>
        <tr>
          <th scope="row">A release or a provider outage threatens availability</th>
          <td><Term id="shadow-traffic">Shadow traffic</Term> and canary rollout; <Term id="active-active">active-active</Term> or <Term id="active-passive">active-passive</Term> failover; pinned images</td>
          <td>Quality <Term id="evals">evals</Term> before shipping a quantized or retrained model (Chapters 1 and 5)</td>
          <td>Error rate and P99 hold steady through the change or the outage</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>
    The Beacon capstone used this table in miniature. Quantization in step 5 cut GPUs per replica, and that cut the
    dedicated floor in step 7. The compile cache chosen in step 4 kept the cold start short enough for the morning ramp
    in step 6. Production levers and replica techniques are not separate toolkits. They are two ends of the same
    decisions.
  </p>
</Signal>

<h2>What Comes Next</h2>
<p>
  This chapter closes the series, and the next step is to apply its full stack to a workload of your own, starting from
  the five requirements of Chapter 1. Each time traffic, models, or hardware change, return to this table, measure the
  symptom, and choose between a production lever and a replica technique again.
</p>
