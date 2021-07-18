import { GroupList } from '../../../../../../domain/Group'
import { ButtonField } from './ButtonField'
import { AccountAddTable } from '../account-add-table/AccountAddTable'
import { AccountList } from '../../../../../../domain/Account'
import { GroupEditForm } from '../edit-form/GroupEditForm'
import { GroupAddButtonEffect } from '../../../../effector/group/dialog/edit-form/GroupAddButton'
import { GroupDeleteButtonEffect } from '../../../../effector/group/dialog/edit-form/GroupDeleteButton'
import { AddAccountListEffect } from '../../../../effector/group/dialog/dialog/EffectAccountSaveButton'

export const GroupingDialog = {
  generate(
    groupEditForm: HTMLDivElement,
    accountAddTable: HTMLDivElement,
    addAccountListEffect: AddAccountListEffect
  ): HTMLDialogElement {
    const dialog = document.createElement('dialog')
    dialog.id = 'grouping-dialog'
    const buttonField = ButtonField.generate(dialog, addAccountListEffect)

    dialog.appendChild(groupEditForm)
    dialog.appendChild(accountAddTable)
    dialog.appendChild(buttonField)

    return dialog
  },
}
