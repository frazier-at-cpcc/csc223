<script module>
  export const pageConfig = { title: 'Medusa' };
</script>

<script>
  import MedusaFlow from '../../../components/MedusaFlow.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Medusa</h1>

<p>
  <strong>Medusa</strong> was one of the first alternatives to draft-target speculation. It removes the separate
  draft model. Instead, fine-tuning adds extra decoder heads to the <Term id="target-model">target model</Term> so that it proposes
  multiple draft tokens per <Term id="forward-pass">forward pass</Term>.
</p>
<p>
  An ordinary LLM has a single decoder head, which predicts the next token. Medusa grafts two to four additional
  heads onto the model. Each head predicts the token one, two, or more positions ahead, and all of them read the
  same final <Term id="hidden-state">hidden state</Term> in the same forward pass. The model verifies these draft tokens on the next
  forward pass.
</p>

<MedusaFlow />

<h2>Threshold acceptance</h2>
<p>
  Figure 5.4 shows the verification rule that the Medusa authors proposed. The base model accepts a draft token
  when the probability it assigns that token exceeds a set threshold. This test is looser than the
  distribution-preserving verification of draft-target speculation. It accepts more drafts, but it can change the
  output slightly. Medusa can also use the standard verification rule when exact outputs matter.
</p>

<h2>Medusa limitations</h2>
<p>
  Medusa remains limited in both draft token count and acceptance rate. As of October 2026, few production systems
  use it. Its main legacy is that it inspired more popular techniques such as EAGLE.
</p>
