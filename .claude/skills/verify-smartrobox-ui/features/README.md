# SmartRobox UI verification map

This directory is the maintained source for verifying the user-visible behavior of the SmartRobox UI components through the playground. Read this index, then use the matching feature file as the recipe.

## Baseline preconditions

- `VERIFY_RUN_ID` is set to an id unique to this task.
- `scripts/launch.sh` printed `ready`, and `scripts/doctor.sh` passes.
- The browser profile is fresh per `drive.sh` call, so the theme starts light and nothing persists between calls.
- Never drive an instance this run did not start. The user's own dev server on port 8085 is off limits.

## Driving conventions

- Every journey below is a single `drive.sh` call. Paths are relative to the repo root. Prefix commands with `.claude/skills/verify-smartrobox-ui/scripts/`.
- Use ARIA handles `aria/<name>[role="<role>"]`. Names come from visible labels, `aria-label`, or button text as rendered. Chrome applies CSS `text-transform`, so an uppercased `Cancel` button is named `CANCEL`.
- Brand primary is `rgb(120, 190, 65)` (`--sr-primary-500`). Components use contrast-safe shades of it: checked controls `rgb(101, 160, 55)`, see [Form controls](./form-controls.md), and buttons `rgb(82, 129, 44)`, see [Buttons](./buttons.md). Light page background token `--sr-color-bg` is `white`, and dark is `#172b4d`.

## Proof and skip reporting

- A passing journey exits 0, and its `log.jsonl` lines all have `"ok":true`.
- Record the feature id and the entry point with each artifact.
- If a journey fails, keep the `failure-*.png` and the failing log line. Report the step and the reason. Never edit the journey to make it pass.
- Do not report an entry point as verified through a different one, e.g. the `v-model:open` path does not prove the trigger path.

## Feature entry contract

Each feature file has an H1, one paragraph of user-visible behavior, then exactly four H2 sections: `Sub-features`, `How to get to it (user POV)`, `Driving it with drive.sh`, `Gotchas`.

## Features

- [Buttons](./buttons.md) cover variants, outline, sizes, and Button as a link.
- [Alert dialog](./alert-dialog.md) covers the SMARTROBOX notification modal opened by trigger, by `v-model:open`, and from ButtonWithConfirm.
- [Dialog](./dialog.md) covers the form dialog with title, fields, footer band, and close.
- [Combobox](./combobox.md) covers picking an option and reopening the list right after.
- [Form controls](./form-controls.md) cover checkbox, switch, and radio checked states in the brand color.
- [Theme](./theme.md) covers the dark mode switch and its persistence.
