---
name: verify-smartrobox-ui
description: Drive the SmartRobox UI components playground (Vite + Vue 3 web app in playground/) in headless Chrome to prove a component change works the way a user sees it. Launches an isolated dev server, clicks through sample pages by ARIA role and name, asserts computed styles against the --sr-* theme tokens, and saves screenshots plus a step log as evidence. Use after changing anything under components/src or playground/src, or when asked to verify, screenshot, or check a component.
---

# verify-smartrobox-ui

The user-facing surface is the **playground**: one sample page per component at `/samples/<kebab-name>` (the list is `SAMPLES` in `playground/src/router/index.ts`). It imports the library source directly, so edits show up without a rebuild. Secondary surfaces: the library build (`npm run build`, which also runs the `--sr-*` token check) and Storybook (`npm run storybook`). This skill drives the playground. Run the build separately when you changed `components/`.

All scripts live in `scripts/` next to this file. Run them from anywhere. Every script reads `VERIFY_RUN_ID` (default `default`). Pick a unique id per task so parallel agents never share an instance.

## Launch

```bash
export VERIFY_RUN_ID=my-task
.claude/skills/verify-smartrobox-ui/scripts/launch.sh        # free port picked automatically
.claude/skills/verify-smartrobox-ui/scripts/launch.sh 8190   # or a fixed port
```

`launch.sh` installs what is missing (Node 24 into `~/.cache/verify-smartrobox-ui/node` when `node` is absent from PATH, `puppeteer-core` into `~/.cache/verify-smartrobox-ui/harness`, repo deps via `npm install`). Then it starts Vite in `playground/` under `setsid`, and blocks until `doctor.sh` passes. It prints `ready pid=… port=… url=… evidence=…`. Ready means the app shell rendered in Chrome, not just that the port answered. A warm start takes about 3 seconds.

It refuses to start a second instance for the same run id. It never touches the user's own `npm run dev` on port 8085.

## Doctor

```bash
.claude/skills/verify-smartrobox-ui/scripts/doctor.sh
```

Read-only. Passes only if all of these hold: the recorded pid is alive, the port is owned by that pid, the process serves this checkout's `playground/`, Chrome exists at `/usr/bin/google-chrome` (override with `VERIFY_CHROME`), and the page renders the header text `SmartRobox UI Components`. Run it first whenever a drive fails strangely.

## Drive

```bash
.claude/skills/verify-smartrobox-ui/scripts/drive.sh --url /samples/<name> <step> <step> ...
```

One Chrome session runs every step in order. It exits non-zero on the first failed step, and also on any page error or `console.error`. Steps:

| Step | Effect |
| --- | --- |
| `goto:<path>` | Navigate (full load) to a playground path. |
| `click:<selector>` | Wait until visible and its box stops moving (open animations), then press the real mouse at its centre. Whatever is on top there receives the click, as for a user. |
| `fill:<selector>=<value>` | Type into an input. Splits at the last `=`, so the value cannot contain `=`. |
| `press:<Key>` | Keyboard key, e.g. `press:Escape`. |
| `wait:<selector>` / `gone:<selector>` | Wait until visible / hidden (5s). |
| `sleep:<ms>` | Fixed pause. Only for animations, see gotchas. |
| `dark` / `light` | Toggle the `dark` class on body directly, then wait 500ms. Prefer the real theme switch (feature `theme`). |
| `expect-text:<text>` | Page text contains it. |
| `expect-value:<selector>=<value>` | An input's current value equals. Splits at the last `=`. |
| `expect-style:<selector>\|<prop>=<value>` | Computed value equals. Works for custom properties, e.g. `body\|--sr-color-bg=#172b4d`. |
| `style:<selector>\|<p1,p2>` / `text:<selector>` / `count:<selector>` | Record values in the log without asserting. |
| `shot:<name>` / `aria:<name>` | Save `<name>.png` / `<name>.aria.json` (accessibility snapshot) to the evidence dir. |

Selectors are puppeteer selectors. Prefer ARIA handles, `aria/<accessible name>[role="<role>"]`, e.g. `aria/OK[role="button"]`, `aria/Dark mode[role="switch"]`. Use CSS like `[role=alertdialog]` only for containers without a name. Quote every step for the shell.

Viewport defaults to 1280x900. Change it with `--width N --height N`.

### Run the whole map

```bash
.claude/skills/verify-smartrobox-ui/scripts/run-map.sh            # every journey in features/
.claude/skills/verify-smartrobox-ui/scripts/run-map.sh dialog     # only feature files whose name contains "dialog"
```

It extracts each ``Run `drive.sh …` `` bullet from `features/*.md` and runs it verbatim, printing PASS/FAIL per journey with the failing log line. Use it after any change to a shared token or base component. A full run takes about 30 seconds.

## Evidence

Everything lands in `.verify-evidence/<run-id>/` at the repo root (git-ignored). That covers screenshots, ARIA snapshots, `log.jsonl` (one JSON line per step with the values read), and `failure-<ts>.png` on any failed step. Report the run id and these paths.

Proof standards:

- Drive the user path: click the real trigger, type in the real field, use the header theme switch. Don't set Vue state or toggle classes when a control exists.
- Capture the action and the resulting state: a `shot` before and after, plus an `expect-*` assertion on the result. A screenshot alone is not a proof.
- Assert colors with `expect-style` against the theme values (brand primary `rgb(120, 190, 65)`, primary buttons `rgb(82, 129, 44)`), not by eyeballing.
- When a change touches a shared token or a base component (`Button`, `Dialog`, `style.css`), drive every feature in `features/` that uses it, not just the one you changed.
- The playground has no backend. The only side effect is the persisted theme in localStorage, covered by the `theme` feature.

## Cleanup

```bash
.claude/skills/verify-smartrobox-ui/scripts/cleanup.sh
```

Kills only the process group this run started, and removes `/tmp/verify-smartrobox-ui/<run-id>/`. It is safe when the instance already died. It never deletes `.verify-evidence/`. Run it after every attempt, failed ones included.

## Feature map

`features/README.md` indexes the user-facing features with tested journeys. Start there and keep it current when you add a sample page.
