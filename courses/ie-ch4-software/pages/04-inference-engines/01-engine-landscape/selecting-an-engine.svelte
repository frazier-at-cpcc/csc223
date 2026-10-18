<script module>
  export const pageConfig = { title: 'Selecting an Engine' };
</script>

<script>
  import { Callout } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
</script>

<h1>Selecting an Engine</h1>

<p>
  The comparison table shows how the three engines differ. A selection turns those
  differences into one choice for one deployment.
</p>

<h2>Four questions for choosing an engine</h2>

<p>Work through four questions in order. Each one can rule an engine out.</p>

<ol>
  <li>Hardware: which accelerators will the deployment run on?</li>
  <li>Model support: does each candidate engine support this model's architecture today?</li>
  <li>Performance need: does the workload need peak performance, or does good performance meet its targets?</li>
  <li>Engineering effort: how much time and expertise can the team spend on setup and tuning?</li>
</ol>

<Signal kind="worked" title="Selecting an engine for a high-volume API">
  <p>
    A company serves one open dense LLM through a public API. Traffic is heavy and
    steady, and cost per token is the company's main metric. The fleet is NVIDIA
    B200 GPUs. The model's architecture is a year old and well supported. The
    inference team includes engineers who have tuned engines before, and the
    company plans to add NVIDIA Dynamo next year.
  </p>
  <ol>
    <li>
      Hardware. The fleet is NVIDIA Blackwell, which all three engines support.
      Nothing is ruled out yet.
    </li>
    <li>
      Model support. The architecture is mature, so all three engines support it.
      Day-zero breadth, the main advantage of vLLM and SGLang, does not matter here.
    </li>
    <li>
      Performance need. At heavy, steady volume, a few percent of throughput
      becomes a large cost saving. Peak performance matters, which favors
      TensorRT-LLM and its NVIDIA-written kernels for the newest architectures.
    </li>
    <li>
      Engineering effort. The team can absorb TensorRT-LLM's steeper learning
      curve, and the planned Dynamo rollout favors the engine that Dynamo
      integrates most deeply.
    </li>
  </ol>
  <p>
    Decision: TensorRT-LLM. vLLM and SGLang are both general engines, and their
    main strength, breadth of models and hardware, buys nothing for one mature
    model on one vendor's GPUs. Because the performance gap varies by model, the
    team benchmarks TensorRT-LLM against one general engine on production-shaped
    traffic before committing, using the method in Section 06.
  </p>
</Signal>

<Callout type="info">
  <p>
    The author's company, Baseten, uses all three engines and relies on
    TensorRT-LLM most often. The book recommends that inference engineers learn
    all three and choose one for each deployment based on its needs.
  </p>
</Callout>
