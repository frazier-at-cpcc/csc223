<script module>
  export const pageConfig = { title: 'The Use Case Comes First' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>The Use Case Comes First</h1>

<p>Every inference engineering decision follows from the use case.</p>

<p>
  Consider a sports coach recruiting at a school.
  A basketball coach looks for the tallest students in the class.
  A gymnastics coach looks among the shortest.
  The right recruit depends entirely on the sport.
</p>

<p>In the same way, how a product uses inference determines how the team builds the inference system.</p>

<h2>Two cases that require generality</h2>

<p>Two kinds of builders must design for the widest possible range of uses.</p>

<ul>
  <li>
    <dfn><strong>Foundation model providers</strong></dfn> train their own <Term id="foundation-model">foundation model</Term> and sell access through a public <Term id="shared-inference">shared inference</Term> API.
    They must support many usage patterns.
  </li>
  <li>
    <dfn><strong>Inference platform builders</strong></dfn> create a platform, for internal teams or as a product, that must support any model and any use case.
  </li>
</ul>

<h2>Vertical applications</h2>

<p>
  Most AI-native applications are <dfn><strong>vertical applications</strong></dfn>, such as code editors or customer service agents.
  These products use AI to create a new user experience for one domain.
</p>

<p>
  When building inference for a vertical application, add as many constraints as possible.
  A specific use case gives the inference system a specific target.
  The most useful early constraint is whether a user waits on each response, which the next lesson turns into the online and offline distinction.
</p>
