# Theme

The header switch toggles dark mode for every component. The choice persists in localStorage across reloads within the same browser profile.

## Sub-features

- `theme-toggle` switches the `--sr-*` tokens to the dark palette and back.
- `theme-persist` keeps dark mode after a full reload.

## How to get to it (user POV)

- The `Dark mode` switch at the right of the header, on any page.

## Driving it with drive.sh

Preconditions:

- Baseline preconditions hold. Each `drive.sh` call starts with a fresh profile in light mode.

- **Toggle and persist.** Run `drive.sh --url /samples/button 'click:aria/Dark mode[role="switch"]' 'sleep:500' 'expect-style:body|--sr-color-bg=#172b4d' 'shot:theme-dark' 'goto:/samples/button' 'expect-style:body|--sr-color-bg=#172b4d' 'click:aria/Dark mode[role="switch"]' 'sleep:500' 'expect-style:body|--sr-color-bg=white'`. Dark tokens apply, survive the reload, and revert.

## Gotchas

- Colors transition over 0.15s. Without the `sleep:500` after toggling, computed colors read mid-transition.
- Persistence lives in localStorage under `smartrobox-ui-playground-theme`. It does not carry across `drive.sh` calls, because each call gets a new profile.
