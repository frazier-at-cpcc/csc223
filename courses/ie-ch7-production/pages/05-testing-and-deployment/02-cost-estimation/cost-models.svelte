<script module>
  export const pageConfig = { title: 'Per-Token and Dedicated Cost Models' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
</script>

<h1>Per-Token and Dedicated Cost Models</h1>

<p>
  Moving from a public per-token API to a <Term id="dedicated-deployment">dedicated deployment</Term> changes how cost works. Taking control of
  <Term id="unit-economics">unit economics</Term> and escaping per-token pricing is one motivation for inference engineering, and Chapter
  1 named scale as the first reason to switch. The mental transition is difficult.
</p>

<h2>Per-Token Cost</h2>
<p>
  A public API charges a price per million tokens times the number of tokens used. Input and output tokens carry
  different prices. Cache hits versus cache misses on input tokens and volume discounts add a few variables, but cost
  remains a linear function of usage.
</p>
<p>Figure 7.14 estimates the total cost of a workload on a per-token API. This chapter treats every cost as monthly.</p>
<pre class="ie-code"><code># Equation for estimating total cost from per-token APIs
total_input_tokens = 1000   # In millions, per month
total_output_tokens = 500   # In millions, per month
price_per_million_in = 1.25
price_per_million_out = 10
input_cost = (total_input_tokens * price_per_million_in)
output_cost = (total_output_tokens * price_per_million_out)
total_cost = input_cost + output_cost
# Total cost: $6250.00 per month</code></pre>

<Signal kind="worked" title="Reading Figure 7.14">
  <ol>
    <li>Input cost: 1,000 million tokens × $1.25 = $1,250.</li>
    <li>Output cost: 500 million tokens × $10 = $5,000.</li>
    <li>Monthly API cost: $1,250 + $5,000 = $6,250.</li>
  </ol>
  <p>Output tokens drive most of this bill, because they cost eight times as much as input tokens here.</p>
</Signal>

<h2>Dedicated Cost</h2>
<p>On a dedicated deployment, cost depends on how the deployment runs. Three factors matter most.</p>
<ul>
  <li><strong>Batch sizing:</strong> whether the deployment favors latency with small batches or throughput with large batches.</li>
  <li><strong>Traffic patterns:</strong> whether traffic keeps active GPUs saturated or leaves capacity idle.</li>
  <li><strong>Sequence lengths:</strong> how many input and output tokens requests carry, on average and in outlier cases.</li>
</ul>
<p>Figure 7.15 estimates the GPU cost of a dedicated deployment.</p>
<pre class="ie-code"><code># Equation for estimating total cost from dedicated deployments
total_gpu_hours = 1600      # per month
price_per_gpu_hour = 3.50
total_cost = total_gpu_hours * price_per_gpu_hour
# Total cost: $5600.00 per month</code></pre>
<p>
  The equation is simple, but it hides the hard part: where 1,600 GPU-hours comes from. The next page derives it.
</p>

<Signal kind="mistake" title="Reverse-engineering a per-token price">
  <p>
    Dividing a GPU bill by the tokens served produces a per-token price that changes with every shift in batch size,
    traffic, and sequence length, and it ignores the separate prices of input and output tokens. Convert the per-token
    price into a total cost for the workload instead, and compare that total with the total dedicated cost for the
    same period.
  </p>
</Signal>
