<script module>
  export const pageConfig = { title: 'Chapter 7 Overview' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import StackMap from '$shared/StackMap.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Chapter 7 Overview: Production</h1>

<p>
  Inference engineering makes generative AI models faster, less expensive, and more reliable to operate. That work
  pays off only when it reaches production and keeps pace with the rapid growth and sudden traffic spikes that
  successful AI products attract.
</p>
<p>Content current as of October 2026.</p>

<StackMap highlight={7} />

<h2>How This Chapter Fits the Series</h2>
<p>
  Chapters 2 through 5 focus on a single model <Term id="replica">replica</Term>: the model, the GPU it runs on, the
  <Term id="inference-engine">inference engine</Term>, and the optimization techniques that speed up <Term id="prefill">prefill</Term> and <Term id="decode">decode</Term>. This final chapter
  steps back to the whole system. Even the fastest replica is overwhelmed once enough traffic arrives. That limit is
  an infrastructure problem, not a PyTorch or CUDA problem, and it calls for different technologies.
</p>
<p>The chapter has six content sections, followed by a review section and the graded quiz.</p>
<ul>
  <li><strong>Containerization</strong> packages an inference service so that a known good build runs the same way everywhere.</li>
  <li><strong>Autoscaling</strong> matches the number of replicas to live traffic inside one cluster.</li>
  <li><strong>Multi-cloud capacity management</strong> extends scaling across providers and regions for capacity, reliability, and compliance.</li>
  <li><strong>Testing and deployment</strong> covers end-to-end testing, zero-downtime releases, cost estimation, and observability.</li>
  <li><strong>Client code</strong> addresses the latency that the network and the client add outside the model server.</li>
  <li><strong>Capstone</strong> follows one product from its requirements in Chapter 1 to a production launch, one chapter at a time.</li>
</ul>

<h2>Learning Objectives</h2>
<p>After completing this chapter, you will be able to:</p>
<ol>
  <li>Explain how a base image, pinned dependencies, a lock file, and an image digest together make an inference build reproducible.</li>
  <li>Configure autoscaling parameters for a described traffic pattern, with the <Term id="concurrency-target">concurrency target</Term> set to the replica <Term id="batch-size">batch size</Term>.</li>
  <li>Recommend a technique that shortens a given stage of a <Term id="cold-start">cold start</Term>.</li>
  <li>Differentiate the roles of a <Term id="router">request router</Term>, a <Term id="load-balancer">load balancer</Term>, and a <Term id="queue">request queue</Term> in serving inference requests.</li>
  <li>Judge whether a described workload suits <Term id="scale-to-zero">scale to zero</Term> or independent component scaling.</li>
  <li>Select the capacity, placement, failover, and security measures that meet a multi-cloud deployment's requirements.</li>
  <li>Choose a testing and release strategy that avoids downtime within a GPU budget.</li>
  <li>Calculate the monthly <Term id="total-cost-of-ownership">total cost of ownership</Term> of a per-token API and of a dedicated deployment.</li>
  <li>Diagnose whether an end-to-end latency problem originates in the model server, the queue, the network, or the client.</li>
</ol>
<p>
  The capstone section practices objectives 2, 3, and 8 together with the main skills of Chapters 1 through 5. Every
  knowledge check item names the objective it practices.
</p>

<Callout type="info">
  <p>
    Each lesson ends with an ungraded knowledge check that gives feedback on every answer. The graded chapter quiz has
    13 questions and gives no per-question feedback, so each attempt measures what you can do unaided. A score of 70
    percent or higher passes the chapter. You have three attempts, and your best attempt counts.
  </p>
</Callout>
