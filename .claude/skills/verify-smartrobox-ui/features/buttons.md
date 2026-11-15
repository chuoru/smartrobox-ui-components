# Buttons

Buttons render in the Argon style with the SmartRobox palette. Filled variants use their theme color, outline variants show the color on the border and text over a transparent fill, and a Button can render as a router link.

## Sub-features

- `button-filled` fills primary buttons with the AA button green.
- `button-outline` draws outline buttons with a colored border and text over a transparent fill.
- `button-as-link` navigates when a Button wraps a RouterLink.

## How to get to it (user POV)

- Open the playground and choose `Button` in the sidebar (`/samples/button`).

## Driving it with drive.sh

Preconditions:

- Baseline preconditions hold.

- **Filled.** The first `保存` button is primary. Run `drive.sh --url /samples/button 'expect-style:aria/保存[role="button"]|background-color=rgb(82, 129, 44)' 'shot:buttons-light'`. The fill is the AA button green `--sr-primary-700`.
- **Outline.** Run `drive.sh --url /samples/button 'expect-style:aria/outline primary[role="button"]|color=rgb(82, 129, 44)' 'expect-style:aria/outline primary[role="button"]|background-color=rgba(0, 0, 0, 0)'`. Text is green and the fill is transparent.
- **As link.** Run `drive.sh --url /samples/button 'click:aria/asChild + RouterLink' 'expect-text:External Links'`. The home page renders.

## Gotchas

- Button colors are deliberately not the brand colors. Fills and outline text are shifted (primary uses `--sr-primary-700`, not the brand `#78BE41`) so text reaches WCAG AA 4.5:1. Strict axe checks in `Button.stories.ts` fail if they regress.
- Buttons animate `transition: all 0.15s`. Assert colors only after a `sleep:300` when the step before changed state (hover, theme).
- `aria/保存` matches several buttons. The first match is the top primary button, which is the one asserted.
