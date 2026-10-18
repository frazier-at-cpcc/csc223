import assert from 'node:assert/strict';
import { readingTps, tpsFromItl, itlFromTps, textMetrics, tokensAt, speechMetrics } from './streaming-metrics.js';

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

// Chapter 1 worked examples
near(tpsFromItl(10), 100); // ITL 10 ms -> 100 TPS
near(tpsFromItl(20), 50); // knowledge check: ITL 20 ms -> 50 TPS
near(itlFromTps(40), 25);
near(textMetrics({ ttftMs: 0, tps: 40, outputTokens: 10, streams: 50 }).totalTps, 2000); // 50 x 40
near(textMetrics({ ttftMs: 0, tps: 30, outputTokens: 10, streams: 100 }).totalTps, 3000); // 100 x 30

// End-to-end: 300 ms + 399 gaps x 20 ms = 8,280 ms
const chat = textMetrics({ ttftMs: 300, tps: 50, outputTokens: 400, streams: 32 });
near(chat.itlMs, 20);
near(chat.e2eMs, 8280);
near(chat.perceivedTps, 50);
near(chat.totalTps, 1600);
near(textMetrics({ ttftMs: 300, tps: 50, outputTokens: 1, streams: 1 }).e2eMs, 300); // one token = TTFT

// Reading reference: 250 wpm / 60 / 0.75 = 5.5556 tokens per second
near(readingTps(), 250 / 45);
near(chat.readMultiple, 50 / (250 / 45));
near(chat.readEndMs, 300 + 400 * 180); // 400 tokens at 0.18 s each

// Token arrival
const p = { ttftMs: 300, tps: 50, outputTokens: 400 };
assert.equal(tokensAt(299, p), 0);
assert.equal(tokensAt(300, p), 1);
assert.equal(tokensAt(320, p), 2);
assert.equal(tokensAt(8280, p), 400);
assert.equal(tokensAt(99999, p), 400);

// Chapter 6: 90 TPS real-time threshold, 100 TPS single stream, about 150 ms TTFB
const voice = speechMetrics({ ttfbMs: 150, tps: 100, realtimeTps: 90, gpuTps: 3000, sentenceSeconds: 2 });
assert.equal(voice.keepsAhead, true);
near(voice.rtMultiple, 100 / 90);
near(voice.sentenceTokens, 180);
near(voice.ttfsMs, 150 + 1800); // 180 tokens at 100 TPS = 1.8 s
assert.equal(voice.maxStreams, 33); // floor(3000 / 90)
assert.equal(speechMetrics({ ttfbMs: 0, tps: 100, realtimeTps: 90, gpuTps: 2700, sentenceSeconds: 1 }).maxStreams, 30);

// Faster single stream (100 -> 300 TPS) does not change what one listener hears or the GPU's stream count
const fast = speechMetrics({ ttfbMs: 150, tps: 300, realtimeTps: 90, gpuTps: 3000, sentenceSeconds: 2 });
assert.equal(fast.maxStreams, 33);
near(fast.ttfsMs, 750);

// Below the threshold, generation falls behind playback and no real-time stream fits
const slow = speechMetrics({ ttfbMs: 250, tps: 70, realtimeTps: 90, gpuTps: 3000, sentenceSeconds: 2 });
assert.equal(slow.keepsAhead, false);
assert.equal(slow.maxStreams, 0);
near(slow.genSecondsPerAudioSecond, 90 / 70);

console.log('ok');
