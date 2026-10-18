<script module>
  export const pageConfig = { title: 'Following One Request' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
  import RequestTimeline from '$shared/sims/RequestTimeline.svelte';
</script>

<h1>Following One Request</h1>

<p>
  The simulation below joins every concept in this section. It follows one request from prompt to final token, one
  forward pass at a time. It shows the prefill pass, each decode pass, the KV cache growing by one entry per pass, and the
  time to first token and inter-token latency that a user experiences.
</p>

<p>
  The third scenario previews caching, which Section 04 teaches. When earlier requests have already processed the opening
  tokens of a prompt, prefill reuses their keys and values and computes only the remaining tokens.
</p>

<Signal kind="try" title="Trace a request pass by pass">
  <ol>
    <li>
      Select &ldquo;Short chat reply&rdquo;, then select &ldquo;Step&rdquo; once. Record the forward passes, the KV
      cache entries, and the TTFT. The prefill pass alone should produce the first output token.
    </li>
    <li>
      Keep selecting &ldquo;Step&rdquo; until the request completes. Record the final KV cache entries and check them
      against the rule prompt tokens + output tokens − 1.
    </li>
    <li>
      Select &ldquo;Prefix cache hit&rdquo; and step once. Compare the TTFT with the full prefill time of 560 ms shown on
      the prefill slider.
    </li>
  </ol>
</Signal>

<RequestTimeline title="One LLM Request, Pass by Pass" headingLevel={2} />

<h2>Practice: Tracing a Request</h2>

<p>Answer each item by running the named scenario in the simulation. Practice items support Objective 1.</p>

<NumericQuestion
  id="sim_rt_long"
  question="Load the Long prompt, short answer scenario and step to the end of the request. How many milliseconds elapse from the start of the request until the final output token arrives?"
  answer={570}
  unit="ms"
  correctFeedback="Correct. The first token arrives at 480 ms, and the three remaining tokens each add 30 ms."
  incorrectFeedback="The scenario sets prefill to 480 ms and inter-token latency to 30 ms. Prefill produces token 1 at 480 ms. Three decode passes produce tokens 2 to 4, so the last token arrives at 480 + 3 × 30 = 570 ms."
/>

<NumericQuestion
  id="sim_rt_cache"
  question="Load the Prefix cache hit scenario and select Step once. What TTFT, in milliseconds, does the simulator report?"
  answer={120}
  unit="ms"
  correctFeedback="Correct. Prefill computes only the 6 uncached prompt tokens out of 28, so TTFT falls from 560 ms to 120 ms."
  incorrectFeedback="22 of the 28 prompt tokens are already in the prefix cache, so prefill computes only 6. TTFT = 560 ms × 6 / 28 = 120 ms. Chapter 5 covers prefix caching."
/>
