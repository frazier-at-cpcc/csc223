<script>
  import Figure from './Figure.svelte';
</script>

<Figure
  number="5.5"
  caption="EAGLE speculators take hidden states as input and produce draft tokens as output."
  description="Three hidden states from the target model, one each from an early, a middle, and a late layer, feed into the EAGLE speculator. EAGLE outputs a sequence of draft token IDs, shown as 644, 2251, 15009, and more."
>
  <div class="ie-row" style="justify-content: center;">
    <div class="ie-box">
      Hidden states
      <ul style="text-align: left; margin: 0.25rem 0 0; padding-left: 1.2rem;">
        <li>Early layer</li>
        <li>Middle layer</li>
        <li>Late layer</li>
      </ul>
    </div>
    <span class="ie-arrow" aria-hidden="true">→</span>
    <div class="ie-box is-strong"><strong>EAGLE</strong> speculator</div>
    <span class="ie-arrow" aria-hidden="true">→</span>
    <div class="ie-box">Draft token IDs<br /><code>[644, 2251, 15009, …]</code></div>
  </div>
</Figure>
