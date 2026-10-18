<script module>
  export const pageConfig = { title: 'Independent Component Scaling' };
</script>

<script>
  import Figure from '../../../components/Figure.svelte';
  import ComponentScaling from '../../../components/ComponentScaling.svelte';
</script>

<h1>Independent Component Scaling</h1>

<p>
  AI applications increasingly run as compound workloads. One user request passes through several models in several
  stages, and inference engineers coordinate those stages.
</p>

<p>
  The stages have different hardware needs. In a voice pipeline, a voice activity detector needs a far less powerful
  GPU than the transcription model it chunks audio for. The LLM that processes the transcript may need a full node with
  several GPUs. Each stage also needs different scaling parameters.
</p>

<h2>Scale each stage on its own</h2>

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

<h2>Keep the pipeline in one cluster</h2>

<p>Scaling stages independently does not mean spreading them across clusters. Every model in the pipeline should run in the same cluster.</p>

<div class="ie-worked">
  <h2>Worked example</h2>
  <p>Assume a message takes 10 milliseconds inside one cluster and 50 milliseconds between clusters.</p>
  <ul>
    <li>Extra delay per hop between clusters: 50 − 10 = 40 milliseconds.</li>
    <li>Extra delay across a 5-step pipeline: 5 × 40 = 200 milliseconds.</li>
    <li>Share of a one-second latency SLA: 200 ÷ 1,000 = 20 percent.</li>
  </ul>
  <p>Splitting the pipeline across clusters would spend a fifth of the latency budget on network hops alone.</p>
</div>
