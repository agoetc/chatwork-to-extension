import { GroupList } from '../../../../../../domain/Group'
import { ButtonField } from './ButtonField'
import { AccountAddTable } from '../account-add-table/AccountAddTable'
import { AccountList } from '../../../../../../domain/Account'
import { GroupEditForm } from '../edit-form/GroupEditForm'
import { GroupAddButtonEffect } from '../../../../effector/group/dialog/edit-form/GroupAddButton'
import { GroupDeleteButtonEffect } from '../../../../effector/group/dialog/edit-form/GroupDeleteButton'

export const GroupEditDialog = {
  generate(
    groupList: GroupList,
    toAccountList: AccountList,
    addEffect: (input: HTMLInputElement) => GroupAddButtonEffect,
    deleteEffect: GroupDeleteButtonEffect
  ): HTMLDialogElement {
    const groupEditDiv = GroupEditForm.generate(groupList, addEffect, deleteEffect)
    const checkTable = AccountAddTable.generate(toAccountList, { value: [] })

    return PGroupEditDialog.dialog(groupEditDiv, checkTable)
  },
}

const PGroupEditDialog = {
  dialog(groupEditDiv: HTMLDivElement, checkTable: HTMLDivElement): HTMLDialogElement {
    const dialog = document.createElement('dialog')
    dialog.id = 'grouping-dialog'
    const buttonField = ButtonField.generate(dialog)

    dialog.appendChild(groupEditDiv)
    dialog.appendChild(checkTable)
    dialog.appendChild(buttonField)
    return dialog
  },
}
