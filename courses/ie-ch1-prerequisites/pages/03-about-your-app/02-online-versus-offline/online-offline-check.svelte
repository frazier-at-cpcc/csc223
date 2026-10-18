<script module>
  export const pageConfig = { title: 'Knowledge Check: Online Versus Offline' };
</script>

<script>
  import { MultipleChoice, Sorting } from 'tessera-learn';
</script>

<h1>Knowledge Check: Online Versus Offline</h1>

<p>Answer these practice questions. They do not count toward your score. Each item names the objective it practices.</p>

<p class="ie-obj">Objective 3: Classify a workload as online or offline.</p>

<Sorting
  id="kc_online_1"
  question="Sort each workload as online or offline."
  items={[
    'Live captions for a video call in progress',
    'Re-embedding a company document archive every Sunday night',
    'Rewriting a paragraph when a writer selects it and clicks Improve',
    'Transcribing 10,000 archived podcast episodes for a search index',
    'Answering a caller on a phone support line',
    'Bulk-tagging every product photo in a catalog of 3 million items',
  ]}
  targets={['Online', 'Offline']}
  correct={[0, 1, 0, 1, 0, 1]}
  correctFeedback="Correct. In each online workload a person waits for the response. In each offline workload no one waits on any single item."
  incorrectFeedback="Not yet. For each workload, ask whether a person is waiting for that response right now. If so, it is online, however many requests it involves."
/>

<p class="ie-obj">Objective 3: Classify a workload as online or offline.</p>

<MultipleChoice
  id="kc_online_2"
  question="A video platform runs one captioning model for live streams and for an archive of 2 million older videos that still lack captions. Both workloads have high volume. Which setup is most cost-effective?"
  options={[
    'One deployment tuned for latency that serves both workloads',
    'One deployment tuned for throughput that serves both workloads',
    'Two deployments of the same model, one tuned for each workload',
  ]}
  correct={2}
  optionFeedback={[
    'Not quite. A latency-tuned deployment spends GPU capacity on fast individual responses that the archive job does not need.',
    'Not quite. A throughput-tuned deployment makes each live caption arrive too late for viewers.',
    'Correct. Live captions are online and the archive is offline. With enough volume on each side, separate deployments let each workload get the optimization it needs.',
  ]}
/>
