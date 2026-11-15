# Combobox

The combobox lets a user search or pick from grouped options. The list opens from the chevron or by typing, closes after a pick, and slides away over the input as it closes.

## Sub-features

- `combobox-pick` opens the list from the chevron and fills the input with the picked option.
- `combobox-reopen` reopens the list immediately after a pick, while the old list is still sliding away.

## How to get to it (user POV)

- `/samples/combobox`, the `Show popup` chevron next to the `Search or select…` input.

## Driving it with drive.sh

Preconditions:

- Baseline preconditions hold.

- **Pick.** Run `drive.sh --url /samples/combobox 'click:aria/Show popup' 'wait:aria/Apple[role="option"]' 'shot:combobox-open' 'click:aria/Apple[role="option"]' 'expect-value:aria/Search or select…[role="combobox"]=Apple' 'gone:[role=option]'`. The input holds `Apple` and the list closes.
- **Fast reopen.** Run `drive.sh --url /samples/combobox 'click:aria/Show popup' 'click:aria/Apple[role="option"]' 'sleep:200' 'click:aria/Show popup' 'wait:[aria-label="Show popup"][aria-expanded="true"]'`. The chevron reports the list as expanded again.

## Gotchas

- The old list stays in the DOM for about 300ms while it slides away, so `wait:aria/Banana[role="option"]` right after a reopen matches the old list and proves nothing. Assert the chevron's `aria-expanded` instead.
- The chevron has `tabindex="-1"` and the name `Show popup`. Keyboard users open the list by typing in the input instead.
- The `sleep:200` aims the reopen click into the risky window, not around it. From a settled list, the closing list covers the chevron from about 150ms to 300ms after a pick (measured 2026-11-16). Clicks earlier than 150ms reopen even without the fix, so dropping the sleep makes the journey pass vacuously.
- The closing list slides up over the input and chevron for about 300ms. It must not take clicks while it does (`pointerEvents: 'none'` in its motion `exit`). `combobox-reopen` guards it.
