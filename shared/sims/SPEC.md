# Simulation component standard

Seven interactive simulations live in `shared/sims/` and are reused across the eight
Inference Engineering chapter courses (Tessera workspace at /Users/frazier/Developer/csc223).
Each one is built by a separate agent in parallel. Build ONLY your own files.

## Files you own

- `shared/sims/<Name>.svelte`: the component.
- `shared/sims/<name>.js`: the pure model (no DOM, no Svelte). Every number the component shows comes from here.
- `shared/sims/<name>.check.mjs`: `node shared/sims/<name>.check.mjs` runs `node:assert` checks on the model
  against hand-computed cases and prints `ok`. It is the proof the math is right.
- A temporary sandbox course `courses/zz-sim-<name>/` for testing. Delete it when finished.

Do not edit anything else: no other `shared/` file, no chapter course, no `AGENTS.md`.

## Hard requirements

1. **Svelte 5 runes only** (`$state`, `$derived`, `$props`, `$effect`, `onclick`). Read
   `node_modules/tessera-learn/AGENTS.md` first. No third-party libraries. Charts are hand-written inline SVG.
2. **Technically correct.** The model must agree with how the courses teach the concept. Before writing it,
   read the course pages listed in your assignment, and use their definitions, formulas, and example numbers.
   Where the courses disagree with reality, follow reality and say so in your final report. State every
   simplifying assumption inside the component in a closed `<details>` titled "How this model works".
3. **Accessible (WCAG 2.2 AA).**
   - Every control has a visible `<label>`. Sliders are `<input type="range">` with the current value shown
     in an `<output>`, and units are stated.
   - A text summary of the current result sits in a `role="status"` region, so the result never depends on
     the chart.
   - Each SVG has `role="img"` with an `aria-label` describing what it shows. Color is never the only
     signal: use labels, patterns, or dash styles too.
   - Buttons are real `<button>` elements. Keyboard operation works.
   - Any animation respects `prefers-reduced-motion`.
4. **Responsive.** It must work at 360 px wide with no horizontal page scroll. A wide SVG scales with
   `viewBox` and `width: 100%`.
5. **Themed.** Use Tessera CSS variables (`--tessera-primary`, `--tessera-text`, `--tessera-text-light`,
   `--tessera-border`, `--tessera-bg`, `--tessera-bg-secondary`, `--tessera-success`, `--tessera-error`,
   `--tessera-warning`, `--tessera-spacing-sm|md|lg`). Gray text on a tinted background must still reach 4.5:1.
6. **Presets.** Offer 2 to 4 named scenario buttons that load meaningful settings, so a learner can explore
   with a purpose.
7. **Register.** All visible prose follows the academic register: no contractions, no em-dashes, no
   "simply / just / easily", active voice, and one idea per sentence.
8. **Props.** Accept the props listed in your assignment, with sensible defaults, so a page can embed the
   component with no props at all.
9. **Root element.** Wrap the component in `<section class="sim" aria-labelledby=...>` with an `<h2>` title.
   Pages may override the heading text through a `title` prop. Accept a `headingLevel` prop (default 2,
   allowed 2 or 3) so the component never skips heading levels on a page.

## Testing (required before you report)

1. `node shared/sims/<name>.check.mjs` prints `ok`.
2. Create the sandbox: `pnpm tessera new zz-sim-<name>`, delete its `layout.svelte` and sample pages, and add
   one page with an `h1` that embeds your component, imported as `$shared/sims/<Name>.svelte`.
3. `pnpm validate zz-sim-<name>` reports no errors and no warnings. Then
   `pnpm export zz-sim-<name> --standard web` builds. Copy `courses/zz-sim-<name>/dist` into your
   scratch folder.
4. Serve that folder with `python3 -m http.server <PORT> --bind 127.0.0.1` on YOUR assigned port. Use
   Playwright (installed in the workspace; run node scripts from the workspace root) to:
   - load the page at 1280 px and at 360 px and screenshot both;
   - move each control and confirm the status text changes;
   - confirm there are no page errors.

   Look at the screenshots yourself and fix layout problems. Do NOT run `pnpm check` or `pnpm a11y`; the
   parent runs the accessibility audit afterwards.
5. Kill your server, then delete `courses/zz-sim-<name>/`.

## Report (at most 200 words)

Include:
- the props;
- the presets;
- the model formulas;
- the check output;
- any place where the course text disagrees with your model and needs a page edit.
