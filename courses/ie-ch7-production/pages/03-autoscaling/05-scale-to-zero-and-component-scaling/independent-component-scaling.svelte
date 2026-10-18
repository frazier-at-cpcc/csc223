<script module>
  export const pageConfig = { title: 'Independent Component Scaling' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import ComponentScaling from '../../../components/ComponentScaling.svelte';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Independent Component Scaling</h1>

<p>
  AI applications increasingly run as <Term id="compound-ai-system">compound AI workloads</Term>. One user request
  passes through several models in several stages, and inference engineers coordinate those stages.
</p>
<p>
  The stages have different hardware needs. In a voice pipeline, a <Term id="vad">voice activity detector</Term> needs
  a far less powerful GPU than the transcription model it chunks audio for. The LLM that processes the transcript may
  need a full <Term id="node">node</Term> with several GPUs. Each stage also needs different scaling parameters.
</p>

<h2>Scaling Each Stage Separately</h2>
<p>
  <strong>Independent component scaling</strong> splits the autoscaling decision by stage. Each stage gets
  right-sized hardware and its own replica count. The pipeline avoids both bottlenecks and over-provisioning.
</p>
<Figure
  number="7.10"
  caption="Independent component scaling gives each model access to appropriate resources and individual scaling."
  description="A dictation pipeline. Audio enters a Whisper transcription stage that runs on five H100 MIG slices, which are fractions of a GPU. The transcript then enters an LLM stage that runs on two full B200 nodes. The LLM produces a finished document. Each stage scales its own hardware independently."
>
  <ComponentScaling />
</Figure>
<p>
  Figure 7.10 places <Term id="whisper" /> on <Term id="mig">MIG</Term> slices, the GPU fractions that Chapter 3 described, while the LLM
  takes whole nodes. When dictation traffic doubles, the transcription stage can add slices without adding a B200 node.
</p>

<h2>One Cluster for the Whole Pipeline</h2>
<p>
  Scaling stages independently does not mean spreading them across clusters. Every model in the pipeline should run in
  the same cluster, because each message between stages pays network latency.
</p>

<Signal kind="worked" title="The cost of crossing clusters">
  <p>
    Assume a message between services takes 10 milliseconds inside one cluster and 50 milliseconds between clusters. A
    request in this pipeline sends 5 messages between services, and in the split design each of the 5 messages crosses
    a cluster boundary. The latency SLO is one second.
  </p>
  <ol>
    <li>Extra delay per crossing message: 50 − 10 = 40 milliseconds.</li>
    <li>Extra delay per request: 5 × 40 = 200 milliseconds.</li>
    <li>Share of the SLO: 200 ÷ 1,000 = 20 percent.</li>
  </ol>
  <p>Splitting the pipeline across clusters would spend a fifth of the <Term id="latency-budget">latency budget</Term> on network hops alone.</p>
</Signal>

<Signal kind="mistake" title="Counting stages instead of crossings">
  <p>
    Only messages that cross a cluster boundary pay the penalty. Four stages placed in four clusters, one after
    another, have three boundaries between them, so a request's three stage-to-stage messages cross clusters. Count
    the crossing messages, not the stages.
  </p>
</Signal>

<p class="ie-objective">Practices objective 5: judge fit for scale to zero and component scaling</p>
<NumericQuestion
  id="pr_hops"
  question="A three-stage pipeline runs each stage in a different cluster, one after another. Messages take 8 milliseconds inside a cluster and 38 milliseconds between clusters. How many extra milliseconds does each request spend on cluster crossings, compared with running all three stages in one cluster?"
  answer={60}
  unit="milliseconds"
  correctFeedback="Correct. Three stages in a row have 2 boundaries, so 2 messages cross clusters. Each crossing adds 38 − 8 = 30 milliseconds, and 2 × 30 = 60 milliseconds."
  incorrectFeedback="Count boundaries, not stages: three stages in a row have 2 boundaries between them. Each crossing message adds 38 − 8 = 30 milliseconds, so the total is 2 × 30 = 60 milliseconds. Multiplying by 3 stages, which gives 90, counts a crossing that does not exist."
/>
