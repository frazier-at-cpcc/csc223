<script module>
  export const pageConfig = { title: 'Medusa' };
</script>

<script>
  import MedusaFlow from '../../../components/MedusaFlow.svelte';
</script>

<h1>Medusa</h1>

<p>
  <strong>Medusa</strong> was one of the first alternatives to draft-target speculation. It removes the separate
  draft model. Instead, fine-tuning adds extra decoder heads to the target model so that it generates multiple draft
  tokens per forward pass.
</p>
<p>
  An ordinary LLM has a single decoder head. Medusa grafts two to four additional heads onto the model, and each
  head generates the next draft token in sequence. As in draft-target speculation, the model validates these draft
  tokens on the next forward pass.
</p>

<MedusaFlow />

<h2>Limitations</h2>
<p>
  Medusa remains limited in both draft token count and acceptance rate, and few production systems use it today.
  Its main legacy is that it inspired more popular techniques such as EAGLE.
</p>
