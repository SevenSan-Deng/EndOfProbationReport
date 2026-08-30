# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Current design direction

- The user selected the third generated direction: a deep ink navy executive presentation with one warm amber accent.
- The core metaphor is an organizational constellation: separate departments connected by AI workflows and converging toward measurable results.
- The site is a linear eight-section scroll presentation. Motion should feel cinematic and polished while staying subordinate to spoken content.
- End the hero cleanly after the report metadata. Do not insert a separate lower fold, preview strip, or repeated hero image between the cover and the results overview.
- Every report chapter must reserve obvious, usable space for the user's final text, screenshots, diagrams, data, or photos. Visual polish must not reduce content capacity.
- The page should read as a structured work presentation, not a personal portfolio or promotional landing page.

## Content direction

- Organize the probation-period work into three categories: workbenches, tools, and training.
- Keep the verified workbench set as customer service automation, SEO control, and the Chuntian Fresh operations middle platform.
- Keep the verified tool set as Zhaozhao recruiting robot, performance-sheet workflow, traffic-data V1.2, OCPX RPA, Taobao code RPA, Meituan campaign middle platform RPA, and Meituan-to-Feishu Base RPA.
- Present Obsidian and WorkBuddy as one training and knowledge-management system.
- Every project should foreground its name, serving department, achieved outcome, and a verified metric. Show company-wide coverage as a percentage only after a reliable organizational denominator is available.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
