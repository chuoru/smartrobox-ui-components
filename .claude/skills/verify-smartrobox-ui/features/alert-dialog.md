# Alert dialog

The alert dialog is the SMARTROBOX notification modal. It shows a blue info icon, a centered title and message, and a gray footer band with a gray CANCEL and a blue OK button. It opens from a trigger element or from code, and closes on OK, Cancel, the X button, or Escape.

## Sub-features

- `alert-trigger` opens from a trigger button and closes with the X button.
- `alert-model` opens from code through `v-model:open` and closes on OK or Cancel.
- `alert-confirm` opens from ButtonWithConfirm and runs the action on confirm.
- `alert-reopen` reopens immediately after a close, while the overlay is still fading out.

## How to get to it (user POV)

- `/samples/alert-dialog` has the trash-icon `Delete` trigger and a `v-model:open` button.
- `/samples/button-with-confirm` has the `Deploy` button.
- `/samples/button-with-delete-confirm` has the `Delete` button.

## Driving it with drive.sh

Preconditions:

- Baseline preconditions hold.

- **Trigger open and X close.** Run `drive.sh --url /samples/alert-dialog 'click:aria/Delete[role="button"]' 'wait:[role=alertdialog]' 'expect-text:選択した画像を削除しますか' 'shot:alert-trigger-open' 'click:aria/Close[role="button"]' 'gone:[role=alertdialog]'`. The dialog shows the message, then closes.
- **Code open, OK.** Run `drive.sh --url /samples/alert-dialog 'click:aria/v-model:open[role="button"]' 'wait:[role=alertdialog]' 'expect-style:aria/OK[role="button"]|background-color=rgb(3, 106, 202)' 'expect-style:aria/CANCEL[role="button"]|background-color=rgb(84, 84, 84)' 'shot:alert-model-open' 'click:aria/OK[role="button"]' 'gone:[role=alertdialog]' 'expect-text:OK'`. The footer buttons have the SMARTROBOX colors, the dialog closes, and the success toast says `OK`.
- **Code open, Cancel.** Run `drive.sh --url /samples/alert-dialog 'click:aria/v-model:open[role="button"]' 'wait:[role=alertdialog]' 'click:aria/CANCEL[role="button"]' 'gone:[role=alertdialog]'`. The dialog closes with no toast.
- **Escape.** Run `drive.sh --url /samples/alert-dialog 'click:aria/v-model:open[role="button"]' 'wait:[role=alertdialog]' 'press:Escape' 'gone:[role=alertdialog]'`.
- **Fast reopen.** Run `drive.sh --url /samples/alert-dialog 'click:aria/v-model:open[role="button"]' 'wait:[role=alertdialog]' 'click:aria/OK[role="button"]' 'gone:[role=alertdialog]' 'click:aria/v-model:open[role="button"]' 'wait:[role=alertdialog]'`. The second open works with no pause.
- **Confirm button.** Run `drive.sh --url /samples/button-with-confirm 'click:aria/Deploy[role="button"]' 'wait:[role=alertdialog]' 'click:aria/Yes[role="button"]' 'gone:[role=alertdialog]' 'expect-text:Deploy completed.'`. The action toast appears.

## Gotchas

- Each overlay fades out for about 300ms after a close. It must not take clicks while fading (`pointerEvents: 'none'` in its motion `exit`). If `alert-reopen` fails with a timeout on the second `wait`, check that first.
- Chrome builds accessible names from rendered text, so the CSS-uppercased footer buttons are named `CANCEL` and `OK`, not `Cancel`.
- The trigger tooltip (`v-tooltip`) once intercepted fast clicks because it rendered over the trigger for a frame. The tooltip now has `pointer-events: none`. If `alert-trigger` regresses to "dialog never opens", check that first.
