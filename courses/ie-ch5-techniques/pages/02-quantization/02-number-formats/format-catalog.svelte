<script module>
  export const pageConfig = { title: 'Common Number Formats' };
</script>

<h1>Common Number Formats</h1>

<p>
  Quantization brings its own vocabulary. The most important terms are the names of the common number formats and
  the NVIDIA GPU architecture that first supported each one.
</p>

<div class="ie-table-wrap">
  <table class="ie-table">
    <caption>Number formats and the first architecture to support them</caption>
    <thead>
      <tr><th scope="col">Name</th><th scope="col">Abbreviation</th><th scope="col">First architecture</th></tr>
    </thead>
    <tbody>
      <tr><td>64-bit Floating Point</td><td>FP64</td><td>Fermi (2010)</td></tr>
      <tr><td>32-bit Floating Point</td><td>FP32</td><td>Kepler (2012)</td></tr>
      <tr><td>16-bit Floating Point</td><td>FP16</td><td>Pascal (2016)</td></tr>
      <tr><td>Brain Floating Point 16</td><td>BF16</td><td>Ampere (2020)</td></tr>
      <tr><td>8-bit Floating Point</td><td>FP8</td><td>Hopper (2022)</td></tr>
      <tr><td>Mixed-Precision FP8</td><td>MXFP8</td><td>Blackwell (2024)</td></tr>
      <tr><td>8-bit Integer</td><td>INT8</td><td>Pascal (2016)</td></tr>
      <tr><td>6-bit Floating Point</td><td>FP6</td><td>Blackwell (2024, experimental)</td></tr>
      <tr><td>4-bit Floating Point</td><td>FP4</td><td>Blackwell (2024)</td></tr>
      <tr><td>Mixed-Precision FP4</td><td>MXFP4</td><td>Blackwell (2024)</td></tr>
      <tr><td>NVIDIA FP4</td><td>NVFP4</td><td>Blackwell (2024, proprietary)</td></tr>
      <tr><td>4-bit Integer</td><td>INT4</td><td>Turing (2018)</td></tr>
    </tbody>
  </table>
</div>

<h2>Which formats matter for inference</h2>
<ul>
  <li>FP64, or double precision, serves high-precision scientific computing. AI training and inference do not use it.</li>
  <li>FP32 appears in some training but almost never in inference.</li>
  <li>FP6 remains experimental at the time of the book's publication, although AMD GPUs are adopting it rapidly.</li>
</ul>
<p>That leaves 16-bit, 8-bit, and 4-bit precisions as the primary formats for inference.</p>
