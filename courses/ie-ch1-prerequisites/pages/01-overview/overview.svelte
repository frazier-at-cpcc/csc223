<script module>
  export const pageConfig = { title: 'Chapter 1 Overview' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import StackMap from '$shared/StackMap.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Chapter 1: Prerequisites</h1>

<p>
  <Term id="inference-engineering">Inference engineering</Term> adds speed and scale to AI products by optimizing the production serving of generative models.
  Every optimization needs a target.
  This chapter defines that target before the rest of the book starts tuning models, hardware, and software.
</p>

<p>Content current as of October 2026.</p>

<h2>Where this chapter sits in the stack</h2>

<StackMap highlight={1} />

<p>
  Chapter 1 sits at the top of the stack.
  The requirements and metrics it defines are the targets that every lower layer is tuned to meet.
</p>

<h2>Learning objectives</h2>

<p>After completing this chapter, you will be able to:</p>

<ol class="ie-objectives">
  <li>Identify the five product requirements that an inference engineer defines before optimizing an inference system.</li>
  <li>Evaluate whether scale, specialization, or orchestration justifies moving a product from <Term id="shared-inference">shared inference</Term> to a <Term id="dedicated-deployment">dedicated deployment</Term>.</li>
  <li>Classify a workload as online or offline by whether a user waits on each response.</li>
  <li>Differentiate the inference priorities of consumer applications from those of business-to-business applications.</li>
  <li>Determine which infrastructure options a compliance requirement rules out.</li>
  <li>Explain why model selection and product-specific <Term id="evals">evals</Term> come before performance optimization.</li>
  <li>Differentiate <Term id="fine-tuning">fine-tuning</Term>, <Term id="synthetic-data-fine-tuning">fine-tuning on teacher-generated data</Term>, and <Term id="knowledge-distillation">knowledge distillation</Term> by training signal and by what each changes in the model.</li>
  <li>Calculate <Term id="itl">inter-token latency</Term>, <Term id="perceived-tps">perceived TPS</Term>, <Term id="total-tps">total TPS</Term>, <Term id="ttft">TTFT</Term>, and total response time for a streamed response.</li>
  <li>Diagnose where to direct optimization work from <Term id="latency-percentile">latency percentiles</Term> and from inference-time and <Term id="end-to-end-latency">end-to-end</Term> measurements.</li>
</ol>

<h2>How this chapter fits the book</h2>

<p>
  Chapter 0 introduced <Term id="inference">inference</Term>, the <Term id="inference-stack">inference stack</Term>, and the core vocabulary of tokens, prefill, decode, latency, and throughput.
  Chapter 1 sets the prerequisites for inference work: the product requirements, the model choice, and the metrics that every later decision is measured against.
</p>

<p>
  Chapters 2 through 5 build on this foundation with models, hardware, software, and optimization techniques.
  Chapter 6 extends the latency and throughput metrics to modalities beyond text.
  Chapter 7 covers running inference in production, including the cost comparison that this chapter introduces.
</p>

<h2>Chapter structure</h2>

<ul>
  <li><strong>Chapter Overview</strong> opens with a retrieval check on Chapter 0 and then names the five product requirements.</li>
  <li><strong>Scale and Specialization</strong> compares shared inference with dedicated deployments and includes a cost simulator.</li>
  <li><strong>About Your App</strong> shows how the use case, the workload type, the market, and compliance set inference priorities.</li>
  <li><strong>Model Selection</strong> covers choosing, evaluating, fine-tuning, and distilling models.</li>
  <li><strong>Measuring Latency and Throughput</strong> defines and calculates the core performance metrics and includes a streaming simulator.</li>
  <li><strong>Chapter Synthesis</strong> turns the requirements into a measurable requirements sheet.</li>
  <li><strong>Chapter Glossary</strong> lists every term that this chapter teaches.</li>
  <li><strong>Chapter Quiz</strong> is a graded quiz of 14 items. A score of 70 percent passes.</li>
</ul>

<Callout type="info">
  <p>
    Each lesson ends with an ungraded knowledge check, and the calculation pages include practice items.
    Only the chapter quiz counts toward your score.
    Select any underlined term to read its definition.
  </p>
</Callout>
