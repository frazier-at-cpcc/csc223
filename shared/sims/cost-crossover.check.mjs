import assert from 'node:assert/strict';
import { DEFAULTS, PRESETS, apiMonthly, dedicatedGpuHours, dedicatedMonthly, crossover, summarize } from './cost-crossover.js';

const near = (x, y, tol = 0.01) => assert.ok(Math.abs(x - y) <= tol, `${x} != ${y}`);
const d = DEFAULTS;

// Course Figure 7.14: 1,000M in x $1.25 + 500M out x $10 = $6,250.
near(apiMonthly(d), 6250);
// Course Figure 7.15: 1,600 GPU-hours x $3.50 = $5,600 (derived: 5e8 / (124*3600*0.7) = 1600.10).
near(dedicatedGpuHours(d), 5e8 / (124 * 3600 * 0.7), 1e-9);
near(dedicatedMonthly(d), 1600.1024 * 3.5, 0.01);
assert.equal(Math.round(dedicatedMonthly(d)), 5600);
// TCO page: engineering above $650 flips the decision to the API.
assert.equal(summarize({ ...d, engCost: 651 }).cheaper, 'api');
assert.equal(summarize({ ...d, engCost: 649 }).cheaper, 'dedicated');

// Floor: 2 replicas x 1 GPU x 730 h = 1,460 GPU-hours x $3.50 = $5,110.
// Below the knee, crossover = 5110 / 0.00625 = 817,600 requests.
const c = crossover(d);
assert.equal(c.kind, 'at');
near(c.requests, 817600, 0.5);
near(apiMonthly(d, c.requests), dedicatedMonthly(d, c.requests), 1e-6);

// Above the knee: e / (a - marginal). Prototype: 2000 / (0.00625 - 3.5*500/(124*3600*0.7)).
const proto = PRESETS[0].values;
const marginal = (3.5 * 500) / (124 * 3600 * 0.7);
near(crossover(proto).requests, 2000 / (0.00625 - marginal), 0.5);
near(apiMonthly(proto, crossover(proto).requests), dedicatedMonthly(proto, crossover(proto).requests), 1e-6);
assert.equal(summarize(proto).cheaper, 'api');

// High volume: 2e8 x (1500*1.25 + 400*10)/1e6 = $1,175,000; 8e10 out / (3000*3600*0.7) x 8 GPUs.
const hv = PRESETS[2].values;
near(apiMonthly(hv), 1_175_000);
near(dedicatedGpuHours(hv), (8e10 / (3000 * 3600 * 0.7)) * 8, 1e-6);
assert.equal(summarize(hv).cheaper, 'dedicated');

// Scale to zero: no floor, so dedicated = e + marginal x R; crossover = 500 / (a - marginal).
const s0 = PRESETS[3].values;
near(dedicatedMonthly(s0), 500 + 100_000 * marginal);
near(crossover(s0).requests, 500 / (0.00625 - marginal), 0.5);
assert.equal(crossover({ ...s0, engCost: 0 }).kind, 'always');

// API marginal below dedicated marginal: no crossover.
assert.equal(crossover({ ...d, gpuPrice: 10 }).kind, 'none');

// Cost per million output tokens: $6,250 / 500 = $12.50.
near(summarize(d).apiPerMOut, 12.5);

console.log('ok');
