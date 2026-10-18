<script module>
  export const pageConfig = { title: 'Real-Time Factor' };
</script>

<script>
  import Signal from '$shared/Signal.svelte';
  import Term from '$shared/Term.svelte';
  import NumericQuestion from '$shared/NumericQuestion.svelte';
</script>

<h1>Real-Time Factor</h1>

<p>
  <Term id="whisper">Whisper</Term> accepts at most 30 seconds of audio per chunk. Long files, such as hour-long podcasts, need a
  different set of optimizations from live transcription, and a different metric.
</p>
<p>
  The <strong>real-time factor (RTF)</strong> measures how many times faster than real time a system
  transcribes audio. The name is confusing, because a larger RTF means a faster system.
</p>
<pre><code>RTF = duration of the audio ÷ time taken to transcribe it</code></pre>
<p>Convert both durations to the same unit, usually seconds, before you divide.</p>

<Signal kind="worked" title="Two real-time factors">
  <p>Example 1. The world's fastest typist transcribes 60 minutes of audio in 30 minutes.</p>
  <ol>
    <li>Both durations are already in minutes.</li>
    <li>RTF = 60 ÷ 30 = 2X.</li>
  </ol>
  <p>Example 2. An optimized Whisper deployment transcribes 1 hour of audio in 3.6 seconds.</p>
  <ol>
    <li>Convert the audio to seconds: 1 hour × 3,600 seconds per hour = 3,600 seconds.</li>
    <li>RTF = 3,600 ÷ 3.6 = 1,000X.</li>
  </ol>
  <p>
    The book reports that a Whisper deployment optimized for long files transcribes an hour of audio in
    under four seconds, an RTF of roughly 1,000X.
  </p>
</Signal>

<p>Finish the next example. The unit conversion is done for you.</p>

<NumericQuestion
  id="faded_rtf"
  question="A system transcribes a 45-minute meeting recording in 5 seconds. The audio is 45 × 60 = 2,700 seconds. Complete the final step: what is the real-time factor? Enter the number without the X."
  answer={540}
  correctFeedback="RTF = 2,700 seconds ÷ 5 seconds = 540X."
  incorrectFeedback="Divide the audio duration by the processing time, both in seconds: 2,700 ÷ 5 = 540X."
/>

<Signal kind="mistake" title="Dividing minutes by seconds">
  <p>
    Dividing 45 minutes by 5 seconds gives 9X, which understates the system by a factor of 60. Mixed units
    produce answers that look plausible, so always convert first.
  </p>
</Signal>
