<script module>
  export const pageConfig = { title: 'Chapter 1 Overview' };
</script>

<script>
  import { Callout } from 'tessera-learn';
</script>

<h1>Chapter 1: Prerequisites</h1>

<p>
  <strong>Inference engineering</strong> adds speed and scale to AI products by optimizing the production serving of generative models.
  Every optimization needs a target.
  This chapter defines that target before the rest of the book starts tuning models, hardware, and software.
</p>

<h2>Learning objectives</h2>

<p>After completing this chapter, you will be able to:</p>

<ol class="ie-objectives">
  <li>Identify the five product requirements that an inference engineer defines before optimizing an inference system.</li>
  <li>Compare shared inference with dedicated deployments and determine when scale, specialization, or orchestration justifies a switch.</li>
  <li>Classify a workload as online or offline and select the matching optimization target.</li>
  <li>Contrast the inference priorities of consumer and business-to-business applications, including compliance constraints.</li>
  <li>Explain why model selection and product-specific evals come before performance optimization.</li>
  <li>Differentiate fine-tuning from distillation by what each changes and the training signal each uses.</li>
  <li>Calculate and interpret TTFT, perceived TPS, total TPS, and inter-token latency for a streamed response.</li>
  <li>Interpret latency percentiles and end-to-end measurements to decide where to direct optimization work.</li>
</ol>

<h2>How this chapter fits the book</h2>

<p>
  Chapter 0 introduced inference and the work of an inference engineer.
  Chapter 1 sets the prerequisites for that work: the product requirements, the model choice, and the metrics that every later decision is measured against.
</p>
<p>
  Chapters 2 through 5 build on this foundation with models, hardware, software, and optimization techniques.
  Chapter 6 extends the latency and throughput metrics to modalities beyond text.
  Chapter 7 covers running inference in production.
</p>

<h2>Chapter structure</h2>

<ul>
  <li><strong>Scale and Specialization</strong> compares shared inference APIs with dedicated deployments.</li>
  <li><strong>About Your App</strong> shows how the use case sets inference priorities.</li>
  <li><strong>Model Selection</strong> covers choosing, evaluating, fine-tuning, and distilling models.</li>
  <li><strong>Measuring Latency and Throughput</strong> defines the core performance metrics.</li>
  <li><strong>Chapter Quiz</strong> is a graded quiz of 12 items. A score of 70 percent passes.</li>
</ul>

<Callout type="info">
  <p>Each lesson ends with an ungraded knowledge check. Only the chapter quiz counts toward your score.</p>
</Callout>
