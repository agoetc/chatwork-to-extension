import { ButtonField } from './ButtonField'
import { SaveAccountListEffect } from '../../../../effector/group/dialog/dialog/EffectSaveAccountButton'
import { CloseDialogEffectRemindDialog } from '../../../../effector/group/dialog/dialog/EffectCloseDialogButton'

export const GroupingDialog = {
  generate(
    groupEditForm: HTMLDivElement,
    accountAddTable: HTMLDivElement,
    saveAccountListEffect: SaveAccountListEffect,
    closeDialogEffectRemindDialog: CloseDialogEffectRemindDialog
  ): HTMLDialogElement {
    const dialog = document.createElement('dialog')
    dialog.id = 'grouping-dialog'

    const buttonField = ButtonField.generate(
      saveAccountListEffect,
      closeDialogEffectRemindDialog(dialog)
    )

    dialog.appendChild(groupEditForm)
    dialog.appendChild(accountAddTable)
    dialog.appendChild(buttonField)

    return dialog
  },
}
