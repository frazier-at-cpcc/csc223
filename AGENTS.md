# Tessera workspace: authoring guide

This is a [Tessera](https://tesseralearn.dev) **workspace**. It
owns the dependencies once and holds many courses under `courses/`, with a shared
design system in `shared/` (imported as `$shared`). The authoring guide ships
with the framework. Run `pnpm install`, then read
`node_modules/tessera-learn/AGENTS.md` before generating or editing course
content. It routes specialised tasks to the reference files in
`node_modules/tessera-learn/docs/`.

@./node_modules/tessera-learn/AGENTS.md

**Open this workspace folder** (not an individual course) so this guide is in
scope. Add a course with `pnpm tessera new <name>`; run a command against one with
`pnpm tessera dev <name>` (or cd into its folder and run `pnpm exec tessera dev`). The framework guide always
matches your installed `tessera-learn` version, so there's nothing to keep in sync
above this line.

---

## Project notes

This workspace turns the book *Inference Engineering* into one SCORM 2004 course
per chapter: `courses/ie-ch0-inference/` through `courses/ie-ch7-production/`.
`courses/starter-course/` is a reference only. Every chapter course keeps the
same `course.config.js` shape (SCORM 2004, completion at 100 percent of pages
viewed, success from the quiz at 70); change it in all eight or none.

### Source material (gitignored, never committed)

- `source/ie/pdf/`: the original chapter PDFs.
- `source/ie/md/<chapter>.txt`: extracted text (`pdftotext`; markitdown fails on these PDFs).
- `source/ie/pages/<chapter>/p-N.png`: page renders, for seeing figures and tables.
- `source/ie/md/appendix-a-inference-glossary.txt`: the book's glossary. Use its
  definitions for defined terms so wording stays consistent across courses.
- `source/ie/outlines/<course>.md`: the outline each course was built from.

### Chapter-to-course mapping

- Write the outline first: measurable learning objectives (Bloom's verbs), the
  sections, lessons, and pages, and the objective each quiz item assesses.
- Major chapter heading → section folder (`pages/NN-<slug>/` with `_meta.js` title).
  Subheadings → lesson subfolders, or pages when short. One concept per page.
- First section is an overview page: objectives and how the chapter fits the book.
- Each lesson ends with an ungraded `<MultipleChoice>` knowledge check.
- The last section is a graded chapter quiz (`graded: true`, `pageConfig.quiz`),
  8 to 12 items covering every objective.
- **Figures:** recreate each meaningful book figure as an accessible inline SVG
  or HTML/CSS diagram in `components/`, with a caption and a text description.
  Crop a page render into `assets/` only for a figure that cannot be recreated
  (e.g. a dense benchmark chart): `pdftoppm -r 200 -f N -l N -x X -y Y -W W -H H -png`.
- Code and config listings → `<pre><code>` blocks, accurate to the book.
- **Paraphrase, do not transcribe.** Rewrite for screen reading: short paragraphs,
  worked examples, the book's terminology kept exact. No long verbatim passages.
- Run `pnpm validate <course>` until it reports no errors and no warnings.
  `pnpm check` runs one course at a time (the a11y audit starts a server).

### Content rules

- **Audience:** technically literate learners (software engineers, IT and CS
  students) new to serving generative AI models in production.
- **Voice:** follow the `academic-writing-standards` skill. No em-dash asides,
  no contractions, no rhetorical questions, no hedge-minimizers, bold only for
  defined terms, active voice, one idea per sentence.
- **Quiz items:** follow the `mcq-author` skill (one objective per item, plausible
  foils, no "all of the above", feedback on every option).
- **Accessibility:** WCAG 2.2 AA; no skipped heading levels; every image and
  diagram has alt text or a text equivalent; color is never the only signal.
