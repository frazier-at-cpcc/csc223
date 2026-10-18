<script>
  import Figure from './Figure.svelte';

  const formats = [
    { name: 'FP16', sign: 1, exp: 5, man: 10, val: 0 },
    { name: 'FP8 (E4M3)', sign: 1, exp: 4, man: 3, val: 0 },
    { name: 'INT8', sign: 1, exp: 0, man: 0, val: 7 },
    { name: 'FP4 (E2M1)', sign: 1, exp: 2, man: 1, val: 0 },
    { name: 'INT4', sign: 1, exp: 0, man: 0, val: 3 },
  ];

  function cells(f) {
    return [
      ...Array(f.sign).fill(['is-sign', 'S']),
      ...Array(f.exp).fill(['is-exp', 'E']),
      ...Array(f.man).fill(['is-man', 'M']),
      ...Array(f.val).fill(['is-val', 'V']),
    ];
  }

  function label(f) {
    const parts = ['1 sign bit'];
    if (f.exp) parts.push(`${f.exp} exponent bits`, `${f.man} mantissa bits`);
    if (f.val) parts.push(`${f.val} value bits`);
    return `${f.name}: ${parts.join(', ')}`;
  }
</script>

<Figure
  number="5.1"
  caption="Floating-point formats carry exponent and mantissa bits beside the sign bit. Integer formats carry only sign and value bits."
  description="Five bit layouts. FP16 has 1 sign bit, 5 exponent bits, and 10 mantissa bits. FP8 in the E4M3 layout has 1 sign bit, 4 exponent bits, and 3 mantissa bits. INT8 has 1 sign bit and 7 value bits. FP4 in the E2M1 layout has 1 sign bit, 2 exponent bits, and 1 mantissa bit. INT4 has 1 sign bit and 3 value bits."
>
  <ul class="ie-legend" aria-label="Legend">
    <li><span class="ie-bit is-sign" aria-hidden="true">S</span> Sign</li>
    <li><span class="ie-bit is-exp" aria-hidden="true">E</span> Exponent</li>
    <li><span class="ie-bit is-man" aria-hidden="true">M</span> Mantissa</li>
    <li><span class="ie-bit is-val" aria-hidden="true">V</span> Integer value</li>
  </ul>
  <table class="ie-table">
    <caption class="ie-sr-only">Bit layout of five number formats</caption>
    <thead>
      <tr><th scope="col">Format</th><th scope="col">Bits</th></tr>
    </thead>
    <tbody>
      {#each formats as f (f.name)}
        <tr>
          <th scope="row">{f.name}</th>
          <td>
            <span class="ie-sr-only">{label(f)}</span>
            <span class="ie-bits" aria-hidden="true">
              {#each cells(f) as [cls, ch], i (i)}
                <span class="ie-bit {cls}">{ch}</span>
              {/each}
            </span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</Figure>
