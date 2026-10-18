<script>
  import Figure from './Figure.svelte';
</script>

<Figure
  number="5.17"
  caption="Disaggregation assigns prefill workers to generate the first token and decode workers to generate subsequent tokens."
  description="Prefill workers receive the input sequence, build its KV cache, and produce the first token. The KV cache moves over the hardware interconnect to the decode workers. The decode workers generate every remaining token."
>
  <ol class="ie-flow">
    <li class="ie-box is-strong"><strong>Prefill workers</strong> build the KV cache and compute the <strong>first token</strong></li>
    <li class="ie-arrow" aria-hidden="true">↓</li>
    <li class="ie-box">The KV cache transfers over the hardware interconnect</li>
    <li class="ie-arrow" aria-hidden="true">↓</li>
    <li class="ie-box is-strong"><strong>Decode workers</strong> generate the <strong>remaining tokens</strong></li>
  </ol>
</Figure>
