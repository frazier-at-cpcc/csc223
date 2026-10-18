<script module>
  export const pageConfig = { title: 'Capstone Step 1: Requirements' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Capstone Step 1: Requirements</h1>

<Signal kind="recall" chapter={1}>
  <p>
    Before optimizing, an inference engineer defines five product requirements: model requirements, the application
    interface, the <Term id="latency-budget">latency budget</Term>, <Term id="unit-economics">unit economics</Term>, and usage patterns. Latency targets are stated as percentiles and
    measured end to end, because users experience the whole wait, not only the time on the GPU.
  </p>
</Signal>

<p>
  This capstone follows one product, Beacon, from its requirements to a production launch. Each step recalls one
  chapter and asks you for the decision an inference engineer would make at that point. Each decision feeds the next
  step, and a collapsed panel after each step records the decision that the capstone carries forward.
</p>

<h2>The Beacon Product Brief</h2>
<p>
  Beacon is a customer-support chat assistant for an online retailer in the United States. It answers questions about
  orders, returns, and products, and it streams its answers into a chat window.
</p>
<ul>
  <li>Every request starts with the same 1,000-token <Term id="system-prompt">system prompt</Term>, which holds the retailer's policies, followed by the customer's question and the chat history. Requests average 1,500 input tokens and 300 output tokens.</li>
  <li>The team has fine-tuned an open <Term id="llm">LLM</Term> on two years of resolved support tickets.</li>
  <li>Volume starts at 3 million requests per month and is projected to reach 20 million within a year.</li>
  <li>Traffic follows US business hours. It is quiet overnight and ramps up every morning.</li>
  <li>The draft requirements say the assistant "should feel fast."</li>
</ul>

<p class="ie-objective">Decision 1, drawing on Chapter 1</p>
<MultipleChoice
  id="cap_latency"
  question="The team must replace “should feel fast” with a latency budget that it can test and monitor. Which statement should it adopt?"
  options={[
    'Average inference time on the GPU stays under 200 milliseconds per request.',
    'P95 time to first token stays under 800 milliseconds, measured at the client.',
    'The model generates every answer as fast as the hardware allows.',
  ]}
  correct={1}
  optionFeedback={[
    'Incorrect. An average hides the slow tail, and GPU time leaves out the network and queue time that customers also wait through.',
    'Correct. A percentile captures the tail that customers notice, time to first token matches a streamed chat answer, and measuring at the client makes the target end to end.',
    'Incorrect. This goal has no number, so no test can pass or fail it, and no alert can watch it.',
  ]}
/>

<details class="ie-decision">
  <summary>Decision carried forward</summary>
  <p>
    Beacon's latency budget is a P95 time to first token under 800 milliseconds and at least 30 <Term id="tokens-per-second">tokens per second</Term> per
    user, both measured at the client. The quality requirement is to resolve at least 80 percent of a held-out set of
    support tickets.
  </p>
</details>
