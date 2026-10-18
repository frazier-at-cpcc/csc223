<script module>
  export const pageConfig = { title: 'Knowledge Check: Local Inference Tradeoffs' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Local Inference Tradeoffs</h1>
<p>These practice items are ungraded. Each one gives feedback that explains the answer.</p>

<p class="ie-obj">Objective 9: Recommend a deployment target</p>
<Sorting
  id="kc_local_sort"
  question="Sort each statement about local inference as an advantage or a weakness compared with datacenter inference."
  items={[
    'The app keeps working without an internet connection',
    'User data never leaves the device',
    'The developer pays nothing for inference compute',
    'Sustained speed drops as the device heats up',
    'Many hardware and software combinations must be supported',
    'Long sessions drain the battery',
  ]}
  targets={['Advantage', 'Weakness']}
  correct={[0, 0, 0, 1, 1, 1]}
  correctFeedback="Correct. Independence, privacy, and cost favor local inference. Thermal limits, a fragmented support matrix, and battery drain count against it, along with weaker hardware."
  incorrectFeedback="Ask who benefits. Offline operation, data that stays on the device, and zero compute cost help the developer and the user. Heat, fragmented hardware, and battery drain limit what the device can run."
/>

<p class="ie-obj">Objective 9: Recommend a deployment target</p>
<MultipleChoice
  id="kc_privacy"
  question="A health app must analyze user notes without sending them to any server. Which advantage of local inference addresses this requirement?"
  options={['Cost', 'Improved privacy', 'Zero network latency']}
  correct={1}
  optionFeedback={[
    'Incorrect. Local inference does lower the developer\'s compute cost, but cost does not keep data on the device.',
    'Correct. With local inference, the user\'s data never leaves the device.',
    'Incorrect. Removing network latency speeds up responses, but the requirement concerns where the data goes.',
  ]}
/>

<p class="ie-obj">Objective 9: Recommend a deployment target</p>
<MultipleChoice
  id="kc_median_device"
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
