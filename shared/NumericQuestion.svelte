<script>
  // Numeric-entry question. Works standalone (own Check / Try again) and inside a quiz
  // (the quiz shell renders the snippet and owns submission). Reports a SCORM `numeric`
  // interaction judged against answer ± tolerance.
  import { onMount, untrack } from 'svelte';
  import { useQuestion } from 'tessera-learn';

  let {
    id,
    question,
    answer,
    tolerance = 0, // absolute
    tolerancePct = 0, // percent of answer; the larger of the two applies
    unit = '',
    correctFeedback = '',
    incorrectFeedback = '', // show the worked solution here
    graded,
    maxRetries,
    weight = 1,
  } = $props();

  let text = $state('');
  const uid = $props.id();
  const inputId = `num-${uid}`;

  const band = $derived(Math.max(tolerance, Math.abs(answer) * tolerancePct / 100));
  const parse = (s) => {
    const n = Number(String(s).replace(/[,\s_]/g, ''));
    return String(s).trim() === '' || !Number.isFinite(n) ? null : n;
  };
  const fmt = (n) => n.toLocaleString('en-US', { maximumFractionDigits: 4 });

  const q = useQuestion({
    get id() {
      return id;
    },
    graded: untrack(() => graded),
    weight: untrack(() => weight),
    maxRetries: untrack(() => maxRetries),
    complete: () => parse(text) !== null,
    response: () => {
      const n = parse(text);
      return n === null
        ? undefined
        : { type: 'numeric', response: n, correct: { min: answer - band, max: answer + band } };
    },
    reset: () => (text = ''),
    restore: (saved) => {
      text = String(saved);
      return Number(saved);
    },
  });

  const inQuiz = q.mode === 'quiz';
  onMount(() => q.setRender(view)); // no-op standalone

  function onInput(e) {
    if (q.locked) return;
    text = e.target.value;
    const n = parse(text);
    if (n !== null) q.setAnswer(n);
  }

  function onKeydown(e) {
    if (!inQuiz && !q.submitted && e.key === 'Enter' && q.answerComplete) q.submit();
  }
</script>

{#snippet view()}
  <div class="nq">
    <label class="nq-question" for={inputId}>{question}</label>
    <div class="nq-row">
      <input
        id={inputId}
        type="text"
        inputmode="decimal"
        autocomplete="off"
        class:correct={q.feedbackVisible && q.correct}
        class:incorrect={q.feedbackVisible && q.correct === false}
        value={text}
        oninput={onInput}
        onkeydown={onKeydown}
        disabled={q.locked}
        aria-describedby={unit ? `${inputId}-unit` : undefined}
        placeholder="Enter a number"
      />
      {#if unit}<span class="nq-unit" id="{inputId}-unit">{unit}</span>{/if}
    </div>
    {#if q.feedbackVisible}
      <div class="nq-review" role="status">
        {#if q.correct}
          <p class="nq-result correct">Correct.</p>
          {#if correctFeedback}<p class="nq-feedback">{correctFeedback}</p>{/if}
        {:else}
          <p class="nq-result incorrect">
            Incorrect. The expected answer is {fmt(answer)}{unit ? ` ${unit}` : ''}{band
              ? ` (accepted range ${fmt(answer - band)} to ${fmt(answer + band)})`
              : ''}.
          </p>
          {#if incorrectFeedback}<p class="nq-feedback">{incorrectFeedback}</p>{/if}
        {/if}
      </div>
    {/if}
  </div>
{/snippet}

{#if !inQuiz}
  <div class="nq-shell">
    {@render view()}
    {#if !q.submitted}
      <button class="tessera-btn-primary nq-btn" disabled={!q.answerComplete} onclick={() => q.submit()}>Check</button>
    {:else if q.canRetry}
      <button class="tessera-btn-primary nq-btn" onclick={() => q.retry()}>Try again</button>
    {/if}
  </div>
{/if}

<style>
  .nq-shell { padding: var(--tessera-spacing-md) 0; }
  .nq-question {
    display: block;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: var(--tessera-spacing-md);
    color: var(--tessera-text);
  }
  .nq-row { display: flex; align-items: center; gap: var(--tessera-spacing-sm); max-width: 400px; }
  input {
    flex: 1;
    min-width: 0;
    min-height: 44px;
    padding: 0.625rem 0.875rem;
    border: 2px solid var(--tessera-border);
    border-radius: 6px;
    font: inherit;
    color: var(--tessera-text);
    background: var(--tessera-bg);
  }
  input:focus { outline: none; border-color: var(--tessera-primary); box-shadow: var(--tessera-focus-ring); }
  input:disabled { background: var(--tessera-bg-secondary); cursor: not-allowed; }
  input.correct { border-color: var(--tessera-success); }
  input.incorrect { border-color: var(--tessera-error); }
  .nq-unit { color: var(--tessera-text-light); }
  .nq-review { margin-top: var(--tessera-spacing-md); }
  .nq-result { font-weight: 600; margin: 0 0 var(--tessera-spacing-sm); }
  .nq-result.correct { color: #15803d; }
  .nq-result.incorrect { color: var(--tessera-error); }
  .nq-feedback { margin: 0; padding: var(--tessera-spacing-sm) var(--tessera-spacing-md); background: var(--tessera-bg-secondary); border-radius: 4px; }
  .nq-btn { margin-top: var(--tessera-spacing-sm); }
</style>
