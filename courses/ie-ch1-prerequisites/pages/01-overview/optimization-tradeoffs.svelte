<script module>
  export const pageConfig = { title: 'Optimization Means Tradeoffs' };
</script>
<script>
  import { scrollable } from '$shared/scrollable.js';
</script>

<h1>Optimization Means Tradeoffs</h1>

<p>
  <dfn><strong>Optimization</strong></dfn> means identifying the best solution out of a range of options.
  An engineer cannot optimize an inference system until the product defines what "best" means.
</p>

<p>
  Many performance improvements come from trading one property for another.
  The three properties that inference engineers trade most often are latency, throughput, and quality.
</p>

<ul>
  <li>Latency, from Chapter 0, is how long a user waits for a response.</li>
  <li>Throughput, from Chapter 0, is the total work the system completes per unit of time, such as total tokens per second.</li>
  <li><dfn><strong>Quality</strong></dfn> is how well the model output serves the task.</li>
</ul>

<p>
  In practice, optimization means finding the right balance among these properties.
  It rarely means maximizing one of them.
</p>

<h2>Specializing a system for its workload</h2>

<p>
  The book compares an inference system with a professional football player.
  The player is big, fast, and strong, but not as big as a sumo wrestler, as fast as a sprinter, or as strong as a powerlifter.
  The player's balance of traits fits one position over a full season.
</p>

<p>
  An inference system is balanced the same way.
  It is tuned for one model, one product, and one traffic pattern.
  The table shows how four workloads from this chapter place different weight on the three properties.
</p>

<div class="ie-table-wrap" role="region" aria-label="The property each workload protects first, and the property it gives ground on" use:scrollable>
  <table class="ie-table">
    <caption>The property each workload protects first, and the property it gives ground on</caption>
    <thead>
      <tr>
        <th scope="col">Workload</th>
        <th scope="col">Protects first</th>
        <th scope="col">Gives ground on</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Real-time voice translation</th>
        <td>Latency, because a conversation stalls on every delay</td>
        <td>Throughput, because each GPU serves fewer callers</td>
      </tr>
      <tr>
        <th scope="row">Safety scanning of uploaded content</th>
        <td>Throughput, because the volume is large and no user waits</td>
        <td>Latency of each individual check</td>
      </tr>
      <tr>
        <th scope="row">Virtual try-on for clothing</th>
        <td>Quality, because a poor image loses the sale</td>
        <td>Some latency, within what a shopper tolerates</td>
      </tr>
      <tr>
        <th scope="row">Tab completion in a code editor</th>
        <td>Latency, because a completion must keep pace with typing</td>
        <td>Model size and some quality, because a smaller model can return short completions at typing speed</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  Each constraint a team defines narrows the range of options.
  A narrower range lets the team reach a better result for its own workload.
</p>
