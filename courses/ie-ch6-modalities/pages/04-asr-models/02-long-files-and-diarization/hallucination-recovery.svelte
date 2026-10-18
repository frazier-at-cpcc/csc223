<script module>
  export const pageConfig = { title: 'Detecting and Repairing Hallucinations' };
</script>

<script>
  import Term from '$shared/Term.svelte';
</script>

<h1>Detecting and Repairing Hallucinations</h1>

<p>
  Parallel transcription has a cost. A chunk no longer has the previous chunk's transcript available as
  a prefix, because the chunks run at the same time. Other quality techniques more than make up for
  this loss.
</p>

<h2>Detection</h2>

<p>
  ASR hallucinations often appear as repeated words and phrases. Two statistics on the output detect
  them automatically.
</p>
<ul>
  <li>
    The <strong>compression ratio</strong> of a transcript is its length divided by its length after a
    standard compressor such as gzip. Repeated text compresses well, so the ratio rises when the output
    repeats itself.
  </li>
  <li>The words per minute rises above a plausible speaking rate when the model loops.</li>
</ul>

<h2>Repair</h2>

<p>When a chunk fails these checks, apply one of two repairs.</p>
<ol>
  <li>
    <strong>Re-run the chunk at a higher temperature.</strong> Higher
    <Term id="temperature">temperatures</Term> usually produce more hallucination, so this repair is
    counterintuitive. The goal is to break the cycle of repeated words and get a different output.
  </li>
  <li>
    <strong>Re-chunk and re-run.</strong> Split the whole file, or the failing segment, into smaller
    chunks and transcribe them again.
  </li>
</ol>
<p>
  In practice, these repairs remove the need for a previous-chunk prefix. Long-file transcription can
  then be both highly parallel and accurate.
</p>
