# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Current design direction

- Keep all future report edits, builds, and previews local-only. Do not save new Sites versions, push source updates to the Sites repository, or deploy to the hosted Site unless the user explicitly reverses this instruction.
- The user selected the third generated direction: a deep ink navy executive presentation with one warm amber accent.
- The core metaphor is an organizational constellation: separate departments connected by AI workflows and converging toward measurable results.
- The site is a linear eight-section scroll presentation. Motion should feel cinematic and polished while staying subordinate to spoken content.
- End the hero cleanly after the report metadata. Do not insert a separate lower fold, preview strip, or repeated hero image between the cover and the results overview.
- Do not include a separate “转正结论” or “申请按期转正” section; the report should move directly from the self-development plan to the final thanks screen.
- Keep the hero headline compact and exactly two lines: one complete sentence per line, with no wrapping inside either sentence.
- Vertically center the complete hero copy group within the first viewport while keeping its text left-aligned.
- Every report chapter must reserve obvious, usable space for the user's final text, screenshots, diagrams, data, or photos. Visual polish must not reduce content capacity.
- The page should read as a structured work presentation, not a personal portfolio or promotional landing page.

## Content direction

- Organize the probation-period work into three categories: workbenches, tools, and training.
- Keep the verified workbench set as customer service automation, SEO control, the Chuntian Fresh operations middle platform, and the mother-and-baby social-operations data dashboard.
- Present the mother-and-baby dashboard around its social-commerce context, covering customer, promotion-slot, product, and operating-infrastructure data such as phone cards. Use “母婴” consistently and do not call this business unit “分公司”.
- Keep the verified tool set as Zhaozhao recruiting robot, performance-sheet workflow, traffic-data V1.2, OCPX RPA, Taobao code RPA, Meituan campaign middle platform RPA, and Meituan-to-Feishu Base RPA.
- Present Obsidian and WorkBuddy as one training and knowledge-management system.
- Every project should foreground its name, serving department, achieved outcome, and a verified metric. Show company-wide coverage as a percentage only after a reliable organizational denominator is available.
- Describe project cards in business-readable language: emphasize available functions and achieved effects, and avoid implementation details or technical terminology unless they are essential to understanding the result.
- Headline results should represent business delivery and team enablement rather than development-process statistics such as test counts.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
