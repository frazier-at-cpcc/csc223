<script module>
  export const pageConfig = { title: 'Per-Token and Dedicated Cost Models' };
</script>

<h1>Per-Token and Dedicated Cost Models</h1>

<p>
  Moving from a public per-token API to dedicated GPUs changes how cost works. Taking control of unit economics and
  escaping per-token pricing is one motivation for inference engineering. The mental transition is difficult.
</p>

<h2>Per-token cost is linear</h2>

<p>
  A public API charges a price per million tokens times the number of tokens used. Cache hits versus cache misses on
  input tokens and volume discounts add a few variables. Cost still remains a linear function of usage.
</p>

<h2>Dedicated cost has many variables</h2>

<p>On dedicated inference, cost depends on how the deployment runs. Three factors matter most.</p>

<ul>
  <li><strong>Batch sizing:</strong> whether the deployment favors latency with small batches or throughput with large batches.</li>
  <li><strong>Traffic patterns:</strong> whether traffic keeps active GPUs saturated or leaves capacity idle.</li>
  <li><strong>Sequence lengths:</strong> how many input and output tokens requests carry, on average and in outlier cases.</li>
</ul>

<p>
  Those variables give you control, but they make per-token estimates unreliable. Input and output tokens are also
  priced differently. The more productive approach converts the per-token price into a total cost for the workload and
  compares that total with the dedicated cost. Avoid reverse-engineering a per-token price from GPU spending.
</p>

<h2>Two estimating equations</h2>

<p>Figure 7.14 estimates the total cost of a workload on a per-token API.</p>

<pre class="ie-code"><code># Equation for estimating total cost from per-token APIs
total_input_tokens = 1000   # In millions
total_output_tokens = 500   # In millions

price_per_million_in = 1.25
price_per_million_out = 10

input_cost = (total_input_tokens * price_per_million_in)
output_cost = (total_output_tokens * price_per_million_out)

total_cost = input_cost + output_cost

# Total cost: $6250.00</code></pre>

<p>Figure 7.15 estimates the total cost of a dedicated deployment.</p>

<pre class="ie-code"><code># Equation for estimating total cost from dedicated deployments
total_gpu_hours = 1600
price_per_gpu_hour = 3.50

total_cost = total_gpu_hours * price_per_gpu_hour

# Total cost: $5600.00</code></pre>

<div class="ie-worked">
  <h2>Worked comparison</h2>
  <ul>
    <li>Per-token input cost: 1,000 million tokens × $1.25 = $1,250.</li>
    <li>Per-token output cost: 500 million tokens × $10 = $5,000.</li>
    <li>Per-token total: $1,250 + $5,000 = $6,250.</li>
    <li>Dedicated total: 1,600 GPU-hours × $3.50 = $5,600.</li>
  </ul>
  <p>
    For this workload, the dedicated deployment costs $650 less in GPU spending. Output tokens drive most of the
    per-token bill, because they cost eight times as much as input tokens here.
  </p>
</div>
