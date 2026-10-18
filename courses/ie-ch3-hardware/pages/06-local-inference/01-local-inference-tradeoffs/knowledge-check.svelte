<script module>
  export const pageConfig = { title: 'Knowledge Check: Local Inference Tradeoffs' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Local Inference Tradeoffs</h1>
<p>These practice questions are ungraded. Each option explains why it is right or wrong.</p>

<MultipleChoice
  id="kc1"
  question="A health app must analyze user notes without sending them to any server. Which advantage of local inference addresses this requirement?"
  options={['Cost', 'Improved privacy', 'Zero network latency']}
  correct={1}
  optionFeedback={[
    'Incorrect. Local inference does lower the developer\'s compute cost, but cost does not keep data on the device.',
    'Correct. With local inference, the user\'s data never leaves the device.',
    'Incorrect. Removing network latency speeds up responses, but the requirement concerns where the data goes.',
  ]}
/>

<MultipleChoice
  id="kc2"
  question="A developer tests a local model on a new flagship phone and plans to ship it to a broad consumer audience. Which risk should the developer weigh first?"
  options={[
    'Most users own older devices with less powerful hardware',
    'Network latency will rise for users on slow connections',
    'Server traffic spikes will slow the model during peak hours',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. A median user is more likely to own an older device, so performance on a flagship phone overstates the typical experience.',
    'Incorrect. Local inference sends no request over the network, so connection speed does not affect it.',
    'Incorrect. Local inference runs on the device, so server traffic has no effect on it.',
  ]}
/>
