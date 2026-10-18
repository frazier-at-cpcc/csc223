<script module>
  export const pageConfig = { title: 'Knowledge Check: Long Files and Diarization' };
</script>

<script>
  import { MultipleChoice } from 'tessera-learn';
</script>

<h1>Knowledge Check: Long Files and Diarization</h1>

<p>This check is ungraded. Use it to confirm your understanding before you continue.</p>

<MultipleChoice
  id="kc_asr_long_1"
  question="A pipeline transcribes a 30-minute recording in 6 seconds. What is its real-time factor?"
  options={['5X', '180X', '300X', '1,800X']}
  correct={2}
  optionFeedback={[
    'This divides minutes by seconds without converting units. Convert 30 minutes to 1,800 seconds first.',
    'Recheck the division: 1,800 seconds ÷ 6 seconds.',
    'Correct. 30 minutes is 1,800 seconds, and 1,800 ÷ 6 = 300X.',
    'This is the audio length in seconds. RTF divides that length by the 6-second processing time.',
  ]}
/>

<MultipleChoice
  id="kc_asr_long_2"
  question="Why does a long-file pipeline use a VAD model to create chunks instead of splitting audio every 30 seconds?"
  options={[
    'VAD cuts at pauses in speech, so chunks do not split words in half',
    'VAD lets each chunk use the previous chunk as a prefix',
    'VAD produces chunks longer than Whisper\'s 30-second limit',
  ]}
  correct={0}
  optionFeedback={[
    'Correct. VAD removes silence and cuts at meaningful boundaries, while fixed intervals risk cutting words in half.',
    'Parallel chunks run at the same time, so no chunk has the previous transcript available as a prefix.',
    'Whisper accepts at most 30 seconds per chunk, so chunks must stay within that limit.',
  ]}
/>
