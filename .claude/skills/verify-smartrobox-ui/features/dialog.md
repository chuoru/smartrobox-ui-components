# Dialog

The dialog is a general modal with a title, a body, and a gray SMARTROBOX footer band. The playground sample holds a form whose values are applied on submit.

## Sub-features

- `dialog-apply` opens the dialog, fills the form, and applies the values.
- `dialog-close` closes the dialog with the X button or Escape without applying.
- `dialog-reopen` reopens immediately after a close.

## How to get to it (user POV)

- `/samples/dialog`, the `open` button.

## Driving it with drive.sh

Preconditions:

- Baseline preconditions hold.

- **Apply.** Run `drive.sh --url /samples/dialog 'click:aria/open[role="button"]' 'wait:aria/パラメータ設定[role="dialog"]' 'fill:aria/Your name=Tran' 'shot:dialog-filled' 'click:aria/適用[role="button"]' 'gone:[role=dialog]' 'expect-text:Tran'`. The dialog closes and the toast shows the entered name.
- **Footer band.** Run `drive.sh --url /samples/dialog 'click:aria/open[role="button"]' 'wait:[role=dialog]' 'expect-style:[role=dialog] .footer|background-color=rgb(230, 230, 230)'`. The footer has the SMARTROBOX gray.
- **Close with X.** Run `drive.sh --url /samples/dialog 'click:aria/open[role="button"]' 'wait:[role=dialog]' 'click:aria/Close[role="button"]' 'gone:[role=dialog]' 'expect-text:false (boolean)'`. The dialog closes and the sample's state readout shows `false`.
- **Close with Escape.** Run `drive.sh --url /samples/dialog 'click:aria/open[role="button"]' 'wait:[role=dialog]' 'press:Escape' 'gone:[role=dialog]' 'expect-text:false (boolean)'`.
- **Fast reopen.** Run `drive.sh --url /samples/dialog 'click:aria/open[role="button"]' 'wait:[role=dialog]' 'click:aria/Close[role="button"]' 'gone:[role=dialog]' 'click:aria/open[role="button"]' 'wait:[role=dialog]'`. The second open works with no pause.

## Gotchas

- The overlay fades out after a close but must stay click-through, as in [Alert dialog](./alert-dialog.md). `dialog-reopen` guards it.
- The toast is a sweetalert2 element, not part of the dialog. `expect-text` finds it because it searches the whole page.
- `.footer` is a scoped class inside the component. It is the one CSS handle in this map, so update it if the Dialog template changes.
