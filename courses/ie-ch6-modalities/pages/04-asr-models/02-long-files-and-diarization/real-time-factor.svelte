<script module>
  export const pageConfig = { title: 'Real-Time Factor' };
</script>

<h1>Real-Time Factor</h1>

<p>
  Whisper accepts at most 30 seconds of audio per chunk. Long files, such as hour-long podcasts, need a
  different set of optimizations from live transcription, and a different metric.
</p>

<p>
  The <strong>real-time factor (RTF)</strong> measures how many times faster than real time a system
  transcribes audio. The name is confusing, because a larger RTF means a faster system.
</p>

<p class="worked"><strong>Formula.</strong> RTF = duration of the audio ÷ time taken to transcribe it</p>

<div class="worked">
  <p><strong>Worked example 1.</strong> The world's fastest typist transcribes 60 minutes of audio in 30 minutes.</p>
  <p>RTF = 60 ÷ 30 = 2X.</p>
</div>

<div class="worked">
  <p><strong>Worked example 2.</strong> An optimized Whisper deployment transcribes 1 hour (3,600 seconds) of audio in 3.6 seconds.</p>
  <p>RTF = 3,600 ÷ 3.6 = 1,000X.</p>
</div>

<p>
  The book reports that a Whisper deployment optimized for long files transcribes an hour of audio in
  under four seconds, which is an RTF of roughly 1,000X. Always convert both durations to the same
  unit before dividing.
</p>
