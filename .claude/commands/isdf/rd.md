---
description: Generate all Requirements Document documents in order.
name: rd-generate
---

Execute the following tasks sequentially.
Each task must complete and save its file before the next begins.

**Step 1:** Run task in `rd-overview.md`
**Step 2:** Run task in `rd-features.md` — input: output of Step 1
**Step 3:** Run task in `rd-usecases-plan.md` — input: output of Steps 1–2
**Step 3:** Run task in `rd-usecases.md` — input: output of Steps 1–2
**Step 4:** Run task in `rd-business-rules.md` — input: output of Steps 1–3
**Step 5:** Run task in `rd-data_model.md` — input: output of Steps 1–4
**Step 6:** Run task in `rd-screen_list.md` — input: output of Step 5

After all steps complete, print a summary of files generated.
