<script module>
  export const pageConfig = { title: 'Knowledge Check: Long Files and Diarization' };
</script>

<script>
  import { Sorting } from 'tessera-learn';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Knowledge Check: Long Files and Diarization</h1>

<p>
  This check is ungraded. The two numeric items practice objective 5, calculating the real-time factor.
  The sorting item practices objective 6, comparing the two speech recognition pipelines.
</p>

<NumericQuestion
  id="kc_rtf_practice"
  question="A pipeline transcribes a 30-minute recording in 6 seconds. What is its real-time factor? Enter the number without the X."
  answer={300}
  correctFeedback="30 minutes = 1,800 seconds, and 1,800 ÷ 6 = 300X."
  incorrectFeedback="Convert the audio to seconds first: 30 × 60 = 1,800 seconds. Then divide by the processing time: 1,800 ÷ 6 = 300X. An answer of 5 divides minutes by seconds."
/>

<NumericQuestion
  id="kc_rtf_inverse"
  question="A podcast service runs at a real-time factor of 600X. How many seconds does it take to transcribe a 90-minute episode?"
  answer={9}
  unit="seconds"
  correctFeedback="90 minutes = 5,400 seconds, and 5,400 ÷ 600 = 9 seconds."
  incorrectFeedback="Rearrange the formula: time taken = audio duration ÷ RTF. The episode is 90 × 60 = 5,400 seconds, so 5,400 ÷ 600 = 9 seconds."
/>

<Sorting
  id="kc_asr_compare"
  question="Sort each feature into the speech recognition pipeline it describes."
  items={[
    'Audio arrives over a WebSocket while the person is still speaking',
    'Chunks are transcribed at the same time across many MIG slices',
    "The previous chunk's transcript serves as the prefix for the next chunk",
    'Performance is reported as a real-time factor',
    'A looping chunk is re-run at a higher temperature',
    'The target is a round trip of about 200 ms per chunk',
  ]}
  targets={['Real-time pipeline', 'Long-file pipeline']}
  correct={[0, 1, 0, 1, 1, 0]}
  correctFeedback="The real-time pipeline is sequential and judged by per-chunk latency. The long-file pipeline is parallel, judged by real-time factor, and repairs quality with hallucination checks instead of a prefix."
  incorrectFeedback="Ask whether the audio is still arriving. Live audio is chunked and transcribed in order, so a prefix is available and per-chunk latency is the metric. A finished file is chunked and transcribed in parallel, so it relies on hallucination repairs and is measured by real-time factor."
/>
