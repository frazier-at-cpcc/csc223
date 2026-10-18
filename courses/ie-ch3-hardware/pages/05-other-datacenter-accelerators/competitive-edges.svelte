<script module>
  export const pageConfig = { title: 'Competitive Edges and Shared Challenges' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Competitive Edges and Shared Challenges</h1>

<p>
  Every company competing with NVIDIA for inference workloads bets on a specific edge where its product can win.
</p>

<h2>Three competitive edges</h2>
<dl>
  <dt><strong>Memory bandwidth</strong></dt>
  <dd>
    Cerebras and Groq keep model data in very fast on-chip SRAM to accelerate <Term id="decode">decode</Term>,
    which is <Term id="memory-bound">memory-bound</Term>. They post high <Term id="tokens-per-second">tokens-per-second</Term> scores for LLMs.
  </dd>
  <dt><strong>Power efficiency</strong></dt>
  <dd>Furiosa and Qualcomm design chips that consume less power per unit of work, which lowers operating costs.</dd>
  <dt><strong>Platform integration</strong></dt>
  <dd>Amazon and Google integrate their chips deeply with their cloud platforms and their proprietary closed models.</dd>
</dl>

<h2>Three shared challenges</h2>
<dl>
  <dt><strong>Software</strong></dt>
  <dd>
    Most inference software is written for <Term id="cuda" />, NVIDIA's programming platform. Each other vendor
    must rebuild the inference stack for its own accelerator.
  </dd>
  <dt><strong>Manufacturing</strong></dt>
  <dd>Each vendor must produce some of the most complex objects humans have ever built.</dd>
  <dt><strong>Distribution</strong></dt>
  <dd>After manufacturing, a vendor must get chips installed and online before any capacity reaches the market.</dd>
</dl>

<h2>Weighing an alternative accelerator</h2>
<p>
  Match the edge to your bottleneck before you consider an alternative. A decode-heavy service gains most from a
  memory-bandwidth edge. A service whose cost is dominated by power gains most from efficiency. A team already
  committed to one cloud may gain most from that cloud's own chip. In every case, check that your model and
  inference engine run on the accelerator, because the software challenge is the one most likely to block you.
</p>

<h2>Why competition matters to inference engineers</h2>
<p>
  Competition accelerates innovation. More hardware options in the datacenter benefit every inference engineer.
  As inference workloads grow more valuable, competition will intensify, along with interest in options outside
  the datacenter such as <Term id="local-inference">local inference</Term>.
</p>
