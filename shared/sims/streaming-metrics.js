// Pure model for StreamingMetrics. No DOM, no Svelte.
// Text definitions follow Chapter 1, section 05; speech definitions follow Chapter 6, TTS metrics.

// Human reading reference: about 250 words per minute, and about 0.75 English words per token.
export const READING_WPM = 250;
export const WORDS_PER_TOKEN = 0.75;

/** Tokens per second a reader at `wpm` words per minute consumes. */
export const readingTps = (wpm = READING_WPM, wordsPerToken = WORDS_PER_TOKEN) => wpm / 60 / wordsPerToken;

/** Chapter 1: perceived TPS = 1,000 / ITL in milliseconds, and the reverse. */
export const tpsFromItl = (itlMs) => 1000 / itlMs;
export const itlFromTps = (tps) => 1000 / tps;

/**
 * Text streaming metrics for one request, repeated across `streams` concurrent users.
 * ttftMs is the user's wait for the first token, so it already includes network and queue time.
 */
export function textMetrics({ ttftMs, tps, outputTokens, streams, readingWpm = READING_WPM }) {
  const itlMs = itlFromTps(tps);
  const streamMs = Math.max(0, outputTokens - 1) * itlMs; // tokens 2..N each follow one ITL gap
  const e2eMs = ttftMs + streamMs;
  const readTps = readingTps(readingWpm);
  return {
    itlMs,
    perceivedTps: tps,
    totalTps: tps * streams,
    streamMs,
    e2eMs,
    readTps,
    readMultiple: tps / readTps,
    // a reader who starts at the first token and never waits for text
    readEndMs: ttftMs + (outputTokens / readTps) * 1000,
  };
}

/** Tokens the user has received `tMs` after sending the request. */
export function tokensAt(tMs, { ttftMs, tps, outputTokens }) {
  if (tMs < ttftMs) return 0;
  return Math.min(outputTokens, 1 + Math.floor(((tMs - ttftMs) * tps) / 1000 + 1e-9));
}

/**
 * Speech (TTS) metrics. realtimeTps is the audio-token rate that plays as one second of audio
 * per second. gpuTps is the GPU's aggregate audio-token throughput across all streams at full batch.
 */
export function speechMetrics({ ttfbMs, tps, realtimeTps, gpuTps, sentenceSeconds }) {
  const rtMultiple = tps / realtimeTps;
  const sentenceTokens = sentenceSeconds * realtimeTps;
  return {
    rtMultiple,
    keepsAhead: tps >= realtimeTps,
    // seconds of generation needed for each second of audio
    genSecondsPerAudioSecond: realtimeTps / tps,
    sentenceTokens,
    ttfsMs: ttfbMs + (sentenceTokens / tps) * 1000,
    // a stream that cannot reach real time even alone cannot be served in real time at all
    maxStreams: tps >= realtimeTps ? Math.floor(gpuTps / realtimeTps + 1e-9) : 0,
  };
}

export const TEXT_PRESETS = [
  { name: 'Chat assistant', ttftMs: 300, tps: 50, outputTokens: 400, streams: 32 },
  { name: 'Code completion', ttftMs: 100, tps: 150, outputTokens: 60, streams: 8 },
  { name: 'Batch summarization', ttftMs: 2000, tps: 20, outputTokens: 800, streams: 256 },
];

export const SPEECH_PRESETS = [
  { name: 'Voice agent', ttfbMs: 150, tps: 100, realtimeTps: 90, gpuTps: 3000, sentenceSeconds: 2 },
  { name: 'Audiobook', ttfbMs: 400, tps: 300, realtimeTps: 85, gpuTps: 6000, sentenceSeconds: 6 },
  { name: 'Overloaded stream', ttfbMs: 250, tps: 70, realtimeTps: 90, gpuTps: 3000, sentenceSeconds: 2 },
];
