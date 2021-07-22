import { ButtonField } from './ButtonField'
import { AddAccountListEffect } from '../../../../effector/group/dialog/dialog/EffectAccountSaveButton'
import { CloseDialogEffect } from '../../../../effector/group/dialog/dialog/EffectDialogCloseButton'

export const GroupingDialog = {
  generate(
    groupEditForm: HTMLDivElement,
    accountAddTable: HTMLDivElement,
    addAccountListEffect: AddAccountListEffect,
    closeDialogEffectRemindDialog: (dialog: HTMLDialogElement) => CloseDialogEffect
  ): HTMLDialogElement {
    const dialog = document.createElement('dialog')
    dialog.id = 'grouping-dialog'

    const buttonField = ButtonField.generate(
      addAccountListEffect,
      closeDialogEffectRemindDialog(dialog)
    )

    dialog.appendChild(groupEditForm)
    dialog.appendChild(accountAddTable)
    dialog.appendChild(buttonField)

    return dialog
  },
}
