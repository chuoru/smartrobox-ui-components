# Form controls

Checkbox, switch, and radio follow the Argon custom controls. Checked checkboxes and switches fill with green, and a checked radio gets a green ring and dot. The green is `--sr-color-control-checked`, a shade of the brand green that keeps 3:1 contrast (WCAG 1.4.11).

## Sub-features

- `checkbox-checked` fills a checked checkbox green and shows a white tick.
- `switch-checked` fills a switched-on switch green.
- `radio-checked` gives the selected radio a green border.

## How to get to it (user POV)

- `/samples/checkbox`, `/samples/switch`, `/samples/radio-group`.

## Driving it with drive.sh

Preconditions:

- Baseline preconditions hold.

- **Checkbox.** Run `drive.sh --url /samples/checkbox 'click:aria/md[role="checkbox"]' 'expect-style:aria/md[role="checkbox"]|background-color=rgb(101, 160, 55)' 'shot:checkbox-checked'`.
- **Switch.** Run `drive.sh --url /samples/switch 'click:aria/Admin[role="switch"]' 'expect-style:aria/Admin[role="switch"]|background-color=rgb(101, 160, 55)'`.
- **Radio.** Run `drive.sh --url /samples/radio-group 'click:aria/Comfotable[role="radio"]' 'expect-style:aria/Comfotable[role="radio"]|border-color=rgb(101, 160, 55)'`.

## Gotchas

- Checked controls use `--sr-color-control-checked` (`#65a037` light, the brand `#78be41` dark), not the brand green, so the control and its tick or thumb reach 3:1. Strict axe checks do not cover this, so assert the color here.
- The radio sample label is spelled `Comfotable`. Use that exact name.
- The three switches in the sample are labelled `Admin`, `sm`, and `xs` through `<label for>`. A wrong `for` makes names merge (`Admin sm xs`) and the `aria/Admin` handle times out.
- All three checkbox rows bind the same model, so clicking `md` checks `sm` and `xs` too.
