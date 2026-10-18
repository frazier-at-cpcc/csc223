<script module>
  export const pageConfig = { title: 'EAGLE' };
</script>

<script>
  import EagleIO from '../../../components/EagleIO.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>EAGLE</h1>

<p>
  An off-the-shelf model makes a weak <Term id="draft-model">draft model</Term>. A model such as Qwen 0.5B is designed to be a good
  standalone LLM on inexpensive hardware, not to speculate tokens beside a target model on a
  <Term id="b200" />. Such draft models are inefficient to run and have a relatively low acceptance rate.
</p>

<h2>A purpose-built speculator</h2>
<p>
  <strong>EAGLE</strong> is a small draft model trained from scratch for speculation. It generates sequences of up
  to eight draft tokens, twice as many as Medusa, with a very high acceptance rate.
</p>
<p>
  During inference, an LLM accumulates context about upcoming tokens in its <Term id="hidden-state">hidden
  states</Term> between layers. A traditional draft model cannot see this information. EAGLE is trained to take
  hidden states as input and produce draft tokens as output. The original EAGLE read the hidden state of the final layer
  before the output head. EAGLE-3, the version the book describes, reads three hidden states: one from an early layer, one
  from a middle layer, and one from a late layer. EAGLE models often have fewer than one billion parameters, and
  they improve as they receive more training data.
</p>

<EagleIO />

<h2>A unified pipeline</h2>
<p>
  EAGLE attaches to the same module, meaning the same <Term id="pytorch" /> class, as the target model. Each forward
  pass runs both the target model and the EAGLE speculator. This unified pipeline removes the multiple round trips
  to the CPU that draft-target speculation needs to orchestrate two models. With an engine such as TensorRT-LLM,
  EAGLE implementations tend to be straightforward.
</p>

<h2>EAGLE use cases</h2>
<p>
  EAGLE is the default speculation algorithm for general use among engineers who can train EAGLE heads, and
  inference engines support it well. Like every speculation technique, EAGLE requires smaller <Term id="batch-size">batch sizes</Term> to improve
  latency, which lowers <Term id="throughput">throughput</Term> and raises cost.
</p>
