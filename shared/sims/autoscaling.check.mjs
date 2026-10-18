// node shared/sims/autoscaling.check.mjs  ->  prints "ok" when the model matches hand-computed cases.
import assert from 'node:assert/strict';
import { desiredReplicas, PATTERNS, PRESETS, simulate } from './autoscaling.js';

const close = (a, b, msg) => assert.ok(Math.abs(a - b) < 1e-9, `${msg}: ${a} != ${b}`);
const base = { minReplicas: 1, maxReplicas: 10, concurrencyTarget: 16, batchSize: 16, autoscalingWindow: 1, scaleDownDelay: 0, coldStart: 0 };

// Chapter 7 worked example: batch 16, target 16. The 65th concurrent request needs a fifth replica.
assert.equal(desiredReplicas(64, 16, 1, 10), 4);
assert.equal(desiredReplicas(65, 16, 1, 10), 5);
assert.equal(desiredReplicas(0, 16, 0, 4), 0); // scale to zero
assert.equal(desiredReplicas(1, 16, 0, 4), 1);
assert.equal(desiredReplicas(500, 16, 1, 10), 10); // clamped to max

// Demand curves.
assert.equal(PATTERNS.ramp.demand(15), 8);
assert.equal(PATTERNS.ramp.demand(45), 64);
assert.equal(PATTERNS.ramp.demand(75), 120);
assert.equal(PATTERNS.spike.demand(29), 24);
assert.equal(PATTERNS.spike.demand(30), 112);
assert.equal(PATTERNS.burst.demand(39), 0);

// No cold start, no delay, 1-minute window: capacity tracks ceil(D / 16) exactly and nothing queues.
// 90 minutes at 2 replicas + 30 minutes at 7 replicas = 390 replica-minutes = 6.5 hours.
let r = simulate({ ...base, pattern: 'spike' });
assert.equal(r.queueMinutes, 0);
close(r.replicaHours, 6.5, 'instant scaling cost');

// "Cold starts too slow" preset: each spike waits 12 minutes at 2 replicas (32 capacity, 80 queued).
r = simulate(PRESETS[1].settings);
assert.equal(r.queueMinutes, 24);
assert.equal(r.peakQueue, 80);
assert.equal(r.rows[41].ready, 2);
assert.equal(r.rows[42].ready, 7);
assert.equal(r.rows[49].ready, 7); // scale-down delay of 5 holds replicas through minute 49
assert.equal(r.rows[50].ready, 2);
close(r.replicaHours, 440 / 60, 'cold start cost'); // replicas in cold start are billed
close(r.idlePercent, (100 * 1520) / 5120, 'cold start idle');
assert.equal(r.verdict.problem, 'coldstart');

// Target 32 above batch 16: at the 120-request plateau the autoscaler holds ceil(120/32) = 4 replicas,
// which serve 4 x 16 = 64, so 56 requests queue inside the replicas.
r = simulate(PRESETS[2].settings);
assert.equal(r.rows[100].ready, 4);
assert.equal(r.rows[100].queued, 56);
assert.equal(r.peakQueue, 56);
assert.equal(r.verdict.problem, 'mismatch');

// Scale to zero: two bursts of 32 each wait a 3-minute cold start with zero replicas.
r = simulate(PRESETS[3].settings);
assert.equal(r.rows[0].ready, 0);
assert.equal(r.queueMinutes, 6);
assert.equal(r.peakQueue, 32);
assert.equal(r.rows[60].ready, 0); // back to zero 5 minutes after the burst ends
close(r.replicaHours, 70 / 60, 'scale to zero cost');
close(r.idlePercent, (100 * 320) / 928, 'scale to zero idle');

// A 4-minute window lags the spike: averages 46, 68, 90, then 112 give 3, 5, 6, 7 replicas.
r = simulate({ ...base, pattern: 'spike', autoscalingWindow: 4 });
assert.deepEqual(r.rows.slice(30, 34).map((x) => x.ready), [3, 5, 6, 7]);
assert.deepEqual(r.rows.slice(30, 34).map((x) => x.queued), [64, 32, 16, 0]);
assert.equal(r.rows[30].cause, 'window');

// Max replicas of 4 caps capacity at 64 during a 112-request spike.
r = simulate({ ...base, pattern: 'spike', maxReplicas: 4 });
assert.equal(r.rows[35].queued, 48);
assert.equal(r.verdict.problem, 'max');

// Min above max: min wins.
r = simulate({ ...base, minReplicas: 5, maxReplicas: 2 });
assert.equal(r.settings.maxReplicas, 5);
assert.ok(r.maxAdjusted);

// Well tuned preset: only brief cold-start queues on the ramp.
r = simulate(PRESETS[0].settings);
assert.equal(r.verdict.problem, 'none');

console.log('ok');
